$(function () {
    var form_BillHD = $('#form_BillHD');
    var form_recordlist1 = $('#form_recordlist1');
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
    form_BillHD.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
//        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_BillHD.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_BillHD.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_BillHD.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
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
            url: mvcPatch('BillHD/findBillHD'),
            data: {vdata: JSON.stringify({
                    SDate: setDateJson(form_BillHD.find('#txtSDate').val()),
                    EDate: setDateJson(form_BillHD.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_recordlist1.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_recordlist1.data('data', new Array()).setMainPage({
        btnNew: false,
        btnDeleteAll: false,
        btnDelete: false,
        btnEdit: false,
        btnNewText: 'พิมพ์รายงาน',
        btnPreview: false,
        btnNewIcon: 'glyphicon glyphicon-print',
        btnNewStyle: 'btn-success',
        headerString: '',
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataJson: function () {
            return form_recordlist1.data('data');
        },
//        UrlDataJson: mvcPatch('Record/findRecord'),
//        UrlDataSend: {vdata: JSON.stringify({
//                SDate: PHP_DateTime_To_JSON(form_record.find('#txtSDate').val()),
//                EDate: PHP_DateTime_To_JSON(form_record.find('#txtEDate').val())
//            })
//        },
        AfterLoadData: function (form, data, table) {
            var _v = $.ToLinq(data)
                    .Select(function (x) {
                        return new Object({
                            Amounts: parseFloat(x.Amounts),
                            Remain: parseFloat(x.Remain)
                        });
                    });
            var _Amounts = _v.Sum(x => x.Amounts);
            var _Remain = _v.Sum(x => x.Remain);
            form_BillHD.find('#txtAmounts').val(addCommas(_Amounts, 2));
            form_BillHD.find('#txtRemain').val(addCommas(_Remain, 2));
            form_BillHD.find('#txtBalance').val(addCommas(_Amounts - _Remain, 2));
        },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่เอกสาร'},
            {data: 'DocDate', header: 'วันที่เอกสาร'},
            {data: 'Customer', header: 'ลูกค้า'},
            {data: 'Amounts', header: 'ยอดที่ต้องชำระ'},
            {data: 'Remain', header: 'ยอดที่ชำระแล้ว'},
            {data: 'Remain', header: 'ยอดค้างชำระ'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tdNoneBtn">' + PHP_JSON_To_ShowDate(val2.DocDate) + '</div>';
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amounts, 2);
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return '<span class="text-success">' + addCommas(val2.Remain, 2) + '</span>';
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return '<span class="text-danger">' + addCommas(parseFloat(val2.Amounts) - parseFloat(val2.Remain), 2) + '</span>';
                },
                orderable: true,
                targets: 5
            }
        ],
        btnNewFun: function (f) {
//            $.bPopup({
//                url: mvcPatch('BillHD/edit'),
//                title: 'รายการบิล',
//                closable: false,
//                size: BootstrapDialog.SIZE_NORMAL,
//                onshow: function (k) {
//                    k.getModal().data({
//                        data: new Object({key: Guid}),
//                        fun: function (_f) {
//                            var obj = new Object();
//                            obj.RowKey = Guid;
//                            obj.CusCode = _f.find('#txtCusCode').val();
//                            obj.Customer = _f.find('#txtUser').val();
//                            $.bConfirm({
//                                buttonOK: function (k) {
//                                    k.close();
//                                    $.reqData({
//                                        url: mvcPatch('Customer/editCustomer'),
//                                        data: {data: JSON.stringify(obj)},
//                                        loanding: false,
//                                        callback: function (vdata) {
//                                            if (vdata.success) {
//                                                _f.find('#btn-close').click();
//                                                f.find('.xref').click();
//                                            } else {
//                                                $.bAlert({
//                                                    message: vdata.message
//                                                });
//                                            }
//                                        }
//                                    });
//                                }
//                            });
//                        }
//                    });
//                },
//                buttons: [
//                    {
//                        id: 'btn-ok',
//                        icon: 'fa fa-check',
//                        label: '&nbsp;ตกลง',
//                        action: function (k) {
//
//                        }
//                    }
//                ]
//            });
        },

        btnEditFun: function (f, d) {

        },
        btnDeleteFun: function (f, d) {

        },
        btnPreviewFun: function (f, d) {
        }
    });
});

