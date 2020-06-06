import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NumberFormat from 'react-number-format'

const CapitalStructure = ({ symbol }) => {

  const [ev, setEV] = useState([])
  const [units, setUnits] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://127.0.0.1:5000/enterprise-value/${symbol}`)
      console.log(result.data.data)
      setEV(result.data.data[0])
      setUnits(result.data.units)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h4>Capital Structure {units}</h4>
      <p>Cash: <NumberFormat value={ev.cash_and_cash_equivalents} displayType={'text'} thousandSeparator={true} /></p>
      <p>Total Debt: <NumberFormat value={ev.total_debt} displayType={'text'} thousandSeparator={true} /></p>
      <p>Market Capital: <NumberFormat value={ev.cash_and_cash_equivalents + ev.total_debt} displayType={'text'} thousandSeparator={true} /></p>
      <p>Total Debt: <NumberFormat value={ev.total_debt} displayType={'text'} thousandSeparator={true} /></p>
    </div>
  )
}

export default CapitalStructure


  // < NumberFormat value = { periodData[lineItem]} displayType = { 'text'} thousandSeparator = { true} />