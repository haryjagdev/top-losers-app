import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Tearsheet.css'

import CompanyDesc from "./sections/CompanyDesc"
import EVgraph from './sections/Graphs/EVgraph'
// import PriceGraph from './sections/PriceGraph'
import GraphPrice from './sections/Graphs/GraphPrice'
import FinancialStatement from './sections/FinancialStatement/FinancialStatement'
import CapitalStructure from './sections/CapitalStructure'
// import Multiples from './sections/Multiples'


const Tearsheet = ({ symbol, companyName }) => {
  const [desc, setDesc] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://127.0.0.1:5000/company_desc/${symbol}`)
      setDesc(result.data)
    }
    fetchData()
  }, [])


  return (
    <div className='tearsheet'>

      <div className='leftside'>
        <h4 className='sectionheader'>{companyName}</h4>
        <CompanyDesc symbol={symbol} />
        <CapitalStructure symbol={symbol} />

        <FinancialStatement symbol={symbol} />

        {/* <PL symbol={symbol} />
        <BS symbol={symbol} /> */}
      </div>

      <div className='rightside'>
        <div className='verticalSpace'></div>
        <GraphPrice symbol={symbol} />
        <div className='verticalSpace'></div>
        <EVgraph symbol={symbol} />
      </div>
    </div>
  )
}

export default Tearsheet