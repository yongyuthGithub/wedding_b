<?php echo js_asset('views/insurance/insurancetype_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_insurancetypeedit">            
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdTypeUse">กลุ่มประกัน :</label>
                    <select id="cmdTypeUse" name="cmdTypeUse" class="form-control selectpicker show-menu-arrow"
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
                        <option data-icon="fa fa-drivers-license-o" value="1" data-display="บุคคล">บุคคล</option>
                        <option data-icon="fa fa-drivers-license-o" value="2" data-display="ยานพหานะ">ยานพหานะ</option>
                        <option data-icon="fa fa-drivers-license-o" value="3" data-display="สินค้า">ประกันสินค้า</option>
                    </select>
                </div>
            </div>
             <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtTypeName">ชื่อประกัน :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-card-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtTypeName" name="txtTypeName" placeholder="ชื่อประกัน">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>