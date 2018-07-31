$(function () {
    var form_menuedit = $('#form_menuedit');
    var form_menuedit_C = $.modelDialog(form_menuedit);

    var _formdata = form_menuedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_menuedit.find('#txtMenu').val(_formdata.Menu);
        form_menuedit.find('#txtDescription').val(_formdata.Description);
        form_menuedit.find('#txtIcon').val(_formdata.Icon);
    }

    form_menuedit_C.find('#btn-ok').on({
        click: function () {
            form_menuedit.submit();
        }
    });

    form_menuedit.myValidation({
        funsuccess: function () {
            form_menuedit_C.data('fun')(form_menuedit_C);
        },
        btnactive: [
            form_menuedit_C.find('#btn-ok')
        ],
        fields: {
            txtMenu: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify Menu.'
                    }
                }
            }
        }
    });
});

