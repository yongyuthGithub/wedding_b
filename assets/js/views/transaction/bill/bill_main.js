$(function () {
    var form_bill = $('#form_bill');
    var form_bilelist = $('#form_bilelist');
    var form_sumbit = $('#form_sumbit');

    var _sD = new Date().setDate(1);
    form_bill.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
//        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_bill.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_bill.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_bill.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('Bill/findbill'),
            data: {vdata: JSON.stringify({
                    SDate: setDateJson(form_bill.find('#txtSDate').val()),
                    EDate: setDateJson(form_bill.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_bilelist.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_bilelist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'Preview',
//        btnPreviewIcon: 'glyphicon glyphicon-print',
        btnPreviewIcon: 'fa fa-search',
        btnPreviewStyle: 'btn-success',
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_bilelist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่บิล'},
            {data: 'DocDate', header: 'วันที่บิล'},
            {data: 'Customer', header: 'ลูกค้า'},
            {data: 'TotalPrice', header: 'ราคารวม'},
            {data: 'Discount', header: 'ส่วนลด'},
            {data: 'Vat', header: 'ภาษี'},
            {data: 'NetPrice', header: 'ราคาสุทธิ'},
            {data: 'RCDoc', header: 'เลขที่ใบเสร็จ'}
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
                    return addCommas(val2.TotalPrice + parseFloat(val2.Discount), 2);
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return parseFloat(val2.Discount) > 0 ? addCommas(val2.Discount, 2) : '-';
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return parseFloat(val2.Vat) > 0 ? addCommas(val2.Vat, 2) : '-';
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.NetPrice, 2);
                },
                orderable: true,
                targets: 6
            },
            {
                render: function (row, type, val2, meta) {
                    return val2.RCDoc === '' ? '-' : val2.RCDoc;
                },
                orderable: true,
                targets: 7
            }
        ],
        btnNewFun: function (f) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: Guid,
                    txtdisplay: 'ออกบิลใหม่'
                }
            }).prop('action', mvcPatch('Bill/indexNew')).submit();
        },
        btnEditFun: function (f, d) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.DocID
                }
            }).prop('action', mvcPatch('Bill/indexNew')).submit();
        },
        btnDeleteFun: function (f, d) {
        },
        btnPreviewFun: function (f, d) {
            $.reqData({
                url: mvcPatch('Bill/checkPrintTemp'),
                data: {key: d.key},
                loanding: false,
                callback: function (vdata) {
                    var _btn = new Array();
                    if (parseInt(vdata) === 0) {
                        _btn.push({
                            id: 'btn-print',
                            icon: 'glyphicon glyphicon-print',
                            label: '&nbsp;Print',
                            cssClass: BootstrapDialog.TYPE_SUCCESS,
                            action: function (k) {
                                //javascript code
                            }
                        });
                    }
                    $.bPopup({
                        url: mvcPatch('Bill/displayPrint'),
                        title: 'พิมพ์บิลเลขที่ ' + d.DocID,
                        closable: true,
                        size: BootstrapDialog.SIZE_WIDE,
                        btnCancel: false,
                        onshow: function (k) {
                            k.getModal().data({
                                print: _btn.length > 0 ? PrintStatus.Print : PrintStatus.Preview,
                                data: d.key,
                                fun: function (_f) {

                                }
                            });
                        },
                        buttons: _btn
                    });
                }
            });
        }
    });
});

