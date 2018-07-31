$(function () {
    var form_Customeredit = $('#form_Customeredit');
    var form_Customeredit_C = $.modelDialog(form_Customeredit);

//    var _formdata = form_fule_C.data('data');
//    if (_formdata.key === Guid) {
//        setTitle(Guid);
//    } else {
//
//    }
var _formdata = form_Customeredit_C.data('data');
    if (_formdata.key === Guid) {
//        setTitle(Guid);
    } else {
        form_Customeredit.find('#txtCusCode').val(_formdata.CusCode);
        form_Customeredit.find('#txtUser').val(_formdata.Customer);
    }



   form_Customeredit_C.find('#btn-ok').on({
        click: function () {
            form_Customeredit.submit();
        }
    });

    form_Customeredit.myValidation({
        funsuccess: function () {
            form_Customeredit_C.data('fun')(form_Customeredit_C);
        },
        btnactive: [
            form_Customeredit_C.find('#btn-ok')
        ],
        fields: {
            txtUser: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุชื่อลูกค้า'
                    }
                }
            }
        }
    });
});
