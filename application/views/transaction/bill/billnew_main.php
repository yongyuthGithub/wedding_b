<?php echo css_asset('views/transaction/bill/billnew_main.css'); ?>
<?php echo js_asset('views/transaction/bill/billnew_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1 id="title">สร้างรายการบิลใหม่</h1><h4><small>จัดการออกบิลแต่ละรายการลูกค้าที่มีอยู่ในระบบ</small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a id="btn-back" href="<?php echo base_url('Bill/index') ?>">หน้าหลัก</a></li>
                <li class="active"><?php echo $_POST['txtdisplay']; ?></li>
            </ol>
        </div>
    </div>
</div>
<div id="form_billnew">
    <div class="col-12">   
        <div class="panel panel-default">
            <!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">                    
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdCust">เลือกลูกค้าที่ต้องการออกบิล :</label>
                            <select id="cmdCust" name="cmdCust" class="form-control selectpicker show-menu-arrow"
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
                    <div class="col-xs-12 col-sm-5 col-md-3">
                        <div class="form-group">
                            <label for="cmdCustBranch">สาขา :</label>
                            <select id="cmdCustBranch" name="cmdCustBranch" class="form-control selectpicker show-menu-arrow"
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
                    <div class="col-xs-12 col-sm-5 col-sm-3 col-md-offset-3 ">
                        <div class="form-group">
                            <label for="txtDocDate">วันที่ออกบิล :</label>
                            <div class="input-group date" id="divDate">
                                <input type='text' class="form-control text-center" id="txtDocDate" name="txtDocDate" placeholder="วันเอกสาร" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
<!--                    <div class="col-xs-12 col-sm-2 col-md-2 col-md-offset-1" style="height: 74px;line-height: 74px;">
                        <div class="form-group" style="padding-top: 4px;">
                            <button type="button" id="btn-print" class="btn btn-success form-control"><i class="glyphicon glyphicon-print"></i>&nbsp;&nbsp;ออกบิล</button>
                        </div>
                    </div>-->
                </div>
                <hr>
                <div id="form_bilelist"></div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtPriceTotal" class="text-right" style="line-height: 34px;">เงินรวม :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtPriceTotal" name="txtPriceTotal" placeholder="เงินรวม" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtDiscountTotal" class="text-right" style="line-height: 34px;">ส่วนลดรวม :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtDiscountTotal" name="txtDiscountTotal" placeholder="ส่วนสด" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">    
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdVatStatus" class="text-right" style="line-height: 34px;">รูปแบบการคำนวณภาษี :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <select id="cmdVatStatus" name="cmdVatStatus" class="form-control selectpicker show-menu-arrow"
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
                                <option data-icon="fa fa-sliders" value="0">&nbsp;&nbsp;ไม่คำนวณภาษี</option>
                                <option data-icon="fa fa-sliders" value="1">&nbsp;&nbsp;รวมภาษีมูลค่า (Include VAT)</option>
                                <option data-icon="fa fa-sliders" value="2">&nbsp;&nbsp;ยังไม่รวมภาษี (Exclude VAT)</option>
                                <!--<option data-icon="fa fa-sliders" value="3">&nbsp;&nbsp;คำนวณภาษีนอก</option>-->
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtVatTotal" class="text-right" style="line-height: 34px;">ภาษี :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtVatTotal" name="txtVatTotal" placeholder="ภาษี" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtNetPrice" class="text-right" style="line-height: 34px;">จำนวนเงินสุทธิ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtNetPrice" name="txtNetPrice" placeholder="จำนวนเงินสุทธิ" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group">
                            <label for="txtDueDate">วันครบกำหนดชำระ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="input-group date" id="divDueDate">
                            <input type='text' class="form-control text-center" id="txtDueDate" name="txtDueDate" placeholder="วันครบกำหนดชำระ" onkeydown="return false;" />
                            <span class="input-group-addon">
                                <span class="fa fa-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdPayType">รูปแบบการชำระ :</label>                           
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <select id="cmdPayType" name="cmdPayType" class="form-control selectpicker show-menu-arrow"
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
                            <option data-icon="fa fa-btc" value="0">&nbsp;&nbsp;ไม่ระบุ</option>
                            <option data-icon="fa fa-btc" value="1">&nbsp;&nbsp;ชำระโดยเงินสด</option>
                            <option data-icon="fa fa-btc" value="2">&nbsp;&nbsp;ชำระโดยเช็ค</option>
                        </select>
                    </div>
                </div>
                <hr>
                <div class="row">  
                    <div class="col-xs-8 col-xs-offset-4 col-sm-4 col-sm-offset-8 col-md-3 col-md-offset-9">
                        <div class="form-group" style="padding-top: 4px;">
                            <button type="button" id="btn-print" class="btn btn-success form-control"><i class="glyphicon glyphicon-print"></i>&nbsp;&nbsp;ออกบิล</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />