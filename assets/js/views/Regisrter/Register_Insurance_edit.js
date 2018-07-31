$(function () {
    var form_RegistereditInsurance = $('#form_RegistereditInsurance');
    var form_RegistereditInsurance_C = $.modelDialog(form_RegistereditInsurance);

    var _formdata = form_RegistereditInsurance_C.data('data');
    if (_formdata.key === Guid) {
//        setProvince(Guid);
        //***Edit By Yongyuth
        setInsurance(function (_p) {
            _p.val(Guid).selectpicker('render');
            setInsurancetype(function (_d) {
                _d.val(Guid).selectpicker('render');
            });
        });
        //********************
    } else {

        form_RegistereditInsurance.find('#txtUser3').val(_formdata.Cash);
        form_RegistereditInsurance.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.SDate));
        form_RegistereditInsurance.find('#txtUser11').val(PHP_JSON_To_ShowDate(_formdata.EDate));

        //***Edit By Yongyuth
        setInsurance(function (_p) {
            _p.val(_formdata.InsuranceKey).selectpicker('render');
            setInsurancetype(function (_d) {
                _d.val(_formdata.TypeKey).selectpicker('render');

            });
        });
        //********************
        if (form_RegistereditInsurance_C.data('uplv')) {
            form_RegistereditInsurance.find('#txtUser5').val(PHP_JSON_To_ShowDate(_formdata.EDate));
            form_RegistereditInsurance.find('#txtUser11').val('');
            form_RegistereditInsurance.find('#cmdInsurance').prop('disabled', true);
            form_RegistereditInsurance.find('#cmdInsurancetype').prop('disabled', true);
            form_RegistereditInsurance.find('#txtUser5').prop('disabled', true);
        }
    }

    form_RegistereditInsurance.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser5'));
    });
    form_RegistereditInsurance.find('#divEDate_Card').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser01'));
    });
    form_RegistereditInsurance.find('#divEDate_driver').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser02'));
    });
    form_RegistereditInsurance.find('#txtSDate1').dateTime().on('dp.change', function (e) {
        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser11'));
    });
    form_RegistereditInsurance.find('#divEDate_Card').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser01'));
    });
    form_RegistereditInsurance.find('#divEDate_driver').dateTime().on('dp.change', function (e) {
//        form_RegistereditInsurance.formValidation('revalidateField', form_RegistereditInsurance.find('#txtUser02'));
    });



    form_RegistereditInsurance.find('#cmdInsurance').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
            setInsurancetype(function (_d) {
                _d.val(Guid).selectpicker('render');
            });
        }
    });
    function setInsurance(v) {
        $.reqData({
            url: mvcPatch('Province/Insurance'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdInsurance').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.InsuranceName + '">&nbsp;&nbsp;' + v.InsuranceName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

//    form_RegistereditInsurance.find('#cmdProvince').on({
//        change: function () {
////            setSubDistrict(Guid);
//            setDistrict(function (_sd) {
//                _sd.val(Guid).selectpicker('render');
//            })
//        }
//    });
    function setInsurancetype(v) {
        $.reqData({
            url: mvcPatch('Province/Insurancetype'),
            data: {key: form_RegistereditInsurance.find('#cmdInsurance').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_RegistereditInsurance.find('#cmdInsurancetype').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.TypeName + '">&nbsp;&nbsp;' + v.TypeName + '</option>';
                });

                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }



    form_RegistereditInsurance_C.find('#btn-ok').on({
        click: function () {
            form_RegistereditInsurance.submit();
        }
    });

    form_RegistereditInsurance.myValidation({
        funsuccess: function () {
            form_RegistereditInsurance_C.data('fun')(form_RegistereditInsurance_C);
        },
        btnactive: [
            form_RegistereditInsurance_C.find('#btn-ok')
        ],
        fields: {
//            txtUser1: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* กรุณาระบุรหัสบัตรประชาชน'
//                    },
//                    stringLength: {
//                        max: 13,
//                        min: 13,
//                        message: '* กรุณาระบุจำนวนตัวเลย 13 หลักเท่านั้น'
//                    },
//                    regexp: {
//                        regexp: regexpIDCard,
//                        message: '* กรุณาระบุรูปแบบบัตรประชาชนเท่านั้น'
//                    }
//                }
//            },
            cmdInsurance: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุบริษัทประกัน'
                    }
                }
            },
            cmdInsurancetype: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุประเภทประกัน'
                    }
                }
            },
            txtUser3: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจำนวนเงิน'
                    },
                    regexp: {
                        regexp: regexpDecimal,
                        message: '* กรุณาระบุรูปแบบตัวเลขเท่านั้น'
                    }
                }
            },
            txtUser5: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่เริ่มประกัน'
                    }
                }
            },
            txtUser11: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่หมดอายุประกัน'
                    }
                }
            }
        }
    });
});
