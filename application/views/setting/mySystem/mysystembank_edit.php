<?php echo js_asset('views/setting/mySystem/mysystembank_edit.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <form id="form_bankedit">
                <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;ตั้งเป็นค่าเริ่มต้น :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
                <div class="col-xs-12 col-md-6">
                    <div class="form-group">
                        <label for="txtAccountCode">เลขที่บัญชี :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtAccountCode" name="txtAccountCode" placeholder="เลขที่บัญชี">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <div class="form-group">
                        <label for="txtAccountName">ชื่อบัญชี :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-address-card" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtAccountName" name="txtAccountName" placeholder="ชื่อบัญชี">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdBank">ธนาคาร :</label>
                        <select id="cmdBank" name="cmdBank" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-banknew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdBankBranch">สาขา :</label>
                        <select id="cmdBankBranch" name="cmdBankBranch" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-bankbranchnew' class='btn btn-success'>เพิ่ม</div>"
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
            </form>
        </div>
    </div>
</div>