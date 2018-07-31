$(function () {
    var form_showReceipt = $('#form_showReceipt');
    var form_showReceipt_C = $.modelDialog(form_showReceipt);

    var _printstatus = form_showReceipt_C.data('print');
    if (_printstatus === PrintStatus.Print) {
        $.ReportViewer({
            viewer_id: 'display-prevuew',
            report_path: mvcPatch('Receipt/loadReceiptReport'),
            fun: function (report, variables, viewer) {
                $.reqData({
                    url: mvcPatch('Receipt/findReceiptWithReport'),
                    data: {key: form_showReceipt_C.data('data')},
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

                        variables.getByName('DocDate').valueObject = PHP_JSON_To_ShowDate(vdata.DocDate);
                        variables.getByName('DocID').valueObject = vdata.DocID.concat(parseInt(vdata.Seq) > 0 ? '-'.concat(vdata.Seq) : '');
                        variables.getByName('PayType').valueObject = vdata.PayType;

                        if (parseInt(vdata.PayType) === 2) {
                            if (vdata.Cheq.length > 0) {
                                var _row = $.ToLinq(vdata.Cheq).First();
                                variables.getByName('ChqBank').valueObject = _row.Bank;
                                variables.getByName('ChqBankBranch').valueObject = _row.Branch;
                                variables.getByName('ChqNumber').valueObject = _row.ChequeNumber;
                                variables.getByName('ChqDate').valueObject = PHP_JSON_To_ShowDate(_row.ChequeDate);
                            }
                        }

                        var _billTotal = $.ToLinq(vdata.Bill)
                                .Sum(x => x.PriceTotal);
                        var _billF = $.ToLinq(vdata.Bill).ToArray();
                        var _otherTotal = $.ToLinq(vdata.Other)
                                .Sum(x => x.PriceTotal);
                        variables.getByName('TxtTotal').valueObject = ArabicNumberToText(_billTotal + _otherTotal);
                        variables.getByName('NetTotal').valueObject = _billTotal + _otherTotal;
                        var _Data = $.merge(_billF, vdata.Other);
                        var _tb = new Array(
                                {
                                    ListType2: 1,
                                    ListCheck: $.ToLinq(_Data).Where(x => x.ListType === 1).First().ListCheck
                                },
                                {
                                    ListType2: 2,
                                    ListCheck: $.ToLinq(_Data).Where(x => x.ListType === 2).First().ListCheck
                                });
                        var objD = new Object({
                            TB: _tb,
                            TB2: _Data
                        });

                        var dataSet = new Stimulsoft.System.Data.DataSet('appName1');
                        dataSet.readJson(JSON.stringify(objD));
                        report.regData('document', 'document', dataSet);

                        report.dictionary.synchronize();
                        report.render();
                        viewer.report = report;

                        form_showReceipt_C.find('#btn-print').on({
                            click: function () {
                                viewer.report.print();
                                var obj = new Object({
                                    ReceiptHDKey: form_showReceipt_C.data('data'),
                                    ReportView: viewer.report.saveDocumentToJsonString()
//                                ReportView: stream.toArray()
                                });
                                $.reqData({
                                    url: mvcPatch('Receipt/printTemp'),
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
            report_path: mvcPatch('Receipt/printTempLoad'),
            report_data: {key: form_showReceipt_C.data('data')},
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
});