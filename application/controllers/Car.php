<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';
ini_set('mysql.connect_timeout', 300);
ini_set('default_connect_timeout', 300);

class Car extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Car/Car_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Car/Car_edit');
    }

    public function edit1() {
        $this->load->view('master/Car/Car_edit1');
    }

    public function carinsurance() {
        $data['page'] = 'master/Car/Car_Insurance_main';
        $this->load->view('layout/nav', $data);
    }

    public function carinsuranceedit() {
        $this->load->view('master/Car/Car_Insurance_edit');
    }

    public function caractedit() {
        $this->load->view('master/Car/Car_Act_edit');
    }

    public function findCar() {
        $query = $this->db->select('C.RowKey as key, '
                        . 'C.BrandKey, '
                        . 'C.CarNumber, '
//                . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'C.ProvinceKey,'
                        . 'P.Province,'
                        . 'C.CarType,'
                        . 'B.Brand,'
                        . 'C.CarGroup')
//                . 'D.RowKey as DistrictKey,'
//                . 'D.ProvinceKey'
                ->where('C.CarGroup', 1)
                ->from('MSTCar C')
                ->join('MSTBrand B', 'C.BrandKey=B.RowKey', 'left')
//                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTProvince P', 'C.ProvinceKey=P.RowKey', 'left')
                ->get();
//        $query = $this->db->select('RowKey, InsuranceName,Address,SubDistrict,ZipCode,Tel,')->get('MSTInsurance');
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'BrandKey' => $row->BrandKey,
                'CarNumber' => $row->CarNumber,
                'ProvinceKey' => $row->ProvinceKey,
                'Province' => $row->Province,
                'CarType' => $row->CarType,
                'Brand' => $row->Brand,
                'CarGroup' => $row->CarGroup,
                '_Delete' => $this->db
                        ->where('CarFirstKey', $row->key)
                        ->or_where('CarSecondKey', $row->key)
                        ->from('TRNWrokSheetHD')->count_all_results() > 0 ? false : true,
                'ImageList' => $this->db->select('RowKey')
                        ->where('CarKey', $row->key)
                        ->from('TRNCarFiles')
                        ->order_by('Seq', 'asc')
                        ->get()->result()
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editCar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('CarNumber', $_data->CarNumber)
                            ->from('MSTCar')->count_all_results();
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
                $this->db->insert('MSTCar', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('CarNumber', $_data->CarNumber)->where('RowKey !=', $_data->RowKey)->from('MSTCar')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->BrandKey = $_data->BrandKey;
                $update->CarNumber = $_data->CarNumber;
                $update->ProvinceKey = $_data->ProvinceKey;
                $update->CarGroup = $_data->CarGroup;
                $update->CarType = $_data->CarType;

                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCar', $update);

                $this->db->where('CarKey', $_data->RowKey)
                        ->where_not_in('RowKey', $_data->ImageList)
                        ->delete('TRNCarFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function findCar1() {
        $query = $this->db->select('C.RowKey as key, '
                        . 'C.BrandKey, '
                        . 'C.CarNumber, '
//                . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'C.ProvinceKey,'
                        . 'P.Province,'
                        . 'C.CarType,'
                        . 'B.Brand,'
                        . 'C.CarGroup')
//                . 'D.RowKey as DistrictKey,'
//                . 'D.ProvinceKey'
                ->where('C.CarGroup', 2)
                ->from('MSTCar C')
                ->join('MSTBrand B', 'C.BrandKey=B.RowKey', 'left')
//                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTProvince P', 'C.ProvinceKey=P.RowKey', 'left')
                ->get();
//        $query = $this->db->select('RowKey, InsuranceName,Address,SubDistrict,ZipCode,Tel,')->get('MSTInsurance');
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'BrandKey' => $row->BrandKey,
                'CarNumber' => $row->CarNumber,
                'ProvinceKey' => $row->ProvinceKey,
                'Province' => $row->Province,
                'CarType' => $row->CarType,
                'Brand' => $row->Brand,
                'CarGroup' => $row->CarGroup,
                '_Delete' => $this->db
                        ->where('CarFirstKey', $row->key)
                        ->or_where('CarSecondKey', $row->key)
                        ->from('TRNWrokSheetHD')->count_all_results() > 0 ? false : true,
                'ImageList' => $this->db->select('RowKey')
                        ->where('CarKey', $row->key)
                        ->from('TRNCarFiles')
                        ->order_by('Seq', 'asc')
                        ->get()->result()
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editCar1() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('CarNumber', $_data->CarNumber)
                            ->from('MSTCar')->count_all_results();
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
                $this->db->insert('MSTCar', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('CarNumber', $_data->CarNumber)->where('RowKey !=', $_data->RowKey)->from('MSTCar')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->BrandKey = $_data->BrandKey;
                $update->CarNumber = $_data->CarNumber;
                $update->ProvinceKey = $_data->ProvinceKey;
                $update->CarGroup = $_data->CarGroup;
                $update->CarType = $_data->CarType;

                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCar', $update);

                $this->db->where('CarKey', $_data->RowKey)
                        ->where_not_in('RowKey', $_data->ImageList)
                        ->delete('TRNCarFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function removeinsurancetype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTCar');

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

    public function findinsurancecar() {
        $key = $_POST['key'];
        $query = $this->db->select('T.RowKey as key, '
                        . 'I.InsuranceName,'
                        . 'I.RowKey as InsuranceKey,'
                        . 'IT.TypeName, '
                        . 'IT.RowKey as TypeKey,'
                        . 'T.SDate,'
                        . 'T.EDate,'
                        . 'T.Cash ,')
                ->from('TRNCarInsurance T')
                ->join('MSTInsuranceType IT', 'T.InsuranceTypeKey=IT.RowKey', 'left')
                ->join('MSTInsurance I', 'IT.InsuranceKey=I.RowKey', 'left')
                ->where('T.CarKey', $key)
                ->where('T.RowStatus', true)
                ->get();
        echo json_encode($query->result());
    }

    public function editinsurancecar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('CarKey', $_data->CarKey)
                            ->where('InsuranceTypeKey', $_data->InsuranceTypeKey)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->from('TRNCarInsurance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNCarInsurance', $_data);
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
                            ->where('InsuranceTypeKey', $_data->InsuranceTypeKey)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('TRNCarInsurance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNCarInsurance', $_data);
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

    public function disabledinsurancecar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->where('RowKey', $_data->RowKey)->update('TRNCarInsurance', $_data);
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

    public function removeinsurancecar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNCarInsurance');

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

    public function findactcar() {
        $key = $_POST['key'];
        $query = $this->db->select('T.RowKey as key, '
                        . 'T.CarKey,'
                        . 'T.SDate,'
                        . 'T.EDate,'
                        . 'T.ActType,'
                        . 'T.Cash ,')
                ->from('TRNCarAct T')
                ->where('T.CarKey', $key)
                ->where('T.RowStatus', true)
                ->get();
        echo json_encode($query->result());
    }

    public function editactcar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('ActType', $_data->ActType)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->from('TRNCarAct')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNCarAct', $_data);
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
                            ->where('ActType', $_data->ActType)
                            ->where('SDate', $_data->SDate)
                            ->where('EDate', $_data->EDate)
                            ->where('Cash', $_data->Cash)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('TRNCarAct')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNCarAct', $_data);
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

    public function disabledactcar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->where('RowKey', $_data->RowKey)->update('TRNCarAct', $_data);
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

    public function removeactcar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNCarAct');

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

    public function addImage() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $_data->RowKey = PCenter::GUID();
            $_data->CreateBy = $this->USER_LOGIN()->RowKey;
            $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('TRNCarFiles', $_data);
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        } else {
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', $_data->RowKey)->update('TRNCarFiles', $_data);
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        }
        echo json_encode($vReturn);
    }

    public function findImage() {
        $key = $_POST['key'];
        $query = $this->db->select('ImageBase64')
                ->from('TRNCarFiles')
                ->where('RowKey', $key)
                ->get();
        echo json_encode($query->row());
    }

}
