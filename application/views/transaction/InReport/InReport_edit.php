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
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">วันที่เริ่มงาน:</label>
                    <div class="input-group date" id="txtSDate">
                        <input type='text' class="form-control text-center" id="txtUser5" name="txtUser5" placeholder="วันที่เริ่มงาน" onkeydown="return false;" />
                        <span class="input-group-addon">
                            <span class="fa fa-calendar"></span>
                        </span>

                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">ชื่อ:</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser2" name="txtUser2" placeholder="ชื่อ">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdTitle">Type :</label>
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
                    <label for="txtUser">จำนวนเงิน:</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser3" name="txtUser3" placeholder="ชื่อ">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

