$(function () {
    var form_recordfuleedit = $('#form_recordfuleedit');
    var form_recordfuleedit_C = $.modelDialog(form_recordfuleedit);

    var _formdata = form_recordfuleedit_C.data('data');
    if (_formdata.key === Guid) {
        setFule(function (f) {
            if (f.find('option').length === 0)
                f.val(Guid).selectpicker('render');
            setFuleBranch(function (fb) {
                if (fb.find('option').length === 0)
                    fb.val(Guid).selectpicker('render');
                setFuleType(function (ft) {
                    if (ft.find('option').length === 0)
                        ft.val(Guid).selectpicker('render');
                });
            });
        });
    } else {
        form_recordfuleedit.find('#txtMile').val(_formdata.Smile);
        form_recordfuleedit.find('#txtItem').val(_formdata.Item);
        form_recordfuleedit.find('#txtItemPrice').val(_formdata.Price);
        form_recordfuleedit.find('#txtAmount').val(_formdata.Price);
        form_recordfuleedit.find('#txtRefer').val(_formdata.Refer);
        setFule(function (f) {
            f.val(_formdata.PumpKey).selectpicker('render');
            setFuleBranch(function (fb) {
                fb.val(_formdata.BranchKey).selectpicker('render');
                setFuleType(function (ft) {
                    ft.val(_formdata.FuleKey).selectpicker('render');
                });
            });
        });
    }

    form_recordfuleedit.find('#cmdFule').selectpicker({
    }).on({
        change: function () {
            setFuleBranch(function (fb) {
                if (fb.find('option').length === 0)
                    fb.val(Guid).selectpicker('render');
                form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleBranch'));
                setFuleType(function (ft) {
                    if (ft.find('option').length === 0)
                        ft.val(Guid).selectpicker('render');
                    form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleType'));
                });
            });
        },
        'loaded.bs.select': function (e) {
            $('#btn-fulenew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Fule/edit'),
                        title: 'เพิ่มปั้มเชื้อเพลิง',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.Pump = _f.find('#txtUser').val();
                                    obj.PumpType = _f.find('#cmdTitle').val();

//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editPump'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setFule(function (f) {
                                                    f.val(vdata.key).selectpicker('render');
                                                    setFuleBranch(function (fb) {
                                                        if (fb.find('option').length === 0)
                                                            fb.val(Guid).selectpicker('render');
                                                        setFuleType(function (ft) {
                                                            if (ft.find('option').length === 0)
                                                                ft.val(Guid).selectpicker('render');
                                                        });
                                                    });
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
                }
            })
        }
    });

    function setFule(fun) {
        $.reqData({
            url: mvcPatch('Record/findFule'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFule').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-product-hunt" value="' + v.RowKey + '" data-display="' + v.Pump + '">&nbsp;&nbsp;' + v.Pump + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }
//    
//    form_recordfuleedit.on('click','#btn-fulenew',function(){
//        alert('22222');
//    });

    form_recordfuleedit.find('#cmdFuleBranch').selectpicker({
    }).on({
        change: function () {
            setFuleType(function (ft) {
                if (ft.find('option').length === 0)
                    ft.val(Guid).selectpicker('render');
                form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleType'));
            });
        },
        'loaded.bs.select': function (e) {
            $('#btn-fulebranchnew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Fule/branchEdit'),
                        title: 'เพิ่มสาขา',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object({
                                        RowKey: Guid,
                                        PumpKey: form_recordfuleedit.find('#cmdFule').val(),
                                        PumpBranch: _f.find('#txtbranch').val(),
                                        Address: _f.find('#txtaddress').val(),
                                        SubDistrict: _f.find('#cmdSubDistrict').val(),
                                        ZipCode: _f.find('#txtZipCode').val(),
                                        IsDefault: _f.find('#swDF').is(':checked')
                                    });
//                                    $.bConfirm({
//                                        buttonOK: function (k2) {
//                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editBrand'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setFuleBranch(function (fb) {
                                                    fb.val(vdata.key).selectpicker('render');
                                                    form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleBranch'));
                                                    setFuleType(function (ft) {
                                                        if (ft.find('option').length === 0)
                                                            ft.val(Guid).selectpicker('render');
                                                        form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleType'));
                                                    });
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
                                label: '&nbsp;Save',
                                action: function (k) {
                                    //javascript code
                                }
                            }
                        ]
                    });
                }
            });
        }
    });

    function setFuleBranch(fun) {
        $.reqData({
            url: mvcPatch('Record/findFuleBranch'),
            data: {key: form_recordfuleedit.find('#cmdFule').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFuleBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-paypal" value="' + v.RowKey + '" data-display="' + v.PumpBranch + '">&nbsp;&nbsp;' + v.PumpBranch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_recordfuleedit.find('#cmdFuleType').selectpicker({
    }).on({
        change: function () {
            form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleType'));
        },
        'loaded.bs.select': function (e) {
            $('#btn-fuletypenew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Fule/branchDetailEdit'),
                        title: 'เพิ่มเชื้อเพลิง',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object(
                                        {
                                            branchkey: form_recordfuleedit.find('#cmdFuleBranch').val()
                                        }
                                ),
                                fun: function (_f) {
                                    var obj = $.ToLinq(_f.find('#cmdFule').val())
                                            .Select(function (x) {
                                                return new Object({
                                                    FuleKey: x,
                                                    PumpBranchKey: form_recordfuleedit.find('#cmdFuleBranch').val(),
                                                    IsDefault: false
                                                });
                                            }).ToArray();
//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editFuelList'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setFuleType(function (ft) {
                                                    form_recordfuleedit.formValidation('revalidateField', form_recordfuleedit.find('#cmdFuleType'));
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
                                label: '&nbsp;Save',
                                action: function (k) {
                                    //javascript code
                                }
                            }
                        ]
                    });
                }
            });
        }
    });

    function setFuleType(fun) {
        $.reqData({
            url: mvcPatch('Record/findFuleType'),
            data: {key: form_recordfuleedit.find('#cmdFuleBranch').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordfuleedit.find('#cmdFuleType').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-fire" value="' + v.RowKey + '" data-display="' + v.Fuel + '">&nbsp;&nbsp;' + v.Fuel + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                fun(_sel);
            }
        });
    }

    form_recordfuleedit_C.find('#btn-ok').on({
        click: function () {
            form_recordfuleedit.submit();
        }
    });

    form_recordfuleedit.myValidation({
        funsuccess: function () {
            form_recordfuleedit_C.data('fun')(form_recordfuleedit_C);
        },
        btnactive: [
            form_recordfuleedit_C.find('#btn-ok')
        ],
        fields: {
            cmdFule: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุปั้ม'
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
            },
            cmdFuleBranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุสาขาปั้ม'
                    }
                }
            },
            cmdFuleType: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุประเภทเชื้อเพลิง'
                    }
                }
            },
            txtMile: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุเลขไมล์'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* กรุณาระบุที่เป็นตัวเลขเท่านั้น'
                    }
                }
            },
//            txtAmount: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* กรุณาระบุจำนวนเงินที่ชำระ'
//                    },
//                    regexp: {//***Custom Patter
//                        regexp: regexpDecimal,
//                        message: '* กรุณาระบุที่เป็นตัวเลขเท่านั้น'
//                    }
//                }
//            }
            txtItem: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจำนวนลิตร'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* กรุณาระบุที่เป็นตัวเลขเท่านั้น'
                    }
                }
            },
            txtItemPrice: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจำนวนเงินรวม'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* กรุณาระบุที่เป็นตัวเลขเท่านั้น'
                    }
                }
            }
        }
    });
});

