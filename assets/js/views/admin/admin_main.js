$(function () {
    var form_adminlist = $('#form_adminlist');

    form_adminlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: true,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'เปลี่ยนพาสเวิร์ด',
        headerString: '',
        UrlDataJson: mvcPatch('admin/findAccount'),
        UrlLoanding: true,
        UrlLoandingclose: true,
        DataColumns: [
            {data: 'User', header: 'User'},
            {data: 'Name', header: 'Name'},
            {data: 'RowStatus', header: 'Status'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return val2.RowStatus === '1' ? 'Action' : 'Inaction';
                },
                orderable: true,
                targets: 2
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('admin/edit'),
                title: 'New Account',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.User = _f.find('#txtUser').val();
                            obj.Password = _f.find('#txtPassword').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtFirstName').val();
                            obj.LName = _f.find('#txtLastName').val();
                            obj.Pemission = _f.find('#cmdPemission').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('admin/editAccount'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
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
        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('admin/edit'),
                title: 'Edit Account',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.User = _f.find('#txtUser').val();
                            obj.Password = _f.find('#txtPassword').val();
                            obj.TitleKey = _f.find('#cmdTitle').val();
                            obj.FName = _f.find('#txtFirstName').val();
                            obj.LName = _f.find('#txtLastName').val();
                            obj.Pemission = _f.find('#cmdPemission').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('admin/editAccount'),
                                        data: {data: JSON.stringify(obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
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
                        url: mvcPatch('admin/removeAccount'),
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
            $.bPopup({
                url: mvcPatch('pemission/editPassword'),
                title: 'Edit Password',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            $.bConfirm({
                                buttonOK: function (k2) {
                                    k2.close();
                                    var _obj = new Object();
                                    _obj.RowKey = d.key;
                                    _obj.User = d.User;
                                    _obj.Pass = _f.find('#txtPass').val();
                                    $.reqData({
                                        url: mvcPatch('pemission/changPassword'),
                                        data: {data: JSON.stringify(_obj)},
                                        loanding: false,
                                        callback: function (vdata) {
                                            if (vdata.success) {
                                                _f.find('#btn-close').click();
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
                        icon: 'fa fa-refresh',
                        label: '&nbsp;Edit Password',
                        cssClass: BootstrapDialog.TYPE_WARNING,
                        action: function (k) {
                            //javascript code
                        }
                    }
                ]
            });
        }
    });
});

