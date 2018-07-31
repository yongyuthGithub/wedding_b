<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลAdmin</h1><h4><small>เพิ่มข้อมูลAdmin</small></h4>
</div>-->
<?php echo css_asset('views/register/Register_edit.css') ?>
<?php echo js_asset('views/Car/Car_edit1.js') ?>
<div class="panel panel-default">
    <form id="form_Caredit1">
        <div class="panel-body">
            <!--            <div class="col-xs-12">
                            <div class="form-group">
                                <label for="cmdGroup">ประเภทรถ :</label>
                                <select id="cmdGroup" name="cmdGroup" class="form-control selectpicker show-menu-arrow"
                                        data-width="100%"
                                        data-show-Tick="true"
                                        data-tick-Icon="fa fa-check"
                                        data-size="5"
                                        data-header="false"
                                        data-live-Search="false"
                                        data-live-Search-Placeholder="key word"
                                        data-multiple-Separator=",&nbsp;&nbsp;"
                                        data-actions-Box="false"
                                        data-selectAll-Text="Select All"
                                        data-deselectAll-Text="Deselect All"
                                        data-selected-Text-Format="count > 3">
                                    <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;ส่วนหัว</option>
                                    <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;ส่วนหาง</option>
                                </select>
                            </div>
                        </div>-->
            <div class="col-xs-12 col-md-4">
                <div class="form-group">
                    <label for="cmdBrand">ยี่ห้อรถ :</label>
                    <select id="cmdBrand" name="cmdBrand" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="true"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-SBox="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                    </select>
                </div>
            </div>
            <div class="col-xs-12 col-md-4">
                <div class="form-group">
                    <label for="txtCarNumber">เลขทะเบียนรถ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtCarNumber" name="txtCarNumber" placeholder="เลขทะเบียนรถ">
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-md-4">
                <div class="form-group">
                    <label for="cmdProvince">จังหวัด :</label>
                    <select id="cmdProvince" name="cmdProvince" class="form-control selectpicker show-menu-arrow"
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
            <div class="col-xs-12 col-md-4">
                <div class="form-group">
                    <label for="txtCarType">ประเภทเพลา :</label>
                    <select id="txtCarType" name="txtCarType" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="false"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                        <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;พื้นเรียบ 2 เพลา</option>
                        <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;พื้นเรียบ 3 เพลา</option>
                        <option data-icon="fa fa-clone" value="3">&nbsp;&nbsp;โรเบท 3 เพลา</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">รูปภาพ</a></li>
                </ul>
                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active tab-image" style="padding-top: 10px;">
                        <div class="showF"></div>
                        <div class="col-xs-12 divImage">
                            <img id="img_register_home" class="img-responsive imageShow" />
                            <div class="btn-controll">
                                <div class="btn-back">
                                    <i class="fa fa-plus btn-addimage btnimage btnAdd"></i>
<!--                                    <i class="fa fa-remove btn-deleteimage btnimage"></i>-->
<!--                                    <i class="fa fa-search btn-viewimage btnimage"></i> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </form>
</div>