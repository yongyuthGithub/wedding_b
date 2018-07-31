$(function () {
    var form_alertlist = $('#form_alertlist');
    var form_submenu = $('#form_submenu');

    form_alertlist.on('focusout', '.txtDis', function () {
        var _key = $(this).data('key');
        var _v = ChkNumber($(this).val()).toFixed(0);
        $(this).val(_v);

        var obj = new Object({
            RowKey: _key,
            AlertBeforeDay: _v
        });
        $.reqData({
            url: mvcPatch('MySystem/editMyAlert'),
            data: {data: JSON.stringify(obj)},
            loanding: false,
            callback: function (vdata) {

            }
        });
    });

    form_alertlist.on('click', '.swDF', function () {
        var _this = $(this);
        var obj = new Object({
            RowKey: _this.data('key'),
            RowStatus: _this.is(':checked') ? 1 : 0
        });
        $.reqData({
            url: mvcPatch('MySystem/editMyAlert'),
            data: {data: JSON.stringify(obj)},
            loanding: false,
            callback: function (vdata) {

            }
        });
    });

    form_alertlist.setMainPage({
        btnNew: false,
        btnDeleteAll: false,
        btnDelete: false,
        btnEdit: false,
        btnPreview: false,
        btnEditText: 'แก้ไข',
        btnNewText: 'เพิ่ม',
        btnDeleteText: 'ลบ',
        btnPreviewText: 'ลำดับ',
        headerString: '',
        UrlDataJson: mvcPatch('MySystem/findMyAlert'),
        UrlLoanding: false,
        UrlLoandingclose: false,
        DataColumns: [
            {data: 'Detail', header: 'รายการแจ้งเตือน'},
            {data: 'AlertBeforeDay', header: 'จำนวนวันแจ้งเตือนก่อน'},
            {data: 'RowStatus', header: 'สถานะ'},
        ],
        DataColumnsDefs: [
            {
                render: function (row, type, val2, meta) {
                    return '<input type="text" class="form-control text-right txtDis" id="t' + val2.key + '" name="t' + val2.key + '" data-key="' + val2.key + '" placeholder="จำนวนวันก่อนแจ้งเตือน" value="' + val2.AlertBeforeDay + '">';
                },
                orderable: false,
                targets: 1
            },
            {
                render: function (row, type, val2, meta) {
                    var _chk = parseInt(val2.RowStatus) > 0 ? 'checked' : '';
                    var _html = '<div class="form-group"><div class="material-switch">';
                    _html += '<input id="swDF' + val2.key + '" name="swDF' + val2.key + '" type="checkbox" class="swDF" data-key="' + val2.key + '" ' + _chk + ' />';
                    _html += '<label for="swDF' + val2.key + '" class="label-success" style="width:auto;"></label>';
                    _html += '</div></div>';
                    return _html;
                },
                orderable: false,
                targets: 2
            }
        ],
        btnNewFun: function (f) {

        },
        btnEditFun: function (f, d) {

        },
        btnDeleteFun: function (f, d) {

        },
        btnPreviewFun: function (f, d) {

        }
    });
});


