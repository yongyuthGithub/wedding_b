<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class customer extends PCenter {

    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }

    public function index() {
        $data['page'] = 'master/Customer/Customer_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {

        $this->load->view('master/Customer/Customer_edit');
    }

    public function branchindex() {
        $data['page'] = 'master/Customer/Customertype_main';
        $this->load->view('layout/nav', $data);
    }

    public function typeedit() {
        $this->load->view('master/Customer/Customertype_edit');
    }

    public function findCustomer() {
        $query = $this->db->select('RowKey, Customer, CusCode')->from('MSTCustomer')->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'CusCode' => $row->CusCode,
                'Customer' => $row->Customer,
                '_Delete' => $this->db
                        ->where('pf.CutsomerKey', $row->RowKey)
                        ->from('TRNWrokSheetHD pf')
                        ->count_all_results() > 0 ? false : true
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function findcustomerr() {
        $query = $this->db->select('I.RowKey as key, '
                        . 'I.Branch, '
                        . 'I.Address, '
                        . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'I.ZipCode,'
                        . 'I.Tel,'
                        . 'I.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey')
                ->from('MSTCustomer I')
                ->join('MSTSubDistrict SD', 'I.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->join('MSTProvince P', 'D.ProvinceKey=P.RowKey', 'left')
                ->get();
        echo json_encode($query->result());
    }

    public function editcustomer() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Customer', $_data->Customer)->from('MSTCustomer')->count_all_results();
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
                $this->db->insert('MSTCustomer', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->RowKey = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('Customer', $_data->Customer)->where('RowKey !=', $_data->RowKey)->from('MSTCustomer')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCustomer', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->RowKey = $_data->RowKey;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function findCustomertype() {
        $key = $_POST['key'];
        $query = $this->db->select('I.RowKey as key, '
                        . 'I.Branch, '
                        . 'I.Address, '
                        . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'I.ZipCode,'
                        . 'I.Tel,'
                        . 'I.IDCard,'
                        . 'I.Fax,'
                        . 'I.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey,'
                        . 'I.IsDefault,'
                        . 'I.BillDay,'
                        . 'I.DueDate')
                ->from('MSTCustomerBranch I')
                ->join('MSTSubDistrict SD', 'I.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->join('MSTProvince P', 'D.ProvinceKey=P.RowKey', 'left')
                ->where('I.CompanyKey', $key)
                ->get();
        echo json_encode($query->result());
    }

    public function editCustomertype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('Branch', $_data->Branch)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->from('MSTCustomerBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->update('MSTCustomerBranch');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTCustomerBranch', $_data);
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
                            ->where('Branch', $_data->Branch)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('MSTCustomerBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->update('MSTCustomerBranch');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCustomerBranch', $_data);
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

        $this->db->where_in('RowKey', $_data)->delete('MSTCustomer');

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

    public function removeAccount1() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTCustomerBranch');

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

}
