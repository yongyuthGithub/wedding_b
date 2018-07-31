<?php
defined('BASEPATH') OR exit('No direct script access allowed');
include_once APPPATH . 'core/PCenter.php';
include_once APPPATH . 'libraries/Fusonic/Linq/Linq.php';
include_once APPPATH . 'libraries/Fusonic/Linq/GroupedLinq.php';
foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Helper/*.php') as $filename2) {
    include_once $filename2;
}
foreach (glob(APPPATH . 'libraries/Fusonic/Linq/Iterator/*.php') as $filename) {
    include_once $filename;
}