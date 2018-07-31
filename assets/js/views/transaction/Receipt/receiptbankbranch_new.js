$(function () {
    var form_bankbranchedit = $('#form_bankbranchedit');
    var form_bankbranchedit_C = $.modelDialog(form_bankbranchedit);
    
    var _formdata = form_bankbranchedit_C.data('data');
    if (_formdata.key !== Guid) {
        
    } else {
        
    } 
    
    form_bankbranchedit_C.find('#btn-ok').on({
        click: function () {
            form_bankbranchedit.submit();
        }
    })

    form_bankbranchedit.myValidation({
        funsuccess: function () {
            form_bankbranchedit_C.data('fun')(form_bankbranchedit_C);
        },
        btnactive: [
            form_bankbranchedit_C.find('#btn-ok')
        ],
        fields: {
            txtBankBranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อสาขาธนาคาร.'
                    }
                }
            }
        }
    });
});
