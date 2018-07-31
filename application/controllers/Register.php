<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Register extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/register/register_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/register/register_edit');
    }

    public function carempedit() {
        $this->load->view('master/register/Car_employee_edit');
    }

    public function findRegister() {
        $query = $this->db->select('E.RowKey as key, '
                        . 'E.IDCard, '
                        . 'E.TitleKey,'
                        . 'E.FName, '
                        . 'E.LName,'
                        . 'E.NickName,'
                        . 'E.SDate,'
                        . 'E.EDate,'
                        . 'E.Address,'
                        . 'E.Tel,'
                        . 'T.Title,'
                        . 'E.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey,'
                        . 'E.ZipCode,'
                        . 'E.AccountCode,'
                        . 'E.AccountName,'
                        . 'E.BankBranchKey,'
                        . 'b.BankKey')
                ->from('MSTEmployee E')
                ->join('MSTTitle T', 'E.TitleKey=T.RowKey', 'left')
                ->join('MSTSubDistrict SD', 'E.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->join('MSTBankBranch b', 'E.BankBranchKey=b.RowKey', 'left')
                ->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'IDCard' => $row->IDCard,
                'TitleKey' => $row->TitleKey,
                'Title' => $row->Title,
                'FName' => $row->FName,
                'LName' => $row->LName,
                'SDate' => $row->SDate,
                'EDate' => $row->EDate,
                'Address' => $row->Address,
                'Tel' => $row->Tel,
                'SubDistrictKey' => $row->SubDistrictKey,
                'DistrictKey' => $row->DistrictKey,
                'ProvinceKey' => $row->ProvinceKey,
                'ZipCode' => $row->ZipCode,
                'NickName' => $row->NickName,
                'AccountCode' => $row->AccountCode,
                'AccountName' => $row->AccountName,
                'BankBranchKey' => $row->BankBranchKey,
                'BankKey' => $row->BankKey,
                'TRNEmployeeFiles' => $this->db
                        ->select('RowKey, EDate, FileType,')
                        ->where('EmpKey', $row->key)
                        ->from('TRNEmployeeFiles')
                        ->get()
                        ->result()
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editRegister() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('IDCard', $_data->IDCard)->from('MSTEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTEmployee', $_data);

                $this->db->where('EmpKey', $_data->RowKey);
                $this->db->delete('TRNEmployeeFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->key = $_data->RowKey;
                    $vReturn->success = true;
                }
            }
        } else {
            $queryChk = $this->db->where('IDCard', $_data->IDCard)->where('RowKey !=', $_data->RowKey)->from('MSTEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTEmployee', $_data);

                $this->db->where('EmpKey', $_data->RowKey);
                $this->db->delete('TRNEmployeeFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->key = $_data->RowKey;
                    $vReturn->success = true;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function addImage() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->RowKey = PCenter::GUID();
        $_data->RowStatus = true;
        $_data->CreateBy = $this->USER_LOGIN()->RowKey;
        $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->insert('TRNEmployeeFiles', $_data);
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

    public function findImage() {
        $qryMenu = $this->db->select('ImageBase64')
                ->where('RowKey', $_POST['key'])
                ->get('TRNEmployeeFiles');
        echo json_encode($qryMenu->row());
    }

    public function removeAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTEmployee');

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
    public function register_insurance_Main() {
        $data['page'] = 'master/register/register_insurance_main';
        $this->load->view('layout/nav', $data);
    }

    public function typeedit() {
        $this->load->view('master/register/register_insurance_edit');
    }

    public function findeditRegister() {
        $key = $_POST['key'];
        $query = $this->db->select('E.RowKey as key, '
                        . 'I.InsuranceName,'
                        . 'I.RowKey as InsuranceKey,'
                        . 'IT.TypeName, '
                        . 'IT.RowKey as TypeKey,'
                        . 'E.SDate,'
                        . 'E.EDate,'
                        . 'E.Cash ,')
                ->from('TRNEmployeeInsurance E')
                ->join('MSTInsuranceType IT', 'E.InsuranceTypeKey=IT.RowKey', 'left')
                ->join('MSTInsurance I', 'IT.InsuranceKey=I.RowKey', 'left')
                ->where('E.EmpKey', $key)
                ->where('E.RowStatus', true)
                ->get();
        echo json_encode($query->result());
    }

    public function editeditRegister() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('EmpKey', $_data->EmpKey)
                            ->where('InsuranceTypeKey', $_data->InsuranceTypeKey)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->from('TRNEmployeeInsurance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNEmployeeInsurance', $_data);
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
            $queryChk = $this->db
                            ->where('InsuranceTypeKey', $_data->InsuranceTypeKey)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('TRNEmployeeInsurance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNEmployeeInsurance', $_data);
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

    public function disabledRegister() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->where('RowKey', $_data->RowKey)->update('TRNEmployeeInsurance', $_data);
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

    public function removeinsurancetype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNEmployeeInsurance');

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

    //-----------------------------------------CarEmp------------------------------------------------------------------------------------------------------------------------

    public function findcaremp() {
        $query = $this->db->select('CM.RowKey as key, '
                        . 'CM.CarKey, '
                        . 'C.CarNumber,'
                        . 'T.Title,'
                        . 'EM.FName,'
                        . 'EM.LName,'
                        . 'CM.EmpKey, '
                        . 'CM.BeginDate,'
                        . 'CM.SkillLabor,')
                ->from('TRNCarEmployee CM')
                ->join('MSTCar C', 'CM.CarKey=C.RowKey', 'left')
//                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTEmployee EM', 'CM.EmpKey=EM.RowKey', 'left')
                ->join('MSTTitle T', 'EM.TitleKey=T.RowKey', 'left')
                ->get();
        echo json_encode($query->result());
    }

    public function editcaremp() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('CarKey', $_data->CarKey)->from('TRNCarEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNCarEmployee', $_data);
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
            $queryChk = $this->db->where('CarKey', $_data->CarKey)->where('RowKey !=', $_data->RowKey)->from('TRNCarEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->CarKey = $_data->CarKey;
                $update->EmpKey = $_data->EmpKey;
                $update->BeginDate = $_data->BeginDate;
                $update->SkillLabor = $_data->SkillLabor;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNCarEmployee', $update);
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

    public function removecaremp() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNCarEmployee');

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
