import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

import useTimeFilter from "./store/timeFilter";
import useMaxValue from './store/maxValue';

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

function TimeSlider() {
    const [chartsData, setChartsData] = useState();
    const [option, setOption] = useState({});
    const [echartsReactRef, setEchartsReactRef] = useState();

    const [timeFilterState, timeFilterActions] = useTimeFilter();
    const [maxIndexState, maxIndexActions] = useMaxValue();

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
                timeFilterActions.setStartIndex(0);
                timeFilterActions.setEndIndex(data.tt.length);
                timeFilterActions.setStartTimestamp(data.tt[0]);
                timeFilterActions.setEndTimestamp([...data.tt].pop());
                setOption({
                    title: {
                        show: false,
                        text: 'BarChart',
                        x: 'center'
                    },
                    grid: [
                        { y: '10%' }
                    ],
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
                        {
                            type: 'slider',
                        },
                        {
                            type: 'inside',
                        }
                    ],
                    series: [
                        {
                            name: 'number',
                            type: 'bar',
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
        timeFilterActions.setStartIndex(startValue);
        timeFilterActions.setEndIndex(endValue);
        timeFilterActions.setStartTimestamp(chartsData.tt[startValue]);
        timeFilterActions.setEndTimestamp(chartsData.tt[endValue]);
        // console.log(timeFilterState);
        // props.setTimeFilter([chartsData.tt[startValue], chartsData.tt[endValue]]);
    };

    useEffect(() => {
        if (JSON.stringify(option) != '{}' && echartsReactRef) {
            option.dataZoom[0].startValue = timeFilterState.startIndex;
            option.dataZoom[0].endValue = timeFilterState.endIndex;
            option.dataZoom[1].startValue = timeFilterState.startIndex;
            option.dataZoom[1].endValue = timeFilterState.endIndex;
            let echartsInstance = echartsReactRef.getEchartsInstance();
            echartsInstance.setOption(option);
            timeFilterActions.setStartTimestamp(chartsData.tt[timeFilterState.startIndex]);
            if (timeFilterState.endIndex > maxIndexState.maxIndex) {
                timeFilterActions.setEndTimestamp(chartsData.tt[chartsData.tt.length - 1]);
            } else {
                timeFilterActions.setEndTimestamp(chartsData.tt[timeFilterState.endIndex]);
            }
        }
    }, [timeFilterState.startIndex, timeFilterState.endIndex])

    // useEffect(() => {
    //     console.log(echartsReactRef)
    //     if (echartsReactRef) {
    //         let echartsInstance = echartsReactRef.getEchartsInstance();
    //         echartsInstance.on('dataZoom', dataZoom);
    //     }
    // }, [option]);

    useEffect(() => {
        if (echartsReactRef) {
            let echartsInstance = echartsReactRef.getEchartsInstance();
            echartsInstance.on('dataZoom', dataZoom);
        }
    }, [option]);

    return (
        <ReactEcharts
            option={option}
            ref={(e) => setEchartsReactRef(e)}
        />
    )

};

export default TimeSlider;