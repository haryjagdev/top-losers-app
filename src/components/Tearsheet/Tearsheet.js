import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Tearsheet.css'

import CompanyDesc from "./sections/CompanyDesc"
import EVgraph from './sections/Graphs/EVgraph'
import GraphPrice from './sections/Graphs/GraphPrice'
import FinancialStatement from './sections/FinancialStatement/FinancialStatement'
import CapitalStructure from './sections/CapitalStructure'
import News from './sections/News'

const Tearsheet = ({ symbol, companyName, date }) => {

  return (
    <div className='tearsheet'>

      {/* <div className='leftside'> */}
      {/* <CompanyDesc symbol={symbol} /> */}
      {/* <CapitalStructure symbol={symbol} /> */}
      {/* <FinancialStatement symbol={symbol} /> */}

      {/* </div>
      <div className='rightside'>
        <News symbol={symbol} date={date} />
        <div className='verticalSpace'></div>
        <GraphPrice symbol={symbol} />
        <div className='verticalSpace'></div>
        <EVgraph symbol={symbol} />
      </div> */}

      <div className='row'>
        <div className='column leftside'>
          <CompanyDesc symbol={symbol} />
        </div>
        <div className='column rightside'>
          <News symbol={symbol} date={date} />

        </div>
      </div>

      <div className='seperate'></div>

      <div className='row'>
        <div className='column leftside'>
          <FinancialStatement symbol={symbol} />
        </div>
        <div className='column rightside'>
          {/* <div className='verticalSpace'></div> */}
          <GraphPrice symbol={symbol} />
          {/* <div className='verticalSpace'></div> */}
          <EVgraph symbol={symbol} />
        </div>
      </div>
    </div>
  )
}

export default Tearsheet