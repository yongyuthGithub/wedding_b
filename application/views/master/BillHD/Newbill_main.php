<?php echo css_asset('views/transaction/record/record_main.css'); ?>
<?php echo js_asset('views/BillHD/Newbill_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>รายการเพิ่มบิล</h1><h4><small>จัดการรายการเพิ่มบิล</small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url('BillHD/index') ?>">หน้าหลัก</a></li>
            </ol>
        </div>
    </div>
</div>
<div id="form_search">
    <div class="col-12">   
        <div class="panel panel-default">
            <!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-9">
                        <div class="form-group">
                            <label for="cmdCustomer">บริษัท :</label>
                            <select id="cmdCustomer" name="cmdCustomer" class="form-control selectpicker show-menu-arrow"
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
                </div>
                <hr>
                <div id="form_newbill"></div>
            </div>
        </div>
    </div>
</div>
