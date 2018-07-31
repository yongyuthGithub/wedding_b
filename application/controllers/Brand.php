<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Brand extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Brand/Brand_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Brand/Brand_edit');
    }

    public function findBrand() {
        $query = $this->db->select('RowKey, Brand,')->get('MSTBrand');
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'Brand' => $row->Brand,
                '_Delete' => $this->db
                        ->where('pf.BrandKey', $row->RowKey)
                        ->from('MSTCar pf')
                        ->count_all_results() > 0 ? false : true
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editBrand() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Brand', $_data->Brand)->from('MSTBrand')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTBrand', $_data);
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
            $queryChk = $this->db->where('Brand', $_data->Brand)->where('RowKey !=', $_data->RowKey)->from('MSTBrand')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->Brand = $_data->Brand;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTBrand', $update);
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

    public function removeBrand() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTBrand');

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

//----------------------------------------------------------------------------
//    public function getTestjson() {
////       header('Content-Type: application/json');
//        $objList = array();
//        $obj = (object) [];
//        $obj->id = PCenter::GUID();
//        $obj->name = 'test';
//        $obj->old = 33;
//        array_push($objList, $obj);
//        
//        $obj = (object) [];
//        $obj->id = PCenter::GUID();
//        $obj->name = 'test2';
//        $obj->old = 32;
//        array_push($objList, $obj);
//        
//        $test = (object)[];
//        $test->data=$obj;
//        $test->dataArray=$objList;
//        $test->data_from_page= json_decode($_POST['v']);
//        $test->test_data_json = PCenter::DATATIME_DB(new DateTime());
//        
//        $query = $this->db->query('select * from MSTFuel');
//        $test->with_db = $query->row_array();
//        
//        echo json_encode($test);
//    }
//
//}
