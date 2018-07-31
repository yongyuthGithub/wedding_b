<?php

//require_once __DIR__ . '\..\models\PCenter.php';
require __DIR__ . '/../core/PCenter.php';
//require __DIR__ . '/../core/Phinq/PhinqBase.php';
//require __DIR__ . '/../core/Phinq/Phinq.php';


defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends PCenter {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     * 	- or -
     * 		http://example.com/index.php/welcome/index
     * 	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }

//    public function index() {
//        $data['page'] = 'master/index';
//        $data['txtemail'] = 'yongyuth@gmail.com';
//        $data['ttt'] = $this->testmy('HTTP_HOST : '.$_SERVER['HTTP_HOST'] . '<br>REQUEST_URI : ' . $_SERVER['REQUEST_URI'].'<br>REMOTE_ADDR : '.$_SERVER['REMOTE_ADDR'].'<br>SCRIPT_FILENAME : '.$_SERVER['SCRIPT_FILENAME']);
//        $this->load->view('layout/nav', $data);
//    }

    public function showlayoutB4() {
        $this->load->view('layout/_layout_B4');
    }

    public function index() {
        $data['page'] = 'setting/home/login';
        $data['seturl'] = !isset($_POST['loginUrl']) ? 0 : $_POST['loginUrl'];
        $this->load->view('layout/nav', $data);
    }

    public function main() {
//        $ddd = new Phinq/Phinq;
//        
//        $payments = array(10.5, 11.94, 9.3, 0, 17.1, 10.5, 0);
//        $paymentQuery = $ddd::create($payments)
//                ->where(function($payment) {
//                    return $payment !== 0;
//                }) //non-zero
//                ->orderBy(function($payment) {
//            return $payment;
//        }); //sorted ascending
//        $this->load->library('Phinq/PhinqBase');
//        $this->load->library('Phinq/Phinq');
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
        $this->load->view('layout/nav', $data);
    }

    public function popupLogin() {
        $this->load->view('setting/home/login_page');
    }

    public function popupForget() {
        $this->load->view('setting/home/forget_page');
    }

    public function profile() {
        $this->load->view('setting/home/profile_page');
    }

    public function chkLogin() {
        $_user = $_POST['user'];
        $_pass = $_POST['pass'];
        $_md5Pass = $this->GEN_PASSWORD_MD5($_user, $_pass);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $queryChk = $this->db->where('Password', $_md5Pass)->from('USRAccount')->count_all_results();
        if ($queryChk === 0) {
            $vReturn->success = false;
            $vReturn->message = 'No user in the system..';
        } else {
            $data = $this->db->where('Password', $_md5Pass)->from('USRAccount')->get()->row();
            $arDelete = Array($data->RowKey);
            $this->db->where_in('AccountKey', $arDelete)->delete('TMPLogin');

            $obj = (object) [];
            $obj->RowKey = PCenter::GUID();
            $obj->AccountKey = $data->RowKey;
            $obj->Token = md5(PCenter::GUID());
            $obj->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('TMPLogin', $obj);

            setcookie('samnartrun_login', $data->RowKey, time() + (86400 * 7), '/');
            setcookie('samnartrun_token', $obj->Token, time() + (86400 * 7), '/');
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        }

        echo json_encode($vReturn);
    }

    public function chkLoginCookie() {
        $vReturn = (object) [];
        if (!isset($_COOKIE['samnartrun_login'])) {
            $vReturn->success = false;
        } else {
            $login = $_COOKIE['samnartrun_login'];
            $token = $_COOKIE['samnartrun_token'];

            $chkAcc = $this->db->where('RowKey', $login)->from('USRAccount')->count_all_results();
            $chkTmp = $this->db->where('AccountKey', $login)->where('Token', $token)->from('TMPLogin')->count_all_results();

            if ($chkAcc === 0 || $chkTmp === 0) {
                setcookie('samnartrun_login', '', time() - 86400);
                setcookie('samnartrun_token', '', time() - 86400);
                $vReturn->success = false;
            } else {
                $vReturn->success = true;
            }
        }
        echo json_encode($vReturn);
    }

    public function findProfile() {
        $query = $this->db
                ->where('USRAccount.RowKey', $this->USER_LOGIN()->RowKey)
                ->from('USRAccount')
                ->join('MSTTitle', 'MSTTitle.RowKey = USRAccount.TitleKey', 'left')
                ->select('USRAccount.RowKey AS key,'
                        . ' USRAccount.User,'
                        . ' USRAccount.TitleKey,'
                        . ' CONCAT(MSTTitle.Title, USRAccount.FName," ",USRAccount.LName) AS Name,'
                        . ' USRAccount.FName,'
                        . ' USRAccount.LName,'
                        . ' USRAccount.RowStatus')
                ->get();
        $queryP = $this->db
                ->where('USRGroupAccount.AccountKey', $this->USER_LOGIN()->RowKey)
                ->from('USRGroupAccount')
                ->join('USRGroup', 'USRGroupAccount.GroupKey=USRGroup.RowKey', 'inner')
                ->select('USRGroup.UserGroup')
                ->get();
        $vReturn = (object) [];
        $vReturn->User = $query->row();
        $vReturn->Pemission = $queryP->result_array();
        echo json_encode($vReturn);
    }

    public function findIncomeMonth() {
        $_data = json_decode($_POST['data']);

        foreach ($_data as $_row) {
            $inCome = $this->db->select('cf.RowKey as key,'
                            . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                            . 'w.DocDate,'
                            . 'mi.IncomeName as Detial,'
                            . 'cf.IncomeType,'
                            . 'Amount,'
                            . '0 as IsVat'
                    )
                    ->where('w.DocDate >=', $_row->sdate)
                    ->where('w.DocDate <=', $_row->edate)
                    ->from('TRNWrokSheetHD w')
                    ->join('TRNIncome cf', 'cf.WorkSheetHDKey=w.RowKey')
                    ->join('MSTIncomeName mi', 'cf.IncomeKey=mi.RowKey')
                    ->get();

            $inComeOther = $this->db->select('RowKey, DocDate, Detial,IncomeType,Amount,IsVat ')
                            ->where('DocDate >=', $_row->sdate)
                            ->where('DocDate <=', $_row->edate)
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
                    'Detial' => ($row->Detial),
                    'IncomeType' => intval($row->IncomeType) === 1 ? 1 : 0,
                    'Amount' => ($row->Amount),
                    'IsVat' => $row->IsVat
                );
                array_push($_array, $_ar);
            }

//            $workSheep = $this->db->select('w.RowKey as key,'
//                                    . 'concat("ใบงาน (",w.DocID,")") as DocID,'
//                                    . 'w.DocDate,'
//                                    . 'concat("(ค่าบริการขนส่ง) ",p.ProductName)as Detial,'
//                                    . '1 as IncomeType,'
//                                    . 'w.PriceTotal as Amount,'
//                                    . '0 as IsVat')
//                            ->where('w.DocDate >=', $_row->sdate)
//                            ->where('w.DocDate <=', $_row->edate)
//                            ->from('TRNWrokSheetHD w')
//                            ->join('MSTProductName p', 'w.ProductKey=p.RowKey')
//                            ->get()->result();

            $skillLabor = $this->db->select('w.RowKey as key,'
                                    . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                                    . 'w.DocDate,'
                                    . 'concat("(ค่าฝีมือ) ",trim(t.Title),p.FName," ",p.LName)as Detial,'
                                    . '0 as IncomeType,'
                                    . 'w.SkillLabor as Amount,'
                                    . '0 as IsVat')
                            ->where('w.DocDate >=', $_row->sdate)
                            ->where('w.DocDate <=', $_row->edate)
                            ->where('w.SkillLabor>', 0)
                            ->from('TRNWrokSheetHD w')
                            ->join('MSTEmployee p', 'w.EmpKey=p.RowKey')
                            ->join('MSTTitle t', 'p.TitleKey=t.RowKey')
                            ->get()->result();

            $fule = $this->db->select('w.RowKey as key,'
                                    . 'concat("ใบงาน (",w.DocID,")") as DocID,'
                                    . 'w.DocDate,'
                                    . 'concat("(ค่าน้ำมัน) ",mf.Fuel)as Detial,'
                                    . '0 as IncomeType,'
                                    . 'f.Price as Amount,'
                                    . '1 as IsVat')
                            ->where('w.DocDate >=', $_row->sdate)
                            ->where('w.DocDate <=', $_row->edate)
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
                            ->where('m.ListDate >=', $_row->sdate)
                            ->where('m.ListDate <=', $_row->edate)
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
                            ->where('i.SDate >=', $_row->sdate)
                            ->where('i.SDate <=', $_row->edate)
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
                            ->where('i.SDate >=', $_row->sdate)
                            ->where('i.SDate <=', $_row->edate)
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
                            ->where('i.SDate >=', $_row->sdate)
                            ->where('i.SDate <=', $_row->edate)
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
                            ->where('h.DocDate >=', $_row->sdate)
                            ->where('h.DocDate <=', $_row->edate)
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
                            ->where('h.DocDate >=', $_row->sdate)
                            ->where('h.DocDate <=', $_row->edate)
                            ->from('TRNReceiptBill i')
                            ->join('TRNReceiptHD h', 'i.ReceiptHDKey=h.RowKey')
                            ->join('TRNBillHD b', 'i.BillKey=b.RowKey')
                            ->get()->result();
            $_row->Items = array_merge($_array, $workSheep, $skillLabor, $fule, $maintenance, $insuranceCar, $vatcar, $insuranceEmp, $receipother);
        }

        $_return = (object) [];
        $_return->Income = $_data;
        $_return->Customer = array();
        foreach ($this->db->select('RowKey,Customer,'
                        . 'CusCode')
                ->from('MSTCustomer')
                ->get()->result() as $value) {
            $_nr = array([
                    'CusCode' => $value->CusCode,
                    'Customer' => $value->Customer,
                    'Total' => $this->db->select_sum('PriceTotal')
                            ->from('TRNWrokSheetHD')
                            ->where('CutsomerKey', $value->RowKey)
                            ->get()->row()->PriceTotal
            ]);

            $_return->Customer = array_merge($_return->Customer, $_nr);
        };
        echo json_encode($_return);
    }

}
