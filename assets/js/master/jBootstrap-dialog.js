(function ($) {

    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function btnType(v) {
        var vReturn = 'pmd-btn-raised pmd-ripple-effect ';
        if (v === BootstrapDialog.TYPE_INFO) {
            vReturn = vReturn + 'btn-info';
        } else if (v === BootstrapDialog.TYPE_PRIMARY) {
            vReturn = vReturn + 'btn-primary';
        } else if (v === BootstrapDialog.TYPE_SUCCESS) {
            vReturn = vReturn + 'btn-success';
        } else if (v === BootstrapDialog.TYPE_WARNING) {
            vReturn = vReturn + 'btn-warning';
        } else if (v === BootstrapDialog.TYPE_DANGER) {
            vReturn = vReturn + 'btn-danger';
        } else {
            vReturn = vReturn + 'btn-default';
        }
        return vReturn;
    }
    function textType(v) {
        if (v === BootstrapDialog.TYPE_INFO) {
            return 'text-info';
        } else if (v === BootstrapDialog.TYPE_PRIMARY) {
            return 'text-primary';
        } else if (v === BootstrapDialog.TYPE_SUCCESS) {
            return 'text-success';
        } else if (v === BootstrapDialog.TYPE_WARNING) {
            return 'text-warning';
        } else if (v === BootstrapDialog.TYPE_DANGER) {
            return 'text-danger';
        } else {
            return 'text-default';
        }
    }

    $.bPopup = function (option) {
        var setting = $.extend({
            title: '',
            url: '',
            type: BootstrapDialog.TYPE_PRIMARY,
            closable: true,
            buttons: new Array(),
            data: new Object(),
            onshow: function () { },
            onshown: function () { },
            onhide: function () { },
            onhidden: function () { },
            size: BootstrapDialog.SIZE_WIDE,
            btnCancel: true,
            sender: new Array(),
            cssClass: ''
        }, option);

        //var popupstr = 'popup';
        //for (var i = 0; i < 5; i++)
        //    popupstr += possible.charAt(Math.floor(Math.random() * possible.length));

        var btnArray = new Array();
        $.each(setting.buttons, function (key, val) {
            var obj = new Object();
            if (val.id !== undefined)
                obj.id = val.id;
            obj.icon = val.icon;
            obj.label = val.label;
            obj.cssClass = val.cssClass === undefined ? btnType(setting.type) : btnType(val.cssClass);
            obj.action = val.action
            btnArray.push(obj);
        });

        var objD = new Object();
        objD.id = 'btn-close';
        objD.icon = 'fa fa-close';
        objD.label = '&nbsp;Cancel';
        objD.cssClass = btnType(setting.type);
        objD.action = function (k) {
            k.close();
        }
        if (setting.btnCancel)
            btnArray.push(objD);

        BootstrapDialog.show({
            //title: '<i class="fa fa-comments-o fa-1x">&nbsp;&nbsp;</i>' + setting.title,
            //title: '<div style="font-size:180%;" class="' + textType(setting.type) + '">' + setting.title + '</div>',
            title: '<h3 style="margin: 0px;">' + setting.title + '</h3>',
            message: $('<div class="bPopup" style="width:auto;"></div>').load(setting.url),
            type: setting.type,
            closable: setting.closable,
            buttons: btnArray,
            //cssClass: popupstr,
            data: setting.data,
            onshow: setting.onshow,
            onshown: setting.onshown,
            onhide: setting.onhide,
            onhidden: setting.onhidden,
            size: setting.size,
            cssClass: setting.cssClass
        }).getModalBody().find('.bPopup').wrap('<div class=""></div>').parent('.pmd-card').wrap('<div class="panel panel-primary"></div>').parents('.modal-content').css({'background-color': '#f5f5f5'});
        //$('.bPopup').parents('.modal-content').css({
        //    'background-color': '#EEE!important'
        //})
    }

    $.bAlert = function (option) {
        var setting = $.extend({
            title: 'มีข้อผิดพลาด',
            message: 'มีข้อผิดพลาดในการจัดการ',
            type: BootstrapDialog.TYPE_DANGER,
            closable: false,
            buttonOK: function (k) {
                k.close();
            },
            size: BootstrapDialog.SIZE_NORMAL
        }, option);
        BootstrapDialog.show({
            title: '<h3 style="margin: 0px;" class="' + textType(setting.type) + '">' + setting.title + '</h3>',
            message: '<div style="padding:0px 0px 30px 0px;" class="' + textType(setting.type) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + setting.message + '</div>',
            type: setting.type,
            closable: setting.closable,
            onshown: function (k) {
            },
            buttons: [{
                    icon: 'fa fa-close',
                    label: '&nbsp;ok',
                    cssClass: btnType(setting.type),
                    action: setting.buttonOK
                }],
            size: setting.size
        });
    }

    $.bConfirm = function (option) {
        var setting = $.extend({
            title: 'ยืนยันการดำเนินการ',
            message: 'ต้องการบันทึกข้อมูลใช่หรือไม่',
            type: BootstrapDialog.TYPE_PRIMARY,
            closable: false,
            buttonOK: function (k) {
            },
            buttonCancel: function (k) {
                k.close();
            },
            size: BootstrapDialog.SIZE_NORMAL
        }, option);

        BootstrapDialog.show({
            title: '<h3 style="margin: 0px;" class="' + textType(setting.type) + '">' + setting.title + '</h3>',
            message: '<div style="padding:0px 0px 30px 0px;" class="' + textType(setting.type) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + setting.message + '</div>',
            type: setting.type,
            closable: setting.closable,
            onshown: function (k) {
            },
            buttons: [{
                    icon: 'fa fa-check',
                    label: '&nbsp;ok',
                    cssClass: btnType(setting.type),
                    action: setting.buttonOK
                }, {
                    icon: 'fa fa-close',
                    label: '&nbsp;Cancel',
                    cssClass: btnType(setting.type),
                    action: setting.buttonCancel
                }],
            size: setting.size
        });
    }

    $.modelDialog = function (option) {
        return option.parents('.modal');
    };

}(jQuery));