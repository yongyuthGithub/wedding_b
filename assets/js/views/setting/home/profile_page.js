$(function () {
    var form_profile = $('#form_profile');
    var form_profile_C = $.modelDialog(form_profile);

    $.reqData({
        url: mvcPatch('home/findProfile'),
        loanding: false,
        callback: function (vdata) {
            $('#user').text(vdata.User.User);
            $('#name').text(vdata.User.Name);
            var _p = $.ToLinq(vdata.Pemission)
                    .Select(function (x) {
                        return x.UserGroup;
                    }).ToArray();
            $('#pemission').text(_p.join(', '));
        }
    });
});
