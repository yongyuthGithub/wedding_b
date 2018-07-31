$(function () {
    var form_fulebranch = $('#form_fulebranch');
    var form_sumbit = $('#form_sumbit');

    form_fulebranch.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'น้ำมันเชื้อเพลิง',
        headerString: '',
        UrlDataJson: mvcPatch('Fule/findBrand'),
        UrlDataSend: {key: $('#txtkey').val()},
//        return new Array()
//    },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'PumpBranch', header: 'สาขา'},
            {data: 'FullAdress', header: 'ที่อยู่'},
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
                url: mvcPatch('Fule/branchEdit'),
                title: 'เพิ่มสาขา',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                PumpKey: $('#txtkey').val(),
                                PumpBranch: _f.find('#txtbranch').val(),
                                Address: _f.find('#txtaddress').val(),
                                SubDistrict: _f.find('#cmdSubDistrict').val(),
                                ZipCode: _f.find('#txtZipCode').val(),
                                IsDefault: _f.find('#swDF').is(':checked')
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editBrand'),
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
            $.bPopup({
                url: mvcPatch('Fule/branchEdit'),
                title: 'แก้ไขสาขา',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                PumpKey: $('#txtkey').val(),
                                PumpBranch: _f.find('#txtbranch').val(),
                                Address: _f.find('#txtaddress').val(),
                                SubDistrict: _f.find('#cmdSubDistrict').val(),
                                ZipCode: _f.find('#txtZipCode').val(),
                                IsDefault: _f.find('#swDF').is(':checked')
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Fule/editBrand'),
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
                        url: mvcPatch('Fule/removeBrand'),
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
                    txtkey: $('#txtkey').val(),
                    txtdisplay: $('.breadcrumb li.active').text(),
                    txtkey2: d.key,
                    txtdisplay2: d.PumpBranch
                }
            }).prop('action', mvcPatch('fule/branchDetailMain')).submit();
        }
    });
});
