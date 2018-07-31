$(function () {
    var form_register_insurance = $('#form_register_insurance');

    form_register_insurance.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'ต่ออายุ',
        btnPreview: true,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findeditRegister'),
        UrlDataSend: {key: $('#txtkey').val()},
//    DataJson: function () {
//        return new Array()
//    },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'InsuranceName', header: 'บริษัทประกัน'},
            {data: 'TypeName', header: 'ประเภทประกัน'},
            {data: 'SDate', header: 'วันที่จัดทำ'},
            {data: 'EDate', header: 'วันหมดอายุ'},
            {data: 'Cash', header: 'จำนวนเงิน'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.SDate);
                    return _val;
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.EDate);
                    return _val;
                },
                orderable: true,
                targets: 3
            }
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
                url: mvcPatch('Register/typeedit'),
                title: 'เพิ่มข้อมูลประกัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({});
                            obj.RowKey = Guid;

                            obj.EmpKey = $('#txtkey').val();
                            obj.InsuranceTypeKey = _f.find('#cmdInsurancetype').val();
                            obj.Cash = _f.find('#txtUser3').val();
                            obj.EDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate1'));
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));


                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Register/editeditRegister'),
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
                url: mvcPatch('Register/typeedit'),
                title: 'แก้ไขข้อมูลประกัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: false,
                        fun: function (_f) {
                            var obj = new Object({});
                            obj.RowKey = d.key;
                            obj.EmpKey = $('#txtkey').val();
                            obj.InsuranceTypeKey = _f.find('#cmdInsurancetype').val();
                            obj.Cash = _f.find('#txtUser3').val();
                            obj.EDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate1'));
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));


                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('Register/editeditRegister'),
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
                        url: mvcPatch('Register/removeinsurancetype'),
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
            $.bPopup({
                url: mvcPatch('Register/typeedit'),
                title: 'ต่ออายุประกัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: true,
                        fun: function (_f) {
                            var obj = new Object({});
                            obj.RowKey = Guid;
                            obj.EmpKey = $('#txtkey').val();
                            obj.InsuranceTypeKey = _f.find('#cmdInsurancetype').val();
                            obj.Cash = _f.find('#txtUser3').val();
                            obj.EDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate1'));
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    var _objD = new Object({
                                        RowKey: d.key,
                                        RowStatus: false
                                    });
                                    $.reqData({
                                        url: mvcPatch('Register/disabledRegister'),
                                        data: {data: JSON.stringify(_objD)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                $.reqData({
                                                    url: mvcPatch('Register/editeditRegister'),
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
        }
    });
});