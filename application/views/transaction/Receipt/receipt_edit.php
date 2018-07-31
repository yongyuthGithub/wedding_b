<?php echo css_asset('views/transaction/receipt/receipt_edit.css'); ?>
<?php echo js_asset('views/transaction/Receipt/receipt_edit.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1 id="title">สร้างรายการชำระ</h1><h4><small>จัดการรายการชำระและออกใบเสร็จค่าขนส่ง และรายการอื่นๆ ในระบบ</small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a id="btn-back" href="<?php echo base_url('Receipt/index') ?>">หน้าหลัก</a></li>
                <li class="active"><?php echo $_POST['txtdisplay']; ?></li>
            </ol>
        </div>
    </div>
</div>
<form id="form_receiptedit">
    <div class="col-12">   
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">                    
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdCust">เลือกลูกค้า :</label>
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
                            <label for="txtDocDate">วันที่ออกใบเสร็จ :</label>
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
                            <button type="button" id="btn-print" class="btn btn-success form-control"><i class="glyphicon glyphicon-print"></i>&nbsp;&nbsp;ออกใบเสร็จ</button>
                        </div>
                    </div>-->
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#BillList">รายการบิลค่าขนส่ง</a></li>
                            <li><a data-toggle="tab" href="#OtherList">รายการอื่นๆ</a></li>
                        </ul>
                        <div class="tab-content">
                            <div id="BillList" class="tab-pane fade in active" style="padding-top: 20px;">
                                <div id="form_billlist">

                                </div>
                            </div>
                            <div id="OtherList" class="tab-pane fade in" style="padding-top: 20px;">
                                <div id="form_otherlist">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                <hr>
                <div class="row rDocIDType">    
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdDocIDType" style="line-height: 34px;">รูปแบบการสร้างรหัสใบเสร็จ :</label>                           
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <select id="cmdDocIDType" name="cmdDocIDType" class="form-control selectpicker show-menu-arrow"
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
                            <option data-icon="fa fa-hashtag" value="00000000-0000-0000-0000-000000000000">&nbsp;&nbsp;สร้างอัตโนมัติ</option>
                            <!--                            <option data-icon="fa fa-btc" value="2">&nbsp;&nbsp;ชำระโดยเช็ค</option>-->
                        </select>
                    </div>
                </div>
                <div class="row">    
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdPayType" style="line-height: 34px;">รูปแบบการชำระ :</label>                           
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
                            <option data-icon="fa fa-btc" value="1">&nbsp;&nbsp;ชำระโดยเงินสด</option>
                            <option data-icon="fa fa-btc" value="2">&nbsp;&nbsp;ชำระโดยเช็ค</option>
                        </select>
                    </div>
                </div>
                <div class="row cheque-type">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdBank" style="line-height: 34px;">ธนาคาร :</label>                           
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <select id="cmdBank" name="cmdBank" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-BankNew' class='btn btn-success'>เพิ่ม</div>"
                                data-live-Search="true"
                                data-live-Search-Placeholder="key word"
                                data-multiple-Separator=",&nbsp;&nbsp;"
                                data-actions-Box="false"
                                data-selectAll-Text="Select All"
                                data-deselectAll-Text="Deselect All"
                                data-selected-Text-Format="count > 3">
                            <!--                            <option data-icon="fa fa-btc" value="0">&nbsp;&nbsp;ไม่ระบุ</option>
                                                        <option data-icon="fa fa-btc" value="1">&nbsp;&nbsp;ชำระโดยเงินสด</option>
                                                        <option data-icon="fa fa-btc" value="2">&nbsp;&nbsp;ชำระโดยเช็ค</option>-->
                        </select>
                    </div>
                </div>
                <div class="row cheque-type">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="cmdBankBranch" style="line-height: 34px;">สาขาธนาคาร :</label>                           
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <select id="cmdBankBranch" name="cmdBankBranch" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-BankBranchNew' class='btn btn-success'>เพิ่ม</div>"
                                data-live-Search="true"
                                data-live-Search-Placeholder="key word"
                                data-multiple-Separator=",&nbsp;&nbsp;"
                                data-actions-Box="false"
                                data-selectAll-Text="Select All"
                                data-deselectAll-Text="Deselect All"
                                data-selected-Text-Format="count > 3">
                            <!--                            <option data-icon="fa fa-btc" value="0">&nbsp;&nbsp;ไม่ระบุ</option>
                                                        <option data-icon="fa fa-btc" value="1">&nbsp;&nbsp;ชำระโดยเงินสด</option>
                                                        <option data-icon="fa fa-btc" value="2">&nbsp;&nbsp;ชำระโดยเช็ค</option>-->
                        </select>
                    </div>
                </div>
                <div class="row cheque-type">
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtChequeNumber" style="line-height: 34px;">หมายเลขเช็ค :</label>                           
                        </div>                        
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control" id="txtChequeNumber" name="txtChequeNumber" placeholder="หมายเลขเช็ค">
                        </div>
                    </div>
                </div>
                <div class="row cheque-type">
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtChequeDate" style="line-height: 34px;">วันที่เช็ค :</label>                           
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group">
                            <div class="input-group date" id="divChequeDate">
                                <input type='text' class="form-control text-center" id="txtChequeDate" name="txtChequeDate" placeholder="วันที่เช็ค" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">  
                    <div class="col-xs-8 col-xs-offset-4 col-sm-4 col-sm-offset-8 col-md-3 col-md-offset-9">
                        <div class="form-group" style="padding-top: 4px;">
                            <button type="button" id="btn-print" class="btn btn-success form-control"><i class="glyphicon glyphicon-print"></i>&nbsp;&nbsp;ออกใบเสร็จ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />