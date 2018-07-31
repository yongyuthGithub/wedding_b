<?php echo js_asset('views/setting/menu/menu_edit.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <form id="form_menuedit">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtMenu">Menu Name :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-folder-open" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtMenu" name="txtMenu" placeholder="Input Menu Name">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtIcon">Icon :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtIcon" name="txtIcon" placeholder="Input Menu Icon">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtDescription">Description :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-paint-brush" style="min-width: 20px;"></i></div>
                            <textarea class="form-control" id="txtDescription" name="txtDescription" placeholder="Input Description"></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
