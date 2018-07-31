<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo css_asset('views/transaction/Income/Income_main.css') ?>
<?php echo js_asset('views/transaction/Income/Income_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลรายรับ/รายจ่าย</h1><h4><small>จัดการข้อมูลรายรับ/รายจ่าย</small></h4>
        </div>
    </div>
</div>
<div id="form_Incometime">
    <div class="col-12">   
        <div class="panel panel-default">
<!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6">
                        <div class="form-group">
                            <label for="txtUser">ตั้งแต่วันที่ :</label>
                            <div class="input-group date" id="divSDate">
                                <input type='text' class="form-control text-center" id="txtSDate" name="txtSDate" placeholder="วันที่เริ่ม" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="txtUser">ถึงวันที่ :</label>
                            <div class="input-group date" id="divEDate">
                                <input type='text' class="form-control text-center" id="txtEDate" name="txtEDate" placeholder="วันที่สิ้นสุด" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="form_Income"></div>
            </div>
        </div>
    </div>
</div>
 
<!--<div class="panel-footer">
    ......
</div>-->