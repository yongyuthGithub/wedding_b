$(function () {
    var form_Shippingedit = $('#form_Shippingedit');
    var form_Shippingedit_C = $.modelDialog(form_Shippingedit);

    var _formdata = form_Shippingedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_Shippingedit.find('#txtLocationName').val(_formdata.LocationName);
        form_Shippingedit.find('#txtContact').val(_formdata.Contact);
    } else {

    }

    form_Shippingedit_C.find('#btn-ok').on({
        click: function () {
            form_Shippingedit.submit();
        }
    });

    form_Shippingedit.myValidation({
        funsuccess: function () {
            form_Shippingedit_C.data('fun')(form_Shippingedit_C);
        },
        btnactive: [
            form_Shippingedit_C.find('#btn-ok')
        ],
        fields: {
            txtLocationName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุสถานที่ รับ-ส่ง'
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


