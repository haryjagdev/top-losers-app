import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Multiples = ({ symbol }) => {
  const [ev, setEV] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://127.0.0.1:5000/ev_ebitda/${symbol}`)
      setEV(result.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <p>TEST</p>
      <p>Industry: {ev.industry_group}</p>
      <p>Company EV/EBITDA: {ev.company_ev_ebitda}</p>
      <p>Industry EV/EBITDA: {ev.sector_ev_ebitda}</p>
    </div>
  )

}

export default Multiples