$(function () {
    var form_showTotalPayout = $('#form_showTotalPayout');
    var form_showTotalPayout_C = $.modelDialog(form_showTotalPayout);

    var _data = new Object({
        TB: $.ToLinq(form_showTotalPayout_C.data('data'))
                .Select(function (x) {
                    return new Object({
                        DocID: x.DocID,
                        Detial: x.Detial,
                        DocDate: setDateJson(PHP_JSON_To_ShowDate(x.DocDate)),
                        Amount: parseFloat(x.Amount),
                        IncomeType: parseInt(x.IncomeType),
                        IsVat: parseInt(x.IsVat)
                    });
                }).OrderBy(x => x.DocDate).ToArray()
    });

    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.toolbar.zoom = Stimulsoft.Viewer.StiZoomMode.PageWidth;
    options.toolbar.showPrintButton = true;
    options.toolbar.showSaveButton = true;
    options.toolbar.showFullScreenButton = false;
    $.ReportViewer({
        viewer_id: 'display-prevuew',
        report_path: mvcPatch('InReport/loadInReportReport'),
        viewer_option: options,
        fun: function (report, variables, viewer) {
            $.reqData({
                url: mvcPatch('InReport/findReceiptWithReport'),
                loanding: false,
                callback: function (vdata) {
                    variables.getByName('CompanyName').valueObject = vdata.Customer;
                    variables.getByName('CompanyAddress').valueObject = vdata.Address;
                    variables.getByName('CompanySubDistrict').valueObject = vdata.SubDistrict;
                    variables.getByName('CompanyDistrict').valueObject = vdata.District;
                    variables.getByName('CompanyProvince').valueObject = vdata.Province;
                    variables.getByName('CompanyZipCode').valueObject = vdata.ZipCode;
                    variables.getByName('CompanyTel').valueObject = vdata.Tel;
                    variables.getByName('CompanyFax').valueObject = vdata.Fax;
                    variables.getByName('CustomerIDCard').valueObject = vdata.IDCard;

                    var dataSet = new Stimulsoft.System.Data.DataSet('appName1');
                    dataSet.readJson(JSON.stringify(_data));
                    report.regData('document', 'document', dataSet);

                    report.dictionary.synchronize();
                    report.render();
                    viewer.report = report;
                }
            });
        }
    });
});
