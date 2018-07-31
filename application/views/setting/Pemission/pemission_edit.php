<?php echo css_asset('views/setting/pemission/pemission_edit.css'); ?>
<?php echo js_asset('views/setting/pemission/pemission_edit.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#Detail">Detail</a></li>
                <li><a data-toggle="tab" href="#Account">Account</a></li>
                <li><a data-toggle="tab" href="#Function">Function</a></li>
            </ul>

            <div class="tab-content">
                <div id="Detail" class="tab-pane fade in active" style="padding-top: 20px;">
                    <form id="form_Detail">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="txtDetail">Pemission Name :</label>
                                <div class="input-group">
                                    <div class="input-group-addon"><i class="fa fa-unlock-alt" style="min-width: 20px;"></i></div>
                                    <input type="text" class="form-control" id="txtDetail" name="txtDetail" placeholder="Input Pemission Name">
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
                <div id="Account" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_Account"></div>
                </div>
                <div id="Function" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_Function"></div>
                </div>
            </div>    
        </div>
    </div>
</div>