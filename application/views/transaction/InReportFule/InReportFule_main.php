<?php echo css_asset('views/transaction/InReportFule/inreportfule_main.css') ?>
<?php echo js_asset('views/transaction/InReportFule/InReportFule_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลรายการค่าน้ำมัน</h1><h4><small>รายงานรายการค่าน้ำมัน</small></h4>
        </div>
    </div>
</div>
<div id="form_inreportfule">
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
                <div id="form_InReportfulelist"></div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtVat" class="text-right" style="line-height: 34px;">ภาษี :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtVat" name="txtVat" placeholder="ภาษี" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <label for="txtTotal" class="text-right" style="line-height: 34px;">ค่าน้ำมันรวม :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group" style="margin-bottom: 0px;">
                            <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ยอดสุทธิ" disabled value="0.00">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>