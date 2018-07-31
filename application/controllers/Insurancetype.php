<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Province extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function Insurancetype() {
        $query = $this->db
                ->from('MSTInsuranceType')
                ->select('RowKey, TypeName')
                ->order_by('TypeName', 'asc')
                ->get();
        echo json_encode($query->result());
    }

    public function findDistrict() {
        $value = $_POST['key'];
        $query = $this->db
                ->from('MSTDistrict')
                ->where('ProvinceKey', $value)
                ->select('RowKey, District')
                ->order_by('District', 'asc')
                ->get();
        echo json_encode($query->result());
    }
    
    public function findSubDistrict() {
        $value = $_POST['key'];
        $query = $this->db
                ->from('MSTSubDistrict')
                ->where('DistrictKey', $value)
                ->select('RowKey, SubDistrict, ZipCode')
                ->order_by('SubDistrict', 'asc')
                ->get();
        echo json_encode($query->result());
    }
}
