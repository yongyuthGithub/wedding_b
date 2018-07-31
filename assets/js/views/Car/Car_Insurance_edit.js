$(function () {
    var form_CarInsuranceedit = $('#form_CarInsuranceedit');
    var form_CarInsuranceedit_C = $.modelDialog(form_CarInsuranceedit);

    var _formdata = form_CarInsuranceedit_C.data('data');
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

        form_CarInsuranceedit.find('#txtCash').val(_formdata.Cash);
        form_CarInsuranceedit.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.SDate));
        form_CarInsuranceedit.find('#txtEDate1').val(PHP_JSON_To_ShowDate(_formdata.EDate));

        //***Edit By Yongyuth
        setInsurance(function (_p) {
            _p.val(_formdata.InsuranceKey).selectpicker('render');
            setInsurancetype(function (_d) {
                _d.val(_formdata.TypeKey).selectpicker('render');

            });
        });
        //********************
        if (form_CarInsuranceedit_C.data('uplv')) {
            form_CarInsuranceedit_C.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.EDate));
            form_CarInsuranceedit_C.find('#txtEDate1').val('');
            form_CarInsuranceedit_C.find('#txtSDate1').prop('disabled', true);
            form_CarInsuranceedit_C.find('#cmdCarInsurance').prop('disabled', true);
            form_CarInsuranceedit_C.find('#cmdCarInsurancetype').prop('disabled', true);
        }
    }

    form_CarInsuranceedit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_CarInsuranceedit.formValidation('revalidateField', form_CarInsuranceedit.find('#txtSDate1'));
    });
    form_CarInsuranceedit.find('#txtEDate').dateTime().on('dp.change', function (e) {
        form_CarInsuranceedit.formValidation('revalidateField', form_CarInsuranceedit.find('#txtEDate1'));
    });




    form_CarInsuranceedit.find('#cmdCarInsurance').selectpicker().on({
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
                var _sel = form_CarInsuranceedit.find('#cmdCarInsurance').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.InsuranceName + '">&nbsp;&nbsp;' + v.InsuranceName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

//    form_CarInsuranceedit.find('#cmdProvince').on({
//        change: function () {
////            setSubDistrict(Guid);
//            setDistrict(function (_sd) {
//                _sd.val(Guid).selectpicker('render');
//            })
//        }
//    });
    function setInsurancetype(v) {
        $.reqData({
            url: mvcPatch('Province/Insurancetypecar'),
            data: {key: form_CarInsuranceedit.find('#cmdCarInsurance').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_CarInsuranceedit.find('#cmdCarInsurancetype').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.TypeName + '">&nbsp;&nbsp;' + v.TypeName + '</option>';
                });

                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_CarInsuranceedit_C.find('#btn-ok').on({
        click: function () {
            form_CarInsuranceedit.submit();
        }
    });

    form_CarInsuranceedit.myValidation({
        funsuccess: function () {
            form_CarInsuranceedit_C.data('fun')(form_CarInsuranceedit);
        },
        btnactive: [
            form_CarInsuranceedit.find('#btn-ok')
        ],
        fields: {
            cmdCarInsurance: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อบริษัทประกัน'
                    }
                }
            },
            cmdCarInsurancetype: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชนิดประกัน'
                    }
                }
            },
            txtCash: {
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
            txtSDate1: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่เริ่มอายุประกัน'
                    }
                }
            },
            txtEDate1: {
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

