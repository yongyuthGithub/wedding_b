<?php

defined('BASEPATH') OR exit('No direct script access allowed');
//require __DIR__ . '/../core/PCenter.php';
include_once APPPATH . 'core/POther.php';

use Fusonic\Linq\Linq;

class Record extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/record/record_main';
        $this->load->view('layout/nav', $data);
    }

    public function recordEdit() {
        $_company = '';
        $_address = '';
        $qryMenu = $this->db
                ->select('c.Customer,'
                        . 'Concat(c.Address," ",sd.SubDistrict," ",d.District, " ",p.Province," ",c.ZipCode )as FullAdress')
                ->from('SYSCompany c')
                ->join('MSTSubDistrict sd', 'c.SubDistrict=sd.RowKey', 'left')
                ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey', 'left')
                ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey', 'left')
                ->get();
        foreach ($qryMenu->result() as $row) {
            $_company = $row->Customer;
            $_address = $row->FullAdress;
        }

        $data['page'] = 'setting/home/main_page';
        $data['company'] = $_company;
        $data['address'] = $_address;
        $this->load->view('transaction/record/record_edit', $data);
    }

    public function incomeinEdit() {
        $this->load->view('transaction/record/recordincomein_edit');
    }

    public function fuleEdit() {
        $this->load->view('transaction/record/recordfule_edit');
    }

//    public function file_upload(){
//        $file = $_FILES['f'];        
//        $vReturn = (object) [];
//        $vReturn->name=$file['name'];
//        
//        move_uploaded_file($file["tmp_name"],$this->GET_FOLDER_UPLOAD().'/'.$file["name"]);
//                
//        echo json_encode($vReturn);
//    }

    public function findRecord() {
        $_data = json_decode($_POST['vdata']);
        $qryMenu = $this->db->select('w.RowKey as key,'
                        . 'w.DocID,'
                        . 'w.DocDate,'
                        . 'w.Product,'
                        . 'p.ProductName,'
                        . 'w.PriceTotal,'
                        . 'cf.CarNumber as CNumberF,'
                        . 'cs.CarNumber as CNumberS,'
                        . 'cufc.CusCode as CusCodeF,'
                        . 'cufc.Customer as CustomerF,'
                        . 'lB.LocationName as LocationNameB,'
                        . 'lE.LocationName as LocationNameE,'
                        . 'w.IsBill,'
                        . 'bh.DocID as BillID,'
//                        . 'w.EmpKey,'
//                        . 'w.SkillLabor'
//                        . 'cusc.Customer as CustomerS,'
//                        . 'cus.Branch as BranchS')
                )
                ->where('w.DocDate >=', $_data->SDate)
                ->where('w.DocDate <=', $_data->EDate)
                ->from('TRNWrokSheetHD w')
                ->join('MSTCar cf', 'w.CarFirstKey=cf.RowKey', 'left')
                ->join('MSTCar cs', 'w.CarSecondKey=cs.RowKey', 'left')
//                ->join('MSTCustomerBranch cuf', 'w.CutsomerForm=cuf.RowKey', 'left')
                ->join('MSTCustomer cufc', 'w.CutsomerKey=cufc.RowKey', 'left')
                ->join('MSTShippingLocations lB', 'w.ShippingBegin=lB.RowKey', 'left')
                ->join('MSTShippingLocations lE', 'w.ShippingEnd=lE.RowKey', 'left')
                ->join('TRNBillLD b', 'w.RowKey=b.WrokSheetHDKey', 'left')
                ->join('TRNBillHD bh', 'b.BillHDKey=bh.RowKey', 'left')
                ->join('MSTProductName p', 'w.ProductKey=p.RowKey', 'left')
                ->get();
        $show = Linq::from($qryMenu->result())
                ->select(function($x) {
                    return [
                        'key' => $x->key,
                        'DocID' => $x->DocID,
                        'DocDate' => $x->DocDate,
                        'Product' => $x->Product,
                        'ProductName' => $x->ProductName,
                        'PriceTotal' => $x->PriceTotal,
                        'CNumberF' => $x->CNumberF,
                        'CNumberS' => $x->CNumberS,
                        'CusCodeF' => $x->CusCodeF,
                        'CustomerF' => $x->CustomerF,
                        'LocationNameB' => $x->LocationNameB,
                        'LocationNameE' => $x->LocationNameE,
                        'BillID' => $x->BillID === NULL ? '' : $x->BillID,
                        '_Delete' => !$x->IsBill
                    ];
                })
                ->toArray();
        echo json_encode($show);
    }

    public function findRecordOne() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('w.RowKey,'
                                . 'w.DocID,'
                                . 'w.DocDate,'
//                                . 'w.DocDate,'
                                . 'w.Product,'
                                . 'w.ProductKey,'
                                . 'w.PriceTotal,'
                                . 'w.Smile,'
                                . 'w.Emile,'
                                . 'w.CarFirstKey,'
                                . 'w.CarSecondKey,'
//                                . 'bf.RowKey as CustBF,'
                                . 'cf.RowKey as CustF,'
                                . 'w.ShippingBegin,'
                                . 'w.ContactBegin,'
                                . 'w.ShippingEnd,'
                                . 'w.ContactEnd,'
                                . 'w.EmpKey,'
                                . 'w.SkillLabor,'
                                . 'w.Remark')
                        ->from('TRNWrokSheetHD w')
//                        ->join('MSTCustomerBranch bf', 'w.CutsomerForm=bf.RowKey', 'left')
                        ->join('MSTCustomer cf', 'w.CutsomerKey=cf.RowKey', 'left')
//                        ->join('MSTCustomerBranch bs', 'w.CustomerTo=bs.RowKey', 'left')
//                        ->join('MSTCustomer cs', 'bs.CompanyKey=cs.RowKey', 'left')
                        ->where('w.RowKey', $_key)
                        ->get()->row();
        $qryMenu->TRNIncome = $this->db->select('i.RowKey as key,'
                                . 'i.Detial,'
                                . 'i.IncomeType,'
                                . 'i.IncomeKey,'
                                . 'mi.IncomeName,'
                                . 'i.Amount')
                        ->from('TRNIncome i')
                        ->join('MSTIncomeName mi', 'i.IncomeKey=mi.RowKey', 'left')
                        ->where('i.WorkSheetHDKey', $qryMenu->RowKey)
                        ->get()->result();
        $qryMenu->TRNFule = $this->db->select('f.RowKey as key,'
                                . 'f.Item,'
                                . 'f.ItemPrice,'
                                . 'f.Price,'
                                . 'f.Smile,'
                                . 'f.Refer,'
                                . 'mf.Fuel as FuelDisplay,'
                                . 'pf.RowKey as FuleKey,'
                                . 'pb.PumpBranch as BranchDisplay,'
                                . 'pf.PumpBranchKey as BranchKey,'
                                . 'p.Pump as PumpDisplay,'
                                . 'pb.PumpKey')
                        ->from('TRNFule f')
                        ->join('MSTPumpFule pf', 'f.PumpFuleKey=pf.RowKey', 'left')
                        ->join('MSTFuel mf', 'pf.FuleKey=mf.RowKey', 'left')
                        ->join('MSTPumpBranch pb', 'pf.PumpBranchKey=pb.RowKey', 'left')
                        ->join('MSTPump p', 'pb.PumpKey=p.RowKey', 'left')
                        ->where('f.WorkSheetHDKey', $qryMenu->RowKey)
                        ->get()->result();
        echo json_encode($qryMenu);
    }

    public function findCarFirst() {
        $qryMenu = $this->db->select('c.RowKey,'
                        . 'c.CarNumber,'
                        . 'c.CarType,'
                        . 'p.Province')
                ->where('c.CarGroup', 1)
                ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey', 'left')
                ->from('MSTCar c')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findCarSecond() {
        $qryMenu = $this->db->select('c.RowKey,'
                        . 'c.CarNumber,'
                        . 'c.CarType,'
                        . 'p.Province')
                ->where('c.CarGroup', 2)
                ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey', 'left')
                ->from('MSTCar c')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findCustomer() {
        $qryMenu = $this->db->select('RowKey,'
                        . 'CusCode,'
                        . 'Customer')
                ->get('MSTCustomer');
        echo json_encode($qryMenu->result());
    }

    public function findCustomerBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'Branch')
                ->where('CompanyKey', $_key)
                ->order_by('IsDefault', 'desc')
                ->order_by('Branch', 'asc')
                ->get('MSTCustomerBranch');
        echo json_encode($qryMenu->result());
    }

    public function findFule() {
        $qryMenu = $this->db->select('RowKey,'
                        . 'Pump')
                ->order_by('Pump', 'asc')
                ->get('MSTPump');
        echo json_encode($qryMenu->result());
    }

    public function findFuleBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'PumpBranch')
                ->where('PumpKey', $_key)
                ->order_by('PumpBranch', 'asc')
                ->get('MSTPumpBranch');
        echo json_encode($qryMenu->result());
    }

    public function findFuleType() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('pf.RowKey,'
                        . 'f.Fuel')
                ->from('MSTPumpFule pf')
                ->join('MSTFuel f', 'pf.FuleKey=f.RowKey', 'left')
                ->where('pf.PumpBranchKey', $_key)
                ->order_by('pf.IsDefault', 'desc')
                ->order_by('f.Fuel', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findProduct() {
        $qryMenu = $this->db->select('p.RowKey,'
                        . 'p.ProductName')
                ->from('MSTProductName p')
                ->order_by('p.ProductName', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findEmp() {
        $qryMenu = $this->db->select('p.RowKey,'
                        . 'p.IDCard,'
                        . 'p.FName,'
                        . 'p.LName,'
                        . 't.Title')
                ->from('MSTEmployee p')
                ->join('MSTTitle t', 'p.TitleKey=t.RowKey', 'left')
                ->order_by('p.IDCard', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editRecord() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('DocID', $_data->DocID)->from('TRNWrokSheetHD')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'ไม่สามารถบันทึกใบงานเลขที่ ' . $_data->DocID . ' เนื่องจากมีการบันทึกใบระบบแล้ว';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->IsBill = 0;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNWrokSheetHD', $_data);

                foreach ($_data->TRNIncome as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->WorkSheetHDKey = $_data->RowKey;
                    $row->CreateBy = $this->USER_LOGIN()->RowKey;
                    $row->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $row->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('TRNIncome', $row);
                }

                foreach ($_data->TRNFule as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->WorkSheetHDKey = $_data->RowKey;
                    $row->CreateBy = $this->USER_LOGIN()->RowKey;
                    $row->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $row->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('TRNFule', $row);
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
        } else {
            $queryChk = $this->db->where('DocID', $_data->DocID)->where('RowKey !=', $_data->RowKey)->from('TRNWrokSheetHD')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'ไม่สามารถบันทึกใบงานเลขที่ ' . $_data->DocID . ' เนื่องจากมีการบันทึกใบระบบแล้ว';
            } else {
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNWrokSheetHD', $_data);

                $this->db->where('WorkSheetHDKey', $_data->RowKey)->delete('TRNIncome');
                foreach ($_data->TRNIncome as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->WorkSheetHDKey = $_data->RowKey;
                    $row->CreateBy = $this->USER_LOGIN()->RowKey;
                    $row->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $row->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('TRNIncome', $row);
                }

                $this->db->where('WorkSheetHDKey', $_data->RowKey)->delete('TRNFule');
                foreach ($_data->TRNFule as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->WorkSheetHDKey = $_data->RowKey;
                    $row->CreateBy = $this->USER_LOGIN()->RowKey;
                    $row->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $row->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('TRNFule', $row);
                }

                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function removeRecord() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNWrokSheetHD');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $vReturn->success = false;
            $vReturn->message = $this->db->_error_message();
        } else {
            $this->db->trans_commit();
            $vReturn->success = true;
        }
        echo json_encode($vReturn);
    }

}
