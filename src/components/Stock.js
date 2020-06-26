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
    mkt_cap: mktCap,
    ev_pct_chg: evPctChg,
    enterprise_value: ev,
    sector,
    industry,
    date
  } = stock

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

  const [displayDetails, setDisplayDetails] = useState(false)

  const showTearsheet = () => setDisplayDetails(!displayDetails)

  return (
    <div>
      <div className='displayBox' onClick={showTearsheet} style={{ cursor: 'pointer' }}>
        <p className="mediumBox">{exchange}</p>
        <div className='smallBox'>
          <a
            href={`http://www.google.com/search?q=${companyName}+stock`}
            target="_blank"
          >{symbol}
          </a>
        </div>

        <p className="mediumBox">{price.toFixed(2)}</p>
        <p className="mediumBox redText">{pctChg.toFixed(0)}%</p>
        <p className="mediumBox">{mktCap !== null ? DataFormater(mktCap, 1) : null}</p>
        <p className="mediumBox redText">
          {evPctChg !== null ? evPctChg.toFixed(0) : null}%
        </p>
        <p className="smallBox">{ev !== null ? DataFormater(ev, 1) : null}</p>
        <p className='largeBox'>{sector}</p>
        <p className='largeBox'>
          {industry}
        </p>
      </div>
      {displayDetails && <Tearsheet symbol={symbol} companyName={companyName} date={date} />}
    </div>
  )
}

export default Stock