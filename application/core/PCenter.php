<?php

include_once APPPATH . 'libraries/Fusonic/Linq/Linq.php';
include_once APPPATH . 'libraries/Fusonic/Linq/GroupedLinq.php';
foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Helper/*.php') as $filename2) {
    include_once $filename2;
}
foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Iterator/*.php') as $filename) {
    include_once $filename;
}

use Fusonic\Linq\Linq;

class PCenter extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url');
        $this->load->helper('asset');
        $this->load->helper('form');
//        $this->load->library('Fusonic/Linq/Linq.php','Fusonic/Linq/Helper/LinqHelper.php');
//$this->load-model('dbconnect');
    }

    public static function GUID() {
        if (function_exists('com_create_guid') === true) {
            return trim(com_create_guid(), '{}');
        }

        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

    public static function GUID_EMPTY() {
        return trim('{00000000-0000-0000-0000-000000000000}', '{}');
    }

    public static function DATATIME_DB($datatime, $user_time = true) {
        return $user_time ? $datatime->format('Y-m-d H:i:s') : $datatime->format('Y-m-d');
    }

    public static function DocIDKey() {
        $_v = array(
            array('key' => '611472A0-4260-40BA-A4A0-EDB697402DCC', 'id' => 1),
            array('key' => '6AE655BC-5C33-450F-A1BF-856C405EDF25', 'id' => 2)
        );
        return $_v;
    }

    public static function genBill() {
        return Linq::from(PCenter::DocIDKey())->where(function($x) {
                    return $x['id'] === 2;
                })->first()['key'];
    }

    public static function genInvoice() {
        return Linq::from(PCenter::DocIDKey())->where(function($x) {
                    return $x['id'] === 1;
                })->first()['key'];
    }

    protected function createDocID($divkey) {
        $_date = new DateTime();
        $qurrythis = $this->db->where('RowKey', $divkey)
                        ->from('SYSDocPattern')->get()->row();
        $_Pattern = $qurrythis->Pattern;

        $queryChk = $this->db->where('PatternKey', $divkey)
                        ->where('PYear', (int) $_date->format('Y'))
                        ->where('PMonth', (int) $_date->format('m'))
                        ->from('SYSDocSeq')->get();
        $newSeq = 1;
        $newMonth = (int) $_date->format('m');
        $newYear = (int) $_date->format('Y');
        if (Linq::from($queryChk->result())->count() > 0) {
            $newSeq = $queryChk->row()->PSeq + 1;
            $newMonth = $queryChk->row()->PMonth;
            $newYear = $queryChk->row()->PYear;

            $this->db->set('PSeq', $newSeq)
                    ->set('UpdateBy', $this->USER_LOGIN()->RowKey)
                    ->set('UpdateDate', PCenter::DATATIME_DB(new DateTime()))
                    ->where('RowKey', $queryChk->row()->RowKey)
                    ->update('SYSDocSeq');
        } else {
            $_dataSeq = (object) [];
            $_dataSeq->RowKey = PCenter::GUID();
            $_dataSeq->PatternKey = $qurrythis->RowKey;
            $_dataSeq->PYear = $newYear;
            $_dataSeq->PMonth = $newMonth;
            $_dataSeq->PSeq = $newSeq;
            $_dataSeq->RowStatus = true;
            $_dataSeq->CreateBy = $this->USER_LOGIN()->RowKey;
            $_dataSeq->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_dataSeq->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_dataSeq->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('SYSDocSeq', $_dataSeq);
        }
        $this->db->set('UpdateBy', $this->USER_LOGIN()->RowKey)
                ->set('UpdateDate', PCenter::DATATIME_DB(new DateTime()))
                ->where('RowKey', $qurrythis->RowKey)
                ->update('SYSDocPattern');

        $seqF = sprintf('%0' . $qurrythis->Point . 'd', $newSeq);
        $_Pattern = str_replace(':RR', $seqF, $_Pattern);
        $newMonth = sprintf('%02d', $newMonth);
        $_Pattern = str_replace(':MM', $newMonth, $_Pattern);
        if (strpos($_Pattern, ':TYY')) {
            $newYear += 543;
            $_Pattern = str_replace(':TYY', substr($newYear, -2), $_Pattern);
        } else {
            $_Pattern = str_replace(':YY', substr($newYear, -2), $_Pattern);
        }


        return $_Pattern;
    }

    protected function GEN_PASSWORD_MD5($user, $pass) {
        return md5(strtolower($user) . $pass);
    }

    protected function USER_LOGIN() {
        if (isset($_COOKIE['samnartrun_login'])) {
            $_Data = (object) [];
            $queryCout = $this->db->where('USRAccount.RowKey', $_COOKIE['samnartrun_login'])->from('USRAccount')->count_all_results();
            $query = $this->db->select('USRAccount.RowKey, '
                            . 'USRAccount.User, '
                            . 'CONCAT(MSTTitle.Title,USRAccount.FName," ",USRAccount.LName)AS FullName')
                    ->where('USRAccount.RowKey', $_COOKIE['samnartrun_login'])
                    ->from('USRAccount')
                    ->join('MSTTitle', 'USRAccount.TitleKey=MSTTitle.RowKey', 'left')
                    ->get();
            if ($queryCout > 0) {
                $_row = $query->row();
                $_Data->RowKey = $_row->RowKey;
                $_Data->User = $_row->User;
                $_Data->FullName = $_row->FullName;
            } else {
                $_Data->RowKey = $this->GUID_EMPTY();
                $_Data->User = '';
                $_Data->FullName = '';
            }
        } else {
            $_Data->RowKey = $this->GUID_EMPTY();
            $_Data->User = '';
            $_Data->FullName = '';
        }
        return $_Data;
    }

    protected function GET_FOLDER_UPLOAD() {
        $dirFolderMain = dirname(dirname(dirname(__DIR__)));
        $dirFolder = $dirFolderMain . '/File_Upload';
        if (!file_exists($dirFolder))
            mkdir($dirFolder);
        return $dirFolder;
    }

    protected function DocPatern() {
        $qry = $this->db->select('RowKey,'
                                . 'DocName,'
                                . 'Pattern,'
                                . 'Point')
                        ->from('SYSDocPattern')
                        ->get()->result();
        return Linq::from($qry)->toArray();
    }

    protected function num2wordsThai($number_input) {
        $number = $number_input; //ใส่ตัวเลขที่นี่
        $digit = array('ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ');
        $num = array('', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน');
        $number = explode(".", $number);
        $c_num[0] = $len = strlen($number[0]);
        $c_num[1] = $len2 = strlen($number[1]);
        $convert = '';
//คิดจำนวนเต็ม
        for ($n = 0; $n < $len; $n++) {
            $c_num[0] --;
            $c_digit = substr($number[0], $n, 1);
            if ($c_num[0] == 0 && $c_digit == 1)
                $digit[$c_digit] = 'เอ็ด';
            if ($c_num[0] == 0 && $c_digit == 2)
                $digit[$c_digit] = 'สอง';
            if ($c_num[0] == 1 && $c_digit == 2)
                $digit[$c_digit] = 'ยี่';
            if ($c_num[0] == 1 && $c_digit == 1)
                $digit[$c_digit] = '';
            $convert .= $digit[$c_digit];
            $convert .= $num[$c_num[0]];
        }
        $convert .= 'บาท';
        if ($number[1] == '') {
            $convert .= 'ถ้วน';
        }
//คิดจุดทศนิยม
        for ($n = 0; $n < $len2; $n++) {
            $c_num[1] --;
            $c_digit = substr($number[1], $n, 1);
            if ($c_num[1] == 0 && $c_digit == 1)
                $digit[$c_digit] = 'หนึ่ง';
            if ($c_num[1] == 0 && $c_digit == 2)
                $digit[$c_digit] = 'สอง';
            if ($c_num[1] == 1 && $c_digit == 2)
                $digit[$c_digit] = 'ยี่';
            if ($c_num[1] == 1 && $c_digit == 1)
                $digit[$c_digit] = '';
            $convert .= $digit[$c_digit];
            $convert .= $num[$c_num[1]];
        }
        if ($number[1] != '')
            $convert .= 'สตางค์';
        return $convert .= '';
    }

    protected function MyCompayDetail() {
        $qry = $this->db
                ->select('c.IDCard,'
                        . 'c.Customer,'
                        . 'c.Address,'
                        . 'sd.SubDistrict,'
                        . 'd.District,'
                        . 'p.Province,'
                        . 'c.ZipCode,'
                        . 'c.Tel,'
                        . 'c.Fax')
                ->from('SYSCompany c')
                ->join('MSTSubDistrict sd', 'c.SubDistrict=sd.RowKey', 'left')
                ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey', 'left')
                ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey', 'left')
                ->get();
        return $qry->row();
    }

    protected function GetCustomer($CustKey, $BranchKey = NULL) {
        if ($BranchKey === NULL) {
            $qry = $this->db
                            ->select('c.CusCode,'
                                    . 'c.Customer,'
                                    . 'b.Branch,'
                                    . 'b.Address,'
                                    . 'b.IDCard,'
                                    . 'b.Tel,'
                                    . 'b.Fax,'
                                    . 'b.Email,'
                                    . 'sd.SubDistrict,'
                                    . 'sd.RowKey as SubDistrictKey,'
                                    . 'd.District,'
                                    . 'd.RowKey as DistrictKey,'
                                    . 'p.Province,'
                                    . 'p.RowKey as ProvinceKey,'
                                    . 'b.ZipCode')
                            ->from('MSTCustomer c')
                            ->where('c.RowKey', $CustKey)
                            ->join('MSTCustomerBranch b', 'c.RowKey=b.CompanyKey')
                            ->where('b.IsDefault', true)
                            ->join('MSTSubDistrict sd', 'b.SubDistrict=sd.RowKey')
                            ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey')
                            ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey')
                            ->get()->row();
            return $qry;
        } else {
            $qry = $this->db
                            ->select('c.CusCode,'
                                    . 'c.Customer,'
                                    . 'b.Branch,'
                                    . 'b.Address,'
                                    . 'b.IDCard,'
                                    . 'b.Tel,'
                                    . 'b.Fax,'
                                    . 'b.Email,'
                                    . 'sd.SubDistrict,'
                                    . 'sd.RowKey as SubDistrictKey,'
                                    . 'd.District,'
                                    . 'd.RowKey as DistrictKey,'
                                    . 'p.Province,'
                                    . 'p.RowKey as ProvinceKey,'
                                    . 'b.ZipCode')
                            ->from('MSTCustomer c')
                            ->where('c.RowKey', $CustKey)
                            ->join('MSTCustomerBranch b', 'c.RowKey=b.CompanyKey')
                            ->where('b.RowKey', $BranchKey)
                            ->join('MSTSubDistrict sd', 'b.SubDistrict=sd.RowKey')
                            ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey')
                            ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey')
                            ->get()->row();
            return $qry;
        }
    }

    protected function GetCustomerByBranch($BranchKey) {
        $qry = $this->db
                        ->select('c.CusCode,'
                                . 'c.Customer,'
                                . 'b.Branch,'
                                . 'b.Address,'
                                . 'b.IDCard,'
                                . 'b.Tel,'
                                . 'b.Fax,'
                                . 'b.Email,'
                                . 'sd.SubDistrict,'
                                . 'sd.RowKey as SubDistrictKey,'
                                . 'd.District,'
                                . 'd.RowKey as DistrictKey,'
                                . 'p.Province,'
                                . 'p.RowKey as ProvinceKey,'
                                . 'b.ZipCode,'
                                . 'b.DueDate as Due')
                        ->from('MSTCustomer c')
                        ->join('MSTCustomerBranch b', 'c.RowKey=b.CompanyKey')
                        ->where('b.RowKey', $BranchKey)
                        ->join('MSTSubDistrict sd', 'b.SubDistrict=sd.RowKey')
                        ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey')
                        ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey')
                        ->get()->row();
        return $qry;
    }

//    public static function getMyHost($url = null) {
//        if ($url == null) {
//            return prep_url($_SERVER['HTTP_HOST']) . '/samnartrun/';
//        } else {
//            return prep_url($_SERVER['HTTP_HOST']) . '/samnartrun/' . $url;
//        }
//    }

    protected function testmy($ssss) {

        return $ssss;
    }

}
