<?php

//require_once __DIR__ . '\..\models\PCenter.php';
require __DIR__ . '/../core/PCenter.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class Menu extends PCenter {

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

    public function index() {
        $data['page'] = 'setting/menu/menu_main';
        $this->load->view('layout/nav', $data);
    }

    public function editMenuPage() {
        $this->load->view('setting/menu/menu_edit');
    }

    public function orderMenuPage() {
        $this->load->view('setting/menu/menu_order');
    }

    public function editSubMenuPage() {
        $this->load->view('setting/menu/menu_subedit');
    }

    public function orderSubMenuPage() {
        $this->load->view('setting/menu/menu_suborder');
    }

    public function findMenu() {
        $qryMenu = $this->db->select('RowKey AS key,'
                        . ' Menu,'
                        . ' Description,'
                        . ' Icon,'
                        . ' Seq')
                ->get('USRMenu');
        echo json_encode($qryMenu->result());
    }

    public function editMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Menu', $_data->Menu)->from('USRMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $quySeq = $this->db->select_max('Seq')->get('USRMenu');
                $Seq = $quySeq->row();

                $_data->RowKey = PCenter::GUID();
                $_data->Seq = $Seq->Seq + 1;
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('USRMenu', $_data);
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
            $queryChk = $this->db->where('Menu', $_data->Menu)->where('RowKey !=', $_data->RowKey)->from('USRMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('USRMenu', $_data);
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

    public function removeMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('USRMenu');

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

    public function editMenuOrder() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        foreach ($_data as $row) {
            $row->UpdateBy = $this->USER_LOGIN()->RowKey;
            $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', $row->RowKey)
                    ->update('USRMenu', $row);
        }

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

    public function findSubMenu() {
        $qryMenu = $this->db->select('USRSubMenu.RowKey as key,'
                        . ' USRSubMenu.SubMenu,'
                        . ' USRSubMenu.Description,'
                        . ' USRSubMenu.MenuKey,'
                        . ' USRMenu.Menu,'
                        . ' USRSubMenu.Icon,'
                        . ' USRSubMenu.Url')
                ->from('USRSubMenu')
                ->join('USRMenu', 'USRSubMenu.MenuKey=USRMenu.RowKey', 'left')
                ->get();

        echo json_encode($qryMenu->result());
    }

    public function editSubMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('SubMenu', $_data->SubMenu)->from('USRSubMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $quySeq = $this->db->where('MenuKey', $_data->MenuKey)->select_max('Seq')->get('USRSubMenu');
                $Seq = $quySeq->row();
                $_data->RowKey = PCenter::GUID();
                $_data->Seq = $Seq->Seq + 1;
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('USRSubMenu', $_data);
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
            $queryChk = $this->db->where('SubMenu', $_data->SubMenu)->where('RowKey !=', $_data->RowKey)->from('USRSubMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('USRSubMenu', $_data);
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

    public function removeSubMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('USRSubMenu');

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

    public function findSubMenuByMenu() {
        $qryMenu = $this->db->select('RowKey,'
                        . ' SubMenu,'
                        . ' Description,'
                        . ' Icon,'
                        . ' Url,'
                        . ' Seq')
                ->from('USRSubMenu')
                ->where('MenuKey', $_POST['data'])
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editSubOrder() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        foreach ($_data as $row) {
            $row->UpdateBy = PCenter::GUID_EMPTY();
            $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', $row->RowKey)
                    ->where('MenuKey', $row->MenuKey)
                    ->update('USRSubMenu', $row);
        }

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
