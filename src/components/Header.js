import React from 'react'
import SortIcon from '@material-ui/icons/Sort';
import "./Stock.css"

const Header = ({ sortEquity, sortEV, filterEquity }) => {

  return (
    <div>
      <div className='displayBox headingBox' >
        <p className='mediumBox heading'>Exchange</p>
        <p className='smallBox heading'>Ticker</p>
        <p className="price heading">Close Price</p>
        <p
          className="mediumBox heading"
          id='equityChg'
          onClick={sortEquity}
          style={{ cursor: 'pointer' }}
        >
          % Chg <SortIcon id='equityChg' color={filterEquity ? '' : 'disabled'} />
        </p>

        <p className="mediumBox heading">Market Cap</p>
        <p
          className="mediumBox heading"
          id='EVchg'
          onClick={sortEV}
          style={{ cursor: 'pointer' }}
        >
          % Chg (EV) <SortIcon id='EVchg' color={filterEquity ? 'disabled' : ''} />
        </p>

        <p className="smallBox heading">EV</p>

        <p className='largeBox heading'>Sector</p>
        <p className='largeBox heading'>
          Industry
        </p>
      </div>
    </div>
  )
}

export default Header