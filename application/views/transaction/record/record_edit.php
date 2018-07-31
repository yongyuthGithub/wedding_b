<?php echo css_asset('views/transaction/record/record_edit.css'); ?>
<?php echo js_asset('views/transaction/record/record_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_recordedit">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-8" style="min-height: 120px;">
                    <h2 style="text-align: center;padding-bottom: 0px;padding-top: 0px;"><?php echo $company; ?></h2><h4 style="text-align: center;"><small><?php echo $address; ?></small></h4>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="form-group">
                        <label for="txtDocID">เลขที่เอกสาร :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-credit-card" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtDocID" name="txtDocID" placeholder="เลขที่เอกสาร">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="form-group">
                        <label for="txtDocDate">วันที่วิ่งงาน :</label>
                        <div class="input-group date" id="divDate">
                            <input type='text' class="form-control text-center" id="txtDocDate" name="txtDocDate" placeholder="วันเอกสาร" onkeydown="return false;" />
                            <span class="input-group-addon">
                                <span class="fa fa-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!--            <div class="row">
                            <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                                <div class="form-group">
                                    <label for="txtDocDate">วันที่วิ่งงาน :</label>
                                    <div class="input-group date" id="divDate">
                                        <input type='text' class="form-control text-center" id="txtDocDate" name="txtDocDate" placeholder="วันเอกสาร" onkeydown="return false;" />
                                        <span class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>-->
            <div class="row">
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label for="cmdCarF">รถลากส่วนหัว :</label>
                        <select id="cmdCarF" name="cmdCarF" class="form-control selectpicker show-menu-arrow"
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
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label for="cmdCarS">รถลากส่วนหาง :</label>
                        <select id="cmdCarS" name="cmdCarS" class="form-control selectpicker show-menu-arrow"
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
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdCustomerF">ลูกค้า :</label>
                        <select id="cmdCustomerF" name="cmdCustomerF" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-customerNew' class='btn btn-success'>เพิ่ม</div>"
                                data-live-Search="true"
                                data-live-Search-Placeholder="key word"
                                data-multiple-Separator=",&nbsp;&nbsp;"
                                data-actions-Box="false"
                                data-selectAll-Text="Select All"
                                data-deselectAll-Text="Deselect All"
                                data-selected-Text-Format="count > 3">
                        </select>
                    </div>                    
                    <div class="form-group" style="display:none;">
                        <label for="cmdBranchF">สาขาต้นทาง :</label>
                        <select id="cmdBranchF" name="cmdBranchF" class="form-control selectpicker show-menu-arrow"
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
                    <!--                    <div class="row">
                                            <div class="form-group col-md-8 col-md-offset-4">
                                                <label for="txtMileageF">เลขไมล์ต้นทาง :</label>
                                                <div class="input-group">
                                                    <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                                                    <input type="text" class="form-control text-right" id="txtMileageF" name="txtMileageF" placeholder="เลขไมล์ต้นทาง">
                                                </div>
                                            </div>
                                        </div>-->
                </div>                
            </div>
            <!--            <div class="row">
            
                        </div>-->
            <div class="row">                
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label for="cmdEmp">พนักงานขับรถ :</label>
                        <select id="cmdEmp" name="cmdEmp" class="form-control selectpicker show-menu-arrow"
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
                <div class="col-xs-12 col-sm-3">
                    <!--                    <div class="form-group">
                                            <label for="txtProduct">สินค้าที่ขนส่ง :</label>
                                            <div class="input-group">
                                                <div class="input-group-addon"><i class="fa fa-cube" style="min-width: 20px;"></i></div>
                                                <input type="text" class="form-control" id="txtProduct" name="txtProduct" placeholder="รายละเอียดสินค้าทีทำการขนส่ง">
                                            </div>
                                        </div>-->
                    <div class="form-group">
                        <label for="cmdProduct">สินค้าที่ขนส่ง :</label>
                        <select id="cmdProduct" name="cmdProduct" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-productNew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label for="txtSkillLabor">ค่าฝีมือ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtSkillLabor" name="txtSkillLabor" placeholder="ค่าฝีมือ">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-3">
                    <div class="form-group">
                        <label for="txtTotal">ค่าบริการ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ค่าบริการจัดส่ง">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group" style="display:none;">
                        <label for="cmdCustomerS">ลูกค้าปลายทาง :</label>
                        <select id="cmdCustomerS" name="cmdCustomerS" class="form-control selectpicker show-menu-arrow"
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
                    <div class="form-group" style="display:none;">
                        <label for="cmdBranchS">สาขาปลายทาง :</label>
                        <select id="cmdBranchS" name="cmdBranchS" class="form-control selectpicker show-menu-arrow"
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
                    <!--                    <div class="row">
                                            <div class="form-group col-md-8 col-md-offset-4">
                                                <label for="txtMileageS">เลขไมล์ปลายทาง :</label>
                                                <div class="input-group">
                                                    <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                                                    <input type="text" class="form-control text-right" id="txtMileageS" name="txtMileageS" placeholder="เลขไมล์ปลายทาง">
                                                </div>
                                            </div>
                                        </div>-->
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdShippingBegin">สถานที่รับสินค้า :</label>
                        <select id="cmdShippingBegin" name="cmdShippingBegin" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-shippingBeginNew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-7 col-sm-6 col-md-4" style="display: none;">
                    <div class="form-group">
                        <label for="txtContactBegin">ติดต่อ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-phone" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtContactBegin" name="txtContactBegin" placeholder="ติดต่อ">
                        </div>
                    </div>
                </div>
                <div class="col-xs-5 col-sm-6 col-sm-offset-6 col-md-3 col-md-offset-0" style="display:none;">
                    <div class="form-group">
                        <label for="txtMileageF">เลขไมล์ต้นทาง :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtMileageF" name="txtMileageF" placeholder="เลขไมล์ต้นทาง">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdShippingEnd">สถานที่ส่งสินค้า :</label>
                        <select id="cmdShippingEnd" name="cmdShippingEnd" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-shippingEnd' class='btn btn-success'>เพิ่ม</div>"
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
            <div class="row" style="display: none;">
                <!--                <div class="col-xs-12 col-sm-6">
                                    <div class="form-group">
                                        <label for="cmdShippingEnd">สถานที่ส่งสินค้า :</label>
                                        <select id="cmdShippingEnd" name="cmdShippingEnd" class="form-control selectpicker show-menu-arrow"
                                                data-width="100%"
                                                data-show-Tick="true"
                                                data-tick-Icon="fa fa-check"
                                                data-size="5"
                                                data-header="<div id='btn-shippingEnd' class='btn btn-success'>เพิ่ม</div>"
                                                data-live-Search="true"
                                                data-live-Search-Placeholder="key word"
                                                data-multiple-Separator=",&nbsp;&nbsp;"
                                                data-actions-Box="false"
                                                data-selectAll-Text="Select All"
                                                data-deselectAll-Text="Deselect All"
                                                data-selected-Text-Format="count > 3">
                                        </select>
                                    </div>
                                </div>-->
                <div class="col-xs-7 col-sm-6 col-md-4" style="display: none;">
                    <div class="form-group">
                        <label for="txtContactEnd">ติดต่อ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-phone" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtContactEnd" name="txtContactEnd" placeholder="ติดต่อ">
                        </div>
                    </div>
                </div>
                <div class="col-xs-5 col-sm-6 col-sm-offset-6 col-md-3 col-md-offset-0" style="display:none;">
                    <div class="form-group">
                        <label for="txtMileageS">เลขไมล์ปลายทาง :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtMileageS" name="txtMileageS" placeholder="เลขไมล์ปลายทาง">
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-3 col-md-offset-9">
                    <div class="form-group">
                        <label for="txtSkillLabor">ค่าฝีมือ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtSkillLabor" name="txtSkillLabor" placeholder="ค่าฝีมือ">
                        </div>
                    </div>
                </div>
            </div>-->
<!--            <div class="row">                
                <div class="col-xs-12 col-sm-6 col-md-3">
                    <div class="form-group">
                        <label for="txtTotal">ค่าบริการ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ค่าบริการจัดส่ง">
                        </div>
                    </div>
                </div>
            </div>  -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtRemark">หมายเหตุ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-comments-o" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtRemark" name="txtRemark" placeholder="หมายเหตุ">
                        <!--<textarea class="form-control" name="txtRemark" id="txtRemark" placeholder="หมายเหตุ"></textarea>-->
                        </div>
                    </div>
                </div>
            </div>  
            <!--            <div class="row">
                            <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                                <div class="form-group">
                                    <label for="txtTotal">ค่าบริการ :</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                                        <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ค่าบริการจัดส่ง">
                                    </div>
                                </div>
                            </div>
                        </div>-->

            <div class="row">
                <div class="col-xs-12">
                    <ul class="nav nav-tabs">
                        <li style="display: none;"><a data-toggle="tab" href="#IncomeIn">รายรับอื่นๆ</a></li>
                        <li class="active"><a data-toggle="tab" href="#IncomeOut">รายการจ่ายอื่นๆ</a></li>
                        <li><a data-toggle="tab" href="#Fule">รายการเติมน้ำมัน</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="IncomeIn" class="tab-pane fade in" style="padding-top: 20px;">
                            <div id="form_incomein">

                            </div>
                        </div>
                        <div id="IncomeOut" class="tab-pane fade in active" style="padding-top: 20px;">
                            <div id="form_incomeout">

                            </div>
                        </div>
                        <div id="Fule" class="tab-pane fade in" style="padding-top: 20px;">
                            <div id="form_fule">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>