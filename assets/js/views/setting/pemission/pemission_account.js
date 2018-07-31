$(function () {
    var form_add_account = $('#form_add_account');
    var form_add_account_C = $.modelDialog(form_add_account);

    form_add_account.find('#cmdAccount').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    setDataAjax(form_add_account_C.data('key'));
    function setDataAjax(v) {
        var _old = $.ToLinq(form_add_account_C.data('data'))
                .Select(function (x) {
                    return x.key;
                }).ToArray();
        $.reqData({
            url: mvcPatch('pemission/findAccount'),
            data: {vdata: JSON.stringify(_old)},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_add_account.find('#cmdAccount').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-user-circle" value="' + v.RowKey + '" data-display="' + v.User + '" data-name="' + v.FName + '">&nbsp;&nbsp;' + v.User + ' -> ' + v.FName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_add_account_C.find('#btn-ok').on({
        click: function () {
            form_add_account.submit();
        }
    });

    form_add_account.myValidation({
        funsuccess: function () {
            form_add_account_C.data('fun')(form_add_account_C);
        },
        btnactive: [
            form_add_account_C.find('#btn-ok')
        ],
        fields: {
            cmdAccount: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify as account only.'
                    }
                }
            }
        }
    });
});


