$(function () {
    var form_Banktype = $('#form_Banktype');
    var form_Banktype_C = $.modelDialog(form_Banktype);

    var _formdata = form_Banktype_C.data('data');
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
        form_Banktype.find('#txtbranch').val(_formdata.Branch);
        form_Banktype.find('#txtaddress').val(_formdata.IsDefault);
        form_Banktype.find('#txtZipCode').val(_formdata.ZipCode);
        form_Banktype.find('#swDF').prop('checked', parseInt(_formdata.IsDefault) === 1 ? true : false);
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
    }

    form_Banktype.find('#cmdProvince').selectpicker().on({
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
                var _sel = form_Banktype.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_Banktype.find('#cmdDistrict').selectpicker().on({
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
            data: {key: form_Banktype.find('#cmdProvince').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Banktype.find('#cmdDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.District + '">&nbsp;&nbsp;' + v.District + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_Banktype.find('#cmdSubDistrict').selectpicker().on({
        change: function () {
            var _v = $(this).find('option[value="' + $(this).val() + '"]').data('zipcode');
            form_Banktype.find('#txtZipCode').val(_v);
            form_Banktype.formValidation('revalidateField', form_Banktype.find('#txtZipCode'));
        }
    });
    function setSubDistrict(v) {
        $.reqData({
            url: mvcPatch('Province/findSubDistrict'),
            data: {key: form_Banktype.find('#cmdDistrict').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Banktype.find('#cmdSubDistrict').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.SubDistrict + '"  data-ZipCode="' + v.ZipCode + '">&nbsp;&nbsp;' + v.SubDistrict + '</option>';
                });
                _sel.append(_html).selectpicker('refresh')
                v(_sel);
            }
        });
    }

    form_Banktype_C.find('#btn-ok').on({
        click: function () {
            form_Banktype.submit();
        }
    })

    form_Banktype.myValidation({
        funsuccess: function () {
            form_Banktype_C.data('fun')(form_Banktype_C);
        },
        btnactive: [
            form_Banktype_C.find('#btn-ok')
        ],
        fields: {
            txtbranch: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ สาขา.'
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
            }
        }
    });
});