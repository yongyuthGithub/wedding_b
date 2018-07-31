(function ($) {
    $.fn.setMainPage = function (option) {

        var setting = $.extend({
            DataColumns: new Array(),
            DataColumnsOrder: [[0, 'asc']],
            //DataColumnsOrder: [],
            //FunLoadData: function () { },
            UrlDataJson: '', //url ajax
            UrlDataSend: new Object(), //data sent ajax
            UrlLoanding: false,
            UrlLoandingclose: false,
            DataJson: function () {
                return new Array()
            }, // function return data to table
            AfterLoadData: function (form, data, table) { }, //function after set rows
            btnSearch: true,
            btnNew: false,
            btnNewFun: function () { },
            btnNewText: 'New',
            btnNewIcon: 'fa fa-plus',
            btnNewStyle: 'btn-primary',
            btnDelete: false,
            btnDeleteFun: function () { },
            btnDeleteText: 'Delete',
            btnDeleteIcon: 'fa fa-remove',
            btnDeleteStyle: 'btn-danger',
            btnDeleteAll: false,
            btnEdit: false,
            btnEditFun: function () { },
            btnEditText: 'Edit',
            btnEditIcon: 'fa fa-pencil',
            btnEditStyle: 'btn-warning',
            btnPreview: false,
            btnPreviewFun: function () { },
            btnPreviewText: 'View',
            btnPreviewIcon: 'fa fa-list-ul',
            btnPreviewStyle: 'btn-info',
            headerString: '',
            //rowNum: [[10, 25, 50, -1], ['10 Items', '25 Items', '50 Items', 'Show All']],
            rowNum: [[25, 50, 100], ['25 Items', '50 Items', '100 Items']],
            FundCallback: function (f, t) {
                //setDataTableTempDF(f, t);
            },
            valSearch: '',
            DataColumnsDefs: new Array(),
            useTempData: true
        }, option);

        return this.each(function () {
            var formId = $(this);
            //formId.attr('data-temp', setting.useTempData ? 1 : 0);
            var tblName = 'tbl' + formId.attr('id');
            var btnAdd = tblName + 'btnAdd';
            var btnEdit = tblName + 'btnEdit';
            var btnRemove = tblName + 'btnRemove';
            var btnRemoveLine = tblName + 'btnRemoveLine';
            var btnPreview = tblName + 'btnPreview';
            var btnRemoveMenu = tblName + 'btnRemoveMenu';
            var btnChecked = tblName + 'btnChecked';
            var btnUnChecked = tblName + 'btnUnChecked';
            var btnRef = tblName + 'btnRef';
            var btnPages = tblName + 'btnPages';
            var txtSearch = tblName + 'txtSearch';
            var chk = tblName + 'chk';
            var _html = '';
            //_html = '<div class="">';

//            $.getNameStr({
//                data: {
//                    PreviewText: setting.btnPreviewText,
//                    NewText: setting.btnNewText,
//                    DeleteText: setting.btnDeleteText,
//                    EditText: setting.btnEditText,
//                    TextSearch: 'TextSearch',
//                },
//                callback: function (_langName) {
            _html = '<div">';
            _html += '<div>';
            if ($.trim(setting.headerString).length > 0)
                _html += '<div class="page-header col-lg-12"><h3>' + setting.headerString + '</h3></div>';

            _html += '<div class="col-xs-6" style="padding-left: 0px;">';
            //_html += '<div class="form-group " style="padding-left: 12px;">';
            _html += '<div class="btn-group" style="margin-top: 0px;">';

            if (setting.btnNew)
                _html += '<div class="btn ' + setting.btnNewStyle + ' ' + btnAdd + '"><i class="' + setting.btnNewIcon + '"></i><spen class="hidden-xs hidden-sm" > ' + setting.btnNewText + '</spen></div>';

            //if (setting.btnEdit) {
            //    if (setting.btnDelete && setting.btnDeleteAll === false) {
            //        _html += '<div class="btn pmd-btn-raised pmd-ripple-effect btn-danger ' + btnEdit + '"><i class="fa fa-pencil"></i><spen class="hidden-xs hidden-sm"> Edit</spen></div>';
            //    }
            //}

            if (setting.btnDeleteAll) {
                _html += '<div class="btn ' + setting.btnDeleteStyle + ' ' + btnRemove + '"><i class="' + setting.btnDeleteIcon + '"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnDeleteText + '</spen></div>';
                _html += '<div class="btn ' + setting.btnDeleteStyle + ' dropdown-toggle ' + btnRemoveMenu + '" data-toggle="dropdown" style="min-width: auto!important;">';
                _html += '<span class="caret"></span>';
                _html += '</div>';
                _html += '<ul class="dropdown-menu dropdown-menu-right">';
                _html += '<li><a href="#" class="danger ' + btnChecked + '"><i class="fa fa-check-square" style="min-width:20px;">&nbsp;</i>Select</a></li>';
                _html += '<li><a href="#" class="danger ' + btnUnChecked + '"><i class="fa fa-square-o" style="min-width:20px;">&nbsp;</i>Unselect</a></li>';
                _html += '</ul>';
            }
            //else if (setting.btnDelete) {
            //    _html += '<div class="btn btn-danger btn-raised ' + btnRemove + '"><i class="fa fa-remove"></i><spen class="hidden-xs hidden-sm"> Delete</spen></div>';
            //}
            _html += '</div>';
            _html += '</div>';
            //_html += '</div>';

            //alert(setting.FunLoadData());
            _html += '<div class="col-xs-6 text-right" style="padding-right: 0px;">';
            if (setting.btnSearch) {
                _html += '<div class="form-group">';
                _html += '<div class="input-group">';
                //_html += '<span class="input-group-addon hidden-xs hidden-sm" ><i class="fa fa-search"></i></span>';
                //_html += '<label class="control-label pmd-input-group-label" for="' + txtSearch + '">Specify the text to search.</label>';
                _html += '<input type="text" name="' + txtSearch + '" id="' + txtSearch + '" class="form-control xSearch" placeholder="Search..." />';
                _html += '<div class="input-group-btn">';
//                _html += '<div class="input-group">';
                _html += '<div class="btn btn-primary ' + btnRef + ' xref"><i class="fa fa-refresh"></i></div>';
                _html += '<div class="btn btn-primary btnList dropdown-toggle" data-toggle="dropdown" style="min-width: auto!important;padding-right: 8px;padding-left: 8px;">';
                _html += '<span class="caret"></span>';
                _html += '</div>';
                _html += '<ul class="dropdown-menu dropdown-menu-right ulPages" style="right: 12px;margin-top: -6px;border-radius: 0px 0px 2px 2px;">';
                $.each(setting.rowNum[0], function (key, val) {
                    if (val === -1) {
                        _html += '<li role="separator" class="divider"></li>';
                        _html += '<li value="' + val + '"><a href="#" class=""><i class="fa fa-chevron-circle-right" style="min-width:20px;"></i>  ' + setting.rowNum[1][key] + '</a></li>';
                    } else {
                        _html += '<li value="' + val + '"><a href="#" class=""><i class="fa fa-chevron-circle-right" style="min-width:20px;"></i>  ' + setting.rowNum[1][key] + '</a></li>';
                    }
                });
                _html += '</ul>';
//                _html += '</div>';
                _html += '</div>';
            } else {
                _html += '<div class="input-group" style="display:inline-block;">';
            }

            _html += '</div>';

            _html += '</div>';
            _html += '</div>';
            //_html += '</div>';


            //_html += '<div class="col-lg-12 col-xs-12">';
//            var _heightTd = '';
//            if (setting.btnDelete === false && setting.btnDeleteAll === false && setting.btnEdit === false && setting.btnPreview === false)
//                _heightTd = 'noneBtn';
            _html += '<table id="' + tblName + '" class="display nowrap responsive xmain" cellspacing="0" style="width:100%;">';
            _html += '<thead>';
            _html += '<tr>';
            $.each(setting.DataColumns, function (key, val) {
                _html += '<th>' + val.header + '</th>';
            });
            if ((!setting.btnDeleteAll && setting.btnDelete) || setting.btnEdit || setting.btnPreview) {
                _html += '<th><div class="btnAction"></div></th>';
            }
            _html += '</tr>';
            _html += '</thead>';
            _html += '</table>';
            _html += '</div>';
            _html += '</div>';
            _html += '</div>';

            formId.empty().append(_html).find('#' + tblName).each(function (key, val) {

                //var _textSearch = '';
                var _pageSelect = 0;
                var _url = document.URL;
                var _temp = new Array();
                if (setting.useTempData) {
                    try {
                        var _temp = Enumerable.From(JSON.parse(localStorage.dataTable)).ToArray();
                    } catch (e) {
                    }
                    var _txtkey = '';
                    if ($('#txtkey').length === 1) {
                        _txtkey = $('#txtkey').val();
                    } else if ($('#txtkey').length > 1) {
                        _txtkey = $('#txtkey')[0].val();
                    }
                    if (_temp.length > 0) {
                        var _notclear = Enumerable.From(JSON.parse(localStorage.dataTable)).Where(x => $.trim(x.url).concat($.trim(x.formid), $.trim(x.txtkey)) === $.trim(_url).concat($.trim(formId.attr('id')), $.trim(_txtkey))).ToArray();
                        if (_notclear.length > 0) {
                            setting.valSearch = _notclear[0].textsearch;
                            _pageSelect = _notclear[0].page;
                        }
                    }
                }

                //alert('s'); 

                //alert(setting.btnDeleteAll + ', ' + setting.btnDelete + ', ' + setting.btnEdit);
                var _colDefs = new Array();
                if (setting.btnDeleteAll) {
                    _colDefs.push({
                        render: function (row, type, val2, meta) {
                            //_html = '<div class="checkbox-none-text checkbox-primary ">';
                            //_html += '<input id="' + (chk + val2.key) + '" type="checkbox" class="' + chk + '" xData="' + val2.key + '">';
                            //_html += '<label for="' + (chk + val2.key) + '" style="padding-left: 5px!important;font-size:100%!important;font-weight:100!important;color:#000!important;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                            //_html += row;
                            //_html += '</label>';
                            //_html += '</div>';
                            var _dele = '';
                            try {
                                _dele = val2._Delete === false ? 'disabled' : '';
                            } catch (ek) {
                            }

                            _html = '<div class="checkbox checkbox-danger">';
                            _html += '';// style="position: relative;top: 5px;"
                            _html += '<input type="checkbox" id="' + (chk + val2.key) + '" class="' + chk + ' "' + _dele + ' xData="' + val2.key + '">';
                            _html += '<label for="' + (chk + val2.key) + '">' + row + '</label>';
                            _html += '';
                            //_html += '<span class="pmd-switch-label"></span> </label><span style="padding-left: 10px;">'+ row+'</span>';
                            _html += '</div>';
                            return _html;
                        },
                        orderable: true,
                        targets: 0
                    });
                }
                if ((!setting.btnDeleteAll && setting.btnDelete) || setting.btnEdit || setting.btnPreview) {

                    _colDefs.push({
                        render: function (row, type, val2, meta) {
                            _html = '<div class="btn-group btnAction">';
                            if (setting.btnPreview) {
                                var _preview = '';
                                try {
                                    _preview = val2._PreView === false ? 'disabled' : '';
                                } catch (ek) {
                                }
                                _html += '<div class="btn ' + setting.btnPreviewStyle + ' btn-sm ' + btnPreview + '" ' + _preview + '><i class="' + setting.btnPreviewIcon + '"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnPreviewText + '</spen></div>';
                            }
                            if (setting.btnEdit) {
                                var _edit = '';
                                try {
                                    _edit = val2._Edit === false ? 'disabled' : '';
                                } catch (ek) {
                                }
                                _html += '<div class="btn ' + setting.btnEditStyle + ' btn-sm ' + btnEdit + '" ' + _edit + '><i class="' + setting.btnEditIcon + '"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnEditText + '</spen></div>';
                            }
                            if (!setting.btnDeleteAll && setting.btnDelete) {
                                var _dele = '';
                                try {
                                    _dele = val2._Delete === false ? 'disabled' : '';
                                } catch (ek) {
                                }
                                _html += '<div class="btn ' + setting.btnDeleteStyle + ' btn-sm ' + btnRemoveLine + '" ' + _dele + '><i class="' + setting.btnDeleteIcon + '"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnDeleteText + '</spen></div>';
                            }
                            _html += '</div>';
                            return _html;
                        },
                        orderable: false,
                        targets: -1
                    });
                    setting.DataColumns.push({data: 'key', header: '', });
                }

                //if ((!setting.btnDeleteAll && setting.btnDelete) && setting.btnEdit) {
                //    _colDefs.push({
                //        render: function (row, type, val2, meta) {
                //            _html = '<div class="btn-group btnAction">';
                //            _html += '<div class="btn pmd-btn-raised pmd-ripple-effect btn-warning btn-sm ' + btnEdit + '"><i class="fa fa-pencil"></i><spen class="hidden-xs hidden-sm"> Edit</spen></div>';
                //            _html += '<div class="btn pmd-btn-raised pmd-ripple-effect btn-danger btn-sm ' + btnRemoveLine + '"><i class="fa fa-remove"></i><spen class="hidden-xs hidden-sm"> Delete</spen></div>';
                //            _html += '</div>';
                //            return _html;
                //        },
                //        orderable: false,
                //        targets: -1
                //    });
                //    setting.DataColumns.push({ data: 'key', header: '', });
                //} else if ((!setting.btnDeleteAll && setting.btnDelete)) {
                //    _colDefs.push({
                //        render: function (row, type, val2, meta) {
                //            _html = '<div class="btn-group btnAction">';
                //            _html += '<div class="btn pmd-btn-raised pmd-ripple-effect btn-danger btn-sm ' + btnRemoveLine + '"><i class="fa fa-remove"></i><spen class="hidden-xs hidden-sm"> Delete</spen></div>';
                //            _html += '</div>';
                //            return _html;
                //        },
                //        orderable: false,
                //        targets: -1
                //    });
                //    setting.DataColumns.push({ data: 'key', header: '', });
                //} else if (setting.btnEdit) {
                //    _colDefs.push({
                //        render: function (row, type, val2, meta) {
                //            _html = '<div class="btn-group btnAction">';
                //            _html += '<div class="btn pmd-btn-raised pmd-ripple-effect btn-warning btn-sm ' + btnEdit + '"><i class="fa fa-pencil"></i><spen class="hidden-xs hidden-sm"> Edit</spen></div>';
                //            _html += '</div>';
                //            return _html;
                //        },
                //        orderable: false,
                //        targets: -1
                //    });
                //    setting.DataColumns.push({ data: 'key', header: '', });
                //}


                //var _newCol = new Array();
                //_newCol.push(new Object({ data: 'key', header: '' }));
                //$.each(setting.DataColumns, function (kc, vc) {
                //    _newCol.push(vc);
                //});
                //setting.DataColumns = _newCol;

                $.each(setting.DataColumnsDefs, function (k, v) {
                    _colDefs.push(v);
                });

                var tblEmp = $(val).DataTable({
                    processing: true,
                    responsive: true,
                    order: setting.DataColumnsOrder,
                    columns: setting.DataColumns,
                    columnDefs: _colDefs,
                    initComplete: function (settings) {

                    },
                    rowCallback: function (row, data, index) {
                        if (index === 0)
                            tblEmp.responsive.recalc();
                    },
                    fnDrawCallback: function (settings) {
                        setbtnAction();

                    },
                    pageLength: -1
                });

                tblEmp.on('page.dt', function () {
                    //var info = tblEmp.page.info();
                    //$('#pageInfo').html('Showing page test: ' + info.page + ' of ' + info.pages);
                    //alert(info.page);
                    //setDataTableTemp(formId.attr('id'), tblEmp, formId.find('#' + txtSearch).val());
                    //$.pmdRF(formId);
                });

                tblEmp.on('draw', function () {
                    //alert('ddd');
                    //setDataTableTempDF(formId, tblEmp);
                    //$.pmdRF(formId);
                    //var oTable = $('#' + $('table.xmain').attr('id')).dataTable();
                    //oTable.fnPageChange('last');

                });

                //tblEmp.page(1).draw('page');

                //setting.FunLoadData(tblEmp, formId);

                var oTbl = $('#' + tblName).dataTable();
                if (setting.UrlDataJson.length > 0) {
                    $.reqData({
                        url: setting.UrlDataJson,
                        data: setting.UrlDataSend,
                        loanding: setting.UrlLoanding,
                        loandingclose: setting.UrlLoandingclose,
                        callback: function (vdata) {
                            try {
                                tblEmp.clear();
                            } catch (e) {
                            }
                            tblEmp.rows.add(vdata).draw();
                            if (setting.useTempData)
                                oTbl.fnPageChange(_pageSelect);
                            setting.AfterLoadData(formId, vdata, tblEmp);
                        }
                    });
                } else {
                    //if (setting.DataJson.length > 0) {
                    try {
                        tblEmp.clear();
                    } catch (e) {
                    }
                    tblEmp.rows.add(setting.DataJson()).draw();
                    if (setting.useTempData)
                        oTbl.fnPageChange(_pageSelect);
                    setting.AfterLoadData(formId, setting.DataJson(), tblEmp);
                }


                tblEmp.on('responsive-display', function (e, datatable, row, showHide, update) {

                });

                //tblEmp.on('draw.dt', function () {
                //    alert('ddd');
                //    $.pmdRF(formId);
                //});

                //formId.on('click', '*', function (e) {
                //    return false;
                //});
                //formId.on('click', 'div.tblform_userbtnAdd', function () {
                //    return false;
                //});
                //tblEmp.on('draw', function () {
                //    //alert('dd');
                //    $.pmdRF();
                //});

                setbtnAction();
                function setbtnAction() {
                    var _btnAc = (55 * formId.find('tbody > tr > td > .btnAction').eq(0).find('.btn').length);
                    formId.find('.btnAction').parent('td,th').css({'text-align': 'right', 'width': _btnAc + 'px', 'max-width': _btnAc + 'px', 'min-width': _btnAc + 'px'});
                }

                formId.find('.ulPages > li:not(.divider)').off('click').on({
                    click: function (e) {
                        //e.preventDefault();
                        var rowCount = parseInt($(this).val());
                        if (rowCount > -1) {
                            formId.find('.dataTables_paginate').show();
                            tblEmp.page.len(rowCount).draw();
                        } else {
                            formId.find('.dataTables_paginate').hide();
                            tblEmp.page.len(rowCount).draw();
                        }
                        return false;
                    }
                }).eq(0).click();

                //if (setting.btnDelete === true && setting.btnDeleteAll === false) {
                //    formId.find('#' + tblName + ' tbody').on('click', 'tr > td:not(:first-child)', function () {
                //        var vTR = $(this).parent('tr');
                //        if (vTR.hasClass('selected')) {
                //            vTR.removeClass('selected');
                //        } else {
                //            tblEmp.$('tr.selected').removeClass('selected');
                //            vTR.addClass('selected');
                //        }
                //    });
                //} else if ((setting.btnEdit && setting.btnDeleteAll) || (setting.btnEdit && setting.btnDeleteAll == false)) {
                //    formId.find('#' + tblName + ' tbody').on('click', 'tr > td:not(:first-child)', function () {
                //        var vdata = tblEmp.row($(this).parent('tr')).data();
                //        setting.btnEditFun(formId, vdata);
                //    });
                //}

                formId.find('#' + tblName + ' tbody').on('click', 'tr .' + btnEdit + ':not([disabled])', function () {
                    var vdata = new Object();
                    if ($(this).parents('tr').hasClass('child')) {
                        vdata = $(this).parents('tr').prev();
                    } else {
                        vdata = $(this).parents('tr');
                    }
                    var vdata = tblEmp.row(vdata).data();
                    setting.btnEditFun(formId, vdata);
                });

                formId.find('#' + tblName + ' tbody').on('click', 'tr .' + btnRemoveLine + ':not([disabled])', function () {
                    var vdata = new Object();
                    if ($(this).parents('tr').hasClass('child')) {
                        vdata = $(this).parents('tr').prev();
                    } else {
                        vdata = $(this).parents('tr');
                    }
                    var vdata = new Array(tblEmp.row(vdata).data());
                    setting.btnDeleteFun(formId, vdata);
                });

                formId.find('#' + tblName + ' tbody').on('click', 'tr .' + btnPreview + ':not([disabled])', function () {
                    var vdata = new Object();
                    if ($(this).parents('tr').hasClass('child')) {
                        vdata = $(this).parents('tr').prev();
                    } else {
                        vdata = $(this).parents('tr');
                    }
                    var vdata = tblEmp.row(vdata).data();
                    setting.btnPreviewFun(formId, vdata);
                });

                formId.on('input propertychange paste', '#' + txtSearch, function () {
                    tblEmp.search($(this).val()).draw();
                    //setDataTableTemp(formId.attr('id'), tblEmp, $(this).val());
                });

                var fsearch = $('#' + txtSearch).prop('value', setting.valSearch);
                tblEmp.search(fsearch.val()).draw();

                formId.find('.' + btnRef).off('click').on({
                    click: function () {
                        //tblEmp.clear().rows.add(setting.FunLoadData());
                        //setting.FunLoadData(tblEmp, formId);
                        if (setting.UrlDataJson.length > 0) {
                            $.reqData({
                                url: setting.UrlDataJson,
                                data: setting.UrlDataSend,
                                loanding: setting.UrlLoanding,
                                loandingclose: setting.UrlLoandingclose,
                                callback: function (vdata) {
                                    try {
                                        tblEmp.clear();
                                    } catch (e) {
                                    }
                                    tblEmp.rows.add(vdata).draw();
                                    if (setting.useTempData)
                                        oTbl.fnPageChange(_pageSelect);
                                    setting.AfterLoadData(formId, vdata, tblEmp);
                                }
                            });
                        } else {
                            //if (setting.DataJson.length > 0) {
                            try {
                                tblEmp.clear();
                            } catch (e) {
                            }
                            tblEmp.rows.add(setting.DataJson()).draw();
                            if (setting.useTempData)
                                oTbl.fnPageChange(_pageSelect);
                            setting.AfterLoadData(formId, setting.DataJson(), tblEmp);
                        }
                    }
                });

                formId.find('.' + btnChecked).off('click').on({
                    click: function (e) {
                        e.preventDefault();
                        formId.find('.' + chk + ':enabled').prop('checked', true);
                    }
                });

                formId.find('.' + btnUnChecked).off('click').on({
                    click: function (e) {
                        e.preventDefault();
                        formId.find('.' + chk + ':enabled').prop('checked', false);
                    }
                });

                formId.find('.' + btnAdd).off('click').on({
                    click: function () {
                        setting.btnNewFun(formId);
                    }
                })

                formId.find('.' + btnRemove).off('click').on({
                    click: function () {
                        //if ($(this).hasClass('disabled'))
                        //    return false;
                        //if (setting.btnDeleteAll) {
                        var vdata = new Array();
                        formId.find('#' + tblName + ' tbody .' + chk + ':checked').each(function (key, val) {
                            vdata.push(tblEmp.row($(val).parents('tr')).data());
                        });
                        setting.btnDeleteFun(formId, vdata);
                        //} else {
                        //    var vdata = tblEmp.row(formId.find('#' + tblName + ' tbody tr[role=row].selected')).data().key;
                        //    setting.btnDeleteFun(formId, vdata);
                        //}

                    }
                });

                //formId.find('.' + btnEdit).off('click').on({
                //    click: function () {
                //        var vdata = tblEmp.row(formId.find('#' + tblName + ' tbody tr[role=row].selected')).data();
                //        setting.btnEditFun(formId, vdata);
                //    }
                //});
//                $.each(formId.find('#' + tblName + ' tbody').find('tr > td'), function (kk, vv) {
//                    if ($(vv).find('.btn,.checkbox').length === 0)
//                        $(vv).addClass('tdNoneBtn');
//                });
                setting.FundCallback(formId, tblEmp);
                //var oTbl = $('#' + tblName).dataTable();
                //oTbl.fnPageChange(_pageSelect);
                //var _divaction = formId.attr('id') + 'divaction';
                //formId.append('<div id="' + _divaction + '" style="display:none;" data-xform="' + formId.attr('id') + '"></div>').on('click', function () {
                //    var _formid = $('#' + $(this).find('#' + _divaction).data('xform'));
                //    alert(_formid.attr('id'));
                //    var oTable = $('#' + _formid.find('table.xmain').attr('id')).dataTable();
                //    oTable.fnPageChange('last');
                //});
                //$('#' + $.cookie('n2n_focusMenu')).parent('li').click();
            });
        })
    };

    $.fn.setEvenValidator = function (option) {
        var setting = $.extend({
            btnActive: new Array()
        }, option);

        return this.each(function () {
            var _thisF = $(this);
            //$.each(setting.btnActive, function (k, v) {
            //    $(v).not(':input[type = button], :input[type=submit], :input[type=reset], :button').on({
            //        click: function () {
            //            _thisF.submit();
            //        }
            //    });
            //});

            $(this).on('success.field.fv err.field.fv err.form.fv success.form.fv', function (e) {
//            $(this).on('err.form.fv success.form.fv', function (e) {
//                _thisF.find('[data-fv-result="INVALID"]').removeAttr('style');
//                alert(_thisF.data('formValidation').isValid());
                $.each(setting.btnActive, function (key, val) {
//                    if (_thisF.find('[data-fv-result="INVALID"]').length > 0) {
                    if (_thisF.data('formValidation').isValid() === null) {
                        $(val).prop('disabled', false).removeClass('disabled');
//                        $(val).prop('disabled', true).addClass('disabled');
                    } else if (_thisF.data('formValidation').isValid()) {
                        $(val).prop('disabled', false).removeClass('disabled');
                    } else {
                        $(val).prop('disabled', true).addClass('disabled');
//                        $(val).prop('disabled', false).removeClass('disabled');
                    }
                });
            });
        });
    }

    $.searchData = function (option) {
        var setting = $.extend({
            fromGrid: '',
            opt: 'get',
            callback: function () { }
        }, option);

        var fromThis = $(setting.fromGrid);
        var objName = 'tbl' + fromThis.attr('id');
        //var vDataTable = $('#' + objName).DataTable();
        //var vDataTable = new $.fn.dataTable.Api($('#' + objName));
        var vopt = $.trim(setting.opt).toUpperCase();
        if (vopt === 'GET') {
            var chk = $('.' + objName + 'chk:checked');
            var datakey = new Array();
            $.each(chk, function (key, val) {
                datakey.push($(val).attr('xData'));
            });
            setting.callback(fromThis, chk, datakey);
        }
    }

    $.fn.searchData = function (option) {
        var setting = $.extend({
            headerString: '',
            btnSearch: true,
            DataColumnsOrder: [[0, 'asc']],
            DataColumns: new Array(),
            rowNum: [[10, 25, 50, -1], ['10 Items', '25 Items', '50 Items', 'Show All']],
            FunLoadData: function () { },
            btnClickRowFun: function () { },
            FundCallback: function () { },
            multiselect: false,
            btnSelectAll: 'Selected',
            btnUnSelectAll: 'Unselected',
            rowClick: true,
            rowClickFun: function () { },
            rowDbClick: true,
            rowDbClickFun: function () { },
            DataColumnsDefs: new Array()
        }, option);

        return this.each(function () {
            var formId = $(this);
            var tblName = 'tbl' + formId.attr('id');
            var btnRef = tblName + 'btnRef';
            var btnPages = tblName + 'btnPages';
            var txtSearch = tblName + 'txtSearch';
            var btnClickRow = tblName + 'Click';
            var btnSelect = tblName + 'Selected';
            var btnUnSelect = tblName + 'Unselected';
            var chk = tblName + 'chk';

            var _html = '';
            _html = '<div class="">';
            _html += '<div class="row">';
            if ($.trim(setting.headerString).length > 0)
                _html += '<div class="page-header col-lg-12"><h3>' + setting.headerString + '</h3></div>';

            _html += '<div class="col-xs-6">';
            _html += '<div class="form-group label-floating" style="padding-left: 12px;">';
            _html += '<div class="btn-group" style="margin-top: 0px;">';
            if (setting.multiselect) {
                _html += '<div class="btn btn-warning btn-raised ' + btnSelect + '"><i class="fa fa-dot-circle-o"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnSelectAll + '</spen></div>';
                _html += '<div class="btn btn-warning btn-raised ' + btnUnSelect + '"><i class="fa fa-circle-o"></i><spen class="hidden-xs hidden-sm"> ' + setting.btnUnSelectAll + '</spen></div>';
                //_html += '<div class="btn btn-danger dropdown-toggle ' + btnRemoveMenu + '" data-toggle="dropdown">';
                //_html += '<span class="caret"></span>';
                //_html += '</div>';
                //_html += '<ul class="dropdown-menu dropdown-menu-left">';
                //_html += '<li><a href="#" class="danger ' + btnChecked + '"><i class="fa fa-check-square">&nbsp;</i>เลือก</a></li>';
                //_html += '<li><a href="#" class="danger ' + btnUnChecked + '"><i class="fa fa-square-o">&nbsp;</i>ไม่เลือก</a></li>';
                //_html += '</ul>';
            }
            _html += '</div>';
            _html += '</div>';
            _html += '</div>';

            _html += '<div class="col-xs-6 text-right">';
            if (setting.btnSearch) {
                _html += '<div class="form-group label-floating">';
                _html += '<div class="input-group">';
                _html += '<span class="input-group-addon hidden-xs hidden-sm" ><i class="fa fa-search"></i></span>';
                _html += '<label class="control-label hidden-xs hidden-sm" for="' + txtSearch + '">Specify the text to search.</label>';
                _html += '<input type="text" name="' + txtSearch + '" id="' + txtSearch + '" class="form-control"  />';


                //_html += '<span class="input-group-addon btn-raised hidden-xs">';
                //_html += '<span class="fa fa-search"></span>';
                //_html += '</span>';
                //_html += '<input type="text" name="' + txtSearch + '" id="' + txtSearch + '" class="form-control" placeholder="ระบุข้อความที่ต้องการค้นหา" />';
                //_html += '<div class="input-group-btn">';
                //_html += '<div class="btn btn-primary btn-raised ' + btnRef + '"><i class="fa fa-refresh"></i></div>';
                //_html += '</div>';
                _html += '<div class="input-group-btn">';
                //_html += '<div class="btn-group">';
                _html += '<div class="btn btn-primary btn-raised ' + btnRef + '"><i class="fa fa-refresh"></i></div>';
                _html += '<div class="btn btn-primary btn-raised btn-secondary btnList dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding-left: 8px;padding-right: 8px;">';
                _html += '<span class="caret"></span>';
                _html += '</div>';
                _html += '<ul class="dropdown-menu dropdown-menu-right ulPages" style="right: 12px;margin-top: -6px;border-radius: 0px 0px 2px 2px;">';
                $.each(setting.rowNum[0], function (key, val) {
                    if (val === -1) {
                        _html += '<li role="separator" class="divider"></li>';
                        _html += '<li value="' + val + '"><a href="#"><i class="fa fa-chevron-circle-right" style="min-width:20px;"></i>  ' + setting.rowNum[1][key] + '</a></li>';
                    } else {
                        _html += '<li value="' + val + '"><a href="#"><i class="fa fa-chevron-circle-right" style="min-width:20px;"></i>  ' + setting.rowNum[1][key] + '</a></li>';
                    }
                });
                _html += '</ul>';
                //_html += '</div>';
                _html += '</div>';
            } else {
                _html += '<div class="input-group" style="display:inline-block;">';
            }
            //_html += '<div class="input-group-btn">';
            //_html += '<div class="btn btn-primary ' + btnPages + '"><i class="glyphicon glyphicon-duplicate"></i></div>';
            //_html += '<div class="btn btn-primary btn-raised dropdown-toggle" data-toggle="dropdown">';
            //_html += '<i class="fa fa-reorder"></i> <span class="caret"></span>';
            //_html += '</div>';

            _html += '</div>';

            _html += '</div>';
            _html += '</div>';
            _html += '</div>';


            _html += '<div class="col-lg-12 col-xs-12">';
            _html += '<table id="' + tblName + '" class="display nowrap responsive" cellspacing="0" style="width:100%;">';
            _html += '<thead>';
            _html += '<tr>';
            $.each(setting.DataColumns, function (key, val) {
                _html += '<th>' + val.header + '</th>';
            });
            _html += '</tr>';
            _html += '</thead>';
            _html += '</table>';
            _html += '</div>';
            _html += '</div>';
            _html += '</div>';

            formId.empty().append(_html).find('#' + tblName).each(function (key, val) {
                var _colDefs = new Array();
                if (setting.multiselect) {
                    _colDefs.push({
                        render: function (row, type, val2, meta) {
                            _html = '<div class="checkbox-none-text checkbox-primary ">';
                            var attrL = '';
                            for (var nam in val2) {
                                attrL += ' data-' + nam + '="' + $.trim(val2[nam]) + '"';
                            }
                            _html += '<input id="' + (chk + val2.key) + '" type="checkbox" class="' + chk + '" xData="' + $.trim(val2.key) + '"' + attrL + '>';
                            _html += '<label for="' + (chk + val2.key) + '" style="padding-left: 5px!important;font-size:100%!important;font-weight:100!important;color:#000!important;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                            _html += row;
                            _html += '</label>';
                            _html += '</div>';
                            return _html;
                        },
                        orderable: true,
                        targets: 0
                    });
                }
                $.each(setting.DataColumnsDefs, function (k, v) {
                    _colDefs.push(v);
                });

                var tblEmp = $(val).DataTable({
                    processing: true,
                    responsive: true,
                    order: setting.DataColumnsOrder,
                    columns: setting.DataColumns,
                    //columnDefs: !setting.multiselect ? [{}] :
                    //    [{
                    //        render: function (row, type, val2, meta) {
                    //            _html = '<div class="checkbox-none-text checkbox-primary ">';

                    //            var attrL = '';
                    //            for (var nam in val2) {
                    //                attrL += ' data-' + nam + '="' + $.trim(val2[nam]) + '"';
                    //            }

                    //            _html += '<input id="' + (chk + val2.key) + '" type="checkbox" class="' + chk + '" xData="' + $.trim(val2.key) + '"' + attrL + '>';
                    //            _html += '<label for="' + (chk + val2.key) + '" style="padding-left: 5px!important;font-size:100%!important;font-weight:100!important;color:#000!important;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                    //            _html += row;
                    //            _html += '</label>';
                    //            _html += '</div>';
                    //            return _html;
                    //        },
                    //        orderable: true,
                    //        targets: 0
                    //    }],
                    columnDefs: _colDefs,
                    initComplete: function (settings) {

                    },
                    rowCallback: function (row, data, index) {
                        if (index === 0)
                            tblEmp.responsive.recalc();
                    },
                    fnDrawCallback: function (settings) {

                    },
                    pageLength: -1
                });
                setting.FunLoadData(tblEmp, formId);

                formId.find('.ulPages > li:not(.divider)').off('click').on({
                    click: function (e) {
                        e.preventDefault();
                        var rowCount = parseInt($(this).val());
                        if (rowCount > -1) {
                            formId.find('.dataTables_paginate').show();
                            tblEmp.page.len(rowCount).draw();
                        } else {
                            formId.find('.dataTables_paginate').hide();
                            tblEmp.page.len(rowCount).draw();
                        }
                    }
                }).eq(0).click();

                if (setting.rowClick) {
                    formId.find('#' + tblName + ' tbody').on('click', 'tr > td:not(:first-child)', function () {
                        var vdata = tblEmp.row($(this).parent('tr')).data();
                        setting.rowClickFun(formId, vdata);
                    });
                }

                if (setting.rowDbClick) {
                    formId.find('#' + tblName + ' tbody').on('dblclick', 'tr > td:not(:first-child)', function () {
                        var vdata = tblEmp.row($(this).parent('tr')).data();
                        setting.rowDbClickFun(formId, vdata);
                    });
                }

                formId.on('input propertychange paste', '#' + txtSearch, function () {
                    tblEmp.search($(this).val()).draw();
                });

                formId.find('.' + btnSelect).off('click').on({
                    click: function (e) {
                        e.preventDefault();
                        formId.find('.' + chk).prop('checked', true);
                    }
                });

                formId.find('.' + btnUnSelect).off('click').on({
                    click: function (e) {
                        e.preventDefault();
                        formId.find('.' + chk).prop('checked', false);
                    }
                });

                formId.find('.' + btnRef).off('click').on({
                    click: function () {
                        //tblEmp.clear().rows.add(setting.FunLoadData());
                        setting.FunLoadData(tblEmp, formId);
                    }
                });

                //formId.find('.' + btnClickRow).off('click').on({
                //    click: function () {
                //        var vdata = tblEmp.row(formId.find('#' + tblName + ' tbody tr[role=row].selected')).data();
                //        setting.btnClickRowFun(formId, vdata);
                //    }
                //});

                //if (setting.multiselect === false) {
                formId.find('#' + tblName + ' tbody').on('click', 'tr > td:not(:first-child)', function () {
                    var vdata = tblEmp.row($(this).parent('tr')).data();
                    setting.btnClickRowFun(formId, vdata);
                });
                //}

                setting.FundCallback(formId, formId.find('#' + tblName));

                formId.data('table_tool', tblEmp);
            });
        });
    }

    $.fn.myValidation = function (option) {
        var setting = $.extend({
            funerror: function () { },
            funsuccess: function () { },
            fields: {},
            //message: new Object(),
            btnactive: [],
            excluded: [':disabled']
//            positionY: 'top',
//            positionX: 'right',
//            type: 'error'
        }, option);

        return this.each(function () {
            var _this = $(this);
//            _this.prepend('<div id="messages" class="has-error" style="display:none;"></div>');
//            _this.prepend('<button type="button" id="btn-error" data-positionX="' + setting.positionX + '" data-positionY="' + setting.positionY + '" data-effect="fadeInUp" data-message="Oh snap! Change a few things up and try submitting again." data-type="' + setting.type + '" class="pmd-z-depth pmd-alert-toggle" style="display:none;">Alert Error</button>');

            _this.formValidation({
                framework: 'bootstrap',
                //excluded: [':disabled', ':hidden', ':not(:visible)'],
                excluded: setting.excluded,
                live: 'enabled',
                //autoFocus:true,
                err: {
//                    container: _this.find('#messages')
                    //container: 'tooltip'
                },
                //row: {
                //    selector: 'td'
                //},
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: setting.fields,
            }).on('err.form.fv', function (e) {
                setting.funerror(e);
            }).on('success.form.fv', function (e) {
                setting.funsuccess(e);
//                $.each(setting.btnactive, function (k, v) {
//                    v.removeClass('disabled').removeAttr('disabled');
//                });
            }).on('err.field.fv', function (e, data) {
//                var _mk = _this.find('.help-block[data-fv-for="' + data.field + '"]');
//                _this.find('#btn-error').attr('data-message', 'Error :' + _mk.text()).click();
            }).setEvenValidator({
                btnActive: setting.btnactive
            });
        });
    }
}(jQuery));

function chkForms(v) {
    $(v).submit().find('[data-fv-result="INVALID"]').removeAttr('style');
    if ($(v).find('[data-fv-result="INVALID"]').length > 0) {
        return false;
    } else {
        return true;
    }
}
