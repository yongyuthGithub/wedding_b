$(function () {
    var form_fule = $('#form_Customer');
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
        btnPreviewText: 'สาขาลูกค้า',
        headerString: '',
        UrlDataJson: mvcPatch('Customer/findCustomer'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'CusCode', header: 'รหัสลูกค้า'},
            {data: 'Customer', header: 'ชื่อลูกค้า'}

        ],
//        DataColumnsDefs: [{
//                render: function (row, type, val2, meta) {
//                    var _val = val2.PumpType === 1 ? 'ปั้มใน' : 'ปั้นนอก';
//                    return _val;
//                },
//                orderable: true,
//                targets: 1
//            }],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Customer/edit'),
                title: 'เพิ่มลูกค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.CusCode = _f.find('#txtCusCode').val();
                            obj.Customer = _f.find('#txtUser').val();
//                            $.bConfirm({
//                                buttonOK: function (k) {
                            k.close();
                            $.reqData({
                                url: mvcPatch('Customer/editCustomer'),
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
//                                }
//                            });
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
                url: mvcPatch('Customer/edit'),
                title: 'แก้ไขข้อมูลลูกค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.CusCode = _f.find('#txtCusCode').val();
                            obj.Customer = _f.find('#txtUser').val();
//                            $.bConfirm({
//                                buttonOK: function (k) {
                            k.close();
                            $.reqData({
                                url: mvcPatch('Customer/editCustomer'),
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
//                                }
//                            });
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
                        url: mvcPatch('Customer/removeAccount'),
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
                    txtdisplay: d.Customer
                }
            }).prop('action', mvcPatch('Customer/branchindex')).submit();
        }
    });
});

