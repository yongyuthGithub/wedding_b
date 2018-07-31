<?php echo js_asset('views/transaction/bill/billnewrecord_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_newrecord">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdNewRecord">รายการใบงาน :</label>
                    <select id="cmdNewRecord" name="cmdNewRecord" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="true"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="true"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3" multiple>
                    </select>
                </div>
            </div>
        </form>
    </div>
</div>
