<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo css_asset('views/register/Register_main.css') ?>
<?php echo js_asset('views/Regisrter/Register_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลพนักงานขับรถ</h1><h4><small>จัดการข้อมูลพนักงานขับรถ</small></h4>
        </div>
    </div>
</div>

<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#personnel">ข้อมูลพนักงาน</a></li>
                <li><a data-toggle="tab" href="#personnelcar">ข้อมูลคนขับรถ</a></li>
            </ul>

            <div class="tab-content">
                <div id="personnel" class="tab-pane fade in active" style="padding-top: 20px;">
                    <div id="form_Register"></div>
                </div>
                <div id="personnelcar" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_CarEmpedit1"></div>
                </div>
            </div>    
        </div>
    </div>
</div>
<!--<div class="panel-footer">
    ......
</div>-->