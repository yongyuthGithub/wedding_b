$(function () {
    var form_Incomeedit = $('#form_Incomeedit');
    var form_Incomeedit_C = $.modelDialog(form_Incomeedit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
    var _formdata = form_Incomeedit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_Incomeedit.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.DocDate));
         form_Incomeedit.find('#txtUser2').val(_formdata.Detial);
        form_Incomeedit.find('#cmdTitle').val(_formdata.IncomeType).selectpicker('render');
        form_Incomeedit.find('#txtUser3').val(_formdata.Amount);
        
        
        form_Incomeedit.find('.showinadd').remove();

//        setTitle(_formdata.TitleKey);
    }
    form_Incomeedit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });

    form_Incomeedit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_Incomeedit.formValidation('revalidateField', form_Incomeedit.find('#txtUser5'));
    });
    form_Incomeedit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });

    form_Incomeedit_C.find('#btn-ok').on({
        click: function () {
            form_Incomeedit.submit();
        }
    });

    form_Incomeedit.myValidation({
        funsuccess: function () {
            form_Incomeedit_C.data('fun')(form_Incomeedit_C);
        },
        btnactive: [
            form_Incomeedit_C.find('#btn-ok')
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
