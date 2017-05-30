import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-app-charts',
    templateUrl: './app-charts.component.html',
    styleUrls: ['./app-charts.component.css']
})
export class AppChartsComponent implements OnInit {

    // demo1
    chartOption = {
        title: {
            text: '堆叠区域图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: { normal: {} },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    // demo2
    demo2Dataset = [
        [
            200,
            32,
            444,
            666,
            88,
            352,
            380
        ]
    ];

    chartOption2 = {
        "color": [
            "#3398DB"
        ],
        "tooltip": {
            "trigger": "axis",
            "axisPointer": {
                "type": "shadow"
            }
        },
        "grid": {
            "left": "3%",
            "right": "4%",
            "bottom": "3%",
            "containLabel": true
        },
        "xAxis": [
            {
                "type": "category",
                "data": [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                "axisTick": {
                    "alignWithLabel": true
                }
            }
        ],
        "yAxis": [
            {
                "type": "value"
            }
        ],
        "series": [
            {
                "name": "直接访问",
                "type": "bar",
                "barWidth": "60%",
                "data": [
                    200,
                    32,
                    444,
                    666,
                    88,
                    352,
                    380
                ],
                markPoint: {}
            }
        ],
        legend: {
            show: true,
            data: [],
        }
    };

    changeOption() {
        this.chartOption2 = Object.assign({}, this.chartOption2);
        this.chartOption2.legend.data = [{ name: '直接访问', icon: 'circle' }];
        this.chartOption2.series[0].type = 'line';
        this.chartOption2.series[0].markPoint = {
            data: [
                { type: 'min', name: '最小值' },
                { type: 'max', name: '最大值' },
            ]
        };
    }

    // demo3

    chartOption3 = {
        'tooltip': {
            'trigger': 'item',
            'formatter': '{a} <br/>{b}: {c} ({d}%)'
        },
        'legend': {
            'orient': 'vertical',
            'x': 'left',
            'data': [
                '直达',
                '营销广告',
                '搜索引擎',
                '邮件营销',
                '联盟广告',
                '视频广告',
                '百度',
                '谷歌',
                '必应',
                '其他'
            ]
        },
        'series': [
            {
                'name': '访问来源',
                'type': 'pie',
                'selectedMode': 'single',
                'radius': [
                    0,
                    '30%'
                ],
                'label': {
                    'normal': {
                        'position': 'inner'
                    }
                },
                'labelLine': {
                    'normal': {
                        'show': false
                    }
                },
                'data': [
                    {
                        'value': 335,
                        'name': '直达',
                        'selected': true
                    },
                    {
                        'value': 679,
                        'name': '营销广告'
                    },
                    {
                        'value': 1548,
                        'name': '搜索引擎'
                    }
                ]
            },
            {
                'name': '访问来源',
                'type': 'pie',
                'radius': [
                    '40%',
                    '55%'
                ],
                'data': [
                    {
                        'value': 335,
                        'name': '直达'
                    },
                    {
                        'value': 310,
                        'name': '邮件营销'
                    },
                    {
                        'value': 234,
                        'name': '联盟广告'
                    },
                    {
                        'value': 135,
                        'name': '视频广告'
                    },
                    {
                        'value': 1048,
                        'name': '百度'
                    },
                    {
                        'value': 251,
                        'name': '谷歌'
                    },
                    {
                        'value': 147,
                        'name': '必应'
                    },
                    {
                        'value': 102,
                        'name': '其他'
                    }
                ]
            }
        ]
    };
    chartInstance3;

    onChart3Init(ec) {
        this.chartInstance3 = ec;
    }

    showLoadingByInstance() {
        if (this.chartInstance3) {
            this.chartInstance3.showLoading();
        }
    }

    hideLoadingByInstance() {
        if (this.chartInstance3) {
            this.chartInstance3.hideLoading();
        }
    };

    // demo4
    chartOption4 = {
        'title': {
            'text': '某地区蒸发量和降水量',
            'subtext': '纯属虚构'
        },
        'tooltip': {
            'trigger': 'axis'
        },
        'legend': {
            'data': [
                '蒸发量',
                '降水量'
            ]
        },
        'toolbox': {
            'show': true,
            'feature': {
                'dataView': {
                    'show': true,
                    'readOnly': false
                },
                'magicType': {
                    'show': true,
                    'type': [
                        'line',
                        'bar'
                    ]
                },
                'restore': {
                    'show': true
                },
                'saveAsImage': {
                    'show': true
                }
            }
        },
        'calculable': true,
        'xAxis': [
            {
                'type': 'category',
                'data': [
                    '1月',
                    '2月',
                    '3月',
                    '4月',
                    '5月',
                    '6月',
                    '7月',
                    '8月',
                    '9月',
                    '10月',
                    '11月',
                    '12月'
                ]
            }
        ],
        'yAxis': [
            {
                'type': 'value'
            }
        ],
        'series': [
            {
                'name': '蒸发量',
                'type': 'bar',
                'data': [
                    2,
                    4.9,
                    7,
                    23.2,
                    25.6,
                    76.7,
                    135.6,
                    162.2,
                    32.6,
                    20,
                    6.4,
                    3.3
                ],
                'markPoint': {
                    'data': [
                        {
                            'type': 'max',
                            'name': '最大值'
                        },
                        {
                            'type': 'min',
                            'name': '最小值'
                        }
                    ]
                },
                'markLine': {
                    'data': [
                        {
                            'type': 'average',
                            'name': '平均值'
                        }
                    ]
                }
            },
            {
                'name': '降水量',
                'type': 'bar',
                'data': [
                    2.6,
                    5.9,
                    9,
                    26.4,
                    28.7,
                    70.7,
                    175.6,
                    182.2,
                    48.7,
                    18.8,
                    6,
                    2.3
                ],
                'markPoint': {
                    'data': [
                        {
                            'name': '年最高',
                            'value': 182.2,
                            'xAxis': 7,
                            'yAxis': 183
                        },
                        {
                            'name': '年最低',
                            'value': 2.3,
                            'xAxis': 11,
                            'yAxis': 3
                        }
                    ]
                },
                'markLine': {
                    'data': [
                        {
                            'type': 'average',
                            'name': '平均值'
                        }
                    ]
                }
            }
        ]
    };

    constructor() { }

    ngOnInit() {
    }



}
