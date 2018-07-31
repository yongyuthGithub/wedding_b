$(function () {
    var form_seqlist = $('#form_seqlist');

    form_seqlist.setMainPage({
        btnNew: true,
        btnDeleteAll: true,
        btnDelete: true,
        btnEdit: true,
        btnPreview: false,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        headerString: '',
        UrlDataJson: mvcPatch('DocSeq/findDocPattern'),
//    DataJson: function () {
//        return new Array()
//    },
        UrlLoanding: true,
        UrlLoandingclose: true,
//    AfterLoadData: function (f, d, t) { },
        DataColumns: [
            {data: 'DocName', header: 'Doc Name'},
            {data: 'Pattern', header: 'Pattern'},
            {data: 'Point', header: 'Point'},
            {data: 'YearMonth', header: 'Month'},
            {data: 'Seq', header: 'Seq'}
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Point, 0);
                },
                orderable: true,
                targets: 2
            },
            {
                render: function (row, type, val2, meta) {
                    return addCommas(val2.Seq, 0);
                },
                orderable: true,
                targets: 4
            }
        ],
        btnNewFun: function (f) {
            $.bPopup({
                url: mvcPatch('DocSeq/docSeqEdit'),
                title: 'New Pattern',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: new Object({key: Guid}),
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = Guid;
                            obj.DocName = _f.find('#txtDocName').val();
                            obj.Pattern = _f.find('#txtPattern').val();
                            obj.Point = _f.find('#txtPoint').val();

                            var obj2 = new Object();
                            obj2.PSeq = _f.find('#txtSeq').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('DocSeq/editDocPattern'),
                                        data: {
                                            data: JSON.stringify(obj),
                                            dataSeq: JSON.stringify(obj2)
                                        },
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
                            //javascript code
                        }
                    }
                ]
            });
        },
        btnEditFun: function (f, d) {
            $.bPopup({
                url: mvcPatch('DocSeq/docSeqEdit'),
                title: 'Edit Pattern',
                closable: false,
                size: BootstrapDialog.SIZE_NORMAL,
                onshow: function (k) {
                    k.getModal().data({
                        data: d,
                        fun: function (_f) {
                            var obj = new Object();
                            obj.RowKey = d.key;
                            obj.DocName = _f.find('#txtDocName').val();
                            obj.Pattern = _f.find('#txtPattern').val();
                            obj.Point = _f.find('#txtPoint').val();

                            var obj2 = new Object();
                            obj2.PSeq = _f.find('#txtSeq').val();
                            $.bConfirm({
                                buttonOK: function (k) {
                                    k.close();
                                    $.reqData({
                                        url: mvcPatch('DocSeq/editDocPattern'),
                                        data: {
                                            data: JSON.stringify(obj),
                                            dataSeq: JSON.stringify(obj2)
                                        },
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
                        url: mvcPatch('DocSeq/removeDocPattern'),
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

