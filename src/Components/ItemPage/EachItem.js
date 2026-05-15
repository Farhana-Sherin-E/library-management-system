import React, { useEffect, useState } from 'react'
import './item.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const EachItem = () => {

  const {id} = useParams()
  const [eachItem,setEachItem] = useState()
  console.log(eachItem)
  useEffect(()=>{

    const fetchEachItem=async()=>{
      try{

        const response = await axios.get(`http://localhost:8080/items/${id}`)
        setEachItem(response.data.split(","))

      }
      catch(err){
        console.log(err)
      }
    }
    fetchEachItem()

  },[id])

  return (
    <div className='each-item' style={{height:'100vh',padding:"40px 80px"}}>
      {eachItem &&<div className='each' style={{width:"fit-content",display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',gap:'2rem'}}>
          <div style={{width:"fit-content"}}>
            <img src={eachItem[3].split("<>")[1]} alt='img' height="200px" width="300px" style={{objectFit:"cover"}}/>
          </div>
          <div>
            <p>{eachItem[1].split(":")[1]}</p>
            <p>{eachItem[2].split(":")[1]}</p>
          </div>
          
        </div>}
    </div>
  )
}

export default EachItem
