$(function () {
    var form_Titleedit = $('#form_Titleedit');
    var form_Titleedit_C = $.modelDialog(form_Titleedit);

    var _formdata = form_Titleedit_C.data('data');
    if (_formdata.key === Guid) {

    } else {
        form_Titleedit.find('#txtTitle').val(_formdata.Title);
        form_Titleedit.find('.showinadd').remove();
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

    form_Titleedit_C.find('#btn-ok').on({
        click: function () {
            form_Titleedit.submit();
        }
    })

    form_Titleedit.myValidation({
        funsuccess: function () {
            form_Titleedit_C.data('fun')(form_Titleedit_C);
        },
        btnactive: [
            form_Titleedit_C.find('#btn-ok')
        ],
        fields: {
//            txtTitle: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* กรุณาใส่ คำนำหน้า.'
//                    }
//                }
//            }
        }
    });
});
