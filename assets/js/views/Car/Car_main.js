$(function () {
    var form_Car = $('#form_Car');
    var form_Car1 = $('#form_Car1');
    var form_sumbit = $('#form_sumbit');

    form_Car.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'ประกัน',
        headerString: '',
        UrlDataJson: mvcPatch('Car/findCar'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'Province', header: 'จังหวัด'},
            {data: 'Brand', header: 'ยี่ห้อ'},
//            {data: 'CarGroup', header: 'ประเภท'},
//            {data: 'CarType', header: 'ประเภทเพลา'},
        ],
        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return parseInt(val2.CarGroup) === 1 ? 'ส่วนหัว' : '';
//                },
//                orderable: true,
//                targets: 3
//            },
//            {
//                render: function (row, type, val2, meta) {
//                    return parseInt(val2.CarType) === 1 ? '2 เพลา' : '3 เพลา';
//                },
//                orderable: true,
//                targets: 4
//            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Car/edit'),
                title: 'เพิ่มข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.BrandKey = _f.find('#cmdBrand').val();
                            obj.CarNumber = _f.find('#txtCarNumber').val();
                            obj.ProvinceKey = _f.find('#cmdProvince').val();
                            obj.CarType = 1;
                            obj.CarGroup = 1;
                            obj.ImageList = $.ToLinq(_f.find('.showF').find('.imageShow'))
                                    .Select(function (x) {
                                        return $(x).data('key');
                                    }).ToArray();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                var _image = _f.find('.showF').find('.imageShow');
                                                var _imageIndex = 1;

                                                _uploadImage();
                                                function _uploadImage() {
                                                    if (_imageIndex <= _image.length) {
                                                        var obj2 = new Object();
                                                        var _timage = $(_image[_imageIndex - 1]);
                                                        if (_timage.attr('data-key') === Guid) {
                                                            obj2 = new Object({
                                                                RowKey: Guid,
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex,
                                                                FileType: 1,
                                                                ImageBase64: _timage.attr('src')
                                                            });
                                                        } else {
                                                            obj2 = new Object({
                                                                RowKey: _timage.attr('data-key'),
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex
                                                            });
                                                        }
                                                        $.reqData({
                                                            url: mvcPatch('Car/addImage'),
                                                            data: {data: JSON.stringify(obj2)},
                                                            loanding: false,
                                                            callback: function (vdata2) {
                                                                if (vdata2.success) {
                                                                    _imageIndex++;
                                                                    _uploadImage();
                                                                } else {
                                                                    $.bAlert({
                                                                        message: vdata2.message
                                                                    });
                                                                }
                                                            }});
                                                    } else {
                                                        _close();
                                                    }
                                                }

                                                function _close() {
                                                    _f.find('#btn-close').click();
                                                    f.find('.xref').click();
                                                }
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
                        label: '&nbsp;ok',
                        action: function (k) {

                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('Car/edit'),
                title: 'แก้ไขข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.BrandKey = _f.find('#cmdBrand').val();
                            obj.CarNumber = _f.find('#txtCarNumber').val();
                            obj.ProvinceKey = _f.find('#cmdProvince').val();
                            obj.CarType = 1;
                            obj.CarGroup = 1;
                            obj.ImageList = $.ToLinq(_f.find('.showF').find('.imageShow'))
                                    .Select(function (x) {
                                        return $(x).attr('data-key');
                                    }).ToArray();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                var _image = _f.find('.showF').find('.imageShow');
                                                var _imageIndex = 1;

                                                _uploadImage();
                                                function _uploadImage() {
                                                    if (_imageIndex <= _image.length) {
                                                        var obj2 = new Object();
                                                        var _timage = $(_image[_imageIndex - 1]);
                                                        if (_timage.attr('data-key') === Guid) {
                                                            obj2 = new Object({
                                                                RowKey: Guid,
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex,
                                                                FileType: 1,
                                                                ImageBase64: _timage.attr('src')
                                                            });
                                                        } else {
                                                            obj2 = new Object({
                                                                RowKey: _timage.attr('data-key'),
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex
                                                            });
                                                        }
                                                        $.reqData({
                                                            url: mvcPatch('Car/addImage'),
                                                            data: {data: JSON.stringify(obj2)},
                                                            loanding: false,
                                                            callback: function (vdata2) {
                                                                if (vdata2.success) {
                                                                    _imageIndex++;
                                                                    _uploadImage();
                                                                } else {
                                                                    $.bAlert({
                                                                        message: vdata2.message
                                                                    });
                                                                }
                                                            }});
                                                    } else {
                                                        _close();
                                                    }
                                                }

                                                function _close() {
                                                    _f.find('#btn-close').click();
                                                    f.find('.xref').click();
                                                }
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
                        url: mvcPatch('Car/removeinsurancetype'),
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
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.CarNumber
                }
            }).prop('action', mvcPatch('Car/Carinsurance')).submit()
        }
    });

//----------------------------------------------------------------------------------
    form_Car1.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'ประกัน',
        headerString: '',
        UrlDataJson: mvcPatch('Car/findCar1'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'Province', header: 'จังหวัด'},
            {data: 'Brand', header: 'ยี่ห้อ'},
//            {data: 'CarGroup', header: 'ประเภท'},
            {data: 'CarType', header: 'ประเภทเพลา'},
        ],
        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return parseInt(val2.CarGroup) === 1 ? '' : 'ส่วนหาง';
//                },
//                orderable: true,
//                targets: 3
//            },
            {
                render: function (row, type, val2, meta) {
                    return parseInt(val2.CarType) === 1 ? 'พื้นเรียบ 2 เพลา' : parseInt(val2.CarType) === 2 ? 'พื้นเรียบ 3 เพลา' : 'โรเบท 3 เพลา';
                },
                orderable: true,
                targets: 3
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Car/edit1'),
                title: 'เพิ่มข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.BrandKey = _f.find('#cmdBrand').val();
                            obj.CarNumber = _f.find('#txtCarNumber').val();
                            obj.ProvinceKey = _f.find('#cmdProvince').val();
                            obj.CarType = parseInt(_f.find('#txtCarType').val());
                            obj.CarGroup = 2;
                            obj.ImageList = $.ToLinq(_f.find('.showF').find('.imageShow'))
                                    .Select(function (x) {
                                        return $(x).attr('data-key');
                                    }).ToArray();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar1'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                var _image = _f.find('.showF').find('.imageShow');
                                                var _imageIndex = 1;

                                                _uploadImage();
                                                function _uploadImage() {
                                                    if (_imageIndex <= _image.length) {
                                                        var obj2 = new Object();
                                                        var _timage = $(_image[_imageIndex - 1]);
                                                        if (_timage.attr('data-key') === Guid) {
                                                            obj2 = new Object({
                                                                RowKey: Guid,
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex,
                                                                FileType: 1,
                                                                ImageBase64: _timage.attr('src')
                                                            });
                                                        } else {
                                                            obj2 = new Object({
                                                                RowKey: _timage.attr('data-key'),
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex
                                                            });
                                                        }
                                                        $.reqData({
                                                            url: mvcPatch('Car/addImage'),
                                                            data: {data: JSON.stringify(obj2)},
                                                            loanding: false,
                                                            callback: function (vdata2) {
                                                                if (vdata2.success) {
                                                                    _imageIndex++;
                                                                    _uploadImage();
                                                                } else {
                                                                    $.bAlert({
                                                                        message: vdata2.message
                                                                    });
                                                                }
                                                            }});
                                                    } else {
                                                        _close();
                                                    }
                                                }

                                                function _close() {
                                                    _f.find('#btn-close').click();
                                                    f.find('.xref').click();
                                                }
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
                        label: '&nbsp;ok',
                        action: function (k) {

                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('Car/edit1'),
                title: 'แก้ไขข้อมูลรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.BrandKey = _f.find('#cmdBrand').val();
                            obj.CarNumber = _f.find('#txtCarNumber').val();
                            obj.ProvinceKey = _f.find('#cmdProvince').val();
                            obj.CarType = parseInt(_f.find('#txtCarType').val());
                            obj.CarGroup = 2;
                            obj.ImageList = $.ToLinq(_f.find('.showF').find('.imageShow'))
                                    .Select(function (x) {
                                        return $(x).attr('data-key');
                                    }).ToArray();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('Car/editCar1'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                var _image = _f.find('.showF').find('.imageShow');
                                                var _imageIndex = 1;

                                                _uploadImage();
                                                function _uploadImage() {
                                                    if (_imageIndex <= _image.length) {
                                                        var obj2 = new Object();
                                                        var _timage = $(_image[_imageIndex - 1]);
                                                        if (_timage.attr('data-key') === Guid) {
                                                            obj2 = new Object({
                                                                RowKey: Guid,
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex,
                                                                FileType: 1,
                                                                ImageBase64: _timage.attr('src')
                                                            });
                                                        } else {
                                                            obj2 = new Object({
                                                                RowKey: _timage.attr('data-key'),
                                                                CarKey: vdata.key,
                                                                Seq: _imageIndex
                                                            });
                                                        }
                                                        $.reqData({
                                                            url: mvcPatch('Car/addImage'),
                                                            data: {data: JSON.stringify(obj2)},
                                                            loanding: false,
                                                            callback: function (vdata2) {
                                                                if (vdata2.success) {
                                                                    _imageIndex++;
                                                                    _uploadImage();
                                                                } else {
                                                                    $.bAlert({
                                                                        message: vdata2.message
                                                                    });
                                                                }
                                                            }});
                                                    } else {
                                                        _close();
                                                    }
                                                }

                                                function _close() {
                                                    _f.find('#btn-close').click();
                                                    f.find('.xref').click();
                                                }
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
                        url: mvcPatch('Car/removeinsurancetype'),
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
            form_sumbit.SetDataPost({
                data: {
                    txtkey: d.key,
                    txtdisplay: d.CarNumber
                }
            }).prop('action', mvcPatch('Car/Carinsurance')).submit()
        }
    });
});