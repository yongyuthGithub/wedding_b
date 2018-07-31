$(function () {
    var form_newrecord = $('#form_newrecord');
    var form_newrecord_C = $.modelDialog(form_newrecord);

    var _formdata = form_newrecord_C;
    if (_formdata.data('data').length === 0)
        _formdata.data('data').push(Guid);

    form_newrecord.find('#cmdNewRecord').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    setDataRecord();
    function setDataRecord() {
        $.reqData({
            url: mvcPatch('Bill/findRecordByCustomer'),
            data: {
                key: _formdata.data('key'),
                vdata: JSON.stringify(_formdata.data('data')),
                billkey: $('#txtkey').val()
            },
            loanding: false,
            callback: function (vdata) {
                var _sel = form_newrecord.find('#cmdNewRecord').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-sticky-note-o" value="' + v.key + '">&nbsp;&nbsp;(' + v.DocID + ') ' + PHP_JSON_To_ShowDate(v.DocDate) + ' -> ' + v.Product + ' -> ' + addCommas(v.PriceTotal, 2) + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
            }
        });
    }

    form_newrecord_C.find('#btn-ok').on({
        click: function () {
            form_newrecord.submit();
        }
    });

    form_newrecord.myValidation({
        funsuccess: function () {
            form_newrecord_C.data('fun')(form_newrecord_C);
        },
        btnactive: [
            form_newrecord_C.find('#btn-ok')
        ],
        fields: {
            cmdNewRecord: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาเลือกรายการใบงานก่อน'
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
