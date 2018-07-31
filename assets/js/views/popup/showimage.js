$(function () {
    var img_show = $('.img_show');
    var img_show_C = $.modelDialog(img_show);
    
    var _formdata = img_show_C.data('data');
    img_show.prop('src',_formdata);
});