<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลAdmin</h1><h4><small>เพิ่มข้อมูลAdmin</small></h4>
</div>-->
<?php echo js_asset('views/admin/admin_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_adminedit">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">User Name :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user-circle" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser" name="txtUser" placeholder="Input User Name">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdTitle">Title :</label>
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
                    </select>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtFirstName">First Name :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-vcard" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtFirstName" name="txtFirstName" placeholder="Input First Name">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtLastName">Last Name :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-vcard" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtLastName" name="txtLastName" placeholder="Input Last Name">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdPemission">Pemission :</label>
                    <select id="cmdPemission" name="cmdPemission" class="form-control selectpicker show-menu-arrow"
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
            <div class="col-xs-12 showinadd">
                <div class="form-group">
                    <label for="txtPassword">Password :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-ellipsis-h" style="min-width: 20px;"></i></div>
                        <input type="password" class="form-control" id="txtPassword" name="txtPassword" placeholder="Input Password">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 showinadd">
                <div class="form-group">
                    <label for="txtConfirmPassword">Confirm Password :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-ellipsis-h" style="min-width: 20px;"></i></div>
                        <input type="password" class="form-control" id="txtConfirmPassword" name="txtConfirmPassword" placeholder="Input Confirm Password">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>