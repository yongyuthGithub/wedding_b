<?php echo js_asset('views/fule/fulebranch_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_fulebranchedit">
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
                    <label for="txtbranch">สาขา :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtbranch" name="txtbranch" placeholder="ชื่อสาขา">
                    </div>
                </div>
            </div>
            <div style="display: none;">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtaddress">ที่อยู่ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtaddress" name="txtaddress" placeholder="ที่อยู่" value="-">
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
                            <input type="text" class="form-control" id="txtZipCode" name="txtZipCode" placeholder="รหัสไปรษณีย์" value="00000">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>