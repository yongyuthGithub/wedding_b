$(function () {
    var form_docseqedit = $('#form_docseqedit');
    var form_docseqedit_C = $.modelDialog(form_docseqedit);

    var _formdata = form_docseqedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_docseqedit.find('#txtDocName').val(_formdata.DocName);
        form_docseqedit.find('#txtPattern').val(_formdata.Pattern);
        form_docseqedit.find('#txtPoint').val(_formdata.Point);
        form_docseqedit.find('#txtSeq').val(_formdata.Seq);
        form_docseqedit.find('#lblSeq').text('Seq (' + _formdata.YearMonth + ') :');
    } else {

    }

    form_docseqedit_C.find('#btn-ok').on({
        click: function () {
            form_docseqedit.submit();
        }
    });

    form_docseqedit.myValidation({
        funsuccess: function () {
            form_docseqedit_C.data('fun')(form_docseqedit_C);
        },
        btnactive: [
            form_docseqedit_C.find('#btn-ok')
        ],
        fields: {
            txtDocName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุชื่อรูปแบบเอกสาร'
                    }
                }
            },
            txtPattern: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรูปแบบเอกสาร'
                    }
                }
            },
            txtPoint: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุจำนวนตำแหน่งเลขอัตโนมัติ'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpNumber,
                        message: '* ระบุเป็นจำนวนเท่านั้น'
                    }
                    //callback: {//***Custom Validation
                    //    message: '* Re-enter the code.',
                    //    callback: function (value, validator, $field) {
                    //        //form_adminedit.formValidation('revalidateField', form_adminedit.find('#txtConfirmPassword'));
                    //        return true;
                    //    }
                }
            },
            txtSeq: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขอัตโนมัติล่าสุด'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpNumber,
                        message: '* ระบุเป็นจำนวนเท่านั้น'
                    }
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

