import React, { useState, useEffect } from 'react';
import "../Tearsheet.css"
import axios from 'axios';


const CompanyDesc = ({ symbol }) => {
  const [desc, setDesc] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://127.0.0.1:5000/company_desc/${symbol}`)
      setDesc(result.data)
    }
    fetchData()
  }, [])

  return (
    <p className='desc'>{desc}</p>
  )
}

export default CompanyDesc