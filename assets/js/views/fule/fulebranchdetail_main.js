$(function () {
    var form_fuledetail = $('#form_fuledetail');
    var form_sumbit = $('#form_sumbit');

    $('#tobranch').on({
        click: function () {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: $('#txtkey').val(),
                    txtdisplay: $('#txtdisplay').val()
                }
            }).prop('action', mvcPatch('fule/branchindex')).submit();
        }
    });

    form_fuledetail.on('click', '.swDF', function () {
        var _this = $(this);
        $.reqData({
            url: mvcPatch('fule/editBrandDetailDF'),
            data: {
                key: _this.data('key'),
                mainkey: $('#txtkey2').val(),
                status: _this.is(':checked') ? 1 : 0
            },
            loanding: false,
            callback: function (vdata) {
                if (vdata.success) {
                    form_fuledetail.find('.xref').click();
                } else {
                    $.bAlert({
                        message: vdata.message
                    });
                }
            }
        });
    });

    form_fuledetail.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: false,
        btnPreview: false,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        headerString: '',
        UrlDataJson: mvcPatch('Fule/findBrandDetail'),
        UrlDataSend: {
            key: $('#txtkey2').val()
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Fuel', header: 'เชื้อเพลิง'},
            {data: 'FuelType', header: 'ประเภทเชื้อเพลิง'},
            {data: 'IsDefault', header: 'ค่าเริ่มต้น'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.FuelType) === 1 ? 'น้ำมัน' : 'แก๊ส';
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _chk = parseInt(val2.IsDefault) > 0 ? 'checked' : '';
                    var _html = '<div class="form-group"><div class="material-switch">';
                    _html += '<input id="swDF' + val2.key + '" name="swDF' + val2.key + '" type="checkbox" class="swDF" data-key="' + val2.key + '" ' + _chk + ' />';
                    _html += '<label for="swDF' + val2.key + '" class="label-success" style="width:auto;"></label>';
                    _html += '</div></div>';
                    return _html;
                },
                orderable: true,
                targets: 2
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Fule/branchDetailEdit'),
                title: 'เพิ่มเชื้อเพลิง',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object(
                                {
                                    branchkey: $('#txtkey2').val()
                                }
                        ),
                        fun: function (_f) {
                            var obj = $.ToLinq(_f.find('#cmdFule').val())
                                    .Select(function (x) {
                                        return new Object({
                                            FuleKey: x,
                                            PumpBranchKey: $('#txtkey2').val(),
                                            IsDefault: false
                                        });
                                    }).ToArray();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editFuelList'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                f.find('.xref').click();
                                                _f.find('#btn-close').click();
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                buttons: [
                    {
                        id: 'btn-ok',
                        icon: 'fa fa-check',
                        label: '&nbsp;Save',
                        action: function (k) {
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
        },
        btnDeleteFun: function (f, d) {
            $.bConfirm({
                message: 'Do you want to delete the data?',
                type: BootstrapDialog.TYPE_DANGER,
                buttonOK: function (k) {
                    k.close();
                    var vdata = $.ToLinq(d)
                            .Select(function (x) {
                                return x.key;
                            }).ToArray();
                    $.reqData({
                        url: mvcPatch('Fule/removeFuelList'),
                        data: {data: JSON.stringify(vdata)},
                        callback: function (vdata) {
                            if (vdata.success) {
                                f.find('.xref').click();
                            } else {
                                $.bAlert({
                                    message: vdata.message
                                });
                            }
                        }
                    });
                }
            });
        },
        btnPreviewFun: function (f, d) {
        }
    });
});

