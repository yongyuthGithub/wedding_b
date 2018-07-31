$(function () {
    var form_showBill = $('#form_showBill');
    var form_showBill_C = $.modelDialog(form_showBill);
//    var str = Stimulsoft.System.IO.File.getFile(mvcPatch('Bill/loadBillReport'));
//    var str = Stimulsoft.System.IO.File.getFile(mvcPatch('reports/Report.mrt'));
//    var options = new Stimulsoft.Viewer.StiViewerOptions();
//    options.toolbar.zoom = Stimulsoft.Viewer.StiZoomMode.PageWidth;
//    options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.WholeReport;
//    options.toolbar.showPrintButton = false;
//    options.toolbar.showSaveButton = false;
//    options.toolbar.showFullScreenButton = false;
//    var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
//    viewer.renderHtml("display-prevuew");
//    viewer.showProcessIndicator();
//
////    report.reqData('DataList','DataList',JSON.stringify(new Array()));
//    var report = new Stimulsoft.Report.StiReport();
//    report.loadFile(mvcPatch('Bill/loadBillReport'));
//    report.dictionary.databases.clear();
//
//    $.reqData({
//        url: mvcPatch('Bill/findBillWithReport'),
//        data: {key: form_showBill_C.data('data')},
//        loanding: false,
//        callback: function (vdata) {
//            report.dictionary.variables.getByName('CompanyName').valueObject = vdata.Company.Customer;
//            report.dictionary.variables.getByName('CompanyAddress').valueObject = vdata.Company.Address;
//            report.dictionary.variables.getByName('CompanySubDistrict').valueObject = vdata.Company.SubDistrict;
//            report.dictionary.variables.getByName('CompanyDistrict').valueObject = vdata.Company.District;
//            report.dictionary.variables.getByName('CompanyProvince').valueObject = vdata.Company.Province;
//            report.dictionary.variables.getByName('CompanyZipCode').valueObject = vdata.Company.ZipCode;
//            report.dictionary.variables.getByName('CompanyTel').valueObject = vdata.Company.Tel;
//            report.dictionary.variables.getByName('CompanyFax').valueObject = vdata.Company.Fax;
//            report.dictionary.variables.getByName('CustomerIDCard').valueObject = vdata.Company.IDCard;
//
//            report.dictionary.variables.getByName('CustName').valueObject = vdata.Customer.Customer;
//            report.dictionary.variables.getByName('CustAddress').valueObject = vdata.Customer.Address;
//            report.dictionary.variables.getByName('CustSubDistrict').valueObject = vdata.Customer.SubDistrict;
//            report.dictionary.variables.getByName('CustDistrict').valueObject = vdata.Customer.District;
//            report.dictionary.variables.getByName('CustProvince').valueObject = vdata.Customer.Province;
//            report.dictionary.variables.getByName('CustTel').valueObject = vdata.Customer.Tel;
//            report.dictionary.variables.getByName('CustFax').valueObject = vdata.Customer.Fax;
//            report.dictionary.variables.getByName('CustIDCard').valueObject = vdata.Customer.IDCard;
//            report.dictionary.variables.getByName('CustZipCode').valueObject = vdata.Customer.ZipCode;
//            report.dictionary.variables.getByName('CustBranch').valueObject = vdata.Customer.Branch;
//
//            report.dictionary.variables.getByName('BillDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);
//
//            try {
//                report.dictionary.variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DueDate);
//            } catch (e) {
//                report.dictionary.variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);
//            }
//            var _pay = '';
//            if (parseInt(vdata.PayType) === 1) {
//                _pay = 'ชำระเงินสด';
//            } else if (parseInt(vdata.PayType) === 2) {
//                _pay = 'ชำระเช็ค';
//            }
//            report.dictionary.variables.getByName('PayType').valueObject = _pay;
//            viewer.report = report;
//
//        }
//    });
//    report.reqData('DataList','DataList',JSON.stringify(new Array()));
    var _printstatus = form_showBill_C.data('print');
    if (_printstatus === PrintStatus.Print) {
        $.ReportViewer({
            viewer_id: 'display-prevuew',
            report_path: mvcPatch('Bill/loadBillReport'),
            fun: function (report, variables, viewer) {
                $.reqData({
                    url: mvcPatch('Bill/findBillWithReport'),
                    data: {key: form_showBill_C.data('data')},
                    loanding: false,
                    callback: function (vdata) {
                        variables.getByName('CompanyName').valueObject = vdata.Company.Customer;
                        variables.getByName('CompanyAddress').valueObject = vdata.Company.Address;
                        variables.getByName('CompanySubDistrict').valueObject = vdata.Company.SubDistrict;
                        variables.getByName('CompanyDistrict').valueObject = vdata.Company.District;
                        variables.getByName('CompanyProvince').valueObject = vdata.Company.Province;
                        variables.getByName('CompanyZipCode').valueObject = vdata.Company.ZipCode;
                        variables.getByName('CompanyTel').valueObject = vdata.Company.Tel;
                        variables.getByName('CompanyFax').valueObject = vdata.Company.Fax;
                        variables.getByName('CustomerIDCard').valueObject = vdata.Company.IDCard;

                        variables.getByName('CustName').valueObject = vdata.Customer.Customer;
                        variables.getByName('CustAddress').valueObject = vdata.Customer.Address;
                        variables.getByName('CustSubDistrict').valueObject = vdata.Customer.SubDistrict;
                        variables.getByName('CustDistrict').valueObject = vdata.Customer.District;
                        variables.getByName('CustProvince').valueObject = vdata.Customer.Province;
                        variables.getByName('CustTel').valueObject = vdata.Customer.Tel;
                        variables.getByName('CustFax').valueObject = vdata.Customer.Fax;
                        variables.getByName('CustIDCard').valueObject = vdata.Customer.IDCard;
                        variables.getByName('CustZipCode').valueObject = vdata.Customer.ZipCode;
                        variables.getByName('CustBranch').valueObject = vdata.Customer.Branch;

                        variables.getByName('DocID').valueObject = vdata.DocID;
                        variables.getByName('BillDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);

                        var _remark = '';
                        $.each(vdata.Remark, function (kk, vv) {
                            if (kk === 0)
                                _remark = '\nท่านสามารถชำระได้ทางหมายเลขบัญชีธนาคารดังนี้\n';
                            _remark += '  - หมายเลขบัญชี ' + vv.AccountCode + ' ชื่อบัญชี ' + vv.AccountName + ' ธนาคาร ' + vv.Bank + '(' + vv.Branch + ')';
                            if (kk !== (vdata.Remark.length - 1))
                                _remark += '\n';
                        });
                        variables.getByName('remake').valueObject = _remark;
                        try {
                            variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DueDate);
                        } catch (e) {
                            variables.getByName('BillDueDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);
                        }
                        var _pay = '';
                        if (parseInt(vdata.PayType) === 1) {
                            _pay = 'ชำระเงินสด';
                        } else if (parseInt(vdata.PayType) === 2) {
                            _pay = 'เครดิต ' + vdata.Customer.Due + ' วัน';
                        }
                        variables.getByName('PayType').valueObject = _pay;

                        var _VatStatus = parseInt(vdata.VatStatus);
                        var _d = $.ToLinq(vdata.Detail)
                                .Select(function (x) {
                                    return new Object({
                                        DocID: x.DocID,
                                        DocDate: PHP_JSON_To_ShowDate(x.DocDate),
                                        Discount: parseFloat(x.Discount),
                                        CarNumber: x.CarNumber,
//                                    PriceTotal: parseFloat(x.PriceTotal) - parseFloat(x.Discount),
                                        PriceTotal: parseFloat(x.PriceTotal),
                                        Vat: _VatStatus > 0 ? ((parseFloat(x.PriceTotal) - parseFloat(x.Discount)) * 7) / 100 : 0,
                                        Product: x.Product,
                                        Province: x.Province,
                                        ShippingBegin: x.ShippingBegin,
                                        ShippingEnd: x.ShippingEnd,
                                        dDocDate: PHP_JSON_To_DateTime(x.DocDate),
                                        Remark: x.Remark
                                    });
                                }).ToArray();
//                    if (_VatStatus === 1 || _VatStatus === 2) {
                        $.each(_d, function (k, v) {
                            if (_VatStatus === 1) {
                                v.PriceTotal = (v.PriceTotal + v.Discount) - v.Vat;
                            }
//                            else {
//                                v.PriceTotal = v.PriceTotal + v.Discount + v.Vat;
//                            }
                        });
//                    }
                        var _txtTotal = $.ToLinq(_d).Select(function (x) {
//                        return _VatStatus === 1 ? (x.PriceTotal + x.Discount + x.Vat) : x.PriceTotal;
                            return (x.PriceTotal - x.Discount) + x.Vat;
                        }).Sum();
                        variables.getByName('TxtTotal').valueObject = ArabicNumberToText(_txtTotal);
                        variables.getByName('NetTotal').valueObject = _txtTotal;

                        var _Date = $.ToLinq(_d).Select(function (x) {
                            return x.dDocDate;
                        }).OrderBy(x => x);
                        variables.getByName('TxtDate').valueObject = getDateCustom(_Date.First(x => x)) + ' - ' + getDateCustom(_Date.Last(x => x));

                        var dataSet1 = new Stimulsoft.System.Data.DataSet('appName1');
                        dataSet1.readJson(JSON.stringify(_d));
                        report.regData('DataList', 'DataList', dataSet1);

                        viewer.onEndProcessData = function (ev) {

                        }
                        report.render();
                        viewer.report = report;

                        form_showBill_C.find('#btn-print').on({
                            click: function () {
                                viewer.report.print();
                                var obj = new Object({
                                    BillHDKey: form_showBill_C.data('data'),
                                    ReportView: viewer.report.saveDocumentToJsonString()
//                                ReportView: stream.toArray()
                                });
                                $.reqData({
                                    url: mvcPatch('Bill/printTemp'),
                                    data: {data: JSON.stringify(obj)},
                                    loanding: false,
                                    callback: function (vdata) {
                                        if (vdata.success) {
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
            }
        });
    } else if (_printstatus === PrintStatus.Preview) {
        $.ReportViewerOnly({
            viewer_id: 'display-prevuew',
            report_path: mvcPatch('Bill/printTempLoad'),
            report_data: {key: form_showBill_C.data('data')},
            report_watermark: function (detail) {
                var _n = 'โดย. ' + $.trim(detail.Title) + $.trim(detail.FName) + ' ' + $.trim(detail.LName);
                return 'เอกสารพิมพ์แล้ว\nณ. วันที่ ' + PHP_JSON_To_ShowDate(detail.UpdateDate) + '\n' + _n;
            },
            fun: function (report, variables, viewer) {
//                $('#btn-preview').on({
//                    click:function(){
//                        viewer.report.render();
//                        viewer.report.print();
//                    }
//                });
            }
        });
    }

//

});

