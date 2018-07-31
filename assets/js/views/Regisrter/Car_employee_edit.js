$(function () {
    var form_CarEmpedit = $('#form_CarEmpedit');
    var form_CarEmpedit_C = $.modelDialog(form_CarEmpedit);

    var _formdata = form_CarEmpedit_C.data('data');
    if (_formdata.key === Guid) {
        setemp(function (_b) {
            _b.val(Guid).selectpicker('render');
        });
        setempcar(function (_b) {
            _b.val(Guid).selectpicker('render');
        });
    } else {

        form_CarEmpedit.find('#txtCash').val(_formdata.SkillLabor);
        form_CarEmpedit.find('#txtcmdCaremployee').val(_formdata.EmpKey).selectpicker('rander');
        form_CarEmpedit.find('#txtcmdCarnumber').val(_formdata.CarKey).selectpicker('rander');
        form_CarEmpedit.find('#txtSDate1').val(PHP_JSON_To_ShowDate(_formdata.BeginDate));

        setemp(function (_b) {
            _b.val(_formdata.EmpKey).selectpicker('render');
        });
        setempcar(function (_b) {
            _b.val(_formdata.CarKey).selectpicker('render');
        });
        //********************
    }

    form_CarEmpedit.find('#txtSDate').dateTime().on('dp.change', function (e) {
//        form_CarActedit.formValidation('revalidateField', form_CarActedit.find('#txtSDate11'));
    });

    form_CarEmpedit.find('#txtcmdCaremployee').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    form_CarEmpedit.find('#txtcmdCarnumber').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });

    function setemp(v) {
        $.reqData({
            url: mvcPatch('register/findRegister'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_CarEmpedit.find('#txtcmdCaremployee').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.key + '" data-display="' + v.key + '">&nbsp;&nbsp;' + v.Title + ' ' + v.FName +' '+ v.LName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_CarEmpedit.find('#txtcmdCaremployee').selectpicker().on({
        change: function () {
        }
    });
    function setempcar(v) {
        $.reqData({
            url: mvcPatch('Car/findCar'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_CarEmpedit.find('#txtcmdCarnumber').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.key + '" data-display="' + v.key + '">&nbsp;&nbsp;' + v.CarNumber + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_CarEmpedit.find('#txtcmdCarnumber').selectpicker().on({
        change: function () {
        }
    });

    form_CarEmpedit_C.find('#btn-ok').on({
        click: function () {
            form_CarEmpedit.submit();
        }
    });

    form_CarEmpedit.myValidation({
        funsuccess: function () {
            form_CarEmpedit_C.data('fun')(form_CarEmpedit);
        },
        btnactive: [
            form_CarEmpedit.find('#btn-ok')
        ],
        fields: {
            txtCmdcaremployee: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาระบุชื่อคนขับรถ'
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
                        message: '* กรุณาระบุวันที่เริ่มทำงาน'
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

