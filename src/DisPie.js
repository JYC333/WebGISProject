import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

import useMapEventInfo from './store/mapEventInfo';

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

function DisPie() {
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
                data: ['Before', 'Inside', 'After'],
                left: 'left',
                orient: 'vertical'
            },
            grid: [
                { bottom: 20, top: 20 }
            ],
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    name: 'Average Dis',
                    type: 'pie',
                    data: [
                        { value: 10, name: 'Before' },
                        { value: 10, name: 'Inside' },
                        { value: 10, name: 'After' }
                    ]
                }
            ]
        });
    }, []);

    useEffect(() => {
        if (clickInfo) {
            console.log(clickInfo);
            let content = clickInfo.object;
            let echartsInstance = echartsReactRef.getEchartsInstance();

            if (content.till.length !== 0) {
                option.series[0].data[0].value = content.till.reduce((previous, current) => current += previous) / content.till.length;
            } else {
                option.series[0].data[0].value = 0;
            }

            if (content.inside.length !== 0) {
                option.series[0].data[1].value = content.inside.reduce((previous, current) => current += previous) / content.inside.length;
            } else {
                option.series[0].data[1].value = 0;
            }

            if (content.past.length !== 0) {
                option.series[0].data[2].value = content.past.reduce((previous, current) => current += previous) / content.past.length;
            } else {
                option.series[0].data[2].value = 0;
            }

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

export default DisPie;