<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class FuleType extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/FuleType/Fuletype_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {

        $this->load->view('master/FuleType/Fuletype_edit');
    }

    public function findFuelType() {
        $query = $this->db->select('RowKey, Fuel, FuelType, IsDefault ')->from('MSTFuel')->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'Fuel' => $row->Fuel,
                'FuelType' => intval($row->FuelType),
                'IsDefault' => $row->IsDefault,
                '_Delete' => $this->db
                        ->where('pf.FuleKey', $row->RowKey)
                        ->from('MSTPumpFule pf')
                        ->join('TRNFule f', 'pf.RowKey=f.PumpFuleKey')
                        ->count_all_results() > 0 ? false : true
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editFuelType() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Fuel', $_data->Fuel)->from('MSTFuel')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTFuel');
                }
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTFuel', $_data);
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
            $queryChk = $this->db->where('Fuel', $_data->Fuel)->where('RowKey !=', $_data->RowKey)->from('MSTFuel')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTFuel');
                }

                $update = (object) [];
                $update->IsDefault = $_data->IsDefault;
                $update->Fuel = $_data->Fuel;
                $update->FuelType = $_data->FuelType;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTFuel', $update);
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

    public function removeFuleType() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTFuel');

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
