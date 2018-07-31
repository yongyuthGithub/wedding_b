<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลปั้มน้ำมัน</h1><h4><small>ข้อมูลปั้มน้ำมัน</small></h4>
</div>-->
<?php echo js_asset('views/fuletype/fuletype_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_fuleedit">
            <div class="col-xs-12 col-sm-5 col-sm-offset-7">
                <div class="form-group">
                    <label for="swDF">&nbsp;&nbsp;ตั้งเป็นค่าเริ่มต้น :</label>
                    <div class="material-switch pull-right">
                        <input id="swDF" name="swDF" type="checkbox"/>
                        <label for="swDF" class="label-success"></label>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">ชื่อปั้ม:</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="	fa fa-paypal" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser" name="txtUser" placeholder="Input Name Pump">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdTitle">ประเภท :</label>
                    <select id="cmdTitle" name="cmdTitle" class="form-control selectpicker show-menu-arrow"
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
                        <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;น้ำมัน</option>
                        <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;แก๊ซ</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
</div>

