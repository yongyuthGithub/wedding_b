<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Pemission extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'setting/Pemission/pemission_main';
        $this->load->view('layout/nav', $data);
    }

    public function editPemission() {
        $this->load->view('setting/Pemission/pemission_edit');
    }

    public function addAccount() {
        $this->load->view('setting/Pemission/pemission_account');
    }

    public function addFunction() {
        $this->load->view('setting/Pemission/pemission_function');
    }

    public function editPassword() {
        $this->load->view('setting/Pemission/pemission_repass');
    }

    public function findPemission() {
        $qryMenu = $this->db->select('RowKey AS key, UserGroup, '
                        . 'Description, ')
                ->get('USRGroup');

        $arData = array();
        foreach ($qryMenu->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'UserGroup' => $row->UserGroup,
                'Description' => $row->Description,
//                'CountFunction' => $this->db->where('GroupKey', $row->key)->from('USRGroupSubMenu')->count_all_results(),
//                'CountAccount' => $this->db->where('GroupKey', $row->key)->from('USRGroupAccount')->count_all_results(),
                'USRGroupAccount' => $this->db
                        ->where('USRGroupAccount.GroupKey', $row->key)
                        ->from('USRGroupAccount')
                        ->join('USRAccount', 'USRGroupAccount.AccountKey=USRAccount.RowKey', 'left')
                        ->join('MSTTitle', 'USRAccount.TitleKey=MSTTitle.RowKey', 'left')
                        ->select('USRAccount.RowKey AS key, '
                                . 'USRAccount.User, '
                                . 'CONCAT(MSTTitle.Title,USRAccount.FName," ",USRAccount.LName) AS Name')
                        ->get()->result(),
                'USRGroupSubMenu' => $this->db
                        ->where('USRGroupSubMenu.GroupKey', $row->key)
                        ->from('USRGroupSubMenu')
                        ->join('USRSubMenu', 'USRGroupSubMenu.SubMenuKey=USRSubMenu.RowKey', 'left')
                        ->join('USRMenu', 'USRSubMenu.MenuKey=USRMenu.RowKey', 'left')
                        ->select('USRSubMenu.RowKey AS key, '
                                . 'USRMenu.Menu, '
                                . 'USRSubMenu.SubMenu, '
                                . 'USRSubMenu.Description')
                        ->get()->result()
            );

            array_push($arData, $_ar);
        }

        echo json_encode($arData);
    }

    public function findAccount() {
//        $ddd = (object)[];
        $vkey = json_decode($_POST['vdata']);
        if (empty($vkey)) {
            $qryMenu = $this->db->select('USRAccount.RowKey, '
                            . 'USRAccount.User, '
                            . 'CONCAT(MSTTitle.Title,USRAccount.FName," ",USRAccount.LName) AS FName')
                    ->from('USRAccount')
                    ->join('MSTTitle', 'USRAccount.TitleKey=MSTTitle.RowKey', 'left')
                    ->order_by('USRAccount.User', 'asc')
                    ->get();
            echo json_encode($qryMenu->result());
        } else {
            $qryMenu = $this->db->select('USRAccount.RowKey, '
                            . 'USRAccount.User, '
                            . 'CONCAT(MSTTitle.Title,USRAccount.FName," ",USRAccount.LName) AS FName')
                    ->where_not_in('USRAccount.RowKey', $vkey)
                    ->from('USRAccount')
                    ->join('MSTTitle', 'USRAccount.TitleKey=MSTTitle.RowKey', 'left')
                    ->get();
            echo json_encode($qryMenu->result());
        }
    }

    public function findFunction() {
//        $ddd = (object)[];
        $vkey = json_decode($_POST['vdata']);
        if (empty($vkey)) {
            $qryMenu = $this->db->select('USRSubMenu.RowKey, '
                            . 'USRSubMenu.SubMenu, '
                            . 'USRSubMenu.Description, '
                            . 'USRMenu.Menu')
                    ->from('USRSubMenu')
                    ->join('USRMenu', 'USRSubMenu.MenuKey=USRMenu.RowKey', 'left')
                    ->order_by('USRSubMenu.SubMenu', 'asc')
                    ->order_by('USRMenu.Menu', 'asc')
                    ->get();
            echo json_encode($qryMenu->result());
        } else {
            $qryMenu = $this->db->select('USRSubMenu.RowKey, '
                            . 'USRSubMenu.SubMenu, '
                            . 'USRSubMenu.Description, '
                            . 'USRMenu.Menu')
                    ->where_not_in('USRSubMenu.RowKey', $vkey)
                    ->from('USRSubMenu')
                    ->join('USRMenu', 'USRSubMenu.MenuKey=USRMenu.RowKey', 'left')
                    ->order_by('USRSubMenu.SubMenu', 'asc')
                    ->order_by('USRMenu.Menu', 'asc')
                    ->get();
            echo json_encode($qryMenu->result());
        }
    }

    public function updatePemission() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('UserGroup', $_data->UserGroup)->from('USRGroup')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('USRGroup', $_data);

                foreach ($_data->USRGroupAccount as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->GroupKey = $_data->RowKey;
                    $this->db->insert('USRGroupAccount', $row);
                }

                foreach ($_data->USRGroupSubMenu as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->GroupKey = $_data->RowKey;
                    $this->db->insert('USRGroupSubMenu', $row);
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
            $queryChk = $this->db->where('UserGroup', $_data->UserGroup)->where('RowKey !=', $_data->RowKey)->from('USRGroup')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {

                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('USRGroup', $_data);

                $this->db->where('GroupKey', $_data->RowKey)->delete('USRGroupAccount');
                foreach ($_data->USRGroupAccount as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->GroupKey = $_data->RowKey;
                    $this->db->insert('USRGroupAccount', $row);
                }

                $this->db->where('GroupKey', $_data->RowKey)->delete('USRGroupSubMenu');
                foreach ($_data->USRGroupSubMenu as $row) {
                    $row->RowKey = PCenter::GUID();
                    $row->GroupKey = $_data->RowKey;
                    $this->db->insert('USRGroupSubMenu', $row);
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

    public function removePemission() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('USRGroup');

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

    public function changPassword() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $_dataUp = (object) [];
        $_dataUp->RowKey = $_data->RowKey;
        $_dataUp->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_dataUp->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $_dataUp->Password = $this->GEN_PASSWORD_MD5($_data->User, $_data->Pass);
        $this->db->where('RowKey', $_dataUp->RowKey)
                ->update('USRAccount', $_dataUp);

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

    public function findPemissionByAccount() {
        $qryMenu = $this->db->select('USRGroup.RowKey, '
                        . 'USRGroup.UserGroup,')
                ->from('USRGroup')
                ->order_by('USRGroup.UserGroup', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

}
