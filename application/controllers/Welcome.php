<?php
require __DIR__ . '/../core/PCenter.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends PCenter {

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
        //$this->load-model('dbconnect');
    }

    public function index() {
//		$this->load->view('welcome_message');
        $data['page'] = 'setting/home/login';
        $data['seturl'] = !isset($_POST['loginUrl']) ? 0 : $_POST['loginUrl'];
        $this->load->view('layout/nav', $data);
    }

    public function index2() {
        $this->load->view('master/test');
    }

    public function testpage() {
        $this->load->view('master/index');
    }

}
