<?php echo js_asset('views/Regisrter/Car_employee_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_CarEmpedit">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-xs-12">
                        <div class="col-xs-12 "> 
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtcmdCaremployee">ชื่อผู้ขับขี่ :</label>
                                        <select id="txtcmdCaremployee" name="txtCmdcaremployee" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="txtcmdCarnumber">ทะเบียนรถ :</label>
                                        <select id="txtcmdCarnumber" name="txtcmdCarnumber" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="txtSDate">วันที่เริ่มขับรถ:</label>
                                        <div class="input-group date" id="txtSDate">
                                            <input type='text' class="form-control text-center" id="txtSDate1" name="txtSDate11" placeholder="วันที่เริ่มขับรถ" onkeydown="return false;" />
                                            <span class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtCash">เงินเดือน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa fa-money" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtCash" name="txtCash" placeholder="เงินเดือน">
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