$(function () {
    var form_forget = $('#form_forget');
    var form_forget_C = $.modelDialog(form_forget);

    form_forget_C.find('#btn-send').on({
        click: function () {
            form_forget.submit();
        }
    });

    form_forget.myValidation({
        funsuccess: function () {
            
        },
        btnactive: [
            form_forget_C.find('#btn-send')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify as email only.'
                    }
                }
            }
        }
    });
});