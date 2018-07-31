$(function () {
    var form_bankedit = $('#form_bankedit');
    var form_bankedit_C = $.modelDialog(form_bankedit);
    
    var _formdata = form_bankedit_C.data('data');
    if (_formdata.key !== Guid) {
        
    } else {
        
    } 
    
    form_bankedit_C.find('#btn-ok').on({
        click: function () {
            form_bankedit.submit();
        }
    })

    form_bankedit.myValidation({
        funsuccess: function () {
            form_bankedit_C.data('fun')(form_bankedit_C);
        },
        btnactive: [
            form_bankedit_C.find('#btn-ok')
        ],
        fields: {
            txtBank: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อธนาคาร.'
                    }
                }
            }
        }
    });
});

