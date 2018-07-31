<?php echo css_asset('views/car/car_main.css') ?>
<?php echo js_asset('views/Car/Car_main.js') ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>ข้อมูลรถขนส่ง</h1><h4><small>จัดการข้อมูลรถขนส่ง</small></h4>
        </div>
    </div>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#HeadCar">ส่วนหัว</a></li>
                <li><a data-toggle="tab" href="#TailCar">ส่วนหาง</a></li>
            </ul>

            <div class="tab-content">
                <div id="HeadCar" class="tab-pane fade in active" style="padding-top: 20px;">
                    <div id="form_Car"></div>
                </div>
                <div id="TailCar" class="tab-pane fade" style="padding-top: 20px;">
                    <div id="form_Car1"></div>
                </div>
            </div>    
        </div>
    </div>
</div>

 