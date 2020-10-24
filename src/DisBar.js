import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

import useTimeFilter from "./store/timeFilter";
import useMaxValue from './store/maxValue';
import useMapEventInfo from './store/mapEventInfo';

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

function DisBar() {
    const [option, setOption] = useState({});
    const [echartsReactRef, setEchartsReactRef] = useState();

    const [mapEventInfoState, mapEventInfoActions] = useMapEventInfo();
    const clickInfo = mapEventInfoState.clickInfo;

    useEffect(() => {
        setOption({
            title: {
                show: false,
                text: 'BarChart',
                x: 'center'
            },
            legend: {
                data: ['Before', 'Inside', 'After']
            },
            grid: [
                { bottom: 20, top: 20, right: 10, left: 50 }
            ],
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: [],
                // trigger: 'axis'
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Before',
                    type: 'bar',
                    data: []
                },
                {
                    name: 'Inside',
                    type: 'bar',
                    data: []
                },
                {
                    name: 'After',
                    type: 'bar',
                    data: []
                }
            ]
        });
    }, []);

    useEffect(() => {
        if (clickInfo) {
            console.log(clickInfo);
            let content = clickInfo.object;
            let echartsInstance = echartsReactRef.getEchartsInstance();
            option.xAxis.data = [...content.till.keys()];
            option.series[0].data = [...content.till];
            option.series[1].data = [...content.inside];
            option.series[2].data = [...content.past];
            console.log(option);
            echartsInstance.setOption(option);
        }
    }, [clickInfo]);


    return (
        <ReactEcharts
            option={option}
            ref={(e) => setEchartsReactRef(e)}
        />
    )

};

export default DisBar;