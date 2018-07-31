$(function () {
    var form_fuleedit = $('#form_fuleedit');
    var form_fuleedit_C = $.modelDialog(form_fuleedit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
var _formdata = form_fuleedit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_fuleedit.find('#txtUser').val(_formdata.Fuel);
        form_fuleedit.find('#cmdTitle').val(_formdata.FuelType).selectpicker('render');
        form_fuleedit.find('#swDF').prop('checked', parseInt(_formdata.IsDefault) === 1 ? true : false);
        form_fuleedit.find('.showinadd').remove();
        
//        setTitle(_formdata.TitleKey);
    }
    form_fuleedit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });



    form_fuleedit_C.find('#btn-ok').on({
        click: function () {
            form_fuleedit.submit();
        }
    });

    form_fuleedit.myValidation({
        funsuccess: function () {
            form_fuleedit_C.data('fun')(form_fuleedit_C);
        },
        btnactive: [
            form_fuleedit_C.find('#btn-ok')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify User Name.'
                    }
                }
            },
            cmdTitle: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Title.'
                    }
                }
            },
            txtFirstName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify First Name.'
                    }
                }
            },
            txtLastName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Last Name.'
                    }
                }
            },
            txtPassword: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    }
                }
            }
        }
    });
});
