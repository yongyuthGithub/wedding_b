$(function () {
    var form_brandcaredit = $('#form_brandcaredit');
    var form_brandcaredit_C = $.modelDialog(form_brandcaredit);

    var _formdata = form_brandcaredit_C.data('data');
    if (_formdata.key === Guid) {
      
    } else {
        form_brandcaredit.find('#txtbrandcar').val(_formdata.Brand);
        form_brandcaredit.find('.showinadd').remove();
       

    }


//    function setTitle(v) {
//        $.reqData({
//            url: mvcPatch('car/'),
//            loanding: false,
//            callback: function (vdata) {
//             
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Title + '">&nbsp;&nbsp;' + v.Title + '</option>';
//                });
//                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
//            }
//        });
//    }

    form_brandcaredit_C.find('#btn-ok').on({
        click: function () {
            form_brandcaredit.submit();
        }
    })

    form_brandcaredit.myValidation({
        funsuccess: function () {
            form_brandcaredit_C.data('fun')(form_brandcaredit_C);
        },
        btnactive: [
            form_brandcaredit_C.find('#btn-ok')
        ],
        fields: {
            txtbrandcar: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ยี่ห้อรถ.'
                    }
                }
            }
        }
    });
});
