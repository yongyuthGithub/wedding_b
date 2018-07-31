<?php echo js_asset('views/Shipping/Shipping_edit.js')   ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Shippingedit">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtLocationName">สถานที่ รับ-ส่ง :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtLocationName" name="txtLocationName" placeholder="ระบุสถานที่ รับ-ส่ง สินค้า">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtContact">ติดต่อ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-phone" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtContact" name="txtContact" placeholder="ระบุการติดต่อ">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
