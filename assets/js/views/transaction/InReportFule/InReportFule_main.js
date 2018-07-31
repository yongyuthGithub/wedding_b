$(function () {
    var form_inreportfule = $('#form_inreportfule');
    var form_InReportfulelist = $('#form_InReportfulelist');

    var _sD = new Date().setDate(1);
    form_inreportfule.find('#divSDate').datetimepicker({
        format: 'DD/MM/YYYY',
//        defaultDate: new Date().setDate(1),
        maxDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_inreportfule.find('#divEDate').data("DateTimePicker").minDate(ds.date);
        setFind();
    }).find('#txtSDate').val(getDateCustom(_sD));

    form_inreportfule.find('#divEDate').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'th',
    }).on('dp.change', function (ds) {
        form_inreportfule.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
        setFind();
    });
    setFind();
    function setFind() {
//        var _edate = new Date(form_record.find('#divEDate').data("DateTimePicker").date()).setHours(23, 59, 59, 0);
//        form_record.find('#divEDate').data("DateTimePicker").date(new Date(_edate));
        $.reqData({
            url: mvcPatch('InReportFule/findInReport'),
            data: {vdata: JSON.stringify({
                    SDate: setDateJson(form_inreportfule.find('#txtSDate').val()),
                    EDate: setDateJson(form_inreportfule.find('#txtEDate').val())
                })
            },
            loanding: false,
            callback: function (vdata) {
                form_InReportfulelist.data('data', vdata).find('.xref').click();
            }
        });
    }

    form_InReportfulelist.data('data', new Array()).setMainPage({
        btnNew: false,
        btnNewText: 'พิมพ์รายงาน',
        btnNewIcon: 'glyphicon glyphicon-print',
        btnNewStyle: 'btn-success',
        btnDeleteAll: false,
        btnDelete: false,
        btnEdit: false,
        btnPreview: false,
        headerString: '',
        DataJson: function () {
            return form_InReportfulelist.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'DocID', header: '(ใบงาน) สินค้าที่ขนส่ง'},
            {data: 'ShippingLocations', header: 'สถานที่จัดส่ง'},
            {data: 'DocDate', header: 'วันที่'},
            {data: 'Amount', header: 'จำนวนที่บันทึก'},
            {data: 'Amount', header: 'ภาษี'},
            {data: 'Amount', header: 'เงินสุทธิ'},
//           {data: 'Url', header: 'Url'}
        ],
        AfterLoadData: function (form, data, table) {
            var _v = $.ToLinq(data)
                    .Select(function (x) {
                        return new Object({
//                            Amount: parseInt(x.IsVat) === 0 ? parseFloat(x.Amount) : parseFloat(x.Amount) + ((parseFloat(x.Amount) * 7) / 100)
                            Amount: parseFloat(x.Amount),
                            Vat: parseInt(x.IsVat) === 0 ? 0 : parseFloat(x.Amount) - ((parseFloat(x.Amount) * 100) / 107)
                        });
                    });
            form_inreportfule.find('#txtVat').val(addCommas(_v.Sum(x => x.Vat), 2));
            form_inreportfule.find('#txtTotal').val(addCommas(_v.Sum(x => x.Amount), 2));
        },
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tdNoneBtn">' + PHP_JSON_To_ShowDate(val2.DocDate) + '</div>';
                },
                orderable: true,
                targets: 3
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.IsVat) === 1 ? addCommas(parseFloat(val2.Amount) - ((parseFloat(val2.Amount) * 100) / 107), 2) : '-';
//                    return parseInt(val2.IsVat) === 1 ? addCommas((parseFloat(val2.Amount) * 7) / 100, 2) : '-';
//                    return parseInt(val2.IsVat) === 1 ? fToFixed((parseFloat(val2.Amount) * 7) / 100, 2) : '-';
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    var _c = parseInt(val2.IncomeType) === 1 ? 'text-success' : 'text-danger';
                    return  '<span class="' + _c + '">' + addCommas(val2.Amount, 2) + '</span>';
//                    return  '<span class="' + _c + '">' + (parseInt(val2.IsVat) === 1 ? addCommas(parseFloat(val2.Amount) + ((parseFloat(val2.Amount) * 7) / 100), 2) : addCommas(parseFloat(val2.Amount), 2)) + '</span>';
                },
                orderable: true,
                targets: 6
            }
        ],
        btnNewFun: function (f) {
//            $.bPopup({
//                url: mvcPatch('InReport/displayPrint'),
//                title: 'พิมพ์ข้อมูลรายรับ/รายจ่าย ทั้งหมด',
//                closable: true,
//                btnCancel: false,
//                size: BootstrapDialog.SIZE_WIDE,
//                onshow: function (k) {
//                    k.getModal().data({
//                        data: f.data('data'),
//                        fun: function (_f) {
//
//                        }
//                    });
//                },
//                buttons: [
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