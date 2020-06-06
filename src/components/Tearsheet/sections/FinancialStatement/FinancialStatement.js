import React, { useState } from 'react'
import PL from './PL/PL'
import BS from './BS/BS'
import CF from './CF/CF'
// import Table from './Table'


const FinancialStatement = ({ symbol }) => {
  const [period, setPeriod] = useState('annual')
  const [statement, setStatement] = useState('PL')

  const periodHandler = (e) => {
    setPeriod(e.target.id)
  }

  const statementHandler = (e) => {
    setStatement(e.target.id)
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <div className="btn-group btn-group-toggle " data-toggle="buttons" onClick={statementHandler} >
              <label className="btn btn-light active">
                <input type="radio" id="PL" defaultChecked readOnly /> P&L
        </label>
              <label className="btn btn-light">
                <input type="radio" id="BS" readOnly /> BS
        </label>
              <label className="btn btn-light">
                <input type="radio" id="CF" readOnly /> CF
        </label>
            </div>
          </div>
          <div className='col-6'>
            <div className="btn-group btn-group-toggle" data-toggle="buttons" onClick={periodHandler} >
              <label className="btn btn-light active">
                <input type="radio" id="annual" checked readOnly />Annual
        </label>
              <label className="btn btn-light">
                <input type="radio" id="quarter" readOnly />Quarterly
        </label>
            </div>
          </div>
        </div>
      </div>

      {statement === 'PL' ? <PL symbol={symbol} period={period} /> : null}
      {statement === 'BS' ? <BS symbol={symbol} period={period} /> : null}
      {statement === 'CF' ? <CF symbol={symbol} period={period} /> : null}

    </div >
  )
}

export default FinancialStatement
