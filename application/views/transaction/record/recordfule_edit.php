<?php echo js_asset('views/transaction/record/recordfule_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_recordfuleedit">
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdFule">ปั้ม :</label>
                        <select id="cmdFule" name="cmdFule" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-fulenew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdFuleBranch">สาขา :</label>
                        <select id="cmdFuleBranch" name="cmdFuleBranch" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-fulebranchnew' class='btn btn-success'>เพิ่ม</div>"
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
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdFuleType">ประเภทน้ำมัน :</label>
                        <select id="cmdFuleType" name="cmdFuleType" class="form-control selectpicker show-menu-arrow"
                                data-width="100%"
                                data-show-Tick="true"
                                data-tick-Icon="fa fa-check"
                                data-size="5"
                                data-header="<div id='btn-fuletypenew' class='btn btn-success'>เพิ่ม</div>"
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
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="txtMile">เลขไมล์ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-align-left" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtMile" name="txtMile" placeholder="เลขไมล์ก่อนเติม">
                        </div>
                    </div>
                </div>

            </div> 
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-8">
                    <div class="form-group">
                        <label for="txtRefer">เลขที่บิล :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-hashtag" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtRefer" name="txtRefer" placeholder="เลขที่บิล">
                        </div>
                    </div>
                </div>
                <!--                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <div class="form-group">
                                        <label for="txtAmount">จำนวนเงิน :</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control text-right" id="txtAmount" name="txtAmount" placeholder="จำนวนเงิน">
                                        </div>
                                    </div>
                                </div>-->
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="form-group">
                        <label for="txtItem">จำนวน (ลิตร) :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-flask" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtItem" name="txtItem" placeholder="จำนวน (ลิตร)">
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                    <div class="form-group">
                        <label for="txtItemPrice">จำนวนเงินรวม :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtItemPrice" name="txtItemPrice" placeholder="จำนวนเงินรวม">
                        </div>
                    </div>
                </div>
            </div> 
        </form>            
    </div>        
</div>
