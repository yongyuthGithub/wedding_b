$(function () {
    var form_recordedit = $('#form_recordedit');
    var form_recordedit_C = $.modelDialog(form_recordedit);
    var form_incomein = $('#form_incomein');
    var form_incomeout = $('#form_incomeout');
    var form_fule = $('#form_fule');

    var _formdata = form_recordedit_C.data('data');
    if (_formdata.key === Guid) {
        setCarF(Guid);
        setCarS(Guid);
//        form_incomein.data('data', new Array());
//        form_incomeout.data('data', new Array());
        setCustomerF(function (_p) {
            _p.val(Guid).selectpicker('render');
//            setCustomerBranchF(function (_b) {
//                _b.val(Guid).selectpicker('render');
//            });
        });
//        setCustomerS(function (_p) {
//            _p.val(Guid).selectpicker('render');
//            setCustomerBranchS(function (_b) {
//                _b.val(Guid).selectpicker('render');
//            });
//        });
        setShippingBegin(function (_t) {
            _t.val(Guid).selectpicker('render');
        });
        setShippingEnd(function (_t) {
            _t.val(Guid).selectpicker('render');
        });
        setProduct(function (_p) {
            _p.val(Guid).selectpicker('render');
        });
        setEmp(Guid);
    } else {
        $.reqData({
            url: mvcPatch('Record/findRecordOne'),
            data: {key: _formdata.key},
            loanding: false,
            callback: function (vdata) {
                form_recordedit.find('#txtDocID').val(vdata.DocID);
                form_recordedit.find('#txtDocDate').val(PHP_JSON_To_ShowDate(vdata.DocDate));
                setCarF(vdata.CarFirstKey);
                setCarS(vdata.CarSecondKey);
                setCustomerF(function (_p) {
                    _p.val(vdata.CustF).selectpicker('render');
//                    setCustomerBranchF(function (_b) {
//                        _b.val(vdata.CustBF).selectpicker('render');
//                    });
                });
//                setCustomerS(function (_p) {
//                    _p.val(vdata.CustS).selectpicker('render');
//                    setCustomerBranchS(function (_b) {
//                        _b.val(vdata.CustBS).selectpicker('render');
//                    });
//                });
                form_recordedit.find('#txtMileageF').val(parseFloat(vdata.Smile).toFixed(2));
                form_recordedit.find('#txtMileageS').val(parseFloat(vdata.Emile).toFixed(2));
                form_recordedit.find('#txtProduct').val(vdata.Product);
                form_recordedit.find('#txtRemark').val(vdata.Remark);
                form_recordedit.find('#txtTotal').val(parseFloat(vdata.PriceTotal).toFixed(2));
                var _fule = $.ToLinq(vdata.TRNFule)
                        .Select(function (x) {
                            return new Object({
                                key: x.key,
                                Item: parseFloat(x.Item).toFixed(2),
                                ItemPrice: parseFloat(x.ItemPrice).toFixed(2),
                                Price: parseFloat(x.Price).toFixed(2),
                                Smile: parseFloat(x.Smile).toFixed(2),
                                FuleKey: x.FuleKey,
                                FuelDisplay: x.FuelDisplay,
                                BranchKey: x.BranchKey,
                                BranchDisplay: x.BranchDisplay,
                                PumpKey: x.PumpKey,
                                PumpDisplay: x.PumpDisplay,
                                Refer: x.Refer
                            });
                        }).ToArray();
                form_fule.data('data', _fule).find('.xref').click();
                var _in = $.ToLinq(vdata.TRNIncome)
                        .Where(x => parseInt(x.IncomeType) === 1)
                        .ToArray();
                form_incomein.data('data', _in).find('.xref').click();
                var _out = $.ToLinq(vdata.TRNIncome)
                        .Where(x => parseInt(x.IncomeType) === 2)
                        .ToArray();
                form_incomeout.data('data', _out).find('.xref').click();
                setShippingBegin(function (_t) {
                    _t.val(vdata.ShippingBegin).selectpicker('render');
                    form_recordedit.find('#txtContactBegin').val(vdata.ContactBegin);
                });
                setShippingEnd(function (_t) {
                    _t.val(vdata.ShippingEnd).selectpicker('render');
                    form_recordedit.find('#txtContactEnd').val(vdata.ContactEnd);
                });
                setProduct(function (_p) {
                    _p.val(vdata.ProductKey).selectpicker('render');
                });

                setEmp(vdata.EmpKey);
                form_recordedit.find('#txtSkillLabor').val(vdata.SkillLabor);
            }
        });
    }

    form_recordedit.find('#divDate').datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'th',
//        defaultDate: new Date()
    }).on('dp.change', function (ds) {
        form_recordedit.formValidation('revalidateField', form_recordedit.find('#txtDocDate'));
    });
    form_recordedit.find('#cmdCarF').selectpicker({
    }).on({
        change: function () {

        }
    });
    function setCarF(v) {
        $.reqData({
            url: mvcPatch('Record/findCarFirst'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCarF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
//                    var _p = parseInt(v.CarType) === 1 ? '2 เพลา' : '3 เพลา';
                    _html += '<option data-icon="fa fa-truck" value="' + v.RowKey + '" data-display="' + v.CarNumber + '">&nbsp;&nbsp;' + v.CarNumber + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }
    form_recordedit.find('#cmdCarS').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    function setCarS(v) {
        $.reqData({
            url: mvcPatch('Record/findCarSecond'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCarS').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _p = parseInt(v.CarType) === 1 ? 'พื้นเรียบ 2 เพลา' : parseInt(v.CarType) === 2 ? 'พื้นเรียบ 3 เพลา' : 'โรเบท 3 เพลา';
                    _html += '<option data-icon="fa fa-truck" value="' + v.RowKey + '" data-display="' + v.CarNumber + '">&nbsp;&nbsp;' + v.CarNumber + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_recordedit.find('#cmdEmp').selectpicker({
    }).on({
        change: function () {
            //javascript on change
        }
    });
    function setEmp(v) {
        $.reqData({
            url: mvcPatch('Record/findEmp'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdEmp').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _p = parseInt(v.CarType) === 1 ? '2 เพลา' : '3 เพลา';
//                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="(' + v.IDCard + ') ' + v.Title + v.FName + ' ' + v.LName + '">&nbsp;&nbsp;(' + v.IDCard + ') ' + v.Title + v.FName + ' ' + v.LName + '</option>';
                    _html += '<option data-icon="fa fa-drivers-license-o" value="' + v.RowKey + '" data-display="(' + v.IDCard + ') ' + v.Title + v.FName + ' ' + v.LName + '">&nbsp;&nbsp;' + v.Title + v.FName + ' ' + v.LName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh').val(v).selectpicker('render');
            }
        });
    }

    form_recordedit.find('#cmdCustomerF').selectpicker({
    }).on({
        change: function () {
//            setCustomerBranchF(function (_b) {
//                if (_b.find('option').length === 0)
//                    _b.val(Guid).selectpicker('render');
//                form_recordedit.formValidation('revalidateField', form_recordedit.find('#cmdBranchF'));
//            });
        },
        'loaded.bs.select': function (e) {
            $('#btn-customerNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Customer/edit'),
                        title: 'เพิ่มลูกค้า',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.CusCode = _f.find('#txtCusCode').val();
                                    obj.Customer = _f.find('#txtUser').val();
//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Customer/editCustomer'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setCustomerF(function (_t) {
                                                    _t.val(vdata.RowKey).selectpicker('render').change();
                                                });

                                                var obj2 = new Object({});
                                                obj2.RowKey = Guid;
                                                obj2.CompanyKey = vdata.RowKey;
                                                obj2.Branch = 'สำนักงานใหญ่';
                                                obj2.Address = '-';
                                                obj2.SubDistrict = Guid;
                                                obj2.ZipCode = '-';
                                                obj2.Tel = '-';
                                                obj2.IDCard = '-';
                                                obj2.Fax = '-';
                                                obj2.IsDefault = true;
                                                obj2.BillDay = parseFloat(0);
                                                obj2.DueDate = parseFloat(0);
                                                $.reqData({
                                                    url: mvcPatch('Customer/editCustomertype'),
                                                    data: {data: JSON.stringify(obj2)},
                                                    loanding: false,
                                                    callback: function (vdata2) {
                                                    }
                                                });
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
//                                        }
//                                    });
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
                }
            })
        }
    });
    function setCustomerF(v) {
        $.reqData({
            url: mvcPatch('Record/findCustomer'),
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdCustomerF').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    var _c = $.trim(v.CusCode).length === 0 ? v.Customer : v.CusCode + ' -> ' + v.Customer;
                    _html += '<option data-icon="fa fa-address-book" value="' + v.RowKey + '" data-display="' + _c + '">&nbsp;&nbsp;' + _c + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

//    form_recordedit.find('#cmdBranchF').selectpicker({
//    }).on({
//        change: function () {
//            //javascript on change
//        }
//    });
//    function setCustomerBranchF(v) {
//        $.reqData({
//            url: mvcPatch('Record/findCustomerBranch'),
//            data: {key: form_recordedit.find('#cmdCustomerF').val()},
//            loanding: false,
//            callback: function (vdata) {
//                var _sel = form_recordedit.find('#cmdBranchF').empty();
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    _html += '<option data-icon="fa fa-building-o" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
//                });
//                _sel.append(_html).selectpicker('refresh');
//                v(_sel);
//            }
//        });
//    }

//    form_recordedit.find('#cmdCustomerS').selectpicker({
//    }).on({
//        change: function () {
//            setCustomerBranchS(function (_b) {
//                if (_b.find('option').length === 0)
//                    _b.val(Guid).selectpicker('render');
//                form_recordedit.formValidation('revalidateField', form_recordedit.find('#cmdBranchS'));
//            });
//        }
//    });
//    function setCustomerS(v) {
//        $.reqData({
//            url: mvcPatch('Record/findCustomer'),
//            loanding: false,
//            callback: function (vdata) {
//                var _sel = form_recordedit.find('#cmdCustomerS').empty();
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    var _c = $.trim(v.CusCode).length === 0 ? v.Customer : v.CusCode + ' -> ' + v.Customer;
//                    _html += '<option data-icon="fa fa-building" value="' + v.RowKey + '" data-display="' + _c + '">&nbsp;&nbsp;' + _c + '</option>';
//                });
//                _sel.append(_html).selectpicker('refresh');
//                v(_sel);
//            }
//        });
//    }

//    form_recordedit.find('#cmdBranchS').selectpicker({
//    }).on({
//        change: function () {
//            //javascript on change
//        }
//    });
//    function setCustomerBranchS(v) {
//        $.reqData({
//            url: mvcPatch('Record/findCustomerBranch'),
//            data: {key: form_recordedit.find('#cmdCustomerS').val()},
//            loanding: false,
//            callback: function (vdata) {
//                var _sel = form_recordedit.find('#cmdBranchS').empty();
//                var _html = '';
//                $.each(vdata, function (k, v) {
//                    _html += '<option data-icon="fa fa-building-o" value="' + v.RowKey + '" data-display="' + v.Branch + '">&nbsp;&nbsp;' + v.Branch + '</option>';
//                });
//                _sel.append(_html).selectpicker('refresh');
//                v(_sel);
//            }
//        });
//    }

    form_recordedit.find('#cmdShippingBegin').selectpicker({
    }).on({
        change: function () {
            var _this = $(this);
            var _con = form_recordedit.find('#txtContactBegin');
//            if ($.trim(_con.val()).length === 0)
            _con.val(_this.find('option:checked').data('contact'));
        },
        'loaded.bs.select': function (e) {
            $('#btn-shippingBeginNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Shipping/edit'),
                        title: 'เพิ่มสถานที่ รับ-ส่ง สินค้า',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.LocationName = _f.find('#txtLocationName').val();
                                    obj.Contact = _f.find('#txtContact').val();
//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Shipping/editShipping'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setShippingBegin(function (_t) {
                                                    _t.val(vdata.RowKey).selectpicker('render').change();
                                                });
                                                var _e = form_recordedit.find('#cmdShippingEnd').val();
                                                setShippingEnd(function (_t) {
                                                    _t.val(_e).selectpicker('render').change();
                                                });
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
//                                        }
//                                    });
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
                }
            })
        }
    });
    function setShippingBegin(v) {
        $.reqData({
            url: mvcPatch('Shipping/findShipping'),
            data: {},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdShippingBegin').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-home" value="' + v.key + '" data-display="' + v.LocationName + '" data-contact="' + v.Contact + '">&nbsp;&nbsp;' + v.LocationName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_recordedit.find('#cmdShippingEnd').selectpicker({
    }).on({
        change: function () {
            var _this = $(this);
            var _con = form_recordedit.find('#txtContactEnd');
//            if ($.trim(_con.val()).length === 0)
            _con.val(_this.find('option:checked').data('contact'));
        },
        'loaded.bs.select': function (e) {
            $('#btn-shippingEnd').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Shipping/edit'),
                        title: 'เพิ่มสถานที่ รับ-ส่ง สินค้า',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.LocationName = _f.find('#txtLocationName').val();
                                    obj.Contact = _f.find('#txtContact').val();
//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Shipping/editShipping'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setShippingEnd(function (_t) {
                                                    _t.val(vdata.RowKey).selectpicker('render').change();
                                                });
                                                var _b = form_recordedit.find('#cmdShippingBegin').val();
                                                setShippingBegin(function (_t) {
                                                    _t.val(_b).selectpicker('render').change();
                                                });
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
//                                        }
//                                    });
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
                }
            })
        }
    });
    function setShippingEnd(v) {
        $.reqData({
            url: mvcPatch('Shipping/findShipping'),
            data: {},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdShippingEnd').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-home" value="' + v.key + '" data-display="' + v.LocationName + '" data-contact="' + v.Contact + '">&nbsp;&nbsp;' + v.LocationName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_recordedit.find('#cmdProduct').selectpicker({
    }).on({
        change: function () {

        },
        'loaded.bs.select': function (e) {
            $('#btn-productNew').on({
                click: function () {
                    $.bPopup({
                        url: mvcPatch('Product/edit'),
                        title: 'เพิ่มรายชื่อสินค้า',
                        closable: false,
                        size: BootstrapDialog.SIZE_NORMAL,
                        onshow: function (k) {
                            k.getModal().data({
                                data: new Object({key: Guid}),
                                fun: function (_f) {
                                    var obj = new Object();
                                    obj.RowKey = Guid;
                                    obj.ProductName = _f.find('#txtProductName').val();
//                                    $.bConfirm({
//                                        buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Product/editProduct'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
                                                setProduct(function (_t) {
                                                    _t.val(vdata.key).selectpicker('render').change();
                                                });
                                            } else {
                                                $.bAlert({
                                                    message: vdata.message
                                                });
                                            }
                                        }
                                    });
//                                        }
//                                    });
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
                }
            });
        }
    });
    function setProduct(v) {
        $.reqData({
            url: mvcPatch('Record/findProduct'),
            data: {},
            loanding: false,
            callback: function (vdata) {
                var _sel = form_recordedit.find('#cmdProduct').empty();
                var _html = '';
                $.each(vdata, function (k, v) {
                    _html += '<option data-icon="fa fa-cube" value="' + v.RowKey + '" data-display="' + v.ProductName + '">&nbsp;&nbsp;' + v.ProductName + '</option>';
                });
                _sel.append(_html).selectpicker('refresh');
                v(_sel);
            }
        });
    }

    form_incomein.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_incomein.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'IncomeName', header: 'รายละเอียด', orderable: false},
            {data: 'Amount', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 1
            }
        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'เพิ่มรายการรับ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                key: newGuid(),
//                                Detial: _f.find('#txtDetail').val(),
                                IncomeKey: _f.find('#cmdIncomeName').val(),
                                IncomeName: _f.find('#cmdIncomeName').find('option:selected').data('display'),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase())
                                    .ToArray();
//                            if (_chk.length > 0) {
//                                $.bAlert({
//                                    message: 'This item already exists.'
//                                });
//                            } else {
                            f.data('data').push(obj);
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
//                            }
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
                url: mvcPatch('Record/incomeinEdit'),
                title: 'แก้ไขรายการรับ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                key: d.key,
                                //                                Detial: _f.find('#txtDetail').val(),
                                IncomeKey: _f.find('#cmdIncomeName').val(),
                                IncomeName: _f.find('#cmdIncomeName').find('option:selected').data('display'),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase() && x.key !== obj.key)
                                    .ToArray();
//                            if (_chk.length > 0) {
//                                $.bAlert({
//                                    message: 'This item already exists.'
//                                });
//                            } else {
                            var _up = $.ToLinq(f.data('data'))
                                    .Where(x => x.key === obj.key)
                                    .First();
                            _up.IncomeKey = obj.IncomeKey;
                            _up.IncomeName = obj.IncomeName;
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
//                            }
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
            var _d = $.ToLinq(d)
                    .Select(function (x) {
                        return x.key;
                    });
            var _u = $.ToLinq(f.data('data'))
                    .Where(x => !_d.Contains(x.key))
                    .ToArray();
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });

    form_incomeout.data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_incomeout.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'IncomeName', header: 'รายละเอียด', orderable: false},
            {data: 'Amount', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Amount, 2);
                },
                orderable: true,
                targets: 1
            }
        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/incomeinEdit'),
                title: 'เพิ่มรายการจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                key: newGuid(),
                                //                                Detial: _f.find('#txtDetail').val(),
                                IncomeKey: _f.find('#cmdIncomeName').val(),
                                IncomeName: _f.find('#cmdIncomeName').find('option:selected').data('display'),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase())
                                    .ToArray();
//                            if (_chk.length > 0) {
//                                $.bAlert({
//                                    message: 'This item already exists.'
//                                });
//                            } else {
                            f.data('data').push(obj);
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
//                            }
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
                url: mvcPatch('Record/incomeinEdit'),
                title: 'แก้ไขรายการจ่าย',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                key: d.key,
                                //                                Detial: _f.find('#txtDetail').val(),
                                IncomeKey: _f.find('#cmdIncomeName').val(),
                                IncomeName: _f.find('#cmdIncomeName').find('option:selected').data('display'),
                                Amount: _f.find('#txtAmount').val()
                            });
                            var _chk = $.ToLinq(f.data('data'))
                                    .Where(x => $.trim(x.Detial).toLocaleLowerCase() === $.trim(obj.Detial).toLocaleLowerCase() && x.key !== obj.key)
                                    .ToArray();
//                            if (_chk.length > 0) {
//                                $.bAlert({
//                                    message: 'This item already exists.'
//                                });
//                            } else {
                            var _up = $.ToLinq(f.data('data'))
                                    .Where(x => x.key === obj.key)
                                    .First();
                            _up.IncomeKey = obj.IncomeKey;
                            _up.IncomeName = obj.IncomeName;
                            _up.Amount = obj.Amount;
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
//                            }
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
            var _d = $.ToLinq(d)
                    .Select(function (x) {
                        return x.key;
                    });
            var _u = $.ToLinq(f.data('data'))
                    .Where(x => !_d.Contains(x.key))
                    .ToArray();
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });

    form_fule.data('data', new Array()).data('data', new Array()).setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        headerString: '',
//        UrlDataJson: mvcPatch('controllers/action'),
        DataJson: function () {
            return form_fule.data('data');
        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'PumpDisplay', header: 'ปั้ม', orderable: false},
            {data: 'BranchDisplay', header: 'สาขา', orderable: false},
            {data: 'Smile', header: 'เลขไมล์ก่อนเติม', orderable: false},
            {data: 'Price', header: 'จำนวนเงิน', orderable: false},
//            {data: 'Url', header: 'Url'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return parseFloat(val2.Smile).toFixed(2);
                },
                orderable: false,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Price, 2);
                },
                orderable: false,
                targets: 3
            }
        ],
        DataColumnsOrder: new Array(),
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Record/fuleEdit'),
                title: 'เพิ่มรายการเติมน้ำมัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                key: newGuid(),
                                Item: _f.find('#txtItem').val(),
                                ItemPrice: (parseFloat(_f.find('#txtItemPrice').val()) / parseFloat(_f.find('#txtItem').val())).toFixed(2),
//                                Price: _f.find('#txtAmount').val(),
                                Price: _f.find('#txtItemPrice').val(),
                                Smile: _f.find('#txtMile').val(),
                                FuelDisplay: _f.find('#cmdFuleType option:selected').data('display'),
                                FuleKey: _f.find('#cmdFuleType').val(),
                                BranchDisplay: _f.find('#cmdFuleBranch option:selected').data('display'),
                                BranchKey: _f.find('#cmdFuleBranch').val(),
                                PumpDisplay: _f.find('#cmdFule option:selected').data('display'),
                                PumpKey: _f.find('#cmdFule').val(),
                                Refer: _f.find('#txtRefer').val()
                            });
                            f.data('data').push(obj);
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
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
                url: mvcPatch('Record/fuleEdit'),
                title: 'แก้ไขรายการเติมน้ำมัน',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var _update = $.ToLinq(f.data('data'))
                                    .Where(x => x.key === d.key)
                                    .First();
                            _update.Item = _f.find('#txtItem').val();
                            _update.ItemPrice = (parseFloat(_f.find('#txtItemPrice').val()) / parseFloat(_f.find('#txtItem').val())).toFixed(2);
//                                Price: _f.find('#txtAmount').val(),
                            _update.Price = _f.find('#txtItemPrice').val();
                            _update.Smile = _f.find('#txtMile').val();
                            _update.FuelDisplay = _f.find('#cmdFuleType option:selected').data('display');
                            _update.FuleKey = _f.find('#cmdFuleType').val();
                            _update.BranchDisplay = _f.find('#cmdFuleBranch option:selected').data('display');
                            _update.BranchKey = _f.find('#cmdFuleBranch').val();
                            _update.PumpDisplay = _f.find('#cmdFule option:selected').data('display');
                            _update.PumpKey = _f.find('#cmdFule').val();
                            _update.Refer = _f.find('#txtRefer').val();
                            f.find('.xref').click();
                            _f.find('#btn-close').click();
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
            var _d = $.ToLinq(d)
                    .Select(function (x) {
                        return x.key;
                    });
            var _u = $.ToLinq(f.data('data'))
                    .Where(x => !_d.Contains(x.key))
                    .ToArray();
            f.data('data', _u);
            f.find('.xref').click();
        },
        btnPreviewFun: function (f, d) {
        }
    });

    form_recordedit_C.find('#btn-ok').on({
        click: function () {
            form_recordedit.submit();
        }
    });

    form_recordedit.myValidation({
        funsuccess: function () {
            form_recordedit_C.data('fun')(form_recordedit_C);
        },
        btnactive: [
            form_recordedit_C.find('#btn-ok')
        ],
        fields: {
            txtDocID: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุเลขที่เอกสาร'
                    }
                }
            },
            txtDocDate: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุวันที่เอกสาร'
                    }
                }
            },
            cmdCarF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรถขนส่งส่วนหัว'
                    }
                }
            },
            cmdCarS: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรถขนส่งส่วนหาง'
                    }
                }
            },
            cmdEmp: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุพนักงานขับรถ'
                    }
                }
            },
            cmdCustomerF: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุลูกค้า'
                    }
                }
            },
//            cmdBranchF: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* ระบุสาขาลูกค้าต้นทาง'
//                    }
//                }
//            },
//            cmdCustomerS: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* ระบุลูกค้าปลายทาง'
//                    }
//                }
//            },
//            cmdBranchS: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* ระบุสาขาลูกค้าปลายทาง'
//                    }
//                }
//            },
            cmdShippingBegin: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสถานที่รับสินค้า'
                    }
                }
            },
            cmdShippingEnd: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสถานที่ส่งสินค้า'
                    }
                }
            },
//            txtMileageF: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* ระบุเลขไมล์ต้นทาง'
//                    },
//                    regexp: {//***Custom Patter
//                        regexp: regexpDecimal,
//                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
//                    }
//                }
//            },
//            txtMileageS: {
//                icon: false,
//                validators: {
//                    notEmpty: {
//                        message: '* ระบุเลขไมล์ปลายทาง'
//                    },
//                    regexp: {//***Custom Patter
//                        regexp: regexpDecimal,
//                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
//                    }
//                }
//            },
            cmdProduct: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุสินค้าที่ขนส่ง'
                    }
                }
            },
            txtSkillLabor: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุค่าฝีมือ'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            },
            txtTotal: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุค่าบริการในการขนส่ง'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นจำนวนตัวเลขเท่านั้น.'
                    }
                }
            }
        }
    });
});

