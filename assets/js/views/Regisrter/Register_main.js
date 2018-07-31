$(function () {
    var form_Register = $('#form_Register');
    var form_CarEmpedit1 = $('#form_CarEmpedit1');
    var form_sumbit = $('#form_sumbit');

    form_Register.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreviewText: 'ประกัน',
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: true,
        headerString: '',
        UrlDataJson: mvcPatch('Register/findRegister'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [

            {data: 'IDCard', header: 'รหัสบัตรประชาชน'},
            {data: 'FName', header: 'ชื่อ-นามสกุล'},
            {data: 'SDate', header: 'วันที่เริ่มงาน'},
            {data: 'EDate', header: 'วันที่พ้นสภาพ'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.Title + val2.FName + ' ' + val2.LName;
                    return _val;
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.SDate);
                    return _val;
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.EDate !== null ? '<span class="text-danger">' + PHP_JSON_To_ShowDate(val2.EDate) + '</span>' : '-';
                    return _val;
                },
                orderable: true,
                targets: 3
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('Register/edit'),
                title: 'เพิ่มพนักงานขับรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.IDCard = _f.find('#txtUser1').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtUser2').val();
                            obj.LName = _f.find('#txtUser6').val();
                            obj.NickName = _f.find('#txtNickName').val();
                            obj.Address = _f.find('#txtUser3').val();
                            obj.SubDistrict = _f.find('#cmdSubDistrict').val();
                            obj.ZipCode = _f.find('#txtZipCode').val();
                            obj.Tel = _f.find('#txtUser7').val();
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            if ($.trim(_f.find('#txtEDate').val()).length > 0) {
                                obj.EDate = PHP_DateTimeShow_To_JSON(_f.find('#divEDate'));
                            } else {
                                obj.EDate = null;
                            }
                            obj.AccountCode = _f.find('#txtAccountCode').val();
                            obj.AccountName = _f.find('#txtAccountName').val();
                            if (_f.find('#cmdBankBranch').val() !== null) {
                                obj.BankBranchKey = _f.find('#cmdBankBranch').val();
                            } else {
                                obj.BankBranchKey = null;
                            }

                            var _imagedata = $.ToLinq(_f.find('.tab-image'))
                                    .Select(function (x) {
                                        return new Object({
                                            EmpKey: Guid,
                                            FileType: $(x).attr('data-type'),
                                            RecordStatus: parseInt($(x).attr('data-type')) === 2 ? false : true,
                                            EDate: parseInt($(x).attr('data-type')) === 2 ? null : ($(x).find('.txtDate').val() === '') ? null : PHP_DateTimeShow_To_JSON($(x).find('.date')),
                                            ImageBase64: checkUndefined($(x).find('.imageShow').attr('src')) ? '' : $(x).find('.imageShow').attr('src')
                                        });
                                    })
                                    .Where(x => $.trim(x.ImageBase64).length > 0)
                                    .ToArray();
                            if ($.ToLinq(_imagedata).Where(x => (parseInt(x.FileType) !== 2) && checkNull(x.EDate)).ToArray().length > 0) {
                                $.bAlert({
                                    message: 'กรุณาระบุวันที่หมดอายุในส่วนของ "บัตรประชาชน" และ "ใบขับขี" ก่อน'
                                });
                            } else {
                                $.bConfirm({
                                    buttonOK: function (k) {
                                        k.close();
                                        $.reqData({
                                            url: mvcPatch('Register/editRegister'),
                                            data: {data: JSON.stringify(obj)},
                                            loanding: false,
                                            callback: function (vdata) {
                                                if (vdata.success) {
                                                    var _indexC = 1;
                                                    function upImage() {
                                                        if (_indexC <= _imagedata.length) {
                                                            _imagedata[(_indexC - 1)].EmpKey = vdata.key;
                                                            $.reqData({
                                                                url: mvcPatch('Register/addImage'),
                                                                data: {data: JSON.stringify(_imagedata[(_indexC - 1)])},
                                                                loanding: false,
                                                                callback: function (vdata) {
                                                                    if (vdata.success) {
                                                                        _indexC++;
                                                                        upImage();
                                                                    } else {
                                                                        $.bAlert({
                                                                            message: vdata.message
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            _f.find('#btn-close').click();
                                                            f.find('.xref').click();
                                                        }
                                                    }

                                                    if (_imagedata.length > 0) {
                                                        upImage();
                                                    } else {
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
                url: mvcPatch('Register/edit'),
                title: 'แก้ไขพนักงานขับรถ',
                closable: false,
                size: BootstrapDialog.SIZE_WIDE,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.IDCard = _f.find('#txtUser1').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtUser2').val();
                            obj.LName = _f.find('#txtUser6').val();
                            obj.NickName = _f.find('#txtNickName').val();
                            obj.Address = _f.find('#txtUser3').val();
                            obj.SubDistrict = _f.find('#cmdSubDistrict').val();
                            obj.ZipCode = _f.find('#txtZipCode').val();
                            obj.Tel = _f.find('#txtUser7').val();
                            obj.SDate = PHP_DateTimeShow_To_JSON(_f.find('#txtSDate'));
                            if ($.trim(_f.find('#txtEDate').val()).length > 0) {
                                obj.EDate = PHP_DateTimeShow_To_JSON(_f.find('#divEDate'));
                            } else {
                                obj.EDate = null;
                            }
                            obj.AccountCode = _f.find('#txtAccountCode').val();
                            obj.AccountName = _f.find('#txtAccountName').val();
                            if (_f.find('#cmdBankBranch').val() !== null) {
                                obj.BankBranchKey = _f.find('#cmdBankBranch').val();
                            } else {
                                obj.BankBranchKey = null;
                            }

                            var _imagedata = $.ToLinq(_f.find('.tab-image'))
                                    .Select(function (x) {
                                        return new Object({
                                            EmpKey: d.key,
                                            FileType: $(x).attr('data-type'),
                                            RecordStatus: parseInt($(x).attr('data-type')) === 2 ? false : true,
                                            EDate: parseInt($(x).attr('data-type')) === 2 ? null : ($(x).find('.txtDate').val() === '') ? null : PHP_DateTimeShow_To_JSON($(x).find('.date')),
                                            ImageBase64: checkUndefined($(x).find('.imageShow').attr('src')) ? '' : $(x).find('.imageShow').attr('src')
                                        });
                                    })
                                    .Where(x => $.trim(x.ImageBase64).length > 0)
                                    .ToArray();
                            if ($.ToLinq(_imagedata).Where(x => (parseInt(x.FileType) !== 2) && checkNull(x.EDate)).ToArray().length > 0) {
                                $.bAlert({
                                    message: 'กรุณาระบุวันที่หมดอายุในส่วนของ "บัตรประชาชน" และ "ใบขับขี" ก่อน'
                                });
                            } else {
                                $.bConfirm({
                                    buttonOK: function (k) {
                                        k.close();

                                        $.reqData({
                                            url: mvcPatch('Register/editRegister'),
                                            data: {data: JSON.stringify(obj)},
                                            loanding: false,
                                            callback: function (vdata) {
                                                if (vdata.success) {
                                                    var _indexC = 1;
                                                    function upImage() {
                                                        if (_indexC <= _imagedata.length) {
                                                            $.reqData({
                                                                url: mvcPatch('Register/addImage'),
                                                                data: {data: JSON.stringify(_imagedata[(_indexC - 1)])},
                                                                loanding: false,
                                                                callback: function (vdata) {
                                                                    if (vdata.success) {
                                                                        _indexC++;
                                                                        upImage();
                                                                    } else {
                                                                        $.bAlert({
                                                                            message: vdata.message
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            _f.find('#btn-close').click();
                                                            f.find('.xref').click();
                                                        }
                                                    }

                                                    if (_imagedata.length > 0) {
                                                        upImage();
                                                    } else {
                                                        _f.find('#btn-close').click();
                                                        f.find('.xref').click();
                                                    }


//                                                alert(JSON.stringify(_imagedata));
//                                                _f.find('#btn-close').click();
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
                        url: mvcPatch('Register/removeAccount'),
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
                    txtdisplay: d.Title + d.FName + ' ' + d.LName
                }
            }).prop('action', mvcPatch('Register/register_insurance_Main')).submit();
        }
    });


//---------------------------------------CarEmp---------------------------------------------------
    form_CarEmpedit1.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreview: false,
        headerString: '',
        UrlDataJson: mvcPatch('register/findcaremp'),
        UrlDataSend: {key: $('#txtkey').val()},
//        DataJson: function () {
//            return new Array()
//        },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'CarNumber', header: 'ทะเบียนรถ'},
            {data: 'BeginDate', header: 'วันเริ่มทำงาน'},
            {data: 'EmpKey', header: 'ชื่อพนักงานขับรถ'},
            {data: 'SkillLabor', header: 'เงินเดือน'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    var _val = PHP_JSON_To_ShowDate(val2.BeginDate);
                    return _val;
                },
                orderable: true,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _val = val2.Title + ' ' + val2.FName + ' ' + val2.LName;
                    return _val;
                },
                orderable: true,
                targets: 2
            },
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('register/carempedit'),
                title: 'เพิ่มข้อมูลคนขับรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: Guid,
                                CarKey: $('#txtcmdCarnumber').val(),
                                EmpKey: $('#txtcmdCaremployee').val(),
                                BeginDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                SkillLabor: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('register/editcaremp'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                f.find('.xref').click();
                                                k.close();
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
                url: mvcPatch('register/carempedit'),
                title: 'แก้ไขข้อมูลคนขับรถ',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object({
                                RowKey: d.key,
                                CarKey: $('#txtcmdCarnumber').val(),
                                EmpKey: $('#txtcmdCaremployee').val(),
                                BeginDate: PHP_DateTimeShow_To_JSON(_f.find('#txtSDate')),
                                SkillLabor: _f.find('#txtCash').val()
                            });
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    $.reqData({
                                        url: mvcPatch('register/editcaremp'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                f.find('.xref').click();
                                                k.close();
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
                        url: mvcPatch('register/removecaremp'),
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
        }
    });
});