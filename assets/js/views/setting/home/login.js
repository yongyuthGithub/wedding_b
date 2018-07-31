$(function () {
    var form_sumbit = $('#form_sumbit');

    var _title = '';
    var _pageurl = '';
    var _btn = new Array();
    if (parseInt($('#loginUrl').val()) === 0) {
        _title = 'Login';
        _pageurl = 'home/popupLogin';
        _btn = new Array(
                {
                    id: 'btn-login',
                    icon: 'fa fa-key',
                    label: '&nbsp;Login',
                    cssClass: BootstrapDialog.TYPE_SUCCESS,
                    action: function (k) {
                        //javascript code
                    }
                },
                {
                    id: 'btn-register',
                    icon: 'fa fa-refresh',
                    label: '&nbsp;Forget',
                    cssClass: BootstrapDialog.TYPE_PRIMARY,
                    action: function (k) {
                        form_sumbit.SetDataPost({
                            data: {
                                loginUrl: 1
                            }
                        }).prop('action', mvcPatch('home/index')).submit();
                    }
                }
        );
    } else {
        _title = 'Forget Password';
        _pageurl = 'home/popupForget';
        _btn = new Array(
                {
                    id: 'btn-send',
                    icon: 'fa fa-send',
                    label: '&nbsp;Send',
                    cssClass: BootstrapDialog.TYPE_SUCCESS,
                    action: function (k) {
                        //javascript code
                    }
                },
                {
                    id: 'btn-register',
                    icon: 'fa fa-reply',
                    label: '&nbsp;Back',
                    cssClass: BootstrapDialog.TYPE_PRIMARY,
                    action: function (k) {
                        form_sumbit.SetDataPost({
                            data: {
                                loginUrl: 0
                            }
                        }).prop('action', mvcPatch('home/index')).submit();
                    }
                }
        );
    }

    $.reqData({
        url: mvcPatch('home/chkLoginCookie'),
        loanding: false,
        callback: function (vdata) {
            if (vdata.success) {
               form_sumbit.prop('action', mvcPatch('home/main')).submit();
            } else {
                $.bPopup({
                    url: mvcPatch(_pageurl),
                    title: _title,
                    closable: false,
                    btnCancel: false,
                    size: BootstrapDialog.SIZE_NORMAL,
                    onshow: function (k) {
                    },
                    buttons: _btn
                });
            }
        }
    });


});
