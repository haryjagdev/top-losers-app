import React from 'react'
import SortIcon from '@material-ui/icons/Sort';
import "./Stock.css"

const Header = ({ sortEquity, equityAscOrder, sortEV, EVascOrder, filterEquity }) => {

  return (
    <div>
      <div className='displayBox headingBox' >
        <p className='mediumBox heading'>Exchange</p>
        <p className='smallBox heading'>Ticker</p>
        <p className="price heading">Close Price</p>
        <p
          className="largeBox heading"
          id='equityChg'
          onClick={sortEquity}
          style={{ cursor: 'pointer' }}
        >
          % Chg (Equity) <SortIcon id='equityChg' color={filterEquity ? '' : 'disabled'} />
        </p>
        <p
          className="mediumBox heading"
          id='EVchg'
          onClick={sortEV}
          style={{ cursor: 'pointer' }}
        >
          % Chg (EV) <SortIcon id='EVchg' color={filterEquity ? 'disabled' : ''} />
        </p>
        <p className='largeBox heading'>Sector</p>
        <p className='largeBox heading'>
          Industry
        </p>
      </div>
    </div>
  )
}

export default Header