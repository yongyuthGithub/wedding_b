$(function () {
    var form_add_function = $('#form_add_function');
    var form_add_function_C = $.modelDialog(form_add_function);

    form_add_function.find('#cmdFunction').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    setDataAjax(form_add_function_C.data('key'));
    function setDataAjax(v) {
        var _old = $.ToLinq(form_add_function_C.data('data'))
                .Select(function (x) {
                    return x.key;
                }).ToArray();
        $.reqData({
            url: mvcPatch('pemission/findFunction'),
            data: {vdata: JSON.stringify(_old)},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_add_function.find('#cmdFunction').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-folder" value="' + v.RowKey + '" data-menu="' + v.Menu + '" data-submenu="' + v.SubMenu + '" data-decs="' + v.Description + '">&nbsp;&nbsp;' + v.Menu + ' -> ' + v.SubMenu + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_add_function_C.find('#btn-ok').on({
        click: function () {
            form_add_function.submit();
        }
    });

    form_add_function.myValidation({
        funsuccess: function () {
            form_add_function_C.data('fun')(form_add_function_C);
        },
        btnactive: [
            form_add_function_C.find('#btn-ok')
        ],
        fields: {
            cmdFunction: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify as function only.'
                    }
                }
            }
        }
    });
});