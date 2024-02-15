import React from 'react'
import Customimage from './Customimage'
import { useNavigate } from 'react-router-dom'
function Herosection() {
  const images=[
    "/images/img_1.jpg",
    "/images/img_2.jpg",
    "/images/img_3.jpg",
    "/images/img_4.jpg",
    "/images/img_5.jpg",
    "/images/img_6.jpg",
    "/images/img_7.jpg",
    "/images/img_8.jpg",
    "/images/img_9.jpg"
  ]
  const navigate=useNavigate();
  return (
    <div className='section hero'>
    <div className='col typography'>
        <h1 className='title'> What Are We About</h1>
        <p className='info'>Discover a world of culinary delights with our recipe app! Unleash your inner chef as you explore a treasure trove of easy-to-follow recipes, curated for all skill levels. From quick weeknight dinners to indulgent weekend treats, our app offers a diverse collection of mouthwatering dishes.</p>
        <button className='btn' onClick={()=>navigate('/viewrecipes')}>Explore Now</button>
    </div>
    <div className='col gallery'>
      {images.map((src,index)=>( 
           <Customimage key={index} imgSrc={src} pt={"90%"} />
      ))}
      
        {/* <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/>
        <Customimage pt={"85%"}/> */}
        </div></div>
  )
}

export default Herosection