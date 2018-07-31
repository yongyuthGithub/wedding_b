$(function () {
    var form_Caredit1 = $('#form_Caredit1');
    var form_Caredit1_C = $.modelDialog(form_Caredit1);

    var _formdata = form_Caredit1_C.data('data');
    if (_formdata.key === Guid) {
        setBrand(function (_b) {
            _b.val(Guid).selectpicker('render');
        });
        setProvice(function (_b) {
            _b.val('61200399-EED9-4E46-9295-9D4EC4B0E9E1').selectpicker('render');
        });
    } else {
        form_Caredit1.find('#cmdBrand').val(_formdata.BrandKey);
        form_Caredit1.find('#txtCarNumber').val(_formdata.CarNumber);
        form_Caredit1.find('#cmdProvince').val(_formdata.ProvinceKey);
        form_Caredit1.find('#txtCarType').val(_formdata.CarType);
        form_Caredit1.find('.showinadd').remove();
        form_Caredit1.find('#cmdGroup').val(_formdata.CarGroup).selectpicker('render');
        form_Caredit1.find('#txtCarType').val(_formdata.CarType).selectpicker('render');
        //***Edit By Yongyuth
        setBrand(function (_b) {
            _b.val(_formdata.BrandKey).selectpicker('render');
        });
        setProvice(function (_b) {
            _b.val(_formdata.ProvinceKey).selectpicker('render');
        });

        var _sF = form_Caredit1.find('.showF');
        $.each(_formdata.ImageList, function (k, v) {
            var _id = 'img' + (new Date()).valueOf();
            var _html = '<div class="col-xs-12 xfile" id="' + _id + '">';
            _html += '<div class="divImage row">';
            _html += '<img class="img-responsive imageShow" data-key="' + v.RowKey + '" />';
            _html += '<div class="btn-controll">';
            _html += '<div class="btn-back">';
            _html += '<i class="fa fa-plus btn-addimage btnimage btnEdit" style="margin-right: 5px;"></i>';
            _html += '<i class="fa fa-remove btn-deleteimage btnimage" style="margin-right: 5px;"></i>';
            _html += '<i class="fa fa-search btn-viewimage btnimage"></i>';
            _html += '</div>';
            _html += '</div>';
            _html += '</div>';
            _html += '</div>';
            _sF.append(_html).find('#' + _id).each(function (kk, vv) {
                var _t = $(vv).find('.imageShow');
                $.reqData({
                    url: mvcPatch('Car/findImage'),
                    loanding: false,
                    data: {key: _t.data('key')},
                    callback: function (vdata) {
                        _t.prop('src', vdata.ImageBase64);
                    }
                });
            });
        });
        //********************
    }

    form_Caredit1.find('#cmdGroup').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
        }
    });

    form_Caredit1.find('#txtCarType').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
        }
    });
    form_Caredit1.find('#cmdBrand').selectpicker().on({
        change: function () {
//            setDistrict(Guid);
        }
    });
    function setBrand(v) {
        $.reqData({
            url: mvcPatch('Brand/findBrand'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Caredit1.find('#cmdBrand').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.key + '" data-display="' + v.key + '">&nbsp;&nbsp;' + v.Brand + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }
    form_Caredit1.find('#cmdBrand').selectpicker().on({
        change: function () {
        }
    });
    function setProvice(v) {
//       alert(form_Caredit1.find('#cmdProvince').val());
        $.reqData({
            url: mvcPatch('Province/findProvince'),
            data: {},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_Caredit1.find('#cmdProvince').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="' + v.Province + '">&nbsp;&nbsp;' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_Caredit1.on('click', '.btnAdd', function () {
        var _html = '';
        _html += '<div class="divImage row">';
        _html += '<img class="img-responsive imageShow" />';
        _html += '<div class="btn-controll">';
        _html += '<div class="btn-back">';
        _html += '<i class="fa fa-plus btn-addimage btnimage btnEdit" style="margin-right: 5px;"></i>';
        _html += '<i class="fa fa-remove btn-deleteimage btnimage" style="margin-right: 5px;"></i>';
        _html += '<i class="fa fa-search btn-viewimage btnimage"></i>';
        _html += '</div>';
        _html += '</div>';
        _html += '</div>';
        $('.showF').findFile({
            custom_html: _html,
            custom_this_image: '.imageShow',
            class: 'xfile'
            , fun: function (t) {
                t.attr({
                    'data-key': Guid,
                });
            }
//                multiple:true,
//                empty:true
        });
    });

    form_Caredit1.on('click', '.btnEdit', function () {
        $(this).parents('.divImage').find('.imageShow').findFile({
            fun: function (t) {
                t.attr({
                    'data-key': Guid,
                });
            }
//                custom_html: '<img class="xcard img-responsive" />',
//                custom_this_image: '.xcard',
//                multiple:true,
//                empty:true
        });
    });

    form_Caredit1.on('click', '.btn-viewimage', function () {
        var _this = $(this).parents('.divImage').find('.imageShow');
        if (!checkUndefined(_this.attr('src'))) {
            $.bPopup({
                url: mvcPatch('Popup/index'),
                title: 'Show Picture',
                closable: true,
                btnCancel: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: _this.attr('src')
                    });
                },
                buttons: [
                ]
            });
        }
    });

    form_Caredit1.on('click', '.btn-deleteimage', function () {
        $(this).parents('.xfile').remove();
    });

    form_Caredit1_C.find('#btn-ok').on({
        click: function () {
            form_Caredit1.submit();
        }
    })

    form_Caredit1.myValidation({
        funsuccess: function () {
            form_Caredit1_C.data('fun')(form_Caredit1_C);
        },
        btnactive: [
            form_Caredit1_C.find('#btn-ok')
        ],
        fields: {
            cmdBrand: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาเลือก ยี่ห้อรถ .'
                    }
                }
            },
            txtCarNumber: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ เลขทะเบียนรถ.'
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
            txtCarType: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* กรุณาใส่ ประเภทเพลา.'
                    }
                }
            },

        }
    });
});
