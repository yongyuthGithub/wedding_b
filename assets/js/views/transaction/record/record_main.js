$(function () {
    var form_record = $('#form_record');
    var form_recordlist = $('#form_recordlist');
//    form_record.find('#divSDate').dateTime().on('dp.change', function (e) {
////        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date.add(1,'days'));
//        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date);
//    });
//    form_record.find('#divEDate').dateTime().on('dp.change', function (e) {
////        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date.add(-1,'days'));
//
//        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date);
//    });
    var _sD = new Date().setDate(1);
    form_record.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
//        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_record.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_record.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_record.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

//    form_record.find('#divSDate, #divEDate').on('dp.hide', function (e) {
////        setFind();
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
//        form_recordlist.find('.xref').click();
//    });
//    form_record.find('#divSDate, #divEDate').dateTime().data("DateTimePicker").date(new Date());
    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('Record/findRecord'),
            data: {vdata: JSON.stringify({
//                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
//                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
                    SDate: setDateJson(form_record.find('#txtSDate').val()),
                    EDate: setDateJson(form_record.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_recordlist.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_recordlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        headerString: '',
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataJson: function () {
            return form_recordlist.data('data');
        },
//        UrlDataJson: mvcPatch('Record/findRecord'),
//        UrlDataSend: {vdata: JSON.stringify({
//                SDate: PHP_DateTime_To_JSON(form_record.find('#txtSDate').val()),
//                EDate: PHP_DateTime_To_JSON(form_record.find('#txtEDate').val())
//            })
//        },
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่เอกสาร'},
            {data: 'DocDate', header: 'วันที่เอกสาร'},
            {data: 'ProductName', header: 'สินค้า'},
            {data: 'PriceTotal', header: 'ค่าบริการ'},
            {data: 'BillID', header: 'เลขที่บิล'},
            {data: 'CNumberF', header: 'รถขนส่ง'},
            {data: 'CusCodeF', header: 'บริษัท'},
            {data: 'CusCodeS', header: 'สถานที่ รับ-ส่ง'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return PHP_JSON_To_ShowDate(val2.DocDate);
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.PriceTotal, 2);
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return $.trim(val2.BillID).length > 0 ? val2.BillID : '-';
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return val2.CNumberF + ' / ' + val2.CNumberS;
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    return ($.trim(val2.CusCodeF).length > 0 ? '(' + val2.CusCodeF + ') ' : '') + val2.CustomerF;
                },
                orderable: true,
                targets: 6
            },
            {
                render: function (row, type, val2, meta) {
                    return  val2.LocationNameB + ' -> ' + val2.LocationNameE;
                },
                orderable: true,
                targets: 7
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/recordEdit'),
                title: 'บันทึกรายการประจำวัน',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                DocID: _f.find('#txtDocID').val(),
                                DocDate: setDateJson(_f.find('#txtDocDate').val()),
                                CarFirstKey: _f.find('#cmdCarF').val(),
                                CarSecondKey: _f.find('#cmdCarS').val(),
//                                Product: _f.find('#txtProduct').val(),
                                ProductKey: _f.find('#cmdProduct').val(),
                                CutsomerKey: _f.find('#cmdCustomerF').val(),
//                                CustomerTo: _f.find('#cmdBranchS').val(),
                                ShippingBegin: _f.find('#cmdShippingBegin').val(),
                                ContactBegin: _f.find('#txtContactBegin').val(),
                                ShippingEnd: _f.find('#cmdShippingEnd').val(),
                                ContactEnd: _f.find('#txtContactEnd').val(),
                                PriceTotal: parseFloat(_f.find('#txtTotal').val()),
//                                Smile: parseFloat(_f.find('#txtMileageF').val()),
//                                Emile: parseFloat(_f.find('#txtMileageS').val()),
                                Smile: 0,
                                Emile: 0,
                                Remark: _f.find('#txtRemark').val(),
                                EmpKey: _f.find('#cmdEmp').val(),
                                SkillLabor: parseFloat(_f.find('#txtSkillLabor').val()),
                                TRNFule: $.ToLinq(_f.find('#form_fule').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                PumpFuleKey: x.FuleKey,
                                                Item: x.Item,
                                                ItemPrice: x.ItemPrice,
                                                Price: x.Price,
                                                Smile: x.Smile,
                                                Refer: x.Refer
                                            });
                                        }).ToArray(),
                                TRNIncome: $.ToLinq(_f.find('#form_incomein').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
//                                                Detial: x.Detial,
                                                IncomeKey: x.IncomeKey,
                                                Amount: x.Amount,
                                                IncomeType: 1
                                            });
                                        }).Union($.ToLinq(_f.find('#form_incomeout').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
//                                                Detial: x.Detial,
                                                IncomeKey: x.IncomeKey,
                                                Amount: x.Amount,
                                                IncomeType: 2
                                            });
                                        })).ToArray()
                            });
//                            alert(JSON.stringify(obj));
//                            $.bConfirm({
//                                buttonOK: function (k2) {
//                            k2.close();
                            $.reqData({
                                url: mvcPatch('Record/editRecord'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        _f.find('#btn-close').click();
                                        setFind();
//                                                f.find('.xref').click();
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
                url: mvcPatch('Record/recordEdit'),
                title: 'แก้ไขรายการประจำวัน',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                DocID: _f.find('#txtDocID').val(),
                                DocDate: setDateJson(_f.find('#txtDocDate').val()),
                                CarFirstKey: _f.find('#cmdCarF').val(),
                                CarSecondKey: _f.find('#cmdCarS').val(),
//                                Product: _f.find('#txtProduct').val(),
                                ProductKey: _f.find('#cmdProduct').val(),
                                CutsomerKey: _f.find('#cmdCustomerF').val(),
//                                CustomerTo: _f.find('#cmdBranchS').val(),
                                ShippingBegin: _f.find('#cmdShippingBegin').val(),
                                ContactBegin: _f.find('#txtContactBegin').val(),
                                ShippingEnd: _f.find('#cmdShippingEnd').val(),
                                ContactEnd: _f.find('#txtContactEnd').val(),
                                PriceTotal: parseFloat(_f.find('#txtTotal').val()),
//                                Smile: parseFloat(_f.find('#txtMileageF').val()),
//                                Emile: parseFloat(_f.find('#txtMileageS').val()),
                                Smile: 0,
                                Emile: 0,
                                Remark: _f.find('#txtRemark').val(),
                                EmpKey: _f.find('#cmdEmp').val(),
                                SkillLabor: parseFloat(_f.find('#txtSkillLabor').val()),
                                TRNFule: $.ToLinq(_f.find('#form_fule').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                PumpFuleKey: x.FuleKey,
                                                Item: x.Item,
                                                ItemPrice: x.ItemPrice,
                                                Price: x.Price,
                                                Smile: x.Smile,
                                                Refer: x.Refer
                                            });
                                        }).ToArray(),
                                TRNIncome: $.ToLinq(_f.find('#form_incomein').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
//                                                Detial: x.Detial,
                                                IncomeKey: x.IncomeKey,
                                                Amount: x.Amount,
                                                IncomeType: 1
                                            });
                                        }).Union($.ToLinq(_f.find('#form_incomeout').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
//                                                Detial: x.Detial,
                                                IncomeKey: x.IncomeKey,
                                                Amount: x.Amount,
                                                IncomeType: 2
                                            });
                                        })).ToArray()
                            });
//                            alert(JSON.stringify(obj));
//                            $.bConfirm({
//                                buttonOK: function (k2) {
//                                    k2.close();
                            $.reqData({
                                url: mvcPatch('Record/editRecord'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        _f.find('#btn-close').click();
                                        setFind();
//                                                f.find('.xref').click();
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
                        url: mvcPatch('Record/removeRecord'),
                        data: {data: JSON.stringify(vdata)},
                        callback: function (vdata) {
                            if (vdata.success) {
                                setFind();
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

