$(function () {
    var form_bankedit = $('#form_bankedit');
    var form_bankedit_C = $.modelDialog(form_bankedit);

    var _formdata = form_bankedit_C.data('data');
    if (_formdata.key !== Guid) {
        form_bankedit.find('#txtAccountCode').val(_formdata.AccountCode);
        form_bankedit.find('#txtAccountName').val(_formdata.AccountName);
        setbank(function (b) {
            b.val(_formdata.BankKey).selectpicker('render');
            setbranchbank(function (bb) {
                bb.val(_formdata.BankBranchKey).selectpicker('render');
            });
        });
        form_bankedit.find('#swDF').prop('checked', parseInt(_formdata.IsBill) === 1 ? true : false);
    } else {
        setbank(function () {
            setbranchbank(function () {});
        });
    }

    form_bankedit.find('#cmdBank').selectpicker({
    }).on({
        change: function () {
            setbranchbank(function (fb) {
                form_bankedit.formValidation('revalidateField', form_bankedit.find('#cmdBankBranch'));
            });
        },
        'loaded.bs.select': function (e) {
            $('#btn-banknew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Bank/edit'),
                        title: 'เพิ่มธนาคาร',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.Bank = _f.find('#txtBank').val();
                                    obj.IsDefault = _f.find('#swDF').is(':checked');
                                    $.bConfirm({
                                        buttonOK: function (k) {
                                            k.close();
                                            $.reqData({
                                                url: mvcPatch('Bank/editBank'),
                                                data: {data: JSON.stringify(obj)},
                                                loanding: false,
                                                callback: function (vdata) {
                                                    if (vdata.success) {
                                                        _f.find('#btn-close').click();
                                                        setbank(function (f) {
                                                            f.val(vdata.key).selectpicker('render');
                                                            form_bankedit.formValidation('revalidateField', f);
                                                            setbranchbank(function (fb) {
                                                            });
                                                        });
                                                    } else {
                                                        $.bAlert({
                                                            message: vdata.message
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
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
                }
            })
        }
    });

    function setbank(fun) {
        $.reqData({
            url: mvcPatch('Bank/findBank'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_bankedit.find('#cmdBank').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _fd = parseInt(v.IsDefault) === 1 ? 'selected="selected"' : '';
                    _html += '<option data-icon="fa fa-bank" value="' + v.key + '" data-display="' + v.Bank + '" ' + _fd + '>&nbsp;&nbsp;' + v.Bank + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_bankedit.find('#cmdBankBranch').selectpicker({
    }).on({
        change: function () {
        },
        'loaded.bs.select': function (e) {
            $('#btn-bankbranchnew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Bank/typeedit'),
                        title: 'เพิ่มสาขาธนาคาร',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object({
                                        RowKey: Guid,
                                        BankKey: form_bankedit.find('#cmdBank').val(),
                                        Branch: _f.find('#txtbranch').val(),
                                        IsDefault: _f.find('#swDF').is(':checked')
                                    });

                                    $.bConfirm({
                                        buttonOK: function (k) {
                                            k.close();
                                            $.reqData({
                                                url: mvcPatch('Bank/editBranchBank'),
                                                data: {data: JSON.stringify(obj)},
                                                loanding: false,
                                                callback: function (vdata) {
                                                    if (vdata.success) {
                                                        _f.find('#btn-close').click();
                                                        setbranchbank(function (f) {
                                                            f.val(vdata.key).selectpicker('render');
                                                            form_bankedit.formValidation('revalidateField', f);
                                                        });
                                                    } else {
                                                        $.bAlert({
                                                            message: vdata.message
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
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
                }
            })
        }
    });

    function setbranchbank(fun) {
        $.reqData({
            url: mvcPatch('Bank/findBranchBank'),
            data: {key: form_bankedit.find('#cmdBank').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_bankedit.find('#cmdBankBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _fd = parseInt(v.IsDefault) === 1 ? 'selected="selected"' : '';
                    _html += '<option data-icon="fa fa-bank" value="' + v.key + '" data-display="' + v.Branch + '" ' + _fd + '>&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_bankedit_C.find('#btn-ok').on({
        click: function () {
            form_bankedit.submit();
        }
    });

    form_bankedit.myValidation({
        funsuccess: function () {
            form_bankedit_C.data('fun')(form_bankedit_C);
        },
        btnactive: [
            form_bankedit_C.find('#btn-ok')
        ],
        fields: {
            txtAccountCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุหมายเลขบัญชี'
                    }
                }
            },
            txtAccountName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุชื่อบัญชี'
                    }
                }
            },
            cmdBank: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุธนาคาร'
                    }
                }
            },
            cmdBankBranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสาขาธนาคาร'
                    }
                }
            }
        }
    });
});
