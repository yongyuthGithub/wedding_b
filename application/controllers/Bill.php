<?php

defined('BASEPATH') OR exit('No direct script access allowed');
include_once APPPATH . 'core/POther.php';

use Fusonic\Linq\Linq;

class Bill extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/bill/bill_main';
        $this->load->view('layout/nav', $data);
    }

    public function indexNew() {
        $data['page'] = 'transaction/bill/billnew_main';
        $this->load->view('layout/nav', $data);
    }

    public function newRecord() {
        $this->load->view('transaction/bill/billnewrecord_edit');
    }

    public function displayPrint() {
        $this->load->view('transaction/bill/billPrintView');
    }

    public function loadBillReport() {
        $this->load->view('transaction/bill/reports/Report.mrt');
    }

    public function findbill() {
        $_data = json_decode($_POST['vdata']);
        $qryMenu = $this->db->select('b.RowKey as key,'
                        . 'b.DocID,'
                        . 'b.DocDate,'
                        . 'c.CusCode,'
                        . 'c.Customer,'
                        . 'b.Vat,'
                        . 'b.VatStatus,'
                        . 'b.Discount,'
                        . 'b.Amounts,'
                        . 'b.Remain')
                ->where('b.DocDate >=', $_data->SDate)
                ->where('b.DocDate <=', $_data->EDate)
                ->from('TRNBillHD b')
                ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey', 'left')
                ->join('MSTCustomer c', 'cb.CompanyKey=c.RowKey', 'left')
                ->get();
        $qShow = Linq::from($qryMenu->result())
                ->select(function($x) {
                    $pTotal = Linq::from($this->db->select('h.PriceTotal,b.Discount,bh.VatStatus')
                                    ->where('b.BillHDKey', $x->key)
                                    ->from('TRNBillLD b')
                                    ->join('TRNBillHD bh', 'b.BillHDKey=bh.RowKey')
                                    ->join('TRNWrokSheetHD h', 'b.WrokSheetHDKey=h.RowKey')
                                    ->get()->result())
                            ->select(function($k) {
                                if ((int) $k->VatStatus === 0 || (int) $k->VatStatus === 2) {
                                    return $k->PriceTotal - $k->Discount;
                                } else if ((int) $k->VatStatus === 1) {
                                    $_t = $k->PriceTotal - $k->Discount;
                                    return $_t - (($_t * 7) / 100);
                                }
                            })->sum();
                    $nTotal = $pTotal + $x->Vat;
//                    if ((int) $x->VatStatus === 1) {
//                        $nTotal = $pTotal - $x->Discount;
//                    } else if ((int) $x->VatStatus === 2) {
//                        $nTotal = ($pTotal - $x->Discount) + $x->Vat;
//                    }

                    $nIVID = '';
                    $nIV = Linq::from($this->db->select('rh.DocID, rh.DocDate')
                                    ->where('rb.BillKey', $x->key)
                                    ->from('TRNReceiptBill rb')
                                    ->join('TRNReceiptHD rh', 'rb.ReceiptHDKey=rh.RowKey')
                                    ->get()->result()
                            )->toArray();
                    foreach ($nIV as $_row) {
                        $nIVID=$_row->DocID;
                    }

                    return [
                        'key' => $x->key,
                        'DocID' => $x->DocID,
                        'DocDate' => $x->DocDate,
                        'CusCode' => $x->CusCode,
                        'Customer' => $x->Customer,
                        'TotalPrice' => $pTotal,
                        'Vat' => $x->Vat,
                        'Discount' => $x->Discount,
                        'NetPrice' => $nTotal,
                        'RCDoc' => $nIVID,
                        '_Edit' => floatval($x->Amounts) === floatval($x->Remain) ? true : false
                    ];
                })
                ->toArray();
        echo json_encode($qShow);
    }

    public function findbillOne() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('b.DocDate,'
                                . 'b.CustomerBranchKey,'
                                . 'cb.CompanyKey,'
                                . 'b.DocDate,'
                                . 'b.Vat,'
                                . 'b.VatStatus,'
                                . 'b.Discount,'
                                . 'b.DueDate,'
                                . 'b.PayType')
                        ->where('b.RowKey', $_key)
                        ->from('TRNBillHD b')
                        ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey', 'left')
                        ->get()->row();
        $qryMenu->TRNBillLD = Linq::from($this->db->select('hd.RowKey as key,'
                                        . 'hd.DocID,'
                                        . 'hd.DocDate,'
                                        . 'p.ProductName as Product,'
                                        . 'hd.PriceTotal,'
                                        . 'd.Discount')
                                ->where('d.BillHDKey', $_key)
                                ->from('TRNBillLD d')
                                ->join('TRNWrokSheetHD hd', 'd.WrokSheetHDKey=hd.RowKey', 'left')
                                ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                                ->get()->result())
                        ->select(function($x) {
                            return [
                                'key' => $x->key,
                                'DocID' => $x->DocID,
                                'DocDate' => $x->DocDate,
                                'Product' => $x->Product,
                                'PriceTotal' => $x->PriceTotal,
                                'Discount' => $x->Discount,
                                'NetPrice' => $x->PriceTotal - $x->Discount
                            ];
                        })->toArray();

        echo json_encode($qryMenu);
    }

    public function findCustomerIsRecord() {
        $billkey = $_POST['key'];
        $cuskey = PCenter::GUID_EMPTY();
        foreach ($this->db->select('c.CompanyKey')
                ->where('b.RowKey', $billkey)
                ->from('TRNBillHD b')
                ->join('MSTCustomerBranch c', 'b.CustomerBranchKey=c.RowKey', 'left')
                ->get()->result() as $row) {
            $cuskey = $row->CompanyKey;
        }

        $qryMenu = $this->db->select('CutsomerKey')
                ->where('IsBill', false)
                ->or_where('CutsomerKey', $cuskey)
                ->from('TRNWrokSheetHD')
                ->get();

        if (Linq::from($qryMenu->result())->count() > 0) {
            $qryCust = $this->db->select('RowKey,'
                            . 'CusCode,'
                            . 'Customer')
                    ->where_in('RowKey', Linq::from($qryMenu->result())->select(function($x) {
                                return $x->CutsomerKey;
                            })->toArray())
                    ->from('MSTCustomer')
                    ->order_by('CusCode', 'asc')
                    ->get();
            echo json_encode($qryCust->result());
        } else {
            echo json_encode(array());
        }
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

    public function findRecordNotIsBill() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('hd.RowKey as key,'
                        . 'hd.DocID,'
                        . 'hd.DocDate,'
                        . 'p.ProductName as Product,'
                        . 'hd.PriceTotal,'
                        . '0 as Discount,'
                        . 'hd.PriceTotal as NetPrice')
                ->where('hd.CutsomerKey', $_key)
                ->where('hd.IsBill', false)
                ->from('TRNWrokSheetHD hd')
                ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                ->get();

        if (Linq::from($qryMenu->result())->count() > 0) {
            echo json_encode($qryMenu->result());
        } else {
            echo json_encode(array());
        }
    }

    public function findRecordByCustomer() {
        $billkey = $_POST['billkey'];
        $_key = $_POST['key'];
        $_data = json_decode($_POST['vdata']);
        $qryMenu = $this->db->select('hd.RowKey as key,'
                                . 'hd.DocID,'
                                . 'hd.DocDate,'
                                . 'p.ProductName as Product,'
                                . 'hd.PriceTotal,')
                        ->where('hd.CutsomerKey', $_key)
                        ->where('hd.IsBill', false)
                        ->where_not_in('hd.RowKey', $_data)
                        ->from('TRNWrokSheetHD hd')
                        ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                        ->get()->result();
        $qryThis = $this->db->select('hd.RowKey as key,'
                                . 'hd.DocID,'
                                . 'hd.DocDate,'
                                . 'p.ProductName as Product,'
                                . 'hd.PriceTotal,')
                        ->where_not_in('hd.RowKey', $_data)
                        ->where('bl.BillHDKey', $billkey)
                        ->from('TRNWrokSheetHD hd')
                        ->join('TRNBillLD bl', 'hd.RowKey=bl.WrokSheetHDKey')
                        ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                        ->get()->result();

        echo json_encode(array_merge($qryMenu, $qryThis));
    }

    public function findRecordByKey() {
        $_data = json_decode($_POST['data']);
        $qryMenu = $this->db->select('hd.RowKey as key,'
                        . 'hd.DocID,'
                        . 'hd.DocDate,'
                        . 'p.ProductName as Product,'
                        . 'hd.PriceTotal,'
                        . '0 as Discount,'
                        . 'hd.PriceTotal as NetPrice')
                ->where_in('hd.RowKey', $_data)
                ->from('TRNWrokSheetHD hd')
                ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editBill() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $_data->RowKey = PCenter::GUID();
            $_data->DocID = $this->createDocID(PCenter::genBill());
            $_data->CreateBy = $this->USER_LOGIN()->RowKey;
            $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('TRNBillHD', $_data);

            foreach ($_data->TRNBillLD as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->BillHDKey = $_data->RowKey;
                $this->db->insert('TRNBillLD', $_row);

                $this->db->set('IsBill', true);
                $this->db->where('RowKey', $_row->WrokSheetHDKey);
                $this->db->update('TRNWrokSheetHD');
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
        } else {
            $_data->UpdateBy = PCenter::GUID_EMPTY();
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', $_data->RowKey)->update('TRNBillHD', $_data);

            $keyUp = Linq::from($this->db->select('WrokSheetHDKey')
                            ->where('BillHDKey', $_data->RowKey)
                            ->from('TRNBillLD')
                            ->get()->result())
                    ->select(function($x) {
                        return $x->WrokSheetHDKey;
                    })
                    ->toArray();
            $this->db->set('IsBill', false);
            $this->db->where_in('RowKey', $keyUp);
            $this->db->update('TRNWrokSheetHD');

            $this->db->where('BillHDKey', $_data->RowKey);
            $this->db->delete('TRNBillLD');

            foreach ($_data->TRNBillLD as $_row) {
                $_row->RowKey = PCenter::GUID();
                $_row->BillHDKey = $_data->RowKey;
                $this->db->insert('TRNBillLD', $_row);

                $this->db->set('IsBill', true);
                $this->db->where('RowKey', $_row->WrokSheetHDKey);
                $this->db->update('TRNWrokSheetHD');
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

    public function findBillWithReport() {
        $_key = $_POST['key'];
        $qry = $this->db->select('b.DocDate,'
                                . 'b.DocID,'
                                . 'b.Vat,'
                                . 'b.VatStatus,'
                                . 'b.Discount,'
                                . 'b.PrintCount,'
                                . 'b.CustomerBranchKey,'
                                . 'b.DueDate,'
                                . 'b.PayType')
                        ->from('TRNBillHD b')
                        ->where('b.RowKey', $_key)
                        ->get()->row();
        $qry->Company = $this->MyCompayDetail();
        $qry->Customer = $this->GetCustomerByBranch($qry->CustomerBranchKey);
        $qry->Detail = $this->db->select('p.ProductName as Product,'
                                . 'hd.DocID,'
                                . 'hd.DocDate,'
                                . 'hd.PriceTotal,'
                                . 'd.Discount,'
                                . 'ls.LocationName as ShippingBegin,'
                                . 'le.LocationName as ShippingEnd,'
                                . 'c.CarNumber,'
                                . 'pv.Province,'
                                . 'hd.Remark')
                        ->from('TRNBillLD d')
                        ->where('d.BillHDKey', $_key)
                        ->join('TRNWrokSheetHD hd', 'd.WrokSheetHDKey=hd.RowKey')
                        ->join('MSTProductName p', 'hd.ProductKey=p.RowKey', 'left')
                        ->join('MSTShippingLocations ls', 'hd.ShippingBegin=ls.RowKey', 'left')
                        ->join('MSTShippingLocations le', 'hd.ShippingEnd=le.RowKey', 'left')
                        ->join('MSTCar c', 'hd.CarFirstKey=c.RowKey', 'left')
                        ->join('MSTProvince pv', 'c.ProvinceKey=pv.RowKey', 'left')
                        ->get()->result();
        $qry->Remark = $this->db->select('cb.AccountCode,'
                . 'cb.AccountName,'
                . 'b.Bank,'
                . 'bb.Branch')
                ->from('SYSCompanyBank cb')
                ->where('cb.SYSCompanyKey', PCenter::GUID_EMPTY())
                ->where('cb.IsBill',true)
                ->join('MSTBankBranch bb','cb.BankBranchKey=bb.RowKey')
                ->join('MSTBank b','bb.BankKey=b.RowKey')
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
        $this->db->insert('TRNBillHDPrint', $_data);
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
                        ->where('r.BillHDKey', $_key)
                        ->from('TRNBillHDPrint r')
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
                        ->where('BillHDKey', $_key)
                        ->from('TRNBillHDPrint')
                        ->get()->result())
                ->count();
        echo $qry;
    }

}
