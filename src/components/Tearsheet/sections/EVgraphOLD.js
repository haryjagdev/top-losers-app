import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EVgraph = ({ symbol }) => {

  const [plot, setPlot] = useState()

  useEffect(() => {
    const fetchData = async (symbol) => {
      const result = await axios(`http://127.0.0.1:5000/plot_ev/${symbol}`)
      setPlot(window.Bokeh.embed.embed_item(result.data, 'evPlot' + symbol))
    }
    fetchData(symbol)
  }, [])

  return (
    <div id={'evPlot' + symbol} className='bk-root'></div>
  )
}

export default EVgraph