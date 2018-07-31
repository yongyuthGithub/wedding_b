$(function () {
    var form_customerbranch = $('#form_customerbranch');

    form_customerbranch.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('Customer/findCustomertype'),
        UrlDataSend: {key: $('#txtkey').val()},
//    DataJson: function () {
//        return new Array()
//    },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Branch', header: 'สาขา'},
            {data: 'FullAdress', header: 'ที่อยู่'},
            {data: 'Tel', header: 'เบอร์โทร'},
            {data: 'IDCard', header: 'เลขประจำตัวผู้เสียภาษี'},
            {data: 'Fax', header: 'แฟกซ์'},
        ],
//        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return '<i class="' + val2.Icon + '"></i>';
//                },
//                orderable: true,
//                targets: 3
//            }
//        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Customer/typeedit'),
                title: 'เพิ่มสาขาลูกค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({});
                            obj.RowKey = Guid;
                            obj.CompanyKey = $('#txtkey').val();
                            obj.Branch = _f.find('#txtTypeName').val();
                            obj.Address = _f.find('#txtaddress').val();
                            obj.SubDistrict = _f.find('#cmdSubDistrict').val();
                            obj.ZipCode = _f.find('#txtZipCode').val();
                            obj.Tel = _f.find('#txtTel').val();
                            obj.IDCard = _f.find('#txtIDCard').val();
                            obj.Fax = _f.find('#txtFax').val();
                            obj.IsDefault = _f.find('#swDF').is(':checked');
                            obj.BillDay = parseFloat(_f.find('#txtBillDay').val());
                            obj.DueDate = parseFloat(_f.find('#txtDueDate').val());
//                            $.bConfirm({
//                                buttonOK: function (k2) {
//                                    k2.close();
                            $.reqData({
                                url: mvcPatch('Customer/editCustomertype'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        f.find('.xref').click();
                                        k.close();
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
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('Customer/typeedit'),
                title: 'แก้ไขสาขาลูกค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                CompanyKey: $('#txtkey').val(),
                                Branch: _f.find('#txtTypeName').val(),
                                Address: _f.find('#txtaddress').val(),
                                SubDistrict: _f.find('#cmdSubDistrict').val(),
                                ZipCode: _f.find('#txtZipCode').val(),
                                Tel: _f.find('#txtTel').val(),
                                IDCard: _f.find('#txtIDCard').val(),
                                Fax: _f.find('#txtFax').val(),
                                IsDefault: _f.find('#swDF').is(':checked'),
                                BillDay: parseFloat(_f.find('#txtBillDay').val()),
                                DueDate: parseFloat(_f.find('#txtDueDate').val())
                            });
//                            $.bConfirm({
//                                buttonOK: function (k2) {
//                                    k2.close();
                            $.reqData({
                                url: mvcPatch('Customer/editCustomertype'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        f.find('.xref').click();
                                        k.close();
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
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnDeleteFun: function (f, d) {
            if (d.length === 0)
                return false;
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
                        url: mvcPatch('Customer/removeAccount1'),
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

