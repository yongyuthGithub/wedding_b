<?php echo css_asset('views/setting/mySystem/mysystem_main.css') ?>
<?php echo js_asset('views/setting/mySystem/mysystem_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลของบริษัท</h1><h4><small>จัดการข้อมูลของบริษัทเพื่อการออกบิล หรือเอกสารต่างๆ</small></h4>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body"> 
            <div id="form_mysystem">
                <div class="col-xs-12">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="txtIDCard">เลขประจำตัวผู้เสียภาษี :</label>
                                <div class="input-group">
                                    <div class="input-group-addon"><i class="fa fa-credit-card" style="min-width: 20px;"></i></div>
                                    <input type="text" class="form-control" id="txtIDCard" name="txtIDCard" placeholder="เลขประจำตัวผู้เสียภาษี">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="txtName">ชื่อบริษัท :</label>
                                <div class="input-group">
                                    <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                                    <input type="text" class="form-control" id="txtName" name="txtName" placeholder="ชื่อบริษัท">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="txtAddress">ที่อยู่ :</label>
                                <div class="input-group">
                                    <div class="input-group-addon"><i class="fa fa-building-o" style="min-width: 20px;"></i></div>
                                    <input type="text" class="form-control" id="txtAddress" name="txtAddress" placeholder="ที่อยู่บริษัท">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
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
                            <div class="row">
                                <div class="col-md-6">
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
                                <div class="col-md-6">
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
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="txtZipCode">รหัสไปรษณีย์ :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-home" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtZipCode" name="txtZipCode" placeholder="รหัสไปษณี">
                                        </div>
                                    </div>
                                </div>                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="txtTel">เบอร์โทร :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-phone" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtTel" name="txtTel" placeholder="เบอร์โทร">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="txtFax">แฟกซ์ :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-fax" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtFax" name="txtFax" placeholder="เบอร์แฟกซ์">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12"><hr/></div>      
                        <div class="col-xs-12">
                            <div class="row" style="display: none;">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="txtAccountCode">หมายเลขบัญชี :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtAccountCode" name="txtAccountCode" placeholder="หมายเลขบัญชี">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="txtAccountName">ชื่อบัญชี :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-card" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtAccountName" name="txtAccountName" placeholder="ชื่อบัญชี">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
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
                                <div class="col-md-3">
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
                            </div>
                            <div id="from_branclist"></div>
                        </div>
                        <div class="col-xs-12"><hr/></div>   
                        <div class="col-xs-12 text-right">                  
                            <div id="btn-save" class="btn btn-success"><i class="fa fa-check" style="min-width: 20px;text-align: left;"></i>Save</div>
        <!--                    <div id="btn-reset" class="btn btn-primary"><i class="fa fa-refresh" style="min-width: 20px;text-align: left;"></i>Reset</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>