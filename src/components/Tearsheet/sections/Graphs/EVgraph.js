import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { XAxis, Tooltip, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts'
import { format } from 'date-fns'

const EVgraph = ({ symbol }) => {

  const toPercent = (decimal, fixed = 0) => {
    return `${(decimal * 100).toFixed(fixed)}%`;
  };

  const [EV, setEV] = useState([])
  const [stackOffset, setStackOffSet] = useState('expand')
  const [yAxisFormat, setyAxisFormat] = useState(() => toPercent)

  useEffect(() => {
    const fetchData = async (symbol) => {
      const result = await axios(`http://127.0.0.1:5000/historical-ev/${symbol}`)
      console.log(result.data)
      setEV(result.data)
    }
    fetchData(symbol)
  }, [])

  const DataFormater = (number, numDecimals = 0) => {

    if (Math.abs(number) > 1000000000) {
      return (number / 1000000000).toFixed(numDecimals).toString() + 'B';
    } else if (Math.abs(number) > 1000000) {
      return (number / 1000000).toFixed(numDecimals).toString() + 'M';
    } else if (Math.abs(number) > 1000) {
      return (number / 1000).toFixed(numDecimals).toString() + 'K';
    } else {
      return number.toString();
    }
  }

  const btnHandler = (e) => {
    if (e.target.id === 'value') {
      setStackOffSet('none')
      setyAxisFormat(() => DataFormater)
    } else if (e.target.id === 'percent') {
      setStackOffSet('expand')
      setyAxisFormat(() => toPercent)
    }
  }

  if (EV.length === 0) {
    return null
  }

  return (
    <div>
      <div className="btn-group btn-group-toggle" data-toggle="buttons" stype="position: left" onClick={btnHandler}>
        <label className="btn btn-light">
          <input type="radio" id="value" readOnly /> $ Value
        </label>
        <label className="btn btn-light active">
          <input type="radio" id="percent" defaultChecked readOnly /> Percent
        </label>
      </div>
      <BarChart width={500} height={250} data={EV}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }} stackOffset={stackOffset}>
        <XAxis dataKey="date" tickFormatter={dateStr => format(new Date(dateStr), 'MMM-yyyy')}
          minTickGap={40} allowDuplicatedCategory={false} />
        <YAxis type="number" tickFormatter={yAxisFormat} />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Tooltip />
        <Bar type='monotone' name='Market Cap' dataKey='mkt_cap' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Bar type='monotone' name='Net Debt' dataKey='net_debt' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
      </BarChart>
    </div>
  )
}

export default EVgraph
