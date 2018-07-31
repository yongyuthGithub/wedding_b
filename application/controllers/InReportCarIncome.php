<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class InReportCarIncome extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/InReportCarIncome/InReportCarIncome_main';
        $this->load->view('layout/nav', $data);
    }

    public function findCar() {
        $query = $this->db->select('C.RowKey,'
                        . 'C.CarNumber, '
                        . 'P.Province')
                ->where('C.CarGroup', 1)
                ->from('MSTCar C')
                ->join('MSTProvince P', 'C.ProvinceKey=P.RowKey')
                ->get();
        echo json_encode($query->result());
    }

    public function findInReportCarIncome() {
        $_data = json_decode($_POST['vdata']);
        $_carlist = json_decode($_POST['carlist']);

        $q = $this->db->select('w.RowKey as key,'
                                . 'concat(c.CarNumber," ",p.Province) as CarNumber,'
                                . 'w.DocID,'
                                . 'concat(sb.LocationName," ถึง ",se.LocationName) as ShippingLocations,'
                                . 'w.DocDate,'
                                . 'pp.ProductName,'
                                . 'w.PriceTotal as Amount')
                        ->where('w.DocDate >=', $_data->SDate)
                        ->where('w.DocDate <=', $_data->EDate)
                        ->where_in('w.CarFirstKey', $_carlist)
                        ->from('TRNWrokSheetHD w')
                        ->join('MSTCar c', 'w.CarFirstKey=c.RowKey')
                        ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey')
                        ->join('MSTShippingLocations sb', 'w.ShippingBegin=sb.RowKey')
                        ->join('MSTShippingLocations se', 'w.ShippingBegin=se.RowKey')
                        ->join('MSTProductName pp', 'w.ProductKey=pp.RowKey')
                        ->get()->result();
        echo json_encode($q);
    }

}
