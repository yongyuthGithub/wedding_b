<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Insurance extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/insurance/insurance_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/insurance/insurance_edit');
    }
    
    public function typeindex() {
        $data['page'] = 'master/insurance/insurancetype_main';
        $this->load->view('layout/nav', $data);
    }
    
    public function typeedit() {
        $this->load->view('master/insurance/insurancetype_edit');
    }

    public function findInsurance() {  
         $query = $this->db->select('I.RowKey as key, '
                . 'I.InsuranceName, '
                . 'I.Address, '
                . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                . 'I.ZipCode,'
                . 'I.Tel,'
                . 'I.SubDistrict as SubDistrictKey,'
                . 'D.RowKey as DistrictKey,'
                . 'D.ProvinceKey')
                ->from('MSTInsurance I')
                ->join('MSTSubDistrict SD','I.SubDistrict=SD.RowKey','left')
                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTProvince P','D.ProvinceKey=P.RowKey','left')
                ->get();
//        $query = $this->db->select('RowKey, InsuranceName,Address,SubDistrict,ZipCode,Tel,')->get('MSTInsurance');
//        $_array = array();
//        foreach ($query->result() as $row) {
//            $_ar = array(
//                'key' => $row->RowKey,
//                'InsuranceName' => $row->InsuranceName,
//                'Address' => $row->Address,
//                'SubDistrict' => $row->SubDistrict,
//                'ZipCode' => $row->ZipCode,
//                'Tel' => $row->Tel,
//                
//                
//            );
//            array_push($_array, $_ar);
//        }
        echo json_encode($query->result());
    }

    public function editinsurance() {
        $_data = json_decode($_POST['data'] );
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('InsuranceName', $_data->InsuranceName)->from('MSTInsurance')->count_all_results();
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
                $this->db->insert('MSTInsurance', $_data);
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
            $queryChk = $this->db->where('InsuranceName', $_data->InsuranceName)->where('RowKey !=', $_data->RowKey)->from('MSTInsurance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->InsuranceName = $_data->InsuranceName;
                $update->Address = $_data->Address;
                $update->SubDistrict = $_data->SubDistrict;
                $update->ZipCode = $_data->ZipCode;
                $update->Tel = $_data->Tel;
                $update->UpdateBy = $this->USER_LOGIN()->RowKey;
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTInsurance', $update);
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

    public function removeinsurance() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTInsurance');

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
    
    public function findinsurancetype() {
        $key = $_POST['key'];
        $qryMenu = $this->db->from('MSTInsuranceType')
                ->where('InsuranceKey',$key)
                ->select('RowKey as key,'
                        . 'InsuranceKey,'
                        . 'TypeName,'
                        . 'TypeUse')
                ->get();
        echo json_encode($qryMenu->result());
    }
    
    public function editinsurancetype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                    ->where('TypeUse', $_data->TypeUse)
                    ->where('TypeName', $_data->TypeName)
                    ->where('InsuranceKey', $_data->InsuranceKey)
                    ->from('MSTInsuranceType')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTInsuranceType', $_data);
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
                    ->where('TypeUse', $_data->TypeUse)
                    ->where('TypeName', $_data->TypeName)
                    ->where('InsuranceKey', $_data->InsuranceKey)
                    ->where('RowKey !=', $_data->RowKey)
                    ->from('MSTInsuranceType')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTInsuranceType', $_data);
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
    
    public function removeinsurancetype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTInsuranceType');

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
