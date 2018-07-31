$(function () {
    var form_subedit = $('#form_subedit');
    var form_subedit_C = $.modelDialog(form_subedit);

    var _formdata = form_subedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_subedit.find('#txtSubMenu').val(_formdata.SubMenu);
        form_subedit.find('#txtIcon').val(_formdata.Icon);
        form_subedit.find('#txtUrl').val(_formdata.Url);
        form_subedit.find('#txtDescription').val(_formdata.Description);
        setMenu(_formdata.MenuKey);
    } else {
        setMenu(Guid);
    }

    form_subedit.find('#cmdMenu2').selectpicker({
    }).on({
        change: function () {
            alert($(this).val());
        }
    });

    function setMenu(v) {
        $.reqData({
            url: mvcPatch('menu/findMenu'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_subedit.find('#cmdMenu').empty();
                var _data = $.ToLinq(vdata)
                        .OrderBy(x => parseInt(x.Seq))
                        .ToArray();
                var _html = '';
                $.each(_data, function (k, v) {
                    _html += '<option data-icon="fa fa-folder-open" value="' + v.key + '" data-display="' + v.Menu + '">&nbsp;&nbsp;' + v.Menu + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }
    
    
    
    form_subedit_C.find('#btn-ok').on({
        click: function () {
            form_subedit.submit();
        }
    });
    
    form_subedit.myValidation({
        funsuccess: function () {
            
            form_subedit_C.data('fun')(form_subedit_C);
        },
        btnactive: [
            form_subedit_C.find('#btn-ok')
        ],
        fields: {
            txtSubMenu: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Sub Menu Name.'
                    }
                }
            },
            cmdMenu: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Main Menu.'
                    }
                }
            }
        }
    });
});