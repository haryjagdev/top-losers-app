import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import { format } from 'date-fns'

const Table = ({ symbol, period }) => {

  const [financialData, setFinData] = useState([])
  const [units, setUnits] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://127.0.0.1:5000/balance-sheet/${symbol}?period=${period}&numOfPeriods=4`)
      setFinData(result.data.data)
      setUnits(result.data.units)
    }
    fetchData()
  }, [period, symbol])

  const rows = [
    'Cash and cash equivalents',
    'Short-term investments',
    'Receivables',
    'Inventories',
    'Total current assets',
    'Property, Plant & Equipment Net',
    'Goodwill and Intangible Assets',
    'Long-term investments',
    'Total non-current assets',
    'Total assets',
    'Payables',
    'Short-term debt',
    'Total current liabilities',
    'Long-term debt',
    'Total debt',
    'Total non-current liabilities',
    'Total liabilities',
    'Other comprehensive income',
    'Retained earnings (deficit)',
    'Total shareholders equity',
  ]

  const checkIfLineitemZero = (ls, lineItem) => {
    return ls.reduce((acc, cur) => acc + Math.abs(cur[lineItem]), 0) === 0
  }

  if (financialData === null || financialData === undefined) {
    return null;
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th></th>
          <th colSpan={financialData.length}>Period End (<i>{units}</i>)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th></th>
          {financialData.map((periodData, idx) => (
            <th key={idx}>{
              format(new Date(periodData.date), 'MMM-yyyy')}</th>
          ))}
        </tr>

        {rows.map((lineItem, idx) => (
          !checkIfLineitemZero(financialData, lineItem) ?
            <tr key={idx}>
              <th key={lineItem}>{lineItem}</th>
              {financialData.map((periodData, idx) => {
                if ((lineItem.slice(-1) === '%' || lineItem === 'EBITDA Margin') && periodData[lineItem] !== null) {
                  return <td key={idx}>{periodData[lineItem].toFixed(1)}%</td>
                }
                return <td key={idx}><NumberFormat value={periodData[lineItem]} displayType={'text'} thousandSeparator={true} /></td>
              })}
            </tr> : null
        ))}
      </tbody>
    </table>
  )

}

export default Table
