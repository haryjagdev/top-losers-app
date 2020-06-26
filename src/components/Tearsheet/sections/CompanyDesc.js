import React, { useState, useEffect } from 'react';
import "../Tearsheet.css"
import axios from 'axios';
import './sections.css'
// import ExpandLess from "@material-ui/icons/ExpandLess";

const CompanyDesc = ({ symbol }) => {
  const [desc, setDesc] = useState('')
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/company-desc/${symbol}`)
      setDesc(result.data)
    }
    fetchData()
  }, [])

  const clickHandler = () => {
    setExpand(!expand)
  }

  return (
    <div onClick={clickHandler}>
      <p className='padding10 center'><strong>Company Overview</strong></p>
      {!expand ?
        <p className='lessPadding alignLeft' style={desc.length > 250 ? { cursor: 'pointer' } : null}>{desc.slice(0, 600) + (desc.length > 250 ? '...' : '')}</p>
        :
        <p className='lessPadding alignLeft' style={desc.length > 250 ? { cursor: 'pointer' } : null}>{desc}</p>
      }
    </div>
  )
}

export default CompanyDesc