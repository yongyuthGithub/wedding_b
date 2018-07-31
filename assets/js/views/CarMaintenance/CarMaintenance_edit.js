$(function () {
    var form_Carmtnedit = $('#form_Carmtnedit');
    var form_Carmtnedit_C = $.modelDialog(form_Carmtnedit);

    var _formdata = form_Carmtnedit_C.data('data');
    if (_formdata.key === Guid) {
       
        setmtn(function (_b) {
            _b.val(Guid).selectpicker('render');
        });
    } else {

        form_Carmtnedit.find('#txtCash').val(_formdata.CostValue);
        form_Carmtnedit.find('#txtDetail').val(_formdata.Detail);
        form_Carmtnedit.find('#txtcmdCarnumber').val(_formdata.CarKey).selectpicker('rander');
        form_Carmtnedit.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.ListDate));

        
        setmtn(function (_b) {
            _b.val(_formdata.CarKey).selectpicker('render');
        });
        //********************
    }

    form_Carmtnedit.find('#txtSDate').dateTime().on('dp.change', function (e) {
//        form_CarActedit.formValidation('revalidateField', form_CarActedit.find('#txtSDate11'));
    });

  
    form_Carmtnedit.find('#txtcmdCarnumber').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    function setmtn(v) {
        $.reqData({
            url: mvcPatch('CarMaintenance/findCar'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Carmtnedit.find('#txtcmdCarnumber').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var cargroup = v.CarGroup === "1" ?'ส่วนหัว' : 'ส่วนหาง' ; 
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.key + '" data-display="' + v.key + '">&nbsp;&nbsp;' + v.CarNumber + ' ('+cargroup+') </option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_Carmtnedit.find('#txtcmdCarnumber').selectpicker().on({
        change: function () {
        }
    });

    form_Carmtnedit_C.find('#btn-ok').on({
        click: function () {
            form_Carmtnedit.submit();
        }
    });

    form_Carmtnedit.myValidation({
        funsuccess: function () {
            form_Carmtnedit_C.data('fun')(form_Carmtnedit);
        },
        btnactive: [
            form_Carmtnedit.find('#btn-ok')
        ],
        fields: {
            txtDetail: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุรายละเอียด'
                    }
                }
            },
            txtcmdCarnumber: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุเลขทะเบียนรถ'
                    }
                }
            },
            txtSDate11: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* วันที่ลงรายละเอียด'
                    }
                }
            },
            txtCash: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุจำนวนเงิน'
                    }
                }
            },
        }
    });
});

