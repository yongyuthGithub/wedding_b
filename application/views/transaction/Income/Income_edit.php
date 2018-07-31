<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลปั้มน้ำมัน</h1><h4><small>ข้อมูลปั้มน้ำมัน</small></h4>
</div>-->
<?php echo js_asset('views/transaction/Income/Income_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Incomeedit">
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;คำนวนภาษี :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">วันที่ :</label>
                    <div class="input-group date" id="txtSDate">
                        <input type='text' class="form-control text-center" id="txtUser5" name="txtUser5" placeholder="วันที่" onkeydown="return false;" />
                        <span class="input-group-addon">
                            <span class="fa fa-calendar"></span>
                        </span>

                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtDocID">เลขที่บิล :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtDocID" name="txtDocID" placeholder="เลขที่บิล">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">รายละเอียด :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-bars" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser2" name="txtUser2" placeholder="รายละเอียด">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdTitle">ประเภท :</label>
                    <select id="cmdTitle" name="cmdTitle" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="true"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                        <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;รายรับ</option>
                        <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;รายจ่าย</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">จำนวนเงิน :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control text-right" id="txtUser3" name="txtUser3" placeholder="จำวนวเงิน">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

