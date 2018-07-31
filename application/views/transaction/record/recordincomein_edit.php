<?php echo js_asset('views/transaction/record/recordincomein_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_incomeinedit">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-8">
                    <!--                    <div class="form-group">
                                            <label for="txtDetail">รายละเอียด :</label>
                                            <div class="input-group">
                                                <div class="input-group-addon"><i class="fa fa-align-left" style="min-width: 20px;"></i></div>
                                                <input type="text" class="form-control" id="txtDetail" name="txtDetail" placeholder="รายละเอียด">
                                            </div>
                                        </div>-->
                    <div class="form-group">
                        <label for="cmdIncomeName">รายละเอียด :</label>
                        <select id="cmdIncomeName" name="cmdIncomeName" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-incomeNameNew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-0">
                    <div class="form-group">
                        <label for="txtAmount">จำนวนเงิน :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtAmount" name="txtAmount" placeholder="จำนวนเงิน">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>