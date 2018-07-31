$(function () {
    var form_sumbit = $('#form_sumbit');

    if ($('#loginUrl').length === 0) {
        $.reqData({
            url: mvcPatch('home/chkLoginCookie'),
            loanding: false,
            callback: function (vdata) {
                if (vdata.success) {
                    //javascript code
                } else {
                    form_sumbit.prop('action', mvcPatch('home/index')).submit();
                }
            }
        });
    }

    $('#btn-logout').off().on({
        click: function () {
            $.cookie('samnartrun_login', '', {path: '/', expires: -1});
            $.cookie('samnartrun_token', '', {path: '/', expires: -1});
            form_sumbit.prop('action', mvcPatch('home/index')).submit();
        }
    });

    $('#btn-manual').off().on({
        click: function () {
            window.open($(this).data('key'));
        }
    });

    $('#btn-profile').off().on({
        click: function () {
            $.bPopup({
                url: mvcPatch('home/profile'),
                title: 'Login Profile',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                }
            });
        }
    });

    genHtml();
    function genHtml() {
        $('#myPage').on('click', '.use-alert > li', function () {
            var _this = $(this);
            form_sumbit.SetDataPost({
                data: {
                    txtkey: _this.data('key'),
                    txtdisplay: _this.data('display')
                }
            }).prop('action', mvcPatch(_this.data('path'))).submit();
        });

        $.reqData({
            url: mvcPatch('MySystem/findAllMyAlert'),
            loanding: false,
            callback: function (vdata) {
                if (vdata.length > 0) {
                    var _tooltipDisplay = '<ul class="list-group use-alert">';
                    $.each(vdata, function (k, v) {
                        _tooltipDisplay += '<li class="list-group-item" data-key="' + v.RowKey + '" data-path="' + v.Path + '" data-display="' + v.Display + '"><i class="' + v.Type + '" style="min-width:20px;"></i>' + v.Text + ' ' + PHP_JSON_To_ShowDate(v.ExpDate) + '</li>';
                    });
                    _tooltipDisplay += '</ul>';

                    $('#btn-alert').tooltip({
//       selector: "[rel=tooltip]",
                        placement: "top",
                        html: true,
                        container: '#btn-alert'
//        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
//       title:_tooltipDisplay
                    }).attr('data-original-title', _tooltipDisplay);
                    $('#btn-alert').css('display', 'block');
                } else {
                    $('#btn-alert').css('display', 'none');
                }
            }
        });


    }


});

