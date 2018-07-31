$(function () {
    var form_newbill = $('#form_newbill');
    var form_newbill_C = $.modelDialog(form_newbill);

    var _formdata = form_newbill_C;
    if (_formdata.data('data').length === 0)
        _formdata.data('data').push(Guid);

    form_newbill.find('#cmdNewBill').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    setDataBill();
    function setDataBill() {
        $.reqData({
            url: mvcPatch('Receipt/findBillByCustomer'),
            data: {
                key: _formdata.data('key'),
                vdata: JSON.stringify(_formdata.data('data')),
                receiptkey: $('#txtkey').val()
            },
            loanding: false,
            callback: function (vdata) {
                var _sel = form_newbill.find('#cmdNewBill').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-sticky-note-o" value="' + v.key + '" data-amounts="' + v.Amounts + '" data-docdate="' + v.DocDate + '" data-docid="' + v.DocID + '">&nbsp;&nbsp;(' + v.DocID + ') ' + PHP_JSON_To_ShowDate(v.DocDate) + ' -> ยอดชำระ ' + addCommas(v.Amounts, 2) + ' บาท</option>';
                });
                _sel.append(_html).selectpicker('refresh');
            }
        });
    }

    form_newbill_C.find('#btn-ok').on({
        click: function () {
            form_newbill.submit();
        }
    });

    form_newbill.myValidation({
        funsuccess: function () {
            form_newbill_C.data('fun')(form_newbill_C);
        },
        btnactive: [
            form_newbill_C.find('#btn-ok')
        ],
        fields: {
            cmdNewBill: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาเลือกรายการบิลก่อน'
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

