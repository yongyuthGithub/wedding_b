<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Shipping extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Shipping/Shipping_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Shipping/Shipping_edit');
    }

    public function findShipping() {
        $qryMenu = $this->db->select('RowKey as key,'
                        . 'LocationName,'
                        . 'Contact,'
                        . 'UpdateDate')
                ->from('MSTShippingLocations')
                ->order_by('LocationName', 'asc')
                ->get();
        $_array = array();
        foreach ($qryMenu->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'LocationName' => $row->LocationName,
                'Contact' => $row->Contact,
                'UpdateDate' => $row->UpdateDate,
                '_Delete' => $this->db
                        ->where('ShippingBegin', $row->key)
                        ->or_where('ShippingEnd', $row->key)
                        ->from('TRNWrokSheetHD')->count_all_results() > 0 ? false : true
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editShipping() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('LocationName', $_data->LocationName)->from('MSTShippingLocations')->count_all_results();
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
                $this->db->insert('MSTShippingLocations', $_data);
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
            $queryChk = $this->db->where('LocationName', $_data->LocationName)->where('RowKey !=', $_data->RowKey)->from('MSTShippingLocations')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTShippingLocations', $_data);
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

    public function removeShipping() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTShippingLocations');

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
