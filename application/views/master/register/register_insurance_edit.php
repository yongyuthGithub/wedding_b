<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<?php echo js_asset('views/Regisrter/Register_Insurance_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_RegistereditInsurance">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-xs-12">                       


                        <div class="col-xs-12 "> 
                            <div class="row">
                                
                                
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="cmdInsurance">บริษัทประกัน :</label>
                                        <select id="cmdInsurance" name="cmdInsurance" class="form-control selectpicker show-menu-arrow"
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
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="cmdInsurancetype">ประเภทประกัน :</label>
                                        <select id="cmdInsurancetype" name="cmdInsurancetype" class="form-control selectpicker show-menu-arrow"
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
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">จำนวนเงิน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-map-marker" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser3" name="txtUser3" placeholder="จำนวนเงิน">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">วันเริ่มประกัน:</label>
                                        <div class="input-group date" id="txtSDate">
                                            <input type='text' class="form-control text-center" id="txtUser5" name="txtUser5" placeholder="วันเริ่มประกัน" onkeydown="return false;" />
                                            <span class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </span>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser1">วันที่หมดอายุ:</label>
                                        <div class="input-group date" id="txtSDate1">
                                            <input type='text' class="form-control text-center" id="txtUser11" name="txtUser11" placeholder="วันที่หมดอายุ" onkeydown="return false;" />
                                            <span class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>
</div>







