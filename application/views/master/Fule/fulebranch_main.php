<?php echo css_asset('views/fule/fulebranch_main.css') ?>
<?php echo js_asset('views/fule/fulebranch_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลสาขาปั้มเชื้อเพลิง</h1><h4><small>ข้อมูลสาขาปั้มเชื้อเพิลงของ <?php echo $_POST['txtdisplay']; ?></small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url('fule/index') ?>">หน้าหลัก</a></li>
                <li class="active"><?php echo $_POST['txtdisplay']; ?></li>
            </ol>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <div id="form_fulebranch"></div>
        </div>
    </div>
</div>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />