import React, { useEffect, useState, useLayoutEffect } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import test from './home-bg.jpg'

import { doc, getDoc, db, getDocs, collection } from './../../config/firebase'

const Home = () => {
  const userData = useSelector(state => state.myAuth)
  console.log(userData)
  console.log(useSelector(state => state.myAuthLoggined))

  const resturantsFromRedux =  useSelector(state => state.myResturants)

 

  const toggleStar = (e) => {
    if (e.target.className === "far fa-heart") {
      e.target.className = "fas fa-heart"

    }
    else {
      e.target.className = "far fa-heart"
    }
  }




  const [myProfileOption, setMyProfileOption] = useState('')
  const [resturants, setResturants] = useState([])

  useLayoutEffect(() => {

    (async () => {
      const querySnapshot = await getDocs(collection(db, "Resturants"))
      const resturants = []
      querySnapshot.forEach((doc) => {
        resturants.push({ id: doc.id, ...doc.data() })
      })
      console.log(resturants)
      setResturants(resturants)
    })();


  }, [])

  const resturantsToDisplay = resturantsFromRedux.map((item, index) => {
    return <div className="resturantItem" key={index} >
      <div className="resturantImageDiv"><img src={item.restImage} alt="" /></div>
      <div className="resturantName">{item.restName}
        <i className="far fa-heart" onClick={toggleStar} style={{ color: "#e21b70", fontSize: "22px", cursor: "pointer" }}></i>
      </div>
    </div>
  })



  return (
    <div style={{ width: '100%' }}>
      <div><Navbar /></div>

      <div >
        <div className="homeBg">
          <h1>Food and groceries delivery from <span className="pakBold">پاکستان</span></h1>
          <h1> <span className="pakBold">Pakistan’s</span> best restaurants and shops</h1>
          <h2 className="mealLove">The meals you love, delivered with care</h2>
        </div>
      </div>

      <div className="popularResturantsHeading">
        <h1>Popular restaurants</h1>
      </div>

      <div className="allResturants" style={{paddingTop:"20px",paddingBottom:"100px"}}>
        {resturantsToDisplay}

      </div>








    </div>
  )
}

export default Home
