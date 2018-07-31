$(function () {
    var form_customerbranchedit = $('#form_customerbranchedit');
    var form_customerbranchedit_C = $.modelDialog(form_customerbranchedit);

    var _formdata = form_customerbranchedit_C.data('data');
    if (_formdata.key === Guid) {
        setProvince(function (_p) {
            _p.val(Guid).selectpicker('render');
            setDistrict(function (_d) {
                _d.val(Guid).selectpicker('render');
                setSubDistrict(function (_sd) {
                    _sd.val(Guid).selectpicker('render');
                });
            });
        });
    } else {
        form_customerbranchedit.find('#txtTypeName').val(_formdata.Branch);
        form_customerbranchedit.find('#txtaddress').val(_formdata.Address);
        form_customerbranchedit.find('#cmdSubDistrict').val(_formdata.cmdSubDistrict);
        form_customerbranchedit.find('#txtZipCode').val(_formdata.ZipCode);
        form_customerbranchedit.find('#txtTel').val(_formdata.Tel);
        form_customerbranchedit.find('#txtIDCard').val(_formdata.IDCard);
        form_customerbranchedit.find('#txtFax').val(_formdata.Fax);
        form_customerbranchedit.find('#swDF').prop('checked', parseInt(_formdata.IsDefault) === 1 ? true : false);
        form_customerbranchedit.find('#txtBillDay').val(_formdata.BillDay);
        form_customerbranchedit.find('#txtDueDate').val(_formdata.DueDate);
        form_customerbranchedit.find('.showinadd').remove();
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
        //********************
    }


    form_customerbranchedit.find('#cmdProvince').selectpicker().on({
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
                var _sel = form_customerbranchedit.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_customerbranchedit.find('#cmdDistrict').selectpicker().on({
        change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
            })
        }
    });
    function setDistrict(v) {
//       alert(form_customerbranchedit.find('#cmdProvince').val());
        $.reqData({
            url: mvcPatch('Province/findDistrict'),
            data: {key: form_customerbranchedit.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_customerbranchedit.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_customerbranchedit.find('#cmdSubDistrict').selectpicker().on({
        change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_customerbranchedit.find('#txtZipCode').val(_v);
            form_customerbranchedit.formValidation('revalidateField', form_customerbranchedit.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_customerbranchedit.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_customerbranchedit.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-ZipCode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }


    form_customerbranchedit_C.find('#btn-ok').on({
        click: function () {
            form_customerbranchedit.submit();
        }
    })

    form_customerbranchedit.myValidation({
        funsuccess: function () {
            form_customerbranchedit_C.data('fun')(form_customerbranchedit_C);
        },
        btnactive: [
            form_customerbranchedit_C.find('#btn-ok')
        ],
        fields: {
            txtTypeName: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ บริษัท.'
                    }
                }
            },
            txtaddress: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ที่อยู่.'
                    }
                }
            },
            cmdProvince: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ จังหวัด.'
                    }
                }
            },
            cmdDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ อำเภอ.'
                    }
                }
            },
            cmdSubDistrict: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ตำบล.'
                    }
                }
            },
            txtZipCode: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ รหัสไปรษณีย์.'
                    }
                }
            },
            txtTel: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ เบอร์โทร.'
                    }
                }
            },
            txtIDCard: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ เลขประจำตัวผู้เสียภาษี.'
                    }
                }
            },
            txtFax: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ เบอร์แฟกซ์.'
                    }
                }
            },
            txtBillDay: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุระยะเวลาวางบิล'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpNumber,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            },
            txtDueDate: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุระยะเวลาครบกำหนดวางบิล'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpNumber,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            }
        }



    });
});
