<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

use Fusonic\Linq\Linq;

class Receipt extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/Receipt/receipt_main';
        $this->load->view('layout/nav', $data);
    }

    public function editPage() {
        $data['page'] = 'transaction/Receipt/receipt_edit';
        $this->load->view('layout/nav', $data);
    }

    public function newBill() {
        $this->load->view('transaction/Receipt/receiptbill_edit');
    }

    public function newBank() {
        $this->load->view('transaction/Receipt/receiptbbank_new');
    }

    public function newBankBranch() {
        $this->load->view('transaction/Receipt/receiptbankbranch_new');
    }

    public function displayPrint() {
        $this->load->view('transaction/Receipt/receiptPrintView');
    }

    public function loadReceiptReport() {
        $this->load->view('transaction/Receipt/reports/RReceipt.mrt');
    }

    public function findCustomer() {
        $qryCust = $this->db->select('RowKey,'
                        . 'CusCode,'
                        . 'Customer')
                ->where('RowStatus', true)
                ->from('MSTCustomer')
                ->order_by('CusCode', 'asc')
                ->get();
        echo json_encode($qryCust->result());
    }

    public function findCustomerBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'Branch,'
                        . 'Address,'
                        . 'DueDate')
                ->where('CompanyKey', $_key)
                ->order_by('IsDefault', 'desc')
                ->order_by('Branch', 'asc')
                ->from('MSTCustomerBranch')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findBillByCustomer() {
        $receiptkey = $_POST['receiptkey'];
        $_key = $_POST['key'];
        $_data = json_decode($_POST['vdata']);
        $qryBill = Linq::from($this->db->select('b.RowKey')
                                ->from('TRNBillHD b')
                                ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey')
                                ->where('cb.CompanyKey', $_key)
                                ->where('b.Remain>0')
                                ->where_not_in('b.RowKey', $_data)
                                ->get()->result())
                        ->select(function($x) {
                            return $x->RowKey;
                        })->toArray();
        $qryBillInReceipt = Linq::from($this->db->select('rb.BillKey as RowKey')
                                ->from('TRNReceiptBill rb')
                                ->join('TRNBillHD b', 'rb.BillKey=b.RowKey')
                                ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey')
                                ->where_not_in('rb.BillKey', $_data)
                                ->where('rb.ReceiptHDKey', $receiptkey)
                                ->where('cb.CompanyKey', $_key)
                                ->get()->result())
                        ->select(function($x) {
                            return $x->RowKey;
                        })->toArray();
        $keyTotal = array_merge($qryBill, $qryBillInReceipt);
        if (count($keyTotal) === 0)
            array_push($keyTotal, PCenter::GUID_EMPTY());
        $arData = Linq::from($this->db->select('b.RowKey as key,'
                                . 'b.DocDate,'
                                . 'b.DocID,'
                                . 'b.Remain,'
                                . '"' . $receiptkey . '" as receiptkey')
                        ->from('TRNBillHD b')
                        ->where_in('b.RowKey', $keyTotal)
                        ->order_by('b.DocDate', 'ASC')
                        ->get()->result())
                ->select(function($x) {
                    $oldAmounts = $this->db->select_sum('Amounts')
                            ->from('TRNReceiptBill')
                            ->where('BillKey', $x->key)
                            ->where('ReceiptHDKey', $x->receiptkey)
                            ->get()->row()->Amounts;
                    return [
                        'key' => $x->key,
                        'DocDate' => $x->DocDate,
                        'DocID' => $x->DocID,
                        'Amounts' => floatval($x->Remain) + floatval($oldAmounts),
                        'InputAmounts' => floatval($x->Remain) + floatval($oldAmounts)
                    ];
                })
                ->toArray();
        echo json_encode($arData);
    }

    public function findReceiptOld() {
        $now = new DateTime();
        $query = $this->db->select('RowKey, '
                        . 'DocID,'
                        . 'Seq,'
                        . 'DocDate')
                ->from('TRNReceiptHD')
                ->where('CreateDate>=', PCenter::DATATIME_DB($now->modify("-3 month")))
                ->order_by('DocDate', 'desc')
                ->get();
        $vShow = Linq::from($query->result())
                ->groupBy(function($x) {
                    $key = $x->DocID;
                    return $key;
                })
                ->select(function($x) {
                    $rowOne = $this->db->select('RowKey,'
                                    . 'DocID,'
                                    . 'Seq,'
                                    . 'DocDate')
                            ->where('DocID', $x->key())
                            ->from('TRNReceiptHD')
                            ->order_by('Seq', 'Desc')
                            ->get()->row();
                    return $rowOne;
                })
                ->toArray();
        echo json_encode($vShow);
    }

    public function findBank() {
        $query = $this->db->select('RowKey, '
                        . 'Bank,'
                        . 'IsDefault')
                ->from('MSTBank')
                ->order_by('Bank', 'ASC')
                ->get();
        echo json_encode($query->result());
    }

    public function editBank() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Bank', $_data->Bank)->from('MSTBank')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTBank');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTBank', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('Bank', $_data->Bank)->where('RowKey !=', $_data->RowKey)->from('MSTBank')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTBank');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTBank', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function findBankBranch() {
        $_key = $_POST['key'];
        $query = $this->db->select('RowKey, '
                        . 'Branch,'
                        . 'IsDefault')
                ->from('MSTBankBranch')
                ->where('BankKey', $_key)
                ->order_by('Branch', 'ASC')
                ->get();
        echo json_encode($query->result());
    }

    public function editBankBranch() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Branch', $_data->Branch)->where('BankKey', $_data->BankKey)->from('MSTBankBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('BankKey', $_data->BankKey)
                            ->update('MSTBankBranch');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTBankBranch', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('Branch', $_data->Branch)->where('RowKey !=', $_data->RowKey)->where('BankKey', $_data->BankKey)->from('MSTBankBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('BankKey', $_data->BankKey)
                            ->update('MSTBankBranch');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTBankBranch', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function findReceipt() {
        $_data = json_decode($_POST['vdata']);
        $qryMenu = $this->db->select('b.RowKey as key,'
                        . 'b.DocID,'
                        . 'b.Seq,'
                        . 'b.DocDate,'
                        . 'c.CusCode,'
                        . 'c.Customer,'
                        . 'b.PayType')
                ->where('b.DocDate >=', $_data->SDate)
                ->where('b.DocDate <=', $_data->EDate)
                ->from('TRNReceiptHD b')
                ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey', 'left')
                ->join('MSTCustomer c', 'cb.CompanyKey=c.RowKey', 'left')
                ->get();
        $qShow = Linq::from($qryMenu->result())
                        ->select(function($x) {
                            $tBill = Linq::from($this->db->select('Amounts')
                                            ->where('ReceiptHDKey', $x->key)
                                            ->from('TRNReceiptBill')->get()->result())
                                    ->select(function($k) {
                                        return $k->Amounts;
                                    })->sum();
                            $tOther = Linq::from($this->db->select('Amounts')
                                            ->where('ReceiptHDKey', $x->key)
                                            ->from('TRNReceiptOther')->get()->result())
                                    ->select(function($k) {
                                        return $k->Amounts;
                                    })->sum();
                            return [
                                'key' => $x->key,
                                'DocID' => (int) $x->Seq > 0 ? $x->DocID . '-' . $x->Seq : $x->DocID,
                                'DocDate' => $x->DocDate,
                                'CusCode' => $x->CusCode,
                                'Customer' => $x->Customer,
                                'PayType' => (int) $x->PayType === 1 ? 'เงินสด' : 'เครดิต',
                                'Amounts' => $tBill + $tOther,
                            ];
                        })->toArray();
        echo json_encode($qShow);
    }

    public function findReceiptOne() {
        $_key = $_POST['key'];
        $qry = $this->db->select('b.DocID,'
                                . 'cb.CompanyKey,'
                                . 'b.CustomerBranchKey,'
                                . 'b.DocDate,'
                                . 'b.PayType')
                        ->where('b.RowKey >=', $_key)
                        ->from('TRNReceiptHD b')
                        ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey', 'left')
                        ->get()->row();
        $qry->BillList = Linq::from($this->db->select('r.BillKey as key,'
                                . 'b.Remain,'
                                . 'b.DocDate,'
                                . 'b.DocID,'
                                . 'r.Amounts')
                        ->from('TRNReceiptBill r')
                        ->where('r.ReceiptHDKey', $_key)
                        ->join('TRNBillHD b', 'r.BillKey=b.RowKey')
                        ->get()->result())
                ->select(function($x) {
                    return [
                        'key' => $x->key,
                        'DocDate' => $x->DocDate,
                        'DocID' => $x->DocID,
                        'Amounts' => floatval($x->Amounts + $x->Remain),
                        'InputAmounts' => floatval($x->Amounts)
                    ];
                })
                ->toArray();
        $qry->Other = array();
        $r = 1;
        foreach ($this->db->select('RowKey as key,'
                        . 'Detail,'
                        . 'Amounts')
                ->from('TRNReceiptOther')
                ->where('ReceiptHDKey', $_key)
                ->get()->result() as $row) {
            array_push($qry->Other, [
                'key' => $row->key,
                'Seq' => $r,
                'Detail' => $row->Detail,
                'InputAmounts' => floatval($row->Amounts)
            ]);
            $r++;
        }
        $qry->cheque = $this->db->select('c.ChequeNumber,'
                                . 'c.ChequeDate,'
                                . 'b.BankKey,'
                                . 'c.BankBranchKey')
                        ->from('TRNReceiptPayCheque c')
                        ->join('MSTBankBranch b', 'c.BankBranchKey=b.RowKey')
                        ->where('c.ReceiptHDKey', $_key)
                        ->get()->result();
        echo json_encode($qry);
    }

    public function editReceipt() {
        $_data = json_decode($_POST['data']);
        $_pfold = $_POST['type'];
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $_data->RowKey = PCenter::GUID();
            if ($_pfold === PCenter::GUID_EMPTY()) {
                $_data->DocID = $this->createDocID(PCenter::genInvoice());
                $_data->Seq = 0;
            } else {
                $docOld = $this->db->select('DocID,Seq')
                                ->from('TRNReceiptHD')
                                ->where('RowKey', $_pfold)
                                ->get()->row();
                $_data->DocID = $docOld->DocID;
                $_data->Seq = (int) $docOld->Seq + 1;
            }
            $_data->CreateBy = $this->USER_LOGIN()->RowKey;
            $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('TRNReceiptHD', $_data);

            foreach ($_data->TRNReceiptBill as $_row) {
                if ($_row->Amounts > 0) {
                    $_row->RowKey = PCenter::GUID();
                    $_row->ReceiptHDKey = $_data->RowKey;
                    $this->db->insert('TRNReceiptBill', $_row);

                    $this->db->set('Remain', 'Remain-' . $_row->Amounts, FALSE);
                    $this->db->where('RowKey', $_row->BillKey);
                    $this->db->update('TRNBillHD');
                }
            }

            foreach ($_data->TRNReceiptOther as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->ReceiptHDKey = $_data->RowKey;
                $this->db->insert('TRNReceiptOther', $_row);
            }

            foreach ($_data->TRNReceiptPayCheque as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->ReceiptHDKey = $_data->RowKey;
                $this->db->insert('TRNReceiptPayCheque', $_row);
            }
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
                $vReturn->key=$_data->RowKey;
            }
        } else {
            $_data->UpdateBy = PCenter::GUID_EMPTY();
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', $_data->RowKey)->update('TRNReceiptHD', $_data);

            $_old = $this->db->from('TRNReceiptBill')
                    ->where('ReceiptHDKey', $_data->RowKey)
                    ->get();
            foreach ($_old->result() as $_row) {
                $this->db->set('Remain', 'Remain+' . $_row->Amounts, FALSE);
                $this->db->where('RowKey', $_row->BillKey);
                $this->db->update('TRNBillHD');
            }

            $this->db->where('ReceiptHDKey', $_data->RowKey);
            $this->db->delete('TRNReceiptBill');
            foreach ($_data->TRNReceiptBill as $_row) {
                if ($_row->Amounts > 0) {
                    $_row->RowKey = PCenter::GUID();
                    $_row->ReceiptHDKey = $_data->RowKey;
                    $this->db->insert('TRNReceiptBill', $_row);

                    $this->db->set('Remain', 'Remain-' . $_row->Amounts, FALSE);
                    $this->db->where('RowKey', $_row->BillKey);
                    $this->db->update('TRNBillHD');
                }
            }

            $this->db->where('ReceiptHDKey', $_data->RowKey);
            $this->db->delete('TRNReceiptOther');
            foreach ($_data->TRNReceiptOther as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->ReceiptHDKey = $_data->RowKey;
                $this->db->insert('TRNReceiptOther', $_row);
            }

            $this->db->where('ReceiptHDKey', $_data->RowKey);
            $this->db->delete('TRNReceiptPayCheque');
            foreach ($_data->TRNReceiptPayCheque as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->ReceiptHDKey = $_data->RowKey;
                $this->db->insert('TRNReceiptPayCheque', $_row);
            }
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
                $vReturn->key = $_data->RowKey;
            }
        }
        echo json_encode($vReturn);
    }

    public function findReceiptWithReport() {
        $_key = $_POST['key'];
        $qry = $this->db->select('b.DocDate,'
                                . 'b.DocID,'
                                . 'b.Seq,'
                                . 'b.CustomerBranchKey,'
                                . 'b.PayType')
                        ->from('TRNReceiptHD b')
                        ->where('b.RowKey', $_key)
                        ->get()->row();
        $qry->Company = $this->MyCompayDetail();
        $qry->Customer = $this->GetCustomerByBranch($qry->CustomerBranchKey);
        $qry->Bill = Linq::from($this->db->select('1 as ListType,'
                                        . '"true" as ListCheck,'
                                        . 'b.DocDate,'
                                        . '0 as PriceItem,'
                                        . 'r.Amounts as PriceTotal')
                                ->from('TRNReceiptBill r')
                                ->join('TRNBillHD b', 'r.BillKey=b.RowKey')
                                ->where('r.ReceiptHDKey', $_key)
                                ->get()->result())
                        ->select(function($x) {
                            return [
                                'ListType' => floatval($x->ListType),
                                'ListCheck' => true,
                                'Detail' => date_format(date_create($x->DocDate), 'd/m/Y'),
                                'PriceItem' => floatval($x->PriceItem),
                                'PriceTotal' => floatval($x->PriceTotal)
                            ];
                        })->toArray();
        if (Linq::from($qry->Bill)->count() === 0) {
            $qry->Bill = [
                (object) [
                    'ListType' => 1,
                    'ListCheck' => false,
                    'Detail' => "",
                    'PriceItem' => 0,
                    'PriceTotal' => 0
                ]
            ];
        }
        $qry->Other = Linq::from($this->db->select('2 as ListType,'
                                        . '"true" as ListCheck,'
                                        . 'Detail,'
                                        . '0 as PriceItem,'
                                        . 'Amounts as PriceTotal')
                                ->from('TRNReceiptOther')
                                ->where('ReceiptHDKey', $_key)
                                ->get()->result())
                        ->select(function($x) {
                            return[
                                'ListType' => floatval($x->ListType),
                                'ListCheck' => true,
                                'Detail' => $x->Detail,
                                'PriceItem' => floatval($x->PriceItem),
                                'PriceTotal' => floatval($x->PriceTotal)
                            ];
                        })->toArray();
        if (Linq::from($qry->Other)->count() === 0) {
            $qry->Other = [
                (object) [
                    'ListType' => 2,
                    'ListCheck' => false,
                    'Detail' => "",
                    'PriceItem' => 0,
                    'PriceTotal' => 0
                ]
            ];
        }
        $qry->Cheq = $this->db->select('c.ChequeNumber,'
                                . 'c.ChequeDate,'
                                . 'bb.Branch,'
                                . 'b.Bank')
                        ->from('TRNReceiptPayCheque c')
                        ->join('MSTBankBranch bb', 'c.BankBranchKey=bb.RowKey')
                        ->join('MSTBank b', 'bb.BankKey=b.RowKey')
                        ->where('c.ReceiptHDKey', $_key)
                        ->get()->result();
        echo json_encode($qry);
    }

    public function printTemp() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->RowKey = PCenter::GUID();
        $_data->CreateBy = $this->USER_LOGIN()->RowKey;
        $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->insert('TRNReceiptHDPrint', $_data);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $vReturn->success = false;
            $vReturn->message = $this->db->_error_message();
        } else {
            $this->db->trans_commit();
            $vReturn->success = true;
        }
        $vReturn->ReportView = $_data->ReportView;
        echo json_encode($vReturn);
    }

    public function printTempLoad() {
        $_key = $_POST['key'];
        $qry = Linq::from($this->db->select('r.ReportView,r.UpdateBy,r.UpdateDate,t.Title,u.FName,u.LName')
                        ->where('r.ReceiptHDKey', $_key)
                        ->from('TRNReceiptHDPrint r')
                        ->join('USRAccount u', 'r.UpdateBy=u.RowKey')
                        ->join('MSTTitle t', 'u.TitleKey=t.RowKey')
                        ->order_by('r.UpdateDate', 'desc')
                        ->get()->result())
                ->firstOrNull();
        echo json_encode($qry);
    }

    public function checkPrintTemp() {
        $_key = $_POST['key'];
        $qry = Linq::from($this->db
                        ->where('ReceiptHDKey', $_key)
                        ->from('TRNReceiptHDPrint')
                        ->get()->result())
                ->count();
        echo $qry;
    }

}
