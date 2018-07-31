<?php echo js_asset('views/setting/pemission/pemission_account.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_add_account">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdAccount">บัญชีผู้ใช้ :</label>
                    <select id="cmdAccount" name="cmdAccount" class="form-control selectpicker show-menu-arrow"
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
