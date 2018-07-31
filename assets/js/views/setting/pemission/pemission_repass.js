$(function () {
    var form_Pass = $('#form_Pass');
    var form_Pass_C = $.modelDialog(form_Pass);

    form_Pass_C.find('#btn-ok').on({
        click: function () {
            form_Pass.submit();
        }
    });

    form_Pass.myValidation({
        funsuccess: function () {
            form_Pass_C.data('fun')(form_Pass_C);
        },
        btnactive: [
            form_Pass_C.find('#btn-ok')
        ],
        fields: {
            txtPass: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Password.'
                    },
                    callback: {//***Custom Validation
                        message: '* Re-enter the code.',
                        callback: function (value, validator, $field) {
                            form_Pass.formValidation('revalidateField', form_Pass.find('#txtConfirmPass'));
                            return true;
                        }
                    }
                }
            },
            txtConfirmPass: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Confirm Password.'
                    },
                    callback: {//***Custom Validation
                        message: '* Re-enter the code.',
                        callback: function (value, validator, $field) {
//                            form_adminedit.formValidation('revalidateField', form_adminedit.find('#txtPassword'));
                            return checkPass();
                        }
                    }
                }
            }
        }
    });

    function checkPass() {
        if (form_Pass.find('#txtPass').val() === form_Pass.find('#txtConfirmPass').val()) {
            return true;
        } else {
            return false;
        }
    }
});


