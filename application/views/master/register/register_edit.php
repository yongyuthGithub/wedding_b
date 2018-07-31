<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo css_asset('views/register/Register_edit.css') ?>
<?php echo js_asset('views/Regisrter/Register_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Registeredit">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-xs-12">                       
                        <div class="col-xs-12 col-md-6"> 
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">รหัสบัตรประชาชน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-credit-card" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser1" name="txtUser1" placeholder="รหัสบัตรประชาชน">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="cmdTitle">นาม :</label>
                                        <select id="cmdTitle" name="cmdTitle" class="form-control selectpicker show-menu-arrow"
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
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser2">ชื่อ:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser2" name="txtUser2" placeholder="ชื่อ">
                                        </div>
                                    </div>
                                </div>                                
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser6">นามสกุล:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-book-o" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser6" name="txtUser6" placeholder="นามสกุล">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtNickName">ชื่อเล่น:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtNickName" name="txtNickName" placeholder="ชื่อเล่น">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">ที่อยู่:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-map-marker" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser3" name="txtUser3" placeholder="ที่อยู่">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
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
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="cmdDistrict">อำเภอ :</label>
                                        <select id="cmdDistrict" name="cmdDistrict" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="cmdSubDistrict">ตำบล :</label>
                                        <select id="cmdSubDistrict" name="cmdSubDistrict" class="form-control selectpicker show-menu-arrow"
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
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6"> 
                            <div class="row">            
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtZipCode">รหัสไปรษณีย์:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-home" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtZipCode" name="txtZipCode" placeholder="รหัสไปษณี">
                                        </div>
                                    </div>
                                </div>                                       
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">เบอร์โทร:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-phone-square" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser7" name="txtUser7" placeholder="เบอร์โทร">
                                        </div>
                                    </div>
                                </div>
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
                                        <label for="txtAccountCode">หมายเลขบัญชี:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtAccountCode" name="txtAccountCode" placeholder="หมายเลขบัญชี">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtAccountName">ชื่อบัญชี:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-card" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtAccountName" name="txtAccountName" placeholder="ชื่อบัญชี">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="cmdBank">ธนาคาร :</label>
                                        <select id="cmdBank" name="cmdBank" class="form-control selectpicker show-menu-arrow"
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
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="cmdBankBranch">สาขา :</label>
                                        <select id="cmdBankBranch" name="cmdBankBranch" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="txtEDate">วันที่พ้นสภาพ:</label>
                                        <div class="input-group date" id="divEDate">
                                            <input type='text' class="form-control text-center" id="txtEDate" name="txtEDate" placeholder="วันที่พ้นสภาพ" onkeydown="return false;" />
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
            <div class="col-xs-12">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">เอกสารประชาชน</a></li>
                    <li><a data-toggle="tab" href="#menu1">เอกสารทะเบียนบ้าน</a></li>
                    <li><a data-toggle="tab" href="#menu2">เอกสารใบขับขี่</a></li>
                </ul>

                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active tab-image" data-type="1" style="padding-top: 10px;">
                        <div class="col-xs-12 col-md-4">   
                            <div class="form-group">
                                <label for="txtUser">วันที่หมดอายุ:</label>
                                <div class="input-group date" id="divEDate_Card">
                                    <input type='text' class="form-control text-center txtDate" placeholder="วันหมดอายุบัตร" onkeydown="return false;" />
                                    <span class="input-group-addon">
                                        <span class="fa fa-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-8 divImage">
                            <img id="img_card" class="img-responsive imageShow" />
                            <div class="btn-controll">
                                <div class="btn-back">
                                    <i class="fa fa-plus btn-addimage btnimage"></i>
                                    <i class="fa fa-remove btn-deleteimage btnimage"></i>
                                    <i class="fa fa-search btn-viewimage btnimage"></i> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="menu1" class="tab-pane fade in tab-image" data-type="2" style="padding-top: 10px;">
                        <div class="col-xs-12 divImage">
                            <img id="img_register_home" class="img-responsive imageShow" />
                            <div class="btn-controll">
                                <div class="btn-back">
                                    <i class="fa fa-plus btn-addimage btnimage"></i>
                                    <i class="fa fa-remove btn-deleteimage btnimage"></i>
                                    <i class="fa fa-search btn-viewimage btnimage"></i> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="menu2" class="tab-pane  fade in tab-image" data-type="3" style="padding-top: 10px;">
                        <div class="col-xs-12 col-md-4">   
                            <div class="form-group">
                                <label for="txtUser">วันที่หมดอายุ:</label>
                                <div class="input-group date" id="divEDate_driver">
                                    <input type='text' class="form-control text-center txtDate" placeholder="วันหมดอายุบัตร" onkeydown="return false;" />
                                    <span class="input-group-addon">
                                        <span class="fa fa-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-8 divImage">
                            <img id="img_driver" class="img-responsive imageShow" />
                            <div class="btn-controll">
                                <div class="btn-back">
                                    <i class="fa fa-plus btn-addimage btnimage"></i>
                                    <i class="fa fa-remove btn-deleteimage btnimage"></i>
                                    <i class="fa fa-search btn-viewimage btnimage"></i> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </form>
    </div>
</div>







