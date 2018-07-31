<?php echo js_asset('views/transaction/Receipt/receiptbankbranch_new.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_bankbranchedit">
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
                    <label for="txtBankBranch">ชื่อสาขาธนาคาร :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-money" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtBankBranch" name="txtBankBranch" placeholder="ชื่อสาขาธนาคาร">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
