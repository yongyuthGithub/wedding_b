<?php echo css_asset('views/setting/menu/menu_main.css'); ?>
<?php echo js_asset('views/setting/menu/menu_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>Menu Manage</h1><h4><small>Manage menu data in the system.</small></h4>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#Menu">Menu</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="btnOrderMenu">Order Menu</a></li>
                    </ul>
                </li>
                <li><a data-toggle="tab" href="#SubMenu">Sub Menu</a></li>
            </ul>

            <div class="tab-content">
                <div id="Menu" class="tab-pane fade in active" style="padding-top: 20px;">
                    <div id="form_menu"></div>
                </div>
                <div id="SubMenu" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_submenu"></div>
                </div>
            </div>    
        </div>
    </div>
</div>