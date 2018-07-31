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
        form_Incomeedit.find('#txtDocID').val(_formdata.DocID);
        form_Incomeedit.find('#txtUser2').val(_formdata.Detial);
        form_Incomeedit.find('#cmdTitle').val(_formdata.IncomeType).selectpicker('render');
        form_Incomeedit.find('#txtUser3').val(_formdata.Amount);
        form_Incomeedit.find('#swDF').prop('checked', parseInt(_formdata.IsVat) ? true : false);

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
            txtUser5: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุวันที่เอกสาร'
                    }
                }
            },
            txtDocID: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขที่บิล'
                    }
                }
            },
            cmdTitle: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุประเภทรายการ'
                    }
                }
            },
            txtUser3: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุจำนวนเงิน'
                    }
                }
            }
        }
    });
});
