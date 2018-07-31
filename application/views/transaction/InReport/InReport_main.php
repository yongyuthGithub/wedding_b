<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo css_asset('views/transaction/InReport/inreport_main.css') ?>
<?php echo js_asset('views/transaction/InReport/InReport_maim.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลรายรับ/รายจ่าย</h1><h4><small>รายงานข้อมูลรายรับ/รายจ่าย</small></h4>
        </div>
    </div>
</div>
<div id="form_Incometime">
    <div class="col-12">   
        <div class="panel panel-default">
            <!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdVatType">ประเภทภาษี :</label>
                            <select id="cmdVatType" name="cmdVatType" class="form-control selectpicker show-menu-arrow"
                                    data-width="100%"
                                    data-show-Tick="true"
                                    data-tick-Icon="fa fa-check"
                                    data-size="5"
                                    data-header="false"
                                    data-live-Search="false"
                                    data-live-Search-Placeholder="key word"
                                    data-multiple-Separator=",&nbsp;&nbsp;"
                                    data-actions-Box="true"
                                    data-selectAll-Text="Select All"
                                    data-deselectAll-Text="Deselect All"
                                    data-selected-Text-Format="count > 3">
                                <option data-icon="fa fa-sliders" value="0">&nbsp;&nbsp;ทั้งหมด</option>
                                <option data-icon="fa fa-sliders" value="1">&nbsp;&nbsp;รายการที่ไม่คิดภาษี</option>
                                <option data-icon="fa fa-sliders" value="2">&nbsp;&nbsp;รายการที่คิดภาษี</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdIncomeType">รายรับ-จ่าย :</label>
                            <select id="cmdIncomeType" name="cmdIncomeType" class="form-control selectpicker show-menu-arrow"
                                    data-width="100%"
                                    data-show-Tick="true"
                                    data-tick-Icon="fa fa-check"
                                    data-size="5"
                                    data-header="false"
                                    data-live-Search="false"
                                    data-live-Search-Placeholder="key word"
                                    data-multiple-Separator=",&nbsp;&nbsp;"
                                    data-actions-Box="true"
                                    data-selectAll-Text="Select All"
                                    data-deselectAll-Text="Deselect All"
                                    data-selected-Text-Format="count > 3">
                                <option data-icon="fa fa-sliders" value="0">&nbsp;&nbsp;ทั้งหมด</option>
                                <option data-icon="fa fa-sliders" value="1">&nbsp;&nbsp;รายรับ</option>
                                <option data-icon="fa fa-sliders" value="2">&nbsp;&nbsp;รายจ่าย</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="txtSDate">ตั้งแต่วันที่ :</label>
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
                            <label for="txtEDate">ถึงวันที่ :</label>
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
                <div id="form_InReport"></div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtVat" class="text-right" style="line-height: 34px;">ภาษี :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtVat" name="txtVat" placeholder="ภาษี" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtRevenue" class="text-right" style="line-height: 34px;">รายรับ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtRevenue" name="txtRevenue" placeholder="รายรับ" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtExpenditure" class="text-right" style="line-height: 34px;">รายจ่าย :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtExpenditure" name="txtExpenditure" placeholder="รายจ่าย" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtTotal" class="text-right" style="line-height: 34px;">ยอดสุทธิ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ยอดสุทธิ" disabled value="0.00">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--<div class="panel-footer">
    ......
</div>-->