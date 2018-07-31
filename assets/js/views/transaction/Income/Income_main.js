$(function () {
    var form_Income = $('#form_Income');
    var form_Incometime = $('#form_Incometime');

    var _sD = new Date().setDate(1);
    form_Incometime.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_Incometime.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_Incometime.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_Incometime.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });
    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('Income/findIncome'),
            data: {vdata: JSON.stringify({
//                    SDate: PHP_DateTimeShow_To_JSON(form_record.find('#divSDate')),
//                    EDate: PHP_DateTimeShow_To_JSON(form_record.find('#divEDate'), true)
                    SDate: setDateJson(form_Incometime.find('#txtSDate').val()),
                    EDate: setDateJson(form_Incometime.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_Income.data('data', vdata).find('.xref').click();
            }
        });
    }




    form_Income.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        headerString: '',
        DataJson: function () {
            return form_Income.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'DocID', header: 'เลขที่บิล'},
            {data: 'Detial', header: 'รายละเอียด'},
            {data: 'IncomeType', header: 'ประเภท'},
            {data: 'DocDate', header: 'วันที่'},
            {data: 'Amount', header: 'จำนวนเงิน'},
            {data: 'Amount', header: 'ภาษี'},
//           {data: 'Url', header: 'Url'}
        ],

        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.DocDate);
                    return _val;
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.IncomeType === 1 ? 'รายรับ' : 'รายจ่าย';
                    return _val;
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = addCommas(val2.Amount, 2);
                    return _val;
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.IsVat === '1' ? addCommas(parseFloat(val2.Amount) - ((parseFloat(val2.Amount) * 100) / 107), 2) : '-';
                    return _val;
                },
                orderable: true,
                targets: 5
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Income/edit'),
                title: 'เพิ่มรายรับ/รายจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.DocDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            obj.DocID = _f.find('#txtDocID').val();
                            obj.Detial = _f.find('#txtUser2').val();
                            obj.IncomeType = _f.find('#cmdTitle').val();
                            obj.Amount = _f.find('#txtUser3').val();
                            obj.IsVat = _f.find('#swDF').is(':checked');
//                            $.bConfirm({
//                                buttonOK: function (k) {
//                                    k.close();
                            $.reqData({
                                url: mvcPatch('Income/editIncome'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        k.close();
                                        setFind();
//                                        _f.find('#btn-close').click();
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
                url: mvcPatch('Income/edit'),
                title: 'แก้ไขรายรับ/รายจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.DocDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            obj.DocID = _f.find('#txtDocID').val();
                            obj.Detial = _f.find('#txtUser2').val();
                            obj.IncomeType = _f.find('#cmdTitle').val();
                            obj.Amount = _f.find('#txtUser3').val();
                            obj.IsVat = _f.find('#swDF').is(':checked');
//                            $.bConfirm({
//                                buttonOK: function (k) {
//                            k.close();
                            $.reqData({
                                url: mvcPatch('Income/editIncome'),
                                data: {data: JSON.stringify(obj)},
                                loanding: false,
                                callback: function (vdata) {
                                    if (vdata.success) {
                                        setFind();
                                        k.close();
//                                        _f.find('#btn-close').click();
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
                        url: mvcPatch('Income/removeAccount'),
                        data: {data: JSON.stringify(vdata)},
                        callback: function (vdata) {
                            if (vdata.success) {
                                setFind();
//                                f.find('.xref').click();
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

