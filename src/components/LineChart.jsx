import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'
import './style.css'

const LineChart = () => {
    const [dropdownSelect, setDropdownSelect] = useState('ethereum');
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        fetchData();
    }, [dropdownSelect])

    const url = `https://api.coingecko.com/api/v3/coins/${dropdownSelect}/market_chart?vs_currency=usd&days=365&interval=daily`

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            const data = response.data.prices;
            setChartData(data.slice(0, 100))
            //    console.log(data)
            lineChart(data)

        } catch (error) {
            console.log(error)
        }
    }
    const lineChart = (data) => {
        const chartElement = document.getElementById('lineChartMainDiv');
        const chart = echarts.init(chartElement, 'dark')
        const option = {
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "time",
                boundaryGap: false,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    areaStyle: {},
                    type: "line",
                    data: data.map(([timestamp, value]) => ({
                        name: new Date(timestamp).toLocaleDateString(),
                        value: [timestamp, value],
                    })),
                },
            ],
        };
        chart.setOption(option)
    }
    return (
        <>
            <div className="main-container">
                <div className="dropdown-main-container">
                    <div className="dropdown-subcontainer">
                        <select className='dropdown-select' value={dropdownSelect} onChange={(e) => setDropdownSelect(e.target.value)}>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="filecoin">Filecoin</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="dogecoin">Dogecoin</option>
                            <option value="solana">Solana</option>
                            <option value="arbitrum">Arbitrum</option>
                            <option value="optimism">Optimism</option>
                        </select>
                    </div>
                </div>
                <div className="text-main-div">
                    <div className='circle-div'></div>
                    <h4> Monthly Active Addresses</h4>
                </div>

                <div id="lineChartMainDiv" className="chartContainer"
                    style={{ width: '100wh', height: '500px' }}>

                </div>
            </div>
        </>
    )

}
export default LineChart