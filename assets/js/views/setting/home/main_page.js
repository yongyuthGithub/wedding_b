$(function () {
    var _d = new Date();

    var _sdate = new Date(_d.getFullYear(), _d.getMonth() - 11, 1);
    var _edate = new Date(_d.getFullYear(), _d.getMonth() - 10, 0);

    var _objData = new Array({
        index: 1,
        sdate: PHP_DateTime_To_JSON2(_sdate),
        edate: PHP_DateTime_To_JSON2(_edate),
        month_name: monthNamesThai[_sdate.getMonth()] + ' ' + _sdate.getFullYear()
    });

    for (var i = 1; i < 12; i++) {
        var _newD = new Date(_sdate.getFullYear(), _sdate.getMonth() + i, 1);
        _objData.push({
            index: i + 1,
            sdate: PHP_DateTime_To_JSON2(_newD),
            edate: PHP_DateTime_To_JSON2(new Date(_sdate.getFullYear(), _sdate.getMonth() + i + 1, 0)),
            month_name: monthNamesThai[_newD.getMonth()] + ' ' + _newD.getFullYear()
        });
    }

    $.reqData({
        url: mvcPatch('Home/findIncomeMonth'),
        data: {data: JSON.stringify(_objData)},
        loanding: false,
        callback: function (vdata) {
            var _data = $.ToLinq(vdata.Income)
                    .Select(function (x) {
                        return new Object({
                            Index: x.index,
                            TypeIn: parseFloat($.ToLinq(x.Items)
                                    .Where(k => parseInt(k.IncomeType) === 1)
                                    .Select(function (k) {
                                        return parseInt(k.IsVat) === 0 ? parseFloat(k.Amount) : parseFloat(k.Amount) + ((parseFloat(k.Amount) * 7) / 100);
                                    }).Sum().toFixed(2)),
                            TypeOut: parseFloat($.ToLinq(x.Items)
                                    .Where(k => parseInt(k.IncomeType) === 0)
                                    .Select(function (k) {
                                        return parseInt(k.IsVat) === 0 ? parseFloat(k.Amount) : parseFloat(k.Amount) + ((parseFloat(k.Amount) * 7) / 100);
                                    }).Sum().toFixed(2))
                        });
                    })
                    .OrderBy(x => x.Index)
                    .ToArray();

            Highcharts.chart('ch1', {

                title: {
                    text: 'รายรับ-รายจ่าย 12 เดือนย้อนหลัง'
                },

                subtitle: {
                    text: 'รายการทั้งหมดเกิดจากการคำนวณข้อมูลที่ทำการบันทึกเข้าไปภายในระบบเท่านั้น'
                },

                yAxis: {
                    title: {
                        text: 'จำนวนเงิน'
                    }
                },
                xAxis: {
//            categories: ['เม.ย. 60', 'พ.ค. 60', 'มิ.ย. 60', 'ก.ค. 60', 'ส.ค. 60', 'ก.ย. 60', 'ต.ค. 60', 'พ.ย. 60', 'ธ.ค. 60', 'ม.ค. 61', 'ก.พ. 61', 'มี.ค. 61']
                    categories: $.ToLinq(vdata.Income).Select(function (x) {
                        return x.month_name;
                    }).ToArray()
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                pointStart: 2010
//            }
                },

                series: [{
                        name: 'รายรับ',
                        data: $.ToLinq(_data).Select(function (x) {
                            return x.TypeIn;
                        }).ToArray()
                    }, {
                        name: 'รายจ่าย',
                        data: $.ToLinq(_data).Select(function (x) {
                            return x.TypeOut;
                        }).ToArray()
                    }],

                responsive: {
                    rules: [{
//                    condition: {
//                        maxWidth: 500
//                    },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                }

            });

            Highcharts.chart('ch2', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'อัตรารายรับ-รายจ่าย 12 เดือนย้อนหลัง'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                                name: 'รายรับ',
                                y: $.ToLinq(_data).Select(function (x) {
                                    return x.TypeIn;
                                }).Sum()
                            }, {
                                name: 'รายจ่าย',
                                y: $.ToLinq(_data).Select(function (x) {
                                    return x.TypeOut;
                                }).Sum(),
                                sliced: true,
                                selected: true
                            }]
                    }]
            });

            var _dc = $.ToLinq(vdata.Customer)
                    .Where(x => x.Total !== null)
                    .Select(function (x) {
                        return new Object({
                            CusCode: x.CusCode,
                            Customer: x.Customer,
                            Total: parseFloat(parseFloat(x.Total).toFixed(2))
                        });
                    })
                    .OrderByDescending(x => x.Total)
                    .Take(5).ToArray();
            Highcharts.chart('ch3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'ลูกค้าที่ใช้บริการ 5 ลำดับแรก'
                },
                xAxis: {
//                    categories: [
//                        'ลูกค้า A',
//                        'ลูกค้า B',
//                        'ลูกค้า C',
//                        'ลูกค้า D',
//                        'ลูกค้า E',
//                    ]
                    categories: $.ToLinq(_dc)
                            .Select(function (x) {
                                return x.Customer;
                            }).ToArray()
                },
                yAxis: [{
                        min: 0,
                        title: {
                            text: 'ค่าบริการ'
                        }
                    },
//            {
//                title: {
//                    text: 'Profit (millions)'
//                },
//                opposite: true
//            }
                ],
                legend: {
                    shadow: false
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: [{
                        name: 'ลูกค้า',
                        color: 'rgba(165,170,217,1)',
//                        data: [3000000, 2500000, 2100000, 2000000, 1800000],
                        data: $.ToLinq(_dc)
                                .Select(function (x) {
                                    return x.Total;
                                }).ToArray(),
                        pointPadding: 0.3,
//                pointPlacement: -0.2
                    },
//            {
//                name: 'C002',
//                color: 'rgba(126,86,134,.9)',
//                data: [140, 90, 40],
//                pointPadding: 0.4,
//                pointPlacement: -0.2
//            }, 
//            {
//                name: 'C003',
//                color: 'rgba(248,161,63,1)',
//                data: [183.6, 178.8, 198.5],
//                tooltip: {
//                    valuePrefix: '$',
//                    valueSuffix: ' M'
//                },
//                pointPadding: 0.3,
//                pointPlacement: 0.2,
//                yAxis: 1
//            }, 
//            {
//                name: 'C004',
//                color: 'rgba(186,60,61,.9)',
//                data: [203.6, 198.8, 208.5],
//                tooltip: {
//                    valuePrefix: '$',
//                    valueSuffix: ' M'
//                },
//                pointPadding: 0.4,
//                pointPlacement: 0.2,
//                yAxis: 1
//            }
                ]
            });
        }
    });

    $.reqData({
        url: mvcPatch('MySystem/findAllMyAlert'),
        loanding: false,
        callback: function (vdata) {
            var _s = $('#show-at').empty();
            if (vdata.length > 0) {
                $.each(vdata, function (k, v) {
                    _s.append((k + 1) + '. ' + v.Text + ' ' + PHP_JSON_To_ShowDate(v.ExpDate));
                });
            } else {
                $('#div-at').css({'display': 'none'});
            }
        }
    });
});
