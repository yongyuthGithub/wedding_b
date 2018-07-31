<!DOCTYPE html>
<html lang="en">
    <head>

        <title>บริษัท พราว</title>
        <link rel="shortcut icon" href="<?php echo other_asset_url('images/logo.png'); ?>"
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <?php // echo css_asset('master/bootstrap.min.css') ?>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <?php // echo js_asset('master/jquery.min.js') ?>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <?php // echo js_asset('master/bootstrap.min.js') ?>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <?php // echo css_asset('master/font-awesome.min.css') ?>
        <?php echo css_asset('master/_site.css') ?>
        <?php echo css_asset('master/jquery.dataTables.min.css') ?>
        <?php echo css_asset('master/responsive.dataTables.min.css') ?>
        <?php echo css_asset('master/bootstrap-select.min.css') ?>
        <?php echo css_asset('master/checkbox_radiobox.css') ?>
        <?php echo css_asset('master/bootstrap-datetimepicker.min.css') ?>
        <?php echo css_asset('master/material_switch.css') ?>
        <?php echo css_asset('master/stimulsoft.viewer.office2013.whiteblue.css') ?>

        <?php echo js_asset('master/jquery.cookie.js') ?>
        <?php echo js_asset('master/linq.min.js') ?>
        <?php echo js_asset('master/formValidation.min.js') ?>
        <?php echo js_asset('master/bootstrap_validation.js') ?>
        <?php echo js_asset('master/jquery.dataTables.min.js') ?>
        <?php echo js_asset('master/dataTables.responsive.min.js') ?>
        <?php echo js_asset('master/bootstrap-dialog.min.js') ?>
        <?php echo js_asset('master/bootstrap-select.min.js') ?>
        <?php echo js_asset('master/jBootstrap-dialog.js') ?>
        <?php echo js_asset('master/jquery.cookie.js') ?>
        <?php echo js_asset('master/loadingoverlay.min.js') ?>
        <?php echo js_asset('master/loadingoverlay_progress.min.js') ?>
        <?php echo js_asset('master/moment.min.js') ?>
        <?php echo js_asset('master/locales.min.js') ?>
        <?php echo js_asset('master/bootstrap-datetimepicker.min.js') ?>
        <?php echo js_asset('master/highcharts.js') ?>
        <?php echo js_asset('master/highcharts-more.js') ?>
        <?php echo js_asset('master/stimulsoft.reports.js') ?>
        <?php echo js_asset('master/stimulsoft.viewer.js') ?>
        <?php echo js_asset('master/thaibath.js') ?>
        <?php echo js_asset('master/pdf.js') ?>
        <?php echo js_asset('master/pdf.worker.js') ?>
        <?php echo js_asset('master/jCustomPageMain.js') ?>
        <?php echo js_asset('master/jCommon.js') ?>
        <?php echo js_asset('views/layout/nav.js') ?>
        <style>
            .navbar {
                font-family: Montserrat, sans-serif;
                margin-bottom: 0;
                background-color: #2d2d30;
                border: 0;
                font-size: 11px !important;
                letter-spacing: 4px;
                opacity: 0.9;
            }
            .navbar li a, .navbar .navbar-brand { 
                color: #d5d5d5 !important;
            }
            .navbar-nav li a:hover {
                color: #fff !important;
            }
            .navbar-nav li.active a {
                color: #fff !important;
                background-color: #29292c !important;
            }
            .navbar-default .navbar-toggle {
                border-color: transparent;
            }
            .open .dropdown-toggle {
                color: #fff;
                background-color: #555 !important;
            }
            .dropdown-menu li a {
                color: #000 !important;
            }
            .dropdown-menu li a:hover {
                background-color: red !important;
            }

        </style>
    </head>
    <body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="50">

        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                    <a class="navbar-brand" href="<?php echo base_url('home/index') ?>"><?php echo image_asset('logo.png');?></a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav navbar-right">
<!--                        <li><a href="<?php echo base_url('home/index') ?>"><i class="fa fa-home" style="font-size:24px"></i>HOME</a></li>-->
                        <?php
                        if (isset($_COOKIE['samnartrun_login'])) {
                            $UserKey = $_COOKIE['samnartrun_login'];
                            $query = $this->db
                                    ->where('USRGroupAccount.AccountKey', $UserKey)
                                    ->from('USRGroupAccount')
                                    ->join('USRGroupSubMenu', 'USRGroupAccount.GroupKey=USRGroupSubMenu.GroupKey', 'inner')
                                    ->join('USRSubMenu', 'USRGroupSubMenu.SubMenuKey=USRSubMenu.RowKey', 'inner')
                                    ->join('USRMenu', 'USRSubMenu.MenuKey=USRMenu.RowKey', 'inner')
                                    ->group_by('USRMenu.RowKey, USRMenu.Menu, USRMenu.Seq, USRMenu.Icon')
                                    ->order_by('USRMenu.Seq', 'asc')
                                    ->select('USRMenu.RowKey, USRMenu.Menu, USRMenu.Seq, USRMenu.Icon')
                                    ->get();
                            foreach ($query->result() as $row) {
                                ?>
                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="line-height: 26px;font-size: 140%;"><i class="<?php echo $row->Icon; ?>" style="font-size:100%;min-width: 30px;"></i><?php echo $row->Menu; ?>
                                        <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <?php
                                        $queryS = $this->db
                                                ->where('USRGroupAccount.AccountKey', $UserKey)
                                                ->where('USRSubMenu.MenuKey', $row->RowKey)
                                                ->from('USRGroupAccount')
                                                ->join('USRGroupSubMenu', 'USRGroupAccount.GroupKey=USRGroupSubMenu.GroupKey', 'inner')
                                                ->join('USRSubMenu', 'USRGroupSubMenu.SubMenuKey=USRSubMenu.RowKey', 'inner')
                                                ->group_by('USRSubMenu.RowKey, USRSubMenu.SubMenu, USRSubMenu.Seq, USRSubMenu.Icon, USRSubMenu.Url')
                                                ->order_by('USRSubMenu.Seq', 'asc')
                                                ->select('USRSubMenu.RowKey, USRSubMenu.SubMenu, USRSubMenu.Seq, USRSubMenu.Icon, USRSubMenu.Url')
                                                ->get();
                                        foreach ($queryS->result() as $row2) {
                                            ?>                                        
                                            <li><a href="<?php echo base_url($row2->Url); ?>"><i class="<?php echo $row2->Icon; ?>" style="font-size:100%;min-width: 30px;"></i><?php echo $row2->SubMenu; ?></a></li>
                                            <?php
                                        }
                                        ?>
                                    </ul>
                                </li>
                                <?php
                            }
                        }
                        ?>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" style="line-height: 26px;font-size: 140%;"><i class="fa fa-exclamation-circle" style="font-size:100%;min-width: 30px;"></i>About
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a id="btn-manual" href="#" style="font-size:100%;min-width: 30px;" data-key="<?php echo other_asset_url('files/manual.pdf'); ?>"><i class="fa fa-book" style="font-size:100%;min-width: 30px;"></i>Manual</a></li>
                                <li><a id="btn-profile" href="#" style="font-size:100%;min-width: 30px;"><i class="fa fa-drivers-license" style="font-size:100%;min-width: 30px;"></i>Profile</a></li>
                                <li><a id="btn-logout" href="#" style="font-size:100%;min-width: 30px;"><i class="fa fa-user-circle" style="font-size:100%;min-width: 30px;"></i>Logout</a></li>
                            </ul>
                        </li>

                </div>
        </nav>
        <!-- Page content -->
        <div class="container" style="margin-top: 80px;">
            <?php $this->load->view($page); ?>
        </div>

        <script>
            $(document).ready(function () {
                // Initialize Tooltip
                $('[data-toggle="tooltip"]').tooltip();

                // Add smooth scrolling to all links in navbar + footer link
                $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

                    // Make sure this.hash has a value before overriding default behavior
                    if (this.hash !== "") {

                        // Prevent default anchor click behavior
                        event.preventDefault();

                        // Store hash
                        var hash = this.hash;

                        // Using jQuery's animate() method to add smooth page scroll
                        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 900, function () {

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash;
                        });
                    } // End if
                });
            })
        </script>
        <div id="btn-alert" rel="tooltip" data-html="true" style="z-index: 100;"><i class="fa fa-bell" style="font-size: 200%;color:#fff;"></i></div>
        <form id="form_sumbit" style="display: none;" method="post"></form>
        <input type="hidden" id="hidUrl" value="<?php echo base_url(); ?>"/>
    </body>
</html>
