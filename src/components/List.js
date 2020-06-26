import React, { useState, useEffect } from 'react';
import Stock from './Stock'
import axios from 'axios'

import Header from './Header'

const List = () => {
  const [topLosers, setTopLosers] = useState([])
  const [date, setDate] = useState('')
  const [display, setDispaly] = useState('')
  const [equityAscOrder, setEquityAscOrder] = useState(true);
  const [EVascOrder, setEVascOrder] = useState(false);
  const [filterEquity, setFilterEquity] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/top-losers");
      // console.log(result.data.data)
      setTopLosers(result.data.data)
      setDate(result.data.date)
      setDispaly(result.data.data.map((stock, idx) => (
        <Stock key={idx} stock={stock} />)))
    }
    fetchData()
  }, [])

  const sortDict = (dict, col, asc = true) => {
    let sorted;
    if (asc) {
      sorted = dict.sort((a, b) => {
        return (a[col] < b[col]) ? 1 : -1
      })
    } else {
      sorted = dict.sort((a, b) => {
        return (a[col] > b[col]) ? 1 : -1
      })
    }
    return sorted
  }

  const sortEquityHandler = () => {
    const val = sortDict(topLosers, 'pct_chg', equityAscOrder)
    setTopLosers(val)
    setEquityAscOrder(!equityAscOrder);
    setEVascOrder(false);
    setFilterEquity(true);
    const show = topLosers.map((stock, idx) => (
      <Stock key={idx} stock={stock} />))
    setDispaly(show)
  }

  const sortEVHandler = () => {
    const val = sortDict(topLosers, 'ev_pct_chg', EVascOrder)
    setTopLosers(val)
    setEVascOrder(!EVascOrder);
    setEquityAscOrder(false);
    setFilterEquity(false);
    const show = topLosers.map((stock, idx) => (
      <Stock key={idx} stock={stock} />))
    setDispaly(show)
  }

  return (
    <div>
      <h2>Top Losers</h2>
      <h5>{date}</h5>
      <Header sortEquity={sortEquityHandler} sortEV={sortEVHandler} filterEquity={filterEquity} />
      {display}
    </div>
  )
}

export default List