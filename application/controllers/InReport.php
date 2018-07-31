<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

use Fusonic\Linq\Linq;

class InReport extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/InReport/InReport_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {

        $this->load->view('transaction/InReport/InReport_edit');
    }

    public function displayPrint() {
        $this->load->view('transaction/InReport/InReportPrintView');
    }

    public function loadInReportReport() {
        $this->load->view('transaction/InReport/reports/RTotalPayout.mrt');
    }

    public function findInReport() {
        $_data = json_decode($_POST['vdata']);

        $inCome = $this->db->select('cf.RowKey as key,'
                                . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                                . 'w.DocDate,'
                                . 'mi.IncomeName as Detial,'
                                . 'cf.IncomeType,'
                                . 'Amount,'
                                . '0 as IsVat'
                        )
                        ->where('w.DocDate >=', $_data->SDate)
                        ->where('w.DocDate <=', $_data->EDate)
                        ->from('TRNWrokSheetHD w')
                        ->join('TRNIncome cf', 'cf.WorkSheetHDKey=w.RowKey')
                        ->join('MSTIncomeName mi', 'cf.IncomeKey=mi.RowKey')
                        ->get();

        $inComeOther = $this->db->select('RowKey, DocDate, Detial,IncomeType,Amount,IsVat,DocID ')
                        ->where('DocDate >=', $_data->SDate)
                        ->where('DocDate <=', $_data->EDate)
                        ->from('TRNIncomeOther')->get();
        $_array = array();
        foreach ($inCome->result() as $row) {
                $_ar = array(
                    'key' => $row->key,
                    'DocID' => $row->DocID,
                    'DocDate' => $row->DocDate,
                    'Detial' => ($row->Detial),
                    'IncomeType' => intval($row->IncomeType) === 1 ? 1 : 0,
                    'Amount' => ($row->Amount),
                    'IsVat' => $row->IsVat
                );
                array_push($_array, $_ar);
            }
        foreach ($inComeOther->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'DocID' => 'บันทึกรายรับ-รายจ่าย อื่นๆ',
                'DocDate' => $row->DocDate,
                'Detial' => 'บิลเลขที่ '.$row->DocID . ' => ' . $row->Detial,
                'IncomeType' => intval($row->IncomeType) === 1 ? 1 : 0,
                'Amount' => ($row->Amount),
                'IsVat' => $row->IsVat
            );
            array_push($_array, $_ar);
        }

//        $workSheep = $this->db->select('w.RowKey as key,'
//                                . 'concat("ใบงาน (",w.DocID,")") as DocID,'
//                                . 'w.DocDate,'
//                                . 'concat("(ค่าบริการขนส่ง) ",p.ProductName)as Detial,'
//                                . '1 as IncomeType,'
//                                . 'w.PriceTotal as Amount,'
//                                . '0 as IsVat')
//                        ->where('w.DocDate >=', $_data->SDate)
//                        ->where('w.DocDate <=', $_data->EDate)
//                        ->from('TRNWrokSheetHD w')
//                        ->join('MSTProductName p', 'w.ProductKey=p.RowKey')
//                        ->get()->result();

        $skillLabor = $this->db->select('w.RowKey as key,'
                                . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                                . 'w.DocDate,'
                                . 'concat("(ค่าฝีมือ) ",trim(t.Title),p.FName," ",p.LName)as Detial,'
                                . '0 as IncomeType,'
                                . 'w.SkillLabor as Amount,'
                                . '0 as IsVat')
                        ->where('w.DocDate >=', $_data->SDate)
                        ->where('w.DocDate <=', $_data->EDate)
                        ->where('w.SkillLabor>', 0)
                        ->from('TRNWrokSheetHD w')
                        ->join('MSTEmployee p', 'w.EmpKey=p.RowKey')
                        ->join('MSTTitle t', 'p.TitleKey=t.RowKey')
                        ->get()->result();

        $fule = $this->db->select('w.RowKey as key,'
                                . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                                . 'w.DocDate,'
                                . 'concat("บิลเลขที่ ",f.Refer," => (ค่าน้ำมัน) ",mf.Fuel)as Detial,'
                                . '0 as IncomeType,'
                                . 'f.Price as Amount,'
                                . '1 as IsVat')
                        ->where('w.DocDate >=', $_data->SDate)
                        ->where('w.DocDate <=', $_data->EDate)
                        ->from('TRNWrokSheetHD w')
                        ->join('TRNFule f', 'w.RowKey=f.WorkSheetHDKey')
                        ->join('MSTPumpFule ff', 'f.PumpFuleKey=ff.RowKey')
                        ->join('MSTFuel mf', 'ff.FuleKey=mf.RowKey')
                        ->get()->result();

        $maintenance = $this->db->select('m.RowKey as key,'
                                . '"รายการซ่อมบำรุง" as DocID,'
                                . 'm.ListDate as DocDate,'
                                . 'concat("(ทะเบียนรถ ",c.CarNumber,") ",m.Detail)as Detial,'
                                . '0 as IncomeType,'
                                . 'm.CostValue as Amount,'
                                . '0 as IsVat')
                        ->where('m.ListDate >=', $_data->SDate)
                        ->where('m.ListDate <=', $_data->EDate)
                        ->from('TRNMaintenance m')
                        ->join('MSTCar c', 'm.CarKey=c.RowKey')
                        ->get()->result();

        $insuranceCar = $this->db->select('i.RowKey as key,'
                                . '"รายการต่อประกันรถขนส่ง" as DocID,'
                                . 'i.SDate as DocDate,'
                                . 'concat("(ทะเบียนรถ ",c.CarNumber,") ",mi.TypeName)as Detial,'
                                . '0 as IncomeType,'
                                . 'i.Cash as Amount,'
                                . '0 as IsVat')
                        ->where('i.SDate >=', $_data->SDate)
                        ->where('i.SDate <=', $_data->EDate)
                        ->from('TRNCarInsurance i')
                        ->join('MSTInsuranceType mi', 'i.InsuranceTypeKey=mi.RowKey')
                        ->join('MSTCar c', 'i.CarKey=c.RowKey')
                        ->get()->result();
        $vatcar = $this->db->select('i.RowKey as key,'
                                . '"รายการต่อค่าอื่นๆ ของรถขนส่ง" as DocID,'
                                . 'i.SDate as DocDate,'
                                . 'concat("(ทะเบียนรถ ",c.CarNumber,") ",(case when (i.ActType=1) then "ต่อ พรบ." else "ต่อ ภาษี" end))as Detial,'
                                . '0 as IncomeType,'
                                . 'i.Cash as Amount,'
                                . '0 as IsVat')
                        ->where('i.SDate >=', $_data->SDate)
                        ->where('i.SDate <=', $_data->EDate)
                        ->from('TRNCarAct i')
                        ->join('MSTCar c', 'i.CarKey=c.RowKey')
                        ->get()->result();
        $insuranceEmp = $this->db->select('i.RowKey as key,'
                                . '"รายการต่อประกันพนักงาน" as DocID,'
                                . 'i.SDate as DocDate,'
                                . 'concat("(",t.Title,emp.FName," ",emp.LName,") ",mi.TypeName)as Detial,'
                                . '0 as IncomeType,'
                                . 'i.Cash as Amount,'
                                . '0 as IsVat')
                        ->where('i.SDate >=', $_data->SDate)
                        ->where('i.SDate <=', $_data->EDate)
                        ->from('TRNEmployeeInsurance i')
                        ->join('MSTInsuranceType mi', 'i.InsuranceTypeKey=mi.RowKey')
                        ->join('MSTEmployee emp', 'i.EmpKey=emp.RowKey')
                        ->join('MSTTitle t', 'emp.TitleKey=t.RowKey')
                        ->get()->result();
        $receipother = $this->db->select('i.RowKey as key,'
                                . 'concat("รายการใบเสร็จ (",h.DocID,")") as DocID,'
                                . 'h.DocDate,'
                                . 'i.Detail as Detial,'
                                . '1 as IncomeType,'
                                . 'i.Amounts as Amount,'
                                . '0 as IsVat')
                        ->where('h.DocDate >=', $_data->SDate)
                        ->where('h.DocDate <=', $_data->EDate)
                        ->from('TRNReceiptOther i')
                        ->join('TRNReceiptHD h', 'i.ReceiptHDKey=h.RowKey')
                        ->get()->result();

        $workSheep = $this->db->select('i.RowKey as key,'
                                . 'concat("ค่าบริการขนส่ง (",h.DocID,")") as DocID,'
                                . 'h.DocDate,'
                                . 'concat("บิลเลขที่ ",b.DocID) as Detial,'
                                . '1 as IncomeType,'
                                . 'i.Amounts as Amount,'
                                . '0 as IsVat')
                        ->where('h.DocDate >=', $_data->SDate)
                        ->where('h.DocDate <=', $_data->EDate)
                        ->from('TRNReceiptBill i')
                        ->join('TRNReceiptHD h', 'i.ReceiptHDKey=h.RowKey')
                        ->join('TRNBillHD b', 'i.BillKey=b.RowKey')
                        ->get()->result();
        $_arrayT = array_merge($_array, $workSheep, $skillLabor, $fule, $maintenance, $insuranceCar, $vatcar, $insuranceEmp, $receipother);
//        if ($_data->TaxType === 1) {
//            json_encode(Linq::from(json_decode(json_encode($_arrayT)))->where(function($x) {
//                        return $x->IsVat === '0';
//                    }));
//        } else if ($_data->TaxType === 2) {
//            json_encode(Linq::from(json_decode(json_encode($_arrayT)))->where(function($x) {
//                        return $x->IsVat === '1';
//                    }));
//        } else {
        echo json_encode($_arrayT);
//        }
    }

    public function editIncome() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Detial', $_data->Detial)->from('TRNIncomeOther')->count_all_results();
            if ($queryChk = 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNIncomeOther', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        } else {
            $queryChk = $this->db->where('Detial', $_data->Detial)->where('RowKey !=', $_data->RowKey)->from('TRNIncomeOther')->count_all_results();
            if ($queryChk = 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->DocDate = $_data->DocDate;
                $update->Detial = $_data->Detial;
                $update->IncomeType = $_data->IncomeType;
                $update->Amount = $_data->Amount;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNIncomeOther', $update);
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

    public function removeAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNIncomeOther');

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

    //**** Fuel
    public function branchMain() {
        $data['page'] = 'master/Fule/branch_main';
        $this->load->view('layout/nav', $data);
    }

    public function findReceiptWithReport() {
        echo json_encode($this->MyCompayDetail());
    }

}
