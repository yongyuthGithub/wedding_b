$(function () {
    var form_CarActedit = $('#form_CarActedit');
    var form_CarActedit_C = $.modelDialog(form_CarActedit);

    var _formdata = form_CarActedit_C.data('data');
    if (_formdata.key === Guid) {
//        setProvince(Guid);
        //***Edit By Yongyuth
//        setInsurance(function (_p) {
//            _p.val(Guid).selectpicker('render');
//            setInsurancetype(function (_d) {
//                _d.val(Guid).selectpicker('render');
//            });
//        });
//        //********************
    } else {

        form_CarActedit.find('#txtCash').val(_formdata.Cash);
        form_CarActedit.find('#txtcmdCartaxtype').val(_formdata.ActType).selectpicker('rander');
        form_CarActedit.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.SDate));
        form_CarActedit.find('#txtEDate1').val(PHP_JSON_To_ShowDate(_formdata.EDate));
//
//        //***Edit By Yongyuth
//        setInsurance(function (_p) {
//            _p.val(_formdata.InsuranceKey).selectpicker('render');
//            setInsurancetype(function (_d) {
//                _d.val(_formdata.TypeKey).selectpicker('render');
//
//            });
//        });
//        //********************
        if (form_CarActedit_C.data('uplv')) {
            form_CarActedit.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.EDate));
            form_CarActedit.find('#txtEDate1').val('');
            form_CarActedit.find('#txtSDate1').prop('disabled', true);
            form_CarActedit.find('#txtcmdCartaxtype').prop('disabled', true);
        }
    }

    form_CarActedit.find('#txtSDate').dateTime().on('dp.change', function (e) {
        form_CarActedit.formValidation('revalidateField', form_CarActedit.find('#txtSDate1'));
    });
    form_CarActedit.find('#txtEDate').dateTime().on('dp.change', function (e) {
        form_CarActedit.formValidation('revalidateField', form_CarActedit.find('#txtEDate1'));
    });

    form_CarActedit.find('#txtcmdCartaxtype').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
//
//
//    form_CarActedit.find('#cmdCarInsurance').selectpicker().on({
//        change: function () {
////            setDistrict(Guid);
//            setInsurancetype(function (_d) {
//                _d.val(Guid).selectpicker('render');
//            });
//        }
//    });
//    function setInsurance(v) {
//        $.reqData({
//            url: mvcPatch('Province/Insurance'),
//            loanding: false,
//            callback: function (vdata) {
//                var _sel = form_CarActedit.find('#cmdCarInsurance').empty();
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.InsuranceName + '">&nbsp;&nbsp;' + v.InsuranceName + '</option>';
//                });
//                _sel.append(_html).selectpicker('refresh');
//                v(_sel);
//            }
//        });
//    }
//
////    form_CarActedit.find('#cmdProvince').on({
////        change: function () {
//////            setSubDistrict(Guid);
////            setDistrict(function (_sd) {
////                _sd.val(Guid).selectpicker('render');
////            })
////        }
////    });
//    function setInsurancetype(v) {
//        $.reqData({
//            url: mvcPatch('Province/Insurancetypecar'),
//            data: {key: form_CarActedit.find('#cmdCarInsurance').val()},
//            loanding: false,
//            callback: function (vdata) {
//                var _sel = form_CarActedit.find('#cmdCarInsurancetype').empty();
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.TypeName + '">&nbsp;&nbsp;' + v.TypeName + '</option>';
//                });
//                
//                _sel.append(_html).selectpicker('refresh');
//                v(_sel);
//            }
//        });
//    }
    form_CarActedit_C.find('#btn-ok').on({
        click: function () {
            form_CarActedit.submit();
        }
    });

    form_CarActedit.myValidation({
        funsuccess: function () {
            form_CarActedit_C.data('fun')(form_CarActedit);
        },
        btnactive: [
            form_CarActedit.find('#btn-ok')
        ],
        fields: {
            txtSDate1: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่เริ่มอายุพ.ร.บ/ภาษี'
                    }
                }
            },
            txtEDate1: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุวันที่หมดอายุพ.ร.บ/ภาษี'
                    }
                }
            },
            txtcmdCartaxtype: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุประเภท'
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
        }
    });
});

