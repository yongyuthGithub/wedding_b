<?php echo js_asset('views/setting/docSeq/docseq_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_docseqedit">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtDocName">Doc Name :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-bars" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtDocName" name="txtDocName" placeholder="Input Doc Name">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-7">
                <div class="form-group">
                    <label for="txtPattern">Pattern :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-hashtag" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtPattern" name="txtPattern" placeholder="Input Pattern">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-5">
                <div class="form-group">
                    <label for="txtPoint">Point :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-ellipsis-h" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control text-right" id="txtPoint" name="txtPoint" placeholder="Input Pont">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="txtSeq" id="lblSeq">Seq :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-unsorted" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control text-right" id="txtSeq" name="txtSeq" placeholder="Input Seq">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>