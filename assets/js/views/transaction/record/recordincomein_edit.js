$(function () {
    var form_incomeinedit = $('#form_incomeinedit');
    var form_incomeinedit_C = $.modelDialog(form_incomeinedit);

    var _formdata = form_incomeinedit_C.data('data');
    if (_formdata.key === Guid) {
        setIncomeName(function (_n) {
            _n.val(Guid).selectpicker('render');
        });
    } else {
        form_incomeinedit.find('#txtDetail').val(_formdata.Detial);
        form_incomeinedit.find('#txtAmount').val(_formdata.Amount);
        setIncomeName(function (_n) {
            _n.val(_formdata.IncomeKey).selectpicker('render');
        });
    }

    form_incomeinedit.find('#cmdIncomeName').selectpicker({
    }).on({
        change: function () {

        },
        'loaded.bs.select': function (e) {
            $('#btn-incomeNameNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('IncomeName/edit'),
                        title: 'เพิ่มรายชื่อรายรับ-รายจ่าย',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.IncomeName = _f.find('#txtIncomeName').val();

//                                    $.bConfirm({
//                                        buttonOK: function (k) {
//                                            k.close();
                                    $.reqData({
                                        url: mvcPatch('IncomeName/editIncmeName'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setIncomeName(function (_t) {
                                                    _t.val(vdata.key).selectpicker('render').change();
                                                });
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
//                                        }
//                                    });
                                }
                            });
                        },
                        buttons: [
                            {
                                id: 'btn-ok',
                                icon: 'fa fa-check',
                                label: '&nbsp;ตกลง',
                                action: function (k) {

                                }
                            }
                        ]
                    });
                }});
        }
    });

    function setIncomeName(v) {
        $.reqData({
            url: mvcPatch('IncomeName/findIncmeName'),
            data: {},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_incomeinedit.find('#cmdIncomeName').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-align-left" value="' + v.key + '" data-display="' + v.IncomeName + '">&nbsp;&nbsp;' + v.IncomeName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_incomeinedit_C.find('#btn-ok').on({
        click: function () {
            form_incomeinedit.submit();
        }
    });

    form_incomeinedit.myValidation({
        funsuccess: function () {
            form_incomeinedit_C.data('fun')(form_incomeinedit_C);
        },
        btnactive: [
            form_incomeinedit_C.find('#btn-ok')
        ],
        fields: {
            cmdIncomeName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรายละเอียด'
                    }
                }
            },
            txtAmount: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุจำนวนเงิน'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นตัวเลขเท่านั้น'
                    }
                }
            }
        }
    });
});
