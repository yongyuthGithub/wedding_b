$(function () {
    var form_insurancetypeedit = $('#form_insurancetypeedit');
    var form_insurancetypeedit_C = $.modelDialog(form_insurancetypeedit);

    var _formdata = form_insurancetypeedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_insurancetypeedit.find('#txtTypeName').val(_formdata.TypeName);
        form_insurancetypeedit.find('#cmdTypeUse').val(_formdata.TypeUse).selectpicker('render');
    }

    form_insurancetypeedit.find('#cmdTypeUse').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    form_insurancetypeedit_C.find('#btn-ok').on({
        click: function () {
            form_insurancetypeedit.submit();
        }
    });

    form_insurancetypeedit.myValidation({
        funsuccess: function () {
            form_insurancetypeedit_C.data('fun')(form_insurancetypeedit_C);
        },
        btnactive: [
            form_insurancetypeedit_C.find('#btn-ok')
        ],
        fields: {
            cmdTypeUse: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุกลุ่มประกัน'
                    }
                }
            },
            txtTypeName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อประกัน'
                    }
                }
            }
        }
    });
});

