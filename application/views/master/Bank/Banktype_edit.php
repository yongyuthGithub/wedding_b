<?php echo js_asset('views/Bank/Banktype_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Banktype">
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;ตั้งเป็นค่าเริ่มต้น :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtbranch">สาขาธนาคาร :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtbranch" name="txtbranch" placeholder="ชื่อสาขา">
                    </div>
                </div>
            </div>
             
              
        </form>
    </div>
</div>
