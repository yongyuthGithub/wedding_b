$(function () {
    var form_Incomenameedit = $('#form_Incomenameedit');
    var form_Incomenameedit_C = $.modelDialog(form_Incomenameedit);

    var _formdata = form_Incomenameedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_Incomenameedit.find('#txtIncomeName').val(_formdata.IncomeName);
    } else {

    }

    form_Incomenameedit_C.find('#btn-ok').on({
        click: function () {
            form_Incomenameedit.submit();
        }
    });

    form_Incomenameedit.myValidation({
        funsuccess: function () {
            form_Incomenameedit_C.data('fun')(form_Incomenameedit_C);
        },
        btnactive: [
            form_Incomenameedit_C.find('#btn-ok')
        ],
        fields: {
            txtIncomeName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อรายรับ-รายจ่าย'
                    }
                    //regexp: {//***Custom Patter
                    //    regexp: regexpMail,
                    //    message: '* Please specify as email only.'
                    //},
                    //callback: {//***Custom Validation
                    //    message: '* Re-enter the code.',
                    //    callback: function (value, validator, $field) {
                    //        //form_adminedit.formValidation('revalidateField', form_adminedit.find('#txtConfirmPassword'));
                    //        return true;
                    //    }
                }
            }
        }
    });
});


