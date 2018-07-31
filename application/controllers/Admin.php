<?php

require __DIR__ . '/../core/PCenter.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Admin/admin_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Admin/admin_edit');
    }

    public function findTitle() {
        $query = $this->db->select('RowKey, Title')->from('MSTTitle')->order_by('Title', 'DESC')->get();
        echo json_encode($query->result_array());
    }

    public function findAccount() {
        $query = $this->db->select(''
                        . 'USRAccount.RowKey AS key,'
                        . ' USRAccount.User,'
                        . ' USRAccount.TitleKey,'
                        . ' CONCAT(MSTTitle.Title," ", USRAccount.FName," ",USRAccount.LName) AS Name,'
                        . ' USRAccount.FName,'
                        . ' USRAccount.LName,'
                        . ' USRAccount.RowStatus')
                ->from('USRAccount')
                ->join('MSTTitle', 'MSTTitle.RowKey = USRAccount.TitleKey', 'left')
                ->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'User' => $row->User,
                'TitleKey' => $row->TitleKey,
                'Name' => $row->Name,
                'FName' => $row->FName,
                'LName' => $row->LName,
                'RowStatus' => $row->RowStatus,
                'Pemission' => $this->db->select('GroupKey')
                        ->where('AccountKey', $row->key)
                        ->from('USRGroupAccount')
                        ->get()
                        ->result_array()
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('User', $_data->User)->from('USRAccount')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_EnPass = $this->GEN_PASSWORD_MD5($_data->User, $_data->Password);

                $_data->Password = $_EnPass;
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('USRAccount', $_data);
                
                foreach ($_data->Pemission as $row){
                    $_pem = (object)[];
                    $_pem->RowKey = PCenter::GUID();
                    $_pem->GroupKey=$row;
                    $_pem->AccountKey=$_data->RowKey;
                    $this->db->insert('USRGroupAccount', $_pem);
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
        } else {
            $queryChk = $this->db->where('User', $_data->User)->where('RowKey !=', $_data->RowKey)->from('USRAccount')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->User = $_data->User;
                $update->TitleKey = $_data->TitleKey;
                $update->FName = $_data->FName;
                $update->LName = $_data->LName;
                $update->UpdateBy = $this->USER_LOGIN()->RowKey;
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('USRAccount', $update);
                
                $this->db->where('AccountKey',$_data->RowKey)->delete('USRGroupAccount');
                foreach ($_data->Pemission as $row){
                    $_pem = (object)[];
                    $_pem->RowKey = PCenter::GUID();
                    $_pem->GroupKey=$row;
                    $_pem->AccountKey=$_data->RowKey;
                    $this->db->insert('USRGroupAccount', $_pem);
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

    public function removeAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('USRAccount');

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
