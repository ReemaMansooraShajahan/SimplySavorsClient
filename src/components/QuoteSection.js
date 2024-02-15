import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
function QuoteSection() {
  return (
    <div className='sectionQuote'>
        <p className='quoteText'><FontAwesomeIcon icon={faQuoteLeft}/>I still love football, though, and I think cooking is like football. It’s not a job, it’s a passion. When you become good at it, it’s a dream job and financially you need never to worry. Ever.</p>
        <p className='author'>-Gordon Ramsay</p>
    </div>
  )
}

export default QuoteSection