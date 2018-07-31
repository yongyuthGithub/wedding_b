$(function () {
    var form_receipt = $('#form_receipt');
    var form_receiptlist = $('#form_receiptlist');
    var form_sumbit = $('#form_sumbit');

    var _sD = new Date().setDate(1);
    form_receipt.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_receipt.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_receipt.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_receipt.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });

    setFind();
    function setFind() {
        $.reqData({
            url: mvcPatch('Receipt/findReceipt'),
            data: {vdata: JSON.stringify({
                    SDate: setDateJson(form_receipt.find('#txtSDate').val()),
                    EDate: setDateJson(form_receipt.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_receiptlist.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_receiptlist.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: true,
        btnPreviewText: 'Preview',
        btnPreviewIcon: 'fa fa-search',
        btnPreviewStyle: 'btn-success',
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_receiptlist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocID', header: 'เลขที่ใบเสร็จ'},
            {data: 'DocDate', header: 'วันที่ใบเสร็จ'},
            {data: 'Customer', header: 'ลูกค้า'},
            {data: 'PayType', header: 'ชำระโดย'},
            {data: 'Amounts', header: 'จำนวนเงินที่ชำระ'},
//            {data: 'Url', header: 'Url'}
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
                    return addCommas(parseFloat(val2.Amounts), 2);
                },
                orderable: true,
                targets: 4
            }
        ],
        btnNewFun: function (f) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: Guid,
                    txtdisplay: 'ออกใบเสร็จใหม่'
                }
            }).prop('action', mvcPatch('Receipt/editPage')).submit();
        },
        btnEditFun: function (f, d) {
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.DocID
                }
            }).prop('action', mvcPatch('Receipt/editPage')).submit();
        },
        btnDeleteFun: function (f, d) {

        },
        btnPreviewFun: function (f, d) {
            $.reqData({
                url: mvcPatch('Receipt/checkPrintTemp'),
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
                        url: mvcPatch('Receipt/displayPrint'),
                        title: 'พิมพ์ใบเสร็จเลขที่ ' + d.DocID,
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

