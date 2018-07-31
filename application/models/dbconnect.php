<?php

class dbconnect extends CI_Model
{
    private $dbstring='';
    public function __construce($dbstring){
        $this->dbstring=$dbstring;
    }

    public function getDBStr(){
        echo $this->$dbstring;
    }
}