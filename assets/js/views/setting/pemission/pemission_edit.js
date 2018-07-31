$(function () {
    var form_Detail = $('#form_Detail');
    var form_Detail_C = $.modelDialog(form_Detail);
    var form_Account = $('#form_Account');
    var form_Function = $('#form_Function');

    var _formdata = form_Detail_C.data('data');
    if (_formdata.key !== Guid) {
        form_Detail.find('#txtDetail').val(_formdata.UserGroup);
        form_Detail.find('#txtDescription').val(_formdata.Description);
        form_Account.data('data', _formdata.USRGroupAccount);
        form_Function.data('data', _formdata.USRGroupSubMenu);
        setAccount_Function();
    } else {
        form_Account.data('data', new Array());
        form_Function.data('data', new Array());
        setAccount_Function();
    }

    function setAccount_Function() {
        form_Account.setMainPage({
            btnNew: true,
            btnDeleteAll: true,
            btnDelete: true,
            btnEdit: false,
            btnPreview: false,
            btnNewText: 'เพิ่ม',
            btnDeleteText: 'ลบ',
            headerString: '',
//            UrlDataJson: mvcPatch('controllers/action'),
            DataJson: function () {
                return form_Account.data('data');
            },
            UrlLoanding: true,
            UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
            DataColumns: [
                {data: 'User', header: 'User'},
                {data: 'Name', header: 'Name'},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
            ],
//        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return '<i class="' + val2.Icon + '"></i>';
//                },
//                orderable: true,
//                targets: 3
//            }
//        ],
            btnNewFun: function (f) {
                $.bPopup({
                    url: mvcPatch('pemission/addAccount'),
                    title: 'Add Account',
                    closable: false,
                    size: BootstrapDialog.SIZE_NORMAL,
                    onshow: function (k) {
                        k.getModal().data({
                            data: f.data('data'),
                            key: Guid,
                            fun: function (_f) {
                                $.each(_f.find('#cmdAccount').val(), function (k2, v2) {
                                    var _option = _f.find('#cmdAccount').find('option[value="' + v2 + '"]');
                                    f.data('data').push(new Object({
                                        key: v2,
                                        User: _option.data('display'),
                                        Name: _option.data('name')
                                    }));
                                });

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
            },
            btnDeleteFun: function (f, d) {
                if (d.length === 0)
                    return false;

                var _vdata = $.ToLinq(f.data('data'))
                        .Where(x => !$.ToLinq(d).Select(function (k) {
                                return k.key;
                            }).Contains(x.key))
                        .ToArray();
                f.data('data', _vdata);
                f.find('.xref').click();
            },
            btnPreviewFun: function (f, d) {
            }
        });

        form_Function.setMainPage({
            btnNew: true,
            btnDeleteAll: true,
            btnDelete: true,
            btnEdit: false,
            btnPreview: false,
            headerString: '',
//            UrlDataJson: mvcPatch('controllers/action'),
            DataJson: function () {
                return form_Function.data('data');
            },
            UrlLoanding: true,
            UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
            DataColumns: [
                {data: 'Menu', header: 'Menu'},
                {data: 'SubMenu', header: 'Sub Menu'},
                {data: 'Description', header: 'Description'},
//            {data: 'Menu', header: 'Menu'},
//            {data: 'Icon', header: 'Icon'},
//            {data: 'Url', header: 'Url'}
            ],
//        DataColumnsDefs: [
//            {
//                render: function (row, type, val2, meta) {
//                    return '<i class="' + val2.Icon + '"></i>';
//                },
//                orderable: true,
//                targets: 3
//            }
//        ],
            btnNewFun: function (f) {
                $.bPopup({
                    url: mvcPatch('pemission/addFunction'),
                    title: 'Add Function',
                    closable: false,
                    size: BootstrapDialog.SIZE_NORMAL,
                    onshow: function (k) {
                        k.getModal().data({
                            data: f.data('data'),
                            key: Guid,
                            fun: function (_f) {
                                $.each(_f.find('#cmdFunction').val(), function (k2, v2) {
                                    var _option = _f.find('#cmdFunction').find('option[value="' + v2 + '"]');
                                    f.data('data').push(new Object({
                                        key: v2,
                                        Menu: _option.data('menu'),
                                        SubMenu: _option.data('submenu'),
                                        Description: _option.data('decs')
                                    }));
                                });

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
            },
            btnDeleteFun: function (f, d) {
                if (d.length === 0)
                    return false;

                var _vdata = $.ToLinq(f.data('data'))
                        .Where(x => !$.ToLinq(d).Select(function (k) {
                                return k.key;
                            }).Contains(x.key))
                        .ToArray();
                f.data('data', _vdata);
                f.find('.xref').click();
            },
            btnPreviewFun: function (f, d) {
            }
        });
    }

    form_Detail_C.find('#btn-ok').on({
        click: function () {
            form_Detail.submit();
        }
    });

    form_Detail.myValidation({
        funsuccess: function () {
            form_Detail_C.data('fun')(form_Detail_C);
        },
        btnactive: [
            form_Detail_C.find('#btn-ok')
        ],
        fields: {
            txtDetail: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* Please specify as pemission name only.'
                    }
                }
            }
        }
    });
});
