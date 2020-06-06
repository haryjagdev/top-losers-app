import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PriceGraph = ({ symbol }) => {

  const [plot, setPlot] = useState()

  useEffect(() => {
    const fetchData = async (symbol) => {
      const result = await axios(`http://127.0.0.1:5000/plot_price/${symbol}`)
      // const result = await axios(`http://127.0.0.1:5000/plot_price`)
      // console.log(result.data)
      setPlot(result.data)
      setPlot(window.Bokeh.embed.embed_item(result.data, 'pricePlot' + symbol))
    }
    fetchData(symbol)
  }, [])

  return (
    <div>
      <div id={'pricePlot' + symbol} className='bk-root'></div>
    </div>
  )
}

export default PriceGraph
