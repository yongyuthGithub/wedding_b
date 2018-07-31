<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

use Fusonic\Linq\Linq;

class MySystem extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'setting/mySystem/mysystem_main';
        $this->load->view('layout/nav', $data);
    }

    public function myAlert() {
        $data['page'] = 'setting/mySystem/myalert_main';
        $this->load->view('layout/nav', $data);
    }

    public function editBank() {
        $this->load->view('setting/mySystem/mysystembank_edit');
    }

    public function findMySystem() {
        $qryMenu = $this->db
                        ->select(',c.RowKey,'
                                . 'c.IDCard,'
                                . 'c.Customer,'
                                . 'c.Address,'
                                . 'c.SubDistrict as SubDistrictKey,'
                                . 'sd.DistrictKey,'
                                . 'd.ProvinceKey,'
                                . 'c.ZipCode,'
                                . 'c.Tel,'
                                . 'c.Fax,'
                                . 'c.AccountCode,'
                                . 'c.AccountName,'
                                . 'c.BankBranchKey,'
                                . 'bb.BankKey')
                        ->from('SYSCompany c')
                        ->join('MSTSubDistrict sd', 'c.SubDistrict=sd.RowKey', 'left')
                        ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey', 'left')
                        ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey', 'left')
                        ->join('MSTBankBranch bb', 'c.BankBranchKey=bb.RowKey', 'left')
                        ->get()->result();
        foreach ($qryMenu as $value) {
            $value->Bank = $this->db->select('b.RowKey as key,'
                                    . 'b.AccountCode,'
                                    . 'b.AccountName,'
                                    . 'b.BankBranchKey,'
                                    . 'bb.BankKey,'
                                    . 'bb.Branch,'
                                    . 'mb.Bank,'
                                    . 'b.IsBill')
                            ->where('b.SYSCompanyKey', $value->RowKey)
                            ->from('SYSCompanyBank b')
                            ->join('MSTBankBranch bb', 'b.BankBranchKey=bb.RowKey')
                            ->join('MSTBank mb', 'bb.BankKey=mb.RowKey')
                            ->get()->result();
        }
        echo json_encode($qryMenu);
    }

    public function editMySystem() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($this->db->from('SYSCompany')->count_all_results() === 0) {
            $_data->RowKey = PCenter::GUID_EMPTY();
            $_data->CreateBy = $this->USER_LOGIN()->RowKey;
            $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('SYSCompany', $_data);

            $this->db->where('SYSCompanyKey', $_data->RowKey)
                    ->delete('SYSCompanyBank');
            foreach ($_data->BankList as $value) {
                $value->SYSCompanyKey = $_data->RowKey;
                $value->CreateBy = $this->USER_LOGIN()->RowKey;
                $value->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $value->UpdateBy = $this->USER_LOGIN()->RowKey;
                $value->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('SYSCompanyBank',$value);
            }

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        } else {
            $_data->RowKey = PCenter::GUID_EMPTY();
            $_data->UpdateBy = PCenter::GUID_EMPTY();
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', PCenter::GUID_EMPTY())->update('SYSCompany', $_data);
            
            $this->db->where('SYSCompanyKey', $_data->RowKey)
                    ->delete('SYSCompanyBank');
            foreach ($_data->BankList as $value) {
                $value->SYSCompanyKey = $_data->RowKey;
                $value->CreateBy = $this->USER_LOGIN()->RowKey;
                $value->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $value->UpdateBy = $this->USER_LOGIN()->RowKey;
                $value->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('SYSCompanyBank',$value);
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
        echo json_encode($vReturn);
    }

    public function findMyCompany() {
        echo json_encode($this->MyCompayDetail());
    }

    public function findBank() {
        $qryMenu = $this->db
                ->select('RowKey,'
                        . 'Bank,'
                        . 'IsDefault')
                ->from('MSTBank')
                ->order_by('Bank', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findBankBranch() {
        $key = $_POST['key'];
        $qryMenu = $this->db
                ->select('RowKey,'
                        . 'Branch,'
                        . 'IsDefault')
                ->where('BankKey', $key)
                ->from('MSTBankBranch')
                ->order_by('Branch', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findMyAlert() {
        $qryMenu = $this->db
                ->select('RowKey as key,'
                        . 'Detail,'
                        . 'AlertBeforeDay,'
                        . 'RowStatus')
                ->from('SYSAlert')
                ->order_by('Detail', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editMyAlert() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->where('RowKey', $_data->RowKey)->update('SYSAlert', $_data);
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

    public function findAllMyAlert() {
        $_array = array();

        $TypeUse = $this->db->select('RowKey,AlertBeforeDay')
                        ->from('SYSAlert')
                        ->where('RowStatus', true)
                        ->get()->result();

        foreach ($TypeUse as $_row) {
            if ($_row->RowKey === '53c63d23-573e-11e8-9d29-000c29e41047') {
                $ExpIDCard = $this->db->select('e.RowKey,'
                                        . 'concat("บัตรประชาชนของ ",t.Title,e.FName," ",e.LName," จะหมดอายุในวันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-credit-card" as Type,'
                                        . '"Register/index" as Path,'
                                        . '"" as Display')
                                ->from('TRNEmployeeFiles ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->where('ef.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('ef.EDate >=', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.FileType', 1)
                                ->get()->result();
                $_array = array_merge($_array, $ExpIDCard);
                $ExpIDCardOver = $this->db->select('e.RowKey,'
                                        . 'concat("บัตรประชาชนของ ",t.Title,e.FName," ",e.LName," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-credit-card" as Type,'
                                        . '"Register/index" as Path,'
                                        . '"" as Display')
                                ->from('TRNEmployeeFiles ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->where('ef.EDate <', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.FileType', 1)
                                ->get()->result();
                $_array = array_merge($_array, $ExpIDCardOver);
            } else if ($_row->RowKey === '09a32e00-573e-11e8-9d29-000c29e41047') {
                $ExpIDDrive = $this->db->select('ef.RowKey,'
                                        . 'concat("ใบขับขี่ของ ",t.Title,e.FName," ",e.LName," จะหมดอายุในวันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-credit-card" as Type,'
                                        . '"Register/index" as Path,'
                                        . '"" as Display')
                                ->from('TRNEmployeeFiles ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->where('ef.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('ef.EDate >=', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.FileType', 3)
                                ->get()->result();
                $_array = array_merge($_array, $ExpIDDrive);
                $ExpIDCardDriveOver = $this->db->select('ef.RowKey,'
                                        . 'concat("ใบขับขี่ของ ",t.Title,e.FName," ",e.LName," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-credit-card" as Type,'
                                        . '"Register/index" as Path,'
                                        . '"" as Display')
                                ->from('TRNEmployeeFiles ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->where('ef.EDate <', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.FileType', 3)
                                ->get()->result();
                $_array = array_merge($_array, $ExpIDCardDriveOver);
            } else if ($_row->RowKey === '23a13de2-573e-11e8-9d29-000c29e41047') {
                $ExpInsurance = $this->db->select('e.RowKey,'
                                        . 'concat(tt.TypeName,"ของ ",t.Title,e.FName," ",e.LName," จะหมดอายุในวันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-medkit" as Type,'
                                        . '"Register/register_insurance_Main" as Path,'
                                        . 'concat(t.Title,e.FName," ",e.LName) as Display')
                                ->from('TRNEmployeeInsurance ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->join('MSTInsuranceType tt', 'ef.InsuranceTypeKey=tt.RowKey')
                                ->where('ef.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('ef.EDate >=', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsurance);
                $ExpInsuranceOver = $this->db->select('e.RowKey,'
                                        . 'concat(tt.TypeName,"ของ ",t.Title,e.FName," ",e.LName," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'ef.EDate as ExpDate,'
                                        . '"fa fa-medkit" as Type,'
                                        . '"Register/register_insurance_Main" as Path,'
                                        . 'concat(t.Title,e.FName," ",e.LName) as Display')
                                ->from('TRNEmployeeInsurance ef')
                                ->join('MSTEmployee e', 'ef.EmpKey=e.RowKey')
                                ->join('MSTTitle t', 'e.TitleKey=t.RowKey')
                                ->join('MSTInsuranceType tt', 'ef.InsuranceTypeKey=tt.RowKey')
                                ->where('ef.EDate <', 'CURDATE()', false)
                                ->where('e.EDate', NULL)
                                ->where('ef.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceOver);
            } else if ($_row->RowKey === '30e0c8e2-573e-11e8-9d29-000c29e41047') {
                $ExpInsuranceCar = $this->db->select('c.RowKey,'
                                        . 'concat(t.TypeName," ของรถทะเบียน ",c.CarNumber," จะหมดอายุในวันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-truck" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarInsurance cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->join('MSTInsuranceType t', 'cl.InsuranceTypeKey=t.RowKey')
                                ->where('cl.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('cl.EDate >=', 'CURDATE()', false)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCar);
                $ExpInsuranceCarOver = $this->db->select('c.RowKey,'
                                        . 'concat(t.TypeName," ของรถทะเบียน ",c.CarNumber," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-truck" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarInsurance cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->join('MSTInsuranceType t', 'cl.InsuranceTypeKey=t.RowKey')
                                ->where('cl.EDate <', 'CURDATE()', false)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCarOver);
            } else if ($_row->RowKey === '45d88572-573e-11e8-9d29-000c29e41047') {
                $ExpInsuranceCarAct = $this->db->select('c.RowKey,'
                                        . 'concat("พรบ.ของรถทะเบียน ",c.CarNumber," จะหมดอายุในวันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-file-text-o" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarAct cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->where('cl.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('cl.EDate >=', 'CURDATE()', false)
                                ->where('cl.ActType', 1)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCarAct);
                $ExpInsuranceCarActOver = $this->db->select('c.RowKey,'
                                        . 'concat("พรบ.ของรถทะเบียน ",c.CarNumber," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-file-text-o" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarAct cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->where('cl.EDate <', 'CURDATE()', false)
                                ->where('cl.ActType', 1)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCarActOver);
                $ExpInsuranceCarAct2 = $this->db->select('c.RowKey,'
                                        . 'concat("ภาษีของรถทะเบียน ",c.CarNumber," จะหมดอายุในวันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-file-text-o" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarAct cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->where('cl.EDate <=', 'CURDATE() + INTERVAL ' . (int) $_row->AlertBeforeDay . ' DAY', false)
                                ->where('cl.EDate >=', 'CURDATE()', false)
                                ->where('cl.ActType', 2)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCarAct2);
                $ExpInsuranceCarActOver2 = $this->db->select('c.RowKey,'
                                        . 'concat("ภาษีของรถทะเบียน ",c.CarNumber," หมดอายุแล้วตั้งแต่วันที่")as Text,'
                                        . 'cl.EDate as ExpDate,'
                                        . '"fa fa-file-text-o" as Type,'
                                        . '"Car/Carinsurance" as Path,'
                                        . 'c.CarNumber as Display')
                                ->from('TRNCarAct cl')
                                ->join('MSTCar c', 'cl.CarKey=c.RowKey')
                                ->where('cl.EDate <', 'CURDATE()', false)
                                ->where('cl.ActType', 2)
                                ->where('cl.RowStatus', true)
                                ->where('c.RowStatus', true)
                                ->get()->result();
                $_array = array_merge($_array, $ExpInsuranceCarActOver2);
            }
        }

        echo json_encode(Linq::from($_array)->orderByDescending(function($x) {
                    return $x->ExpDate;
                })->toArray());
    }

}
