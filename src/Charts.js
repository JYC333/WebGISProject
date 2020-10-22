import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

function Charts(props) {
    const [chartsData, setChartsData] = useState();
    const [option, setOption] = useState({});
    const [echartsReactRef, setEchartsReactRef] = useState();

    useEffect(() => {
        fetch('http://localhost:9000/chartsData', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        })
            .then(res => res.json())
            .then(data => {
                setChartsData(data);
                props.setTimeFilter([data.tt[0], [...data.tt].pop()]);
                setOption({
                    title: {
                        text: 'BarChart',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        data: data.date_text,
                        // trigger: 'axis'
                    },
                    yAxis: {
                        type: 'value'
                    },
                    dataZoom: [
                        {   // 这个dataZoom组件，默认控制x轴。
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            // startValue: 1,      // 左边在 10% 的位置。
                            // endValue: 5         // 右边在 60% 的位置。
                        },
                        {   // 这个dataZoom组件，也控制x轴。
                            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                            // startValue: 6,      // 左边在 10% 的位置。
                            // endValue: 18         // 右边在 60% 的位置。
                        }
                    ],
                    series: [
                        {
                            name: 'number',
                            type: 'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                            data: data.cc
                        }
                    ]
                });
            });
    }, []);

    function dataZoom() {
        let echartsInstance = echartsReactRef.getEchartsInstance();
        let startValue = echartsInstance.getOption().dataZoom[0].startValue;
        let endValue = echartsInstance.getOption().dataZoom[0].endValue;
        // console.log(startValue, endValue);
        props.setTimeFilter([chartsData.tt[startValue], chartsData.tt[endValue]]);
    };

    useEffect(() => {
        if (echartsReactRef) {
            let echartsInstance = echartsReactRef.getEchartsInstance();
            echartsInstance.on('dataZoom',dataZoom);
        }
    },[option]);

    return (
        <ReactEcharts
            option={option}
            ref={(e) => setEchartsReactRef(e)}
        />
    )

};

export default Charts;