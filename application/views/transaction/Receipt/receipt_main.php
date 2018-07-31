<?php echo css_asset('views/transaction/receipt/receipt_main.css'); ?>
<?php echo js_asset('views/transaction/Receipt/receipt_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>รายการชำระ</h1><h4><small>จัดการรายการชำระที่ออกเป็นใบเสร็จ</small></h4>
        </div>
    </div>
</div>
<div id="form_receipt">
    <div class="col-12">   
        <div class="panel panel-default">
<!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">                    
                    <div class="col-xs-12 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6">
                        <div class="form-group">
                            <label for="txtSDate">ตั้งแต่วันที่ :</label>
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
                            <label for="txtEDate">ถึงวันที่ :</label>
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
                <div id="form_receiptlist"></div>
            </div>
        </div>
    </div>
</div>
