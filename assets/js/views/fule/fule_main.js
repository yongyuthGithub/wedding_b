$(function () {
    var form_fule = $('#form_fule');
    var form_sumbit = $('#form_sumbit');

    form_fule.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: true,
        btnPreviewText: 'สาขา',
        headerString: '',
        UrlDataJson: mvcPatch('Fule/findPump'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'Pump', header: 'ชื่อปั้ม'},
            {data: 'PumpType', header: 'ประเภทปั้ม'},
        ],
        DataColumnsDefs: [{
                render: function (row, type, val2, meta) {
                    var _val = val2.PumpType === 1 ? 'ปั้มใน' : 'ปั้นนอก';
                    return _val;
                },
                orderable: true,
                targets: 1
            }],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Fule/edit'),
                title: 'เพิ่มปั้มเชื้อเพลิง',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.Pump = _f.find('#txtUser').val();
                            obj.PumpType = _f.find('#cmdTitle').val();

                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editPump'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
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
                        }
                    });
                },
                buttons: [
                    {
                        id: 'btn-ok',
                        icon: 'fa fa-check',
                        label: '&nbsp;ตกลง',
                        action: function (k) {

                        }
                    }
                ]
            });
        },

        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('Fule/edit'),
                title: 'แก้ไขปั้มเชื้อเพลิง',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.Pump = _f.find('#txtUser').val();
                            obj.PumpType = _f.find('#cmdTitle').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editPump'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
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
                        }
                    });
                },
                buttons: [
                    {
                        id: 'btn-ok',
                        icon: 'fa fa-check',
                        label: '&nbsp;Save',
                        action: function (k) {

                        }
                    }
                ]
            });
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
                        url: mvcPatch('Fule/removePump'),
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
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.Pump
                }
            }).prop('action', mvcPatch('fule/branchindex')).submit();
        }
    });
});

