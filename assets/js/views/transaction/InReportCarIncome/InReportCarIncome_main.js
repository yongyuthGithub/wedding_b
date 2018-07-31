$(function () {
    var form_IncomeCar = $('#form_IncomeCar');
    var form_IncomeCarList = $('#form_IncomeCarList');

    form_IncomeCar.find('#cmdCarF').selectpicker({
    }).on({
        'hidden.bs.select': function () {
            setFind();
        }
    });
    setDataCar();
    function setDataCar() {
        $.reqData({
            url: mvcPatch('InReportCarIncome/findCar'),
            data: {key: $('#txtkey').val()},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_IncomeCar.find('#cmdCarF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="glyphicon fa fa-truck" value="' + v.RowKey + '" data-display="' + v.CarNumber + '" selected>&nbsp;&nbsp;' + v.CarNumber + ' ' + v.Province + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                setDateF();
            }
        });
    }

    function setDateF() {
        var _sD = new Date().setDate(1);
        form_IncomeCar.find('#divSDate').datetimepicker({
            format: 'DD/MM/YYYY',
            maxDate: new Date(),
//            defaultDate: new Date(),
            locale: 'th',
        }).on('dp.change', function (ds) {
            form_IncomeCar.find('#divEDate').data("DateTimePicker").minDate(ds.date);
            setFind();
        }).find('#txtSDate').val(getDateCustom(_sD));

        form_IncomeCar.find('#divEDate').datetimepicker({
            format: 'DD/MM/YYYY',
            minDate: new Date(),
            defaultDate: new Date(),
            locale: 'th',
        }).on('dp.change', function (ds) {
            form_IncomeCar.find('#divSDate').data("DateTimePicker").maxDate(ds.date);
            setFind();
        });
        setFind();
    }

    function setFind() {
        var _carList = form_IncomeCar.find('#cmdCarF').val();
        if (_carList.length === 0)
            _carList.push(Guid);
        $.reqData({
            url: mvcPatch('InReportCarIncome/findInReportCarIncome'),
            data: {vdata: JSON.stringify({
                    SDate: setDateJson(form_IncomeCar.find('#txtSDate').val()),
                    EDate: setDateJson(form_IncomeCar.find('#txtEDate').val())
                }),
                carlist: JSON.stringify(_carList)
            }
            ,
            loanding: false,
            callback: function (vdata) {
                form_IncomeCarList.data('data', vdata).find('.xref').click();
            }
        }
        );
    }

    form_IncomeCarList.data('data', new Array()).setMainPage({
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
            return form_IncomeCarList.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'DocID', header: 'ใบงาน'},
            {data: 'DocDate', header: 'วันที่'},
            {data: 'ShippingLocations', header: 'สถานที่จัดส่ง'},
            {data: 'ProductName', header: 'สินค้าที่ขนส่ง'},
            {data: 'Amount', header: 'ค่าบริการ'}
//           {data: 'Url', header: 'Url'}
        ],
        AfterLoadData: function (form, data, table) {
            var _v = $.ToLinq(data)
                    .Select(function (x) {
                        return parseFloat(x.Amount);
                    })
                    .Sum();
            form_IncomeCar.find('#txtTotal').val(addCommas(_v, 2));
        },
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<div class="tdNoneBtn">' + PHP_JSON_To_ShowDate(val2.DocDate) + '</div>';
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 5
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