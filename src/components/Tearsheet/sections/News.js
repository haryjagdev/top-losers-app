import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./sections.css"

const News = ({ symbol, date }) => {

  const [news, setNews] = useState([])
  useEffect(() => {
    const fetchData = async () => {

      const result = await axios(`http://localhost:5000/news/${symbol}/${date}`)
      setNews(result.data)
      console.log(result.data)
    }
    fetchData();
  }, [])

  return (
    <div>
      <p className='padding10 center '><strong>Headlines</strong></p>
      {news.map((article, idx) => {
        return (
          // <p className='lessPadding' href={article.url} target="_blank" key={idx}>{article.headline.slice(0, 150)}</p>
          <p className='lessPadding alignLeft'>
            <a
              className='blackText'
              href={article.url}
              target="_blank"
            >{article.headline.slice(0, 150)}
            </a>
          </p>
        )
      })}
    </div>
  )

}

export default News