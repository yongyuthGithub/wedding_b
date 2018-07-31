$(function () {
    var form_fuledetailedit = $('#form_fuledetailedit');
    var form_fuledetailedit_C = $.modelDialog(form_fuledetailedit);

    var _formdata = form_fuledetailedit_C.data('data');


    form_fuledetailedit.find('#cmdFule').selectpicker().on({
        change: function () {
        }
    });
    setFule();
    function setFule() {
        $.reqData({
            url: mvcPatch('Fule/findFuelList'),
            data: {key: _formdata.branchkey},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_fuledetailedit.find('#cmdFule').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _type = parseInt(v.FuelType) === 1 ? 'น้ำมัน' : 'แก๊ส';
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Fuel + '">&nbsp;&nbsp;(' + _type + ') ' + v.Fuel + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
            }
        });
    }

    form_fuledetailedit_C.find('#btn-ok').on({
        click: function () {
            form_fuledetailedit.submit();
        }
    })

    form_fuledetailedit.myValidation({
        funsuccess: function () {
            form_fuledetailedit_C.data('fun')(form_fuledetailedit_C);
        },
        btnactive: [
            form_fuledetailedit_C.find('#btn-ok')
        ],
        fields: {
            cmdFule: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาเลือกเชื้อเพลิง.'
                    }
                }
            },
        }
    });
});

