import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, linearGradient, stop, defs, XAxis, Tooltip, YAxis, CartesianGrid, Area } from 'recharts'
import { format } from 'date-fns'

const PriceGraph = ({ symbol }) => {

  const [historicalPrice, setHistoricalPrice] = useState([])
  const [range, setRange] = useState(260)
  const [xAxisFormat, setxAxisFormat] = useState('MMM-yyyy')

  useEffect(() => {
    const fetchData = async (symbol) => {
      const result = await axios(`http://127.0.0.1:5000/stock-price/${symbol}`)
      setHistoricalPrice(result.data)

    }
    fetchData(symbol)
  }, [])

  const rangeSelection = {
    '5D': { 'dayRange': 5, 'dateFormat': 'MMM-dd' },
    '1M': { 'dayRange': 22, 'dateFormat': 'MMM-dd' },
    '3M': { 'dayRange': 65, 'dateFormat': 'MMM-dd' },
    '6M': { 'dayRange': 130, 'dateFormat': 'MMM-yyyy' },
    '1Y': { 'dayRange': 260, 'dateFormat': 'MMM-yyyy' },
    '3Y': { 'dayRange': 780, 'dateFormat': 'yyyy' }
  }

  const statementHandler = (e) => {
    const selection = rangeSelection[e.target.id]
    if (selection !== undefined) {
      setRange(selection.dayRange)
      setxAxisFormat(selection.dateFormat)
    }
  }

  return (
    <div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons" stype="position: left" onClick={statementHandler}>
        <label className="btn btn-light">
          <input type="radio" id="5D" readOnly /> 5 days
        </label>
        <label className="btn btn-light">
          <input type="radio" id="1M" readOnly /> 1 month
        </label>
        <label className="btn btn-light">
          <input type="radio" id="3M" readOnly /> 3 months
        </label>
        <label className="btn btn-light">
          <input type="radio" id="6M" readOnly /> 6 months
        </label>
        <label className="btn btn-light active">
          <input type="radio" id="1Y" defaultChecked readOnly /> 1 year
        </label>
        <label className="btn btn-light">
          <input type="radio" id="3Y" readOnly /> 3 years
        </label>
      </div>

      <div>
        <AreaChart width={500} height={250} data={historicalPrice.slice(-range)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={timeStr => format(new Date(timeStr), xAxisFormat)}
            minTickGap={75} allowDuplicatedCategory={false} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" name="Price" dataKey="adj_close" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
          {/* <ReferenceArea x1={Date('Jan 1, 2019')} x2={Date('Jan 1, 2020')} /> */}
        </AreaChart>
      </div>
    </div >
  )
}

export default PriceGraph
