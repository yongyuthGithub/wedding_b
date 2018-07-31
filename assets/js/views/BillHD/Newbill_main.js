$(function () {
    var form_newbill = $('#form_newbill');
    var form_search = $('#form_search');

       form_search.find('#cmdCustomer').selectpicker().on({
        change: function () {
        }
    });
    setCustomer()
    function setCustomer() {
        $.reqData({
            url: mvcPatch('BillHD/findCustomer'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_search.find('#cmdCustomer').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.key + '" data-display="' + v.key + '">&nbsp;&nbsp;' + v.Customer + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                
            }
        });
    }
    

    form_newbill.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        btnNewText: 'พิมพ์รายงาน',
        headerString: '',
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataJson: function () {
            return form_newbill.data('data');
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
            {data: 'Product', header: 'สินค้า'},
            {data: 'PriceTotal', header: 'ค่าบริการ'},
            {data: 'CNumberF', header: 'รถขนส่ง'},
            {data: 'CusCodeF', header: 'จากบริษัท'},
            {data: 'CusCodeS', header: 'ถึงบริษัท'}
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
                    return val2.CNumberF + ' / ' + val2.CNumberS;
                },
                orderable: true,
                targets: 4
            },
            {
                render: function (row, type, val2, meta) {
                    return ($.trim(val2.CusCodeF).length > 0 ? '(' + val2.CusCodeF + ') ' : '') + val2.CustomerF + ' -> ' + val2.BranchF;
                },
                orderable: true,
                targets: 5
            },
            {
                render: function (row, type, val2, meta) {
                    return ($.trim(val2.CusCodeS).length > 0 ? '(' + val2.CusCodeS + ') ' : '') + val2.CustomerS + ' -> ' + val2.BranchS;
                },
                orderable: true,
                targets: 6
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('BillHD/recordEdit'),
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
                                Product: _f.find('#txtProduct').val(),
                                CutsomerForm: _f.find('#cmdBranchF').val(),
                                CustomerTo: _f.find('#cmdBranchS').val(),
                                PriceTotal: parseFloat(_f.find('#txtTotal').val()),
                                Smile: parseFloat(_f.find('#txtMileageF').val()),
                                Emile: parseFloat(_f.find('#txtMileageS').val()),
                                Remark: _f.find('#txtRemark').val(),
                                TRNFule: $.ToLinq(_f.find('#form_fule').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                PumpFuleKey: x.FuleKey,
                                                Price: x.Price,
                                                Smile: x.Smile
                                            });
                                        }).ToArray(),
                                TRNIncome: $.ToLinq(_f.find('#form_incomein').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 1
                                            });
                                        }).Union($.ToLinq(_f.find('#form_incomeout').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 2
                                            });
                                        })).ToArray()
                            });
//                            alert(JSON.stringify(obj));
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
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
                                Product: _f.find('#txtProduct').val(),
                                CutsomerForm: _f.find('#cmdBranchF').val(),
                                CustomerTo: _f.find('#cmdBranchS').val(),
                                PriceTotal: parseFloat(_f.find('#txtTotal').val()),
                                Smile: parseFloat(_f.find('#txtMileageF').val()),
                                Emile: parseFloat(_f.find('#txtMileageS').val()),
                                Remark: _f.find('#txtRemark').val(),
                                TRNFule: $.ToLinq(_f.find('#form_fule').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                PumpFuleKey: x.FuleKey,
                                                Price: x.Price,
                                                Smile: x.Smile
                                            });
                                        }).ToArray(),
                                TRNIncome: $.ToLinq(_f.find('#form_incomein').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 1
                                            });
                                        }).Union($.ToLinq(_f.find('#form_incomeout').data('data'))
                                        .Select(function (x) {
                                            return new Object({
                                                RowKey: x.key,
                                                Detial: x.Detial,
                                                Amount: x.Amount,
                                                IncomeType: 2
                                            });
                                        })).ToArray()
                            });
//                            alert(JSON.stringify(obj));
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
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
