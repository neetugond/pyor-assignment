import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'

const LineChart = () => {
    const [dropdownSelect, setDropdownSelect] = useState('ethereum');
    useEffect(() => {
        fetchData(); 
    }, [dropdownSelect])
    
    const url = `https://api.coingecko.com/api/v3/coins/${dropdownSelect}/market_chart?vs_currency=usd&days=365&interval=daily`
    
    const fetchData = async () => {
       try {
           const response = await axios.get(url);
           const data = response.data.prices;
           console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="main-container">
                <div className="dropdown-main-container">
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
        </>
    )

}
export default LineChart