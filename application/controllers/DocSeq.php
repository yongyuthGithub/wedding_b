<?php

defined('BASEPATH') OR exit('No direct script access allowed');
//require __DIR__ . '/../core/PCenter.php';
include_once APPPATH . 'core/POther.php';

use Fusonic\Linq\Linq;

//require __DIR__ . '/../core/Fusonic/Linq/Linq.php';
//require __DIR__ . '/../config/autoload.php';
//use Fusonic\Linq;
//require_once(APPPATH.'libraries/Fusonic/Linq/Linq.php');
//require __DIR__ . '/../libraries/YaLinqo/Linq.php';
//include_once APPPATH . 'libraries/Fusonic/Linq/Linq.php';
//include_once APPPATH . 'libraries/Fusonic/Linq/GroupedLinq.php';
//include_once APPPATH . 'libraries/Fusonic/Linq/Helper/LinqHelper.php';
//
//set_include_path('/usr/lib/pear');
//foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Helper/*.php') as $filename2) {
//    include_once $filename2;
//}
//foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Iterator/*.php') as $filename) {
//    include_once $filename;
//}
class DocSeq extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $names = array("John", "Peter", "Joe", "Patrick", "Donald", "Eric");
        $ddd = Linq::from($names)->count();
//        $reqa = new Fusonic\Linq\Linq($names);
//        $this->load->library('Fusonic\Linq','dddd');
//        $ddd= new MyLinq($names);
//        Fusonic\Linq\Linq::
//        $result =new Linq();
//        $result =Linq::from('$name')->in($names)
//               ->where('$name => strlen($name) < 5')
//               ->select('$name');

        $data['page'] = 'setting/docSeq/docseq_main';
        $this->load->view('layout/nav', $data);
    }

    public function docSeqEdit() {
        $this->load->view('setting/docSeq/docseq_edit');
    }

    public function findDocPattern() {
        $qry = $this->db->select('RowKey AS key,'
                        . ' DocName,'
                        . ' Pattern,'
                        . ' Point,')
                ->get('SYSDocPattern');
//        $_array = array();
//        foreach ($qry->result() as $row) {
//            $_seq = 0;
//            $_date = new DateTime();
//            $queryChk = $this->db->where('PatternKey', $row->key)
//                    ->where('PYear', (int) $_date->format('Y'))
//                    ->where('PMonth', (int) $_date->format('m'))
//                    ->from('SYSDocSeq');
//            foreach ($queryChk->get()->result() as $_row) {
//                $_seq = $_row->PSeq;
//            }
//
//            $_ar = array(
//                'key' => $row->key,
//                'DocName' => $row->DocName,
//                'Pattern' => $row->Pattern,
//                'Point' => $row->Point,
//                'YearMonth' => $_date->format('Y/m'),
//                'Seq' => $_seq
//            );
//            array_push($_array, $_ar);
//        }

        $vreturn = Linq::from($qry->result())
                        ->select(function($x) {
                            $_date = new DateTime();
                            $queryChk = $this->db->where('PatternKey', $x->key)
                                    ->where('PYear', (int) $_date->format('Y'))
                                    ->where('PMonth', (int) $_date->format('m'))
                                    ->from('SYSDocSeq')->get();

                            $_del = true;
                            foreach ($this->DocIDKey() as $row) {
                                if ($row['key'] === $x->key)
                                    $_del = false;
                            }
                            return [
                                'key' => $x->key,
                                'DocName' => $x->DocName,
                                'Pattern' => $x->Pattern,
                                'Point' => $x->Point,
                                'YearMonth' => $_date->format('Y/m'),
                                'Seq' => Linq::from($queryChk->result())->count() > 0 ? Linq::from($queryChk->result())->first()->PSeq : 0,
                                '_Delete' => $_del,
//                                'dddd'=> $this->createDocID($x->key)
                            ];
                        })->toArray();
        echo json_encode($vreturn);
    }

    public function editDocPattern() {
        $_data = json_decode($_POST['data']);
        $_dataSeq = json_decode($_POST['dataSeq']);
        $_date = new DateTime();
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('DocName', $_data->DocName)->from('SYSDocPattern')->count_all_results();
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
                $this->db->insert('SYSDocPattern', $_data);

                if ($_dataSeq->PSeq > 0) {
                    $_dataSeq->RowKey = PCenter::GUID();
                    $_dataSeq->PatternKey = $_data->RowKey;
                    $_dataSeq->PYear = (int) $_date->format('Y');
                    $_dataSeq->PMonth = (int) $_date->format('m');
                    $_dataSeq->RowStatus = true;
                    $_dataSeq->CreateBy = $this->USER_LOGIN()->RowKey;
                    $_dataSeq->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $_dataSeq->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $_dataSeq->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('SYSDocSeq', $_dataSeq);
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
            $queryChk = $this->db->where('DocName', $_data->DocName)->where('RowKey !=', $_data->RowKey)->from('SYSDocPattern')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('SYSDocPattern', $_data);

                $this->db->where('PatternKey', $_data->RowKey)
                        ->where('PYear', (int) $_date->format('Y'))
                        ->where('PMonth', (int) $_date->format('m'))
                        ->delete('SYSDocSeq');
                if ($_dataSeq->PSeq > 0) {
                    $_dataSeq->RowKey = PCenter::GUID();
                    $_dataSeq->PatternKey = $_data->RowKey;
                    $_dataSeq->PYear = (int) $_date->format('Y');
                    $_dataSeq->PMonth = (int) $_date->format('m');
                    $_dataSeq->RowStatus = true;
                    $_dataSeq->CreateBy = $this->USER_LOGIN()->RowKey;
                    $_dataSeq->CreateDate = PCenter::DATATIME_DB(new DateTime());
                    $_dataSeq->UpdateBy = $this->USER_LOGIN()->RowKey;
                    $_dataSeq->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                    $this->db->insert('SYSDocSeq', $_dataSeq);
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

    public function removeDocPattern() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('SYSDocPattern');

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
