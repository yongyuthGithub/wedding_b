<?php echo js_asset('views/setting/menu/menu_subedit.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <form id="form_subedit">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtSubMenu">Sub Menu Name :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-folder" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtSubMenu" name="txtSubMenu" placeholder="Input Sub Menu Name">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="cmdMenu">Menu :</label>
                        <select id="cmdMenu" name="cmdMenu" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="false"
                                data-live-Search="true"
                                data-live-Search-Placeholder="key word"
                                data-multiple-Separator=",&nbsp;&nbsp;"
                                data-actions-Box="false"
                                data-selectAll-Text="Select All"
                                data-deselectAll-Text="Deselect All"
                                data-selected-Text-Format="count > 3">
                        </select>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtIcon">Icon :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-barcode" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtIcon" name="txtIcon" placeholder="Input Sub Menu Icon">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtUrl">Url Page :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-code" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtUrl" name="txtUrl" placeholder="Input Url Page Index">
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