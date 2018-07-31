<?php echo js_asset('views/transaction/Receipt/receiptbill_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_newbill">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdNewBill">รายการบิล :</label>
                    <select id="cmdNewBill" name="cmdNewBill" class="form-control selectpicker show-menu-arrow"
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
