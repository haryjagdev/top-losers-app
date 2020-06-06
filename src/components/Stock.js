import React, { useState } from 'react'
import "./Stock.css"
import Tearsheet from './Tearsheet/Tearsheet'

const Stock = ({ stock }) => {
  const {
    exchange,
    symbol,
    company_name: companyName,
    price,
    pct_chg: pctChg,
    ev_pct_chg: evPctChg,
    sector,
    industry
  } = stock

  const [displayDetails, setDisplayDetails] = useState(false)

  const showTearsheet = () => setDisplayDetails(!displayDetails)

  return (
    <div>
      <div className='displayBox' onClick={showTearsheet}>
        <p className="mediumBox">{exchange}</p>
        <div className='smallBox'>
          <a
            href={`http://www.google.com/search?q=${companyName}+stock`}
            target="_blank"
          >{symbol}
          </a>
        </div>

        <p className="mediumBox">{price.toFixed(2)}</p>
        <p className="largeBox redText">{pctChg.toFixed(0)}%</p>

        <p className="mediumBox redText">
          {evPctChg !== null ? evPctChg.toFixed(0) : null}%
        </p>
        <p className='largeBox'>{sector}</p>
        <p className='largeBox'>
          {industry}
        </p>
      </div>
      {displayDetails && <Tearsheet symbol={symbol} companyName={companyName} />}
    </div>
  )
}

export default Stock