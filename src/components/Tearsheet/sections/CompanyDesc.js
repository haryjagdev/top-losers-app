import React, { useState, useEffect } from 'react';
import "../Tearsheet.css"
import axios from 'axios';
import ExpandLess from "@material-ui/icons/ExpandLess";

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
      {!expand ?
        <p className='desc'>{desc.slice(0, 250) + (desc.length < 250 ? '' : "...")}</p>
        :
        <p className='desc'>{desc}</p>
      }
    </div>
  )
}

export default CompanyDesc