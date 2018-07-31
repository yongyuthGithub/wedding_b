$(function () {
    var menuseq = $('.menuseq');
    var menuseq_C = $.modelDialog(menuseq);

    menuseq.on('click', '.btn-up', function () {
        var _this = $(this).parents('.list-group-item');
        var _prev = _this.prev();
        _prev.insertAfter(_this);
    });

    menuseq.on('click', '.btn-down', function () {
        var _this = $(this).parents('.list-group-item');
        var _prev = _this.next();
        _prev.insertBefore(_this);
    });

    $.reqData({
        url: mvcPatch('menu/findSubMenuByMenu'),
        data: {data: menuseq_C.data('data')},
        callback: function (vdata) {
            menuseq.empty();
            var _data = $.ToLinq(vdata)
                    .OrderBy(x => parseInt(x.Seq))
                    .ToArray();
            var _html = '';
            $.each(_data, function (k, v) {
                _html += '<a href="#" class="list-group-item" data-key="' + v.RowKey + '">';
                _html += '<h4 class="list-group-item-heading"><i class="' + v.Icon + '" style="min-width:30px;"></i>' + v.SubMenu + '</h4>';
                _html += '<p class="list-group-item-text">' + v.Description + '</p>';
                _html += '<p class="list-group-item-text">Url : ' + v.Url + '</p>';
                _html += '<div class="div-btn">';
                _html += '<i class="btn-up fa fa-toggle-up"></i>';
                _html += '<i class="btn-down fa fa-toggle-down"></i>';
                _html += '</div>';
                _html += '</a>';
            });
            menuseq.append(_html);
        }
    });

    menuseq_C.find('#btn-ok').on({
        click: function () {
            var _data = new Array();
            $.each(menuseq.find('.list-group-item'), function (k, v) {
                _data.push({
                    RowKey: $(v).data('key'),
                    MenuKey: menuseq_C.data('data'),
                    Seq: k + 1
                });
            });
            $.bConfirm({
                buttonOK: function (k) {
                    k.close();
                    $.reqData({
                        url: mvcPatch('menu/editSubOrder'),
                        data: {data: JSON.stringify(_data)},
                        callback: function (vdata) {
                            if (vdata.success) {
                                menuseq_C.find('#btn-close').click();
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
});


