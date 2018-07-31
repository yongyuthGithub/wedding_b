$(function () {
    var form_insuranceedit = $('#form_insuranceedit');
    var form_insuranceedit_C = $.modelDialog(form_insuranceedit);

    var _formdata = form_insuranceedit_C.data('data');
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
        form_insuranceedit.find('#txtinsurance').val(_formdata.InsuranceName);
        form_insuranceedit.find('#txtaddress').val(_formdata.Address);
        form_insuranceedit.find('#cmdSubDistrict').val(_formdata.cmdSubDistrict);
        form_insuranceedit.find('#txtZipCode').val(_formdata.ZipCode);
        form_insuranceedit.find('#txtTel').val(_formdata.Tel);     
        form_insuranceedit.find('.showinadd').remove();
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


    form_insuranceedit.find('#cmdProvince').selectpicker().on({
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
                var _sel = form_insuranceedit.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_insuranceedit.find('#cmdDistrict').selectpicker().on({
    change: function () {
//            setSubDistrict(Guid);
            setSubDistrict(function (_sd) {
                _sd.val(Guid).selectpicker('render');
            })
        }
    });
    function setDistrict(v) {
//       alert(form_insuranceedit.find('#cmdProvince').val());
        $.reqData({
            url: mvcPatch('Province/findDistrict'),
            data: {key: form_insuranceedit.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_insuranceedit.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_insuranceedit.find('#cmdSubDistrict').selectpicker().on({
    change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_insuranceedit.find('#txtZipCode').val(_v);
            form_insuranceedit.formValidation('revalidateField', form_insuranceedit.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
         $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_insuranceedit.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_insuranceedit.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-ZipCode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }


    form_insuranceedit_C.find('#btn-ok').on({
        click: function () {
            form_insuranceedit.submit();
        }
    })

    form_insuranceedit.myValidation({
        funsuccess: function () {
            form_insuranceedit_C.data('fun')(form_insuranceedit_C);
        },
        btnactive: [
            form_insuranceedit_C.find('#btn-ok')
        ],
        fields: {
            txtinsurance: {
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
            }
        }
    });
});
