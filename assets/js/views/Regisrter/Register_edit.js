$(function () {
    var form_Registeredit = $('#form_Registeredit');
    var form_Registeredit_C = $.modelDialog(form_Registeredit);

    form_Registeredit.find('.btn-addimage').on({
        click: function () {
            $(this).parents('.divImage').find('.imageShow').findFile({
//                custom_html: '<img class="xcard img-responsive" />',
//                custom_this_image: '.xcard',
//                multiple:true,
//                empty:true
            });
        }
    });
    form_Registeredit.find('.btn-deleteimage').on({
        click: function () {
            $(this).parents('.divImage').find('.imageShow').removeAttr('src');
        }
    });

    form_Registeredit.find('.btn-viewimage').on({
        click: function () {
            var _this = $(this).parents('.divImage').find('.imageShow');
            if (!checkUndefined(_this.attr('src'))) {
                $.bPopup({
                    url: mvcPatch('Popup/index'),
                    title: 'Show Picture',
                    closable: true,
                    btnCancel: false,
                    size: BootstrapDialog.SIZE_WIDE,
                    onshow: function (k) {
                        k.getModal().data({
                            data: _this.attr('src')
                        });
                    },
                    buttons: [
                    ]
                });
            }
        }
    });

    var _formdata = form_Registeredit_C.data('data');
    if (_formdata.key === Guid) {
        setTitle(Guid);
//        setProvince(Guid);
        //***Edit By Yongyuth
        setProvince(function (_p) {
            _p.val(Guid).selectpicker('render');
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                });
            });
        });
        setBank(function (_b) {
            _b.val(Guid).selectpicker('render');
            setBankBranch(function (_bc) {
                _bc.val(Guid).selectpicker('render');
            })
        });
        //********************
    } else {
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtUser2').val(_formdata.FName);
        form_Registeredit.find('#txtNickName').val(_formdata.NickName);
        form_Registeredit.find('#txtUser3').val(_formdata.Address);
        form_Registeredit.find('#cmdSubDistrict').val(_formdata.SubDistrict);
        form_Registeredit.find('#txtSDate').val(_formdata.SDate);
        try {
            form_Registeredit.find('#txtEDate').val(PHP_JSON_To_ShowDate(_formdata.EDate));
        } catch (e) {
        }
        form_Registeredit.find('#txtUser6').val(_formdata.LName);
        form_Registeredit.find('#txtUser7').val(_formdata.Tel);
        form_Registeredit.find('#txtUser1').val(_formdata.IDCard);
        form_Registeredit.find('#txtZipCode').val(_formdata.ZipCode);
        form_Registeredit.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.SDate));

        form_Registeredit.find('#txtAccountCode').val(_formdata.AccountCode);
        form_Registeredit.find('#txtAccountName').val(_formdata.AccountName);

        $.each(_formdata.TRNEmployeeFiles, function (k, v) {
            var _image = form_Registeredit.find('.tab-image[data-type="' + v.FileType + '"]');
            if (!checkNull(v.EDate))
                _image.find('.txtDate').val(PHP_JSON_To_ShowDate(v.EDate));

            $.reqData({
                url: mvcPatch('Register/findImage'),
                data: {key: v.RowKey},
                loanding: false,
                callback: function (vdata) {
                    _image.find('.imageShow').prop('src', vdata.ImageBase64);
                }
            });
        });

        //***Edit By Yongyuth
        setProvince(function (_p) {
            _p.val(_formdata.ProvinceKey).selectpicker('render');
            setDistrict(function (_d) {
                _d.val(_formdata.DistrictKey).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(_formdata.SubDistrictKey).selectpicker('render');
                });
            });
        });

        setBank(function (_b) {
            _b.val(_formdata.BankKey).selectpicker('render');
            setBankBranch(function (_bc) {
                _bc.val(_formdata.BankBranchKey).selectpicker('render');
            })
        });
        //********************

        form_Registeredit.find('.showinadd').remove();

        setTitle(_formdata.TitleKey);
    }

    form_Registeredit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser5'));
    });

    form_Registeredit.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
//            maxDate: new Date(),
//            defaultDate: new Date(),
        showTodayButton: true,
        locale: 'th',
        showClear: true
    }).on('dp.change', function (ds) {

    });

    form_Registeredit.find('#divEDate_Card').dateTime().on('dp.change', function (e) {
//        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser01'));
    });
    form_Registeredit.find('#divEDate_driver').dateTime().on('dp.change', function (e) {
//        form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtUser02'));
    });

//    funDateTime(form_Registeredit.find('#txtSDate')).date('14/02/2018');
//    alert(PHP_DateTimeShow_To_JSON(form_Registeredit.find('#txtSDate')));

    form_Registeredit.find('#cmdTitle').selectpicker().on({
        change: function () {
        }
    });
    function setTitle(v) {
        $.reqData({
            url: mvcPatch('admin/findTitle'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdTitle').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }



    form_Registeredit.find('#cmdProvince').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                })
            });
        }
    });
    function setProvince(v) {
        $.reqData({
            url: mvcPatch('Province/findProvince'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_Registeredit.find('#cmdDistrict').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
            })
        }
    });
    function setDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findDistrict'),
            data: {key: form_Registeredit.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_Registeredit.find('#cmdSubDistrict').selectpicker().on({
        change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_Registeredit.find('#txtZipCode').val(_v);
            form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_Registeredit.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-zipcode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_Registeredit.find('#cmdBank').selectpicker().on({
        change: function () {
            setBankBranch(function (_bc) {
//                _bc.val(Guid).selectpicker('render');
                form_Registeredit.formValidation('revalidateField', form_Registeredit.find('#cmdBankBranch'));
            });
        }
    });
    function setBank(v) {
        $.reqData({
            url: mvcPatch('MySystem/findBank'),
//            data: {key: form_mysystem.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdBank').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-bank" value="' + v.RowKey + '" data-display="' + v.Bank + '">&nbsp;&nbsp;' + v.Bank + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_Registeredit.find('#cmdBankBranch').selectpicker().on({
        change: function () {
        }
    });
    function setBankBranch(v) {
        $.reqData({
            url: mvcPatch('MySystem/findBankBranch'),
            data: {key: form_Registeredit.find('#cmdBank').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Registeredit.find('#cmdBankBranch').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-bank" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_Registeredit_C.find('#btn-ok').on({
        click: function () {
            form_Registeredit.submit();
        }
    });

    form_Registeredit.myValidation({
        funsuccess: function () {
            form_Registeredit_C.data('fun')(form_Registeredit_C);
        },
        btnactive: [
            form_Registeredit_C.find('#btn-ok')
        ],
        fields: {
            txtUser1: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุรหัสบัตรประชาชน'
                    },
                    stringLength: {
                        max: 13,
                        min: 13,
                        message: '* กรุณาระบุจำนวนตัวเลย 13 หลักเท่านั้น'
                    },
                    regexp: {
                        regexp: regexpIDCard,
                        message: '* กรุณาระบุรูปแบบบัตรประชาชนเท่านั้น'
                    }
                }
            },
            cmdTitle: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุคำนาม'
                    }
                }
            },
            txtUser6: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อ'
                    }
                }
            },
            txtUser2: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุนามสกุล'
                    }
                }
            },
            txtUser3: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุที่อยู่'
                    }
                }
            },
            cmdProvince: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจังหวัด'
                    }
                }
            },
            cmdDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุอำเภอ'
                    }
                }
            },
            cmdSubDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุตำบล'
                    }
                }
            },
            txtZipCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุรหัสไปรษณีย์'
                    }
                }
            },
            txtUser7: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุเบอร์โทรศัพท์'
                    }
                }
            },
            txtUser5: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่เริ่มงาน'
                    }
                }
            },

        }


    });
});
