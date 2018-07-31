$(function () {
    var form_carinsurance = $('#form_carinsurance');
    var form_caract = $('#form_caract');

    form_carinsurance.setMainPage({
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
        UrlDataJson: mvcPatch('Car/findinsurancecar'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [

            {data: 'InsuranceName', header: 'ชนิดของประกัน'},
            {data: 'SDate', header: 'วันเริ่มประกัน'},
            {data: 'EDate', header: 'วันหมดอายุประกัน'},
            {data: 'Cash', header: 'จำนวนเงิน'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.SDate);
                    return _val;
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.EDate);
                    return _val;
                },
                orderable: true,
                targets: 2
            }
        ],
//        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return parseInt(val2.TypeUse) === 1 ? 'บุคคล' : 'ยานพาหนะ';
//                },
//                orderable: true,
//                targets: 1
//            }
//        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Car/carinsuranceedit'),
                title: 'เพิ่มของประกันรถ/ประกันสินค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtkey').val(),
                                InsuranceTypeKey: _f.find('#cmdCarInsurancetype').val(),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editinsurancecar'),
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
                url: mvcPatch('car/carinsuranceedit'),
                title: 'แก้ไขประกันของรถ/ประกันสินค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: false,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                CarKey: $('#txtkey').val(),
                                InsuranceTypeKey: _f.find('#cmdCarInsurancetype').val(),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editinsurancecar'),
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
                        url: mvcPatch('car/removeinsurancecar'),
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
                url: mvcPatch('car/carinsuranceedit'),
                title: 'ต่ออายุประกันของรถ/ประกันสินค้า',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: true,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtkey').val(),
                                InsuranceTypeKey: _f.find('#cmdCarInsurancetype').val(),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    var _objD = new Object({
                                        RowKey: d.key,
                                        RowStatus: false
                                    });
                                    $.reqData({
                                        url: mvcPatch('car/disabledinsurancecar'),
                                        data: {data: JSON.stringify(_objD)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                $.reqData({
                                                    url: mvcPatch('car/editinsurancecar'),
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
//            .......................................ACT.........................................................
    form_caract.setMainPage({
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
        UrlDataJson: mvcPatch('Car/findactcar'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'Cash', header: 'จำนวนเงิน'},
            {data: 'SDate', header: 'วันเริ่มพ.ร.บ'},
            {data: 'EDate', header: 'วันหมดอายุพ.ร.บ'},
            {data: 'ActType', header: 'ประเภท'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.ActType) === 1 ? 'พ.ร.บ' : 'ภาษี';
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.SDate);
                    return _val;
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.EDate);
                    return _val;
                },
                orderable: true,
                targets: 2
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Car/caractedit'),
                title: 'เพิ่มพ.ร.บ/ภาษี ของรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtkey').val(),
                                ActType: parseInt(_f.find('#txtcmdCartaxtype').val()),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editactcar'),
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
                url: mvcPatch('car/caractedit'),
                title: 'แก้ไขพ.ร.บ/ภาษี ของรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: false,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                CarKey: $('#txtkey').val(),
                                ActType: parseInt(_f.find('#txtcmdCartaxtype').val()),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('car/editactcar'),
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
                        url: mvcPatch('car/removeactcar'),
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
                url: mvcPatch('car/caractedit'),
                title: 'ต่ออายุพ.ร.บ/ภาษี ของรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        uplv: true,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtkey').val(),
                                ActType: parseInt(_f.find('#txtcmdCartaxtype').val()),
                                SDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                EDate: PHP_DateTimeShow_To_JSON(_f.find('#txtEDate')),
                                Cash: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    var _objD = new Object({
                                        RowKey: d.key,
                                        RowStatus: false
                                    });
                                    $.reqData({
                                        url: mvcPatch('car/disabledactcar'),
                                        data: {data: JSON.stringify(_objD)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                $.reqData({
                                                    url: mvcPatch('car/editactcar'),
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

