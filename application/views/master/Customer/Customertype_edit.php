<?php echo js_asset('views/customer/Customertype_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_customerbranchedit">            
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;ตั้งเป็นค่าเริ่มต้น :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtTypeName">ชื่อสาขา :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-card-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtTypeName" name="txtTypeName" placeholder="ชื่อสาขา">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtaddress">ที่อยู่ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtaddress" name="txtaddress" placeholder="ที่อยู่">
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
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtZipCode">รหัสไปรษณีย์ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-address-card-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtZipCode" name="txtZipCode" placeholder="รหัสไปรษณีย์" value="-">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtIDCard">เลขประจำผู้เสียภาษี :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-address-card-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtIDCard" name="txtIDCard" placeholder="เลขประจำผู้เสียภาษี" value="-">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtFax">แฟกซ์ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-phone-square" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtFax" name="txtFax" placeholder="แฟกซ์" value="-">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtTel">เบอร์โทร :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-phone-square" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtTel" name="txtTel" placeholder="เบอร์โทร" value="-">
                    </div>
                </div>
            </div>   
            <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                    <label for="txtBillDay">ระยะเวลาวางบิล(นับตั้งแต่วันที่บันทึกใบงานวันแรก) :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-newspaper-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control text-right" id="txtBillDay" name="txtBillDay" placeholder="ระยะเวลาวางบิล" value="0">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                    <label for="txtDueDate">ระยะเวลาครบกำหนดวางบิล(นับตั้งแต่วันที่วางบิล) :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-money" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control text-right" id="txtDueDate" name="txtDueDate" placeholder="ระยะเวลาครบกำหนดวางบิล" value="0">
                    </div>
                </div>
            </div>   
        </form>
    </div>
</div>