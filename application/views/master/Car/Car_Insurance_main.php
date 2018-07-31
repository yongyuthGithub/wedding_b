<?php echo css_asset('views/car/car_insurance_main.css') ?>
<?php echo js_asset('views/Car/Car_Insurance_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลประเภทประกัน</h1><h4><small>ข้อมูลประเภทประกันของรถ <?php echo $_POST['txtdisplay']; ?></small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url('car/index') ?>">หน้าหลัก</a></li>
                <li class="active"><?php echo $_POST['txtdisplay']; ?></li>
            </ol>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#Insurance">ประกันรถยนต์/ประกันสินค้า</a></li>
                <li><a data-toggle="tab" href="#Act">พ.ร.บ/ภาษี</a></li> 
            </ul>

            <div class="tab-content">
                <div id="Insurance" class="tab-pane fade in active" style="padding-top: 20px;">
                    <div id="form_carinsurance"></div>
                </div>
                <div id="Act" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_caract"></div>
                </div>
            </div>    
        </div>
    </div>
</div>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />
