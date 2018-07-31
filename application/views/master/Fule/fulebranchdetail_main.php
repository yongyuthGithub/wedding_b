<?php echo css_asset('views/fule/fulebranchdetail_main.css') ?>
<?php echo js_asset('views/fule/fulebranchdetail_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลเชื้อเพลิงภายในปั้ม <?php echo $_POST['txtdisplay']; ?></h1><h4><small>ข้อมูลเชื้อเพลิงภายในปั้ม <?php echo $_POST['txtdisplay']; ?> สาขา <?php echo $_POST['txtdisplay2']; ?></small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url('fule/index') ?>">หน้าหลัก</a></li>
                <li><a href="#" id="tobranch"><?php echo $_POST['txtdisplay']; ?></a></li>
                <li class="active"><?php echo $_POST['txtdisplay2']; ?></li>
            </ol>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <div id="form_fuledetail"></div>
        </div>
    </div>
</div>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />
<input type="hidden" id="txtdisplay" value="<?php echo $_POST['txtdisplay']; ?>" />
<input type="hidden" id="txtkey2" value="<?php echo $_POST['txtkey2']; ?>" />
<input type="hidden" id="txtdisplay2" value="<?php echo $_POST['txtdisplay2']; ?>" />
