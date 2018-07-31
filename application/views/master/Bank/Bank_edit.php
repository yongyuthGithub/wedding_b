<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลปั้มน้ำมัน</h1><h4><small>ข้อมูลปั้มน้ำมัน</small></h4>
</div>-->
<?php echo js_asset('views/Bank/Bank_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Bankedit">
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;ค่าเริ่มต้น :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
            
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">ชื่อธนาคาร :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtBank" name="txtBank" placeholder="ชื่อ">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

