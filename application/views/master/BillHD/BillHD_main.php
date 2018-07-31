<?php echo css_asset('views/billhd/billhd_main.css'); ?>
<?php echo js_asset('views/BillHD/BillHD_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>รายการวางบิล</h1><h4><small>รายงานรายการวางบิล</small></h4>
        </div>
    </div>
</div>
<div id="form_BillHD">
    <div class="col-12">   
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6">
                        <div class="form-group">
                            <label for="txtUser">ตั้งแต่วันที่ :</label>
                            <div class="input-group date" id="divSDate">
                                <input type='text' class="form-control text-center" id="txtSDate" name="txtSDate" placeholder="วันที่เริ่ม" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="txtUser">ถึงวันที่ :</label>
                            <div class="input-group date" id="divEDate">
                                <input type='text' class="form-control text-center" id="txtEDate" name="txtEDate" placeholder="วันที่สิ้นสุด" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="form_recordlist1"></div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtAmounts" class="text-right" style="line-height: 34px;">ยอดเงินที่ต้องชำระรวม :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtAmounts" name="txtAmounts" placeholder="ยอดเงินที่ต้องชำระรวม" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtRemain" class="text-right" style="line-height: 34px;">ยอดเงินที่ชำระแล้ว :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtRemain" name="txtRemain" placeholder="ยอดเงินที่ชำระแล้ว" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtBalance" class="text-right" style="line-height: 34px;">ยอดคงเหลือ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtBalance" name="txtBalance" placeholder="ยอดคงเหลือ" disabled value="0.00">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
