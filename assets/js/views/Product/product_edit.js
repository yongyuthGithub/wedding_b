$(function () {
    var form_Productdit = $('#form_Productdit');
    var form_Productdit_C = $.modelDialog(form_Productdit);

    var _formdata = form_Productdit_C.data('data');
    if (_formdata.key !== Guid) {
        form_Productdit.find('#txtProductName').val(_formdata.ProductName);
    } else {

    }

    form_Productdit_C.find('#btn-ok').on({
        click: function () {
            form_Productdit.submit();
        }
    });

    form_Productdit.myValidation({
        funsuccess: function () {
            form_Productdit_C.data('fun')(form_Productdit_C);
        },
        btnactive: [
            form_Productdit_C.find('#btn-ok')
        ],
        fields: {
            txtProductName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อสินค้า'
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


