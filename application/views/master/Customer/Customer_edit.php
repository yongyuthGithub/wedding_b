<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo js_asset('views/customer/Customer_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Customeredit">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtCusCode">รหัสลูกค้า :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-address-card-o" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtCusCode" name="txtCusCode" placeholder="รหัสลูกค้า">
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">ชื่อลูกค้า :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-child" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtUser" name="txtUser" placeholder="ชื่อลูกค้า">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

