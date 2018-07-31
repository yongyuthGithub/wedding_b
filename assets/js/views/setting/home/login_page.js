$(function () {
    var form_login = $('#form_login');
    var form_login_C = $.modelDialog(form_login);
    var form_sumbit = $('#form_sumbit');

    form_login_C.find('#btn-login').on({
        click: function () {
            form_login.submit();
        }
    });

    form_login.find('#txtUser').on('keypress', function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode === 13) {
            form_login.find('#txtPass').focus();
        }
    });

    form_login.find('#txtPass').on('keypress', function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode === 13) {
            form_login_C.find('#btn-login').click();
        }
    });

    form_login.myValidation({
        funsuccess: function () {
            $.reqData({
                url: mvcPatch('home/chkLogin'),
                data: {
                    user: form_login.find('#txtUser').val(),
                    pass: form_login.find('#txtPass').val()
                },
                loanding: false,
                callback: function (vdata) {
                    if (vdata.success) {
                        form_sumbit.prop('action', mvcPatch('home/main')).submit();
                    } else {
                        $.bAlert({
                            message: vdata.message
                        });
                    }
                }
            });
        },
        btnactive: [
            form_login_C.find('#btn-login')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify email'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpMail,
                        message: '* Please specify as email only.'
                    }
                }
            },
            txtPass: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify password'
                    }
                }
            }
        }
    });

    $('#myPage').find('button[type="submit"]').remove();
});


