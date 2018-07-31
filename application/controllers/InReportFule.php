<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class InReportFule extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/InReportFule/InReportFule_main';
        $this->load->view('layout/nav', $data);
    }

    public function findInReport() {
        $_data = json_decode($_POST['vdata']);

        $fule = $this->db->select('w.RowKey as key,'
                                . 'concat(c.CarNumber," ",p.Province) as CarNumber,'
                                . 'concat("บิลเลขที่ ",f.Refer," => (",w.DocID,") ",pp.ProductName) as DocID,'
                                . 'concat(sb.LocationName," ถึง ",se.LocationName) as ShippingLocations,'
                                . 'w.DocDate,'
                                . 'concat("(ค่าน้ำมัน) ",mf.Fuel)as Detial,'
                                . 'f.Price as Amount,'
                                . '1 as IsVat')
                        ->where('w.DocDate >=', $_data->SDate)
                        ->where('w.DocDate <=', $_data->EDate)
                        ->from('TRNWrokSheetHD w')
                        ->join('TRNFule f', 'w.RowKey=f.WorkSheetHDKey')
                        ->join('MSTPumpFule ff', 'f.PumpFuleKey=ff.RowKey')
                        ->join('MSTFuel mf', 'ff.FuleKey=mf.RowKey')
                        ->join('MSTCar c', 'w.CarFirstKey=c.RowKey')
                        ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey')
                        ->join('MSTProductName pp', 'w.ProductKey=pp.RowKey')
                        ->join('MSTShippingLocations sb', 'w.ShippingBegin=sb.RowKey')
                        ->join('MSTShippingLocations se', 'w.ShippingEnd=se.RowKey')
                        ->get()->result();
        echo json_encode($fule);
    }

}
