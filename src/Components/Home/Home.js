import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './home.css'
function Home() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate()
    const [name,setName] = useState()
    const [desc,setDesc] = useState()
    const [img,setImg] = useState()
    console.log(items)
    useEffect(()=>{

      const fetchAllItems=async()=>{

        try{
          const response = await axios.get("http://localhost:8080/items")
          console.log(response.data)
          const array = response.data && response.data.trim().split('\n').map(line => line.split(': '));
          setItems(array)
        }
        catch(err){
          console.log(err)
        }

      }
      fetchAllItems()

    },[])

    const handleAddItem=async()=>{

      try{
        const itemname =  encodeURIComponent(name)
        const description =  encodeURIComponent(desc)
        const itemImage =  encodeURIComponent(img)

        const response = await axios.post(`http://localhost:8080/additems?name=${itemname}&description=${description}&image=${itemImage}`)
        window.location.reload()

      }
      catch(err){
        console.log(err)
      }

    }

    return (
            <div className="App" style={{padding:"20px 20px",display:'flex',flexDirection:'column',justifyContent:'center',gap:"1rem"}}>
              <div>
                <h1 style={{textAlign:'center'}}>Library</h1>
                {items && <ul style={{display:'grid',gridTemplateColumns:"1fr 1fr 1fr",justifyContent:'space-between',gap:'2rem'}}>
                    {items.map(item => (
                        <div style={{display:"flex",flexDirection:'column',width:"25vw",gap:'1rem',margin:"40px 0",borderRadius:"20px",cursor:"pointer"}} key={item} onClick={()=>navigate(`/item/${item[0]}`)} className='list'>
                          {/* <p>{item[0]}</p> */}
                          <img src={item[3]} height="200px" style={{borderRadius:"20px 20px 0 0",objectFit:'cover'}}/>
                          <div>
                            <p>{item[1]}</p>
                            <p style={{padding:"10px 40px"}}>{item[2].slice(0,75)}{item[2].length>75 && "...."}</p>
                          </div>
                        </div>
                    ))}
                </ul>}</div>
                <div style={{}}>
                <div>
                  <div>
                    <label>
                      <input type='text' value={name} placeholder='Name of item' onChange={(e)=>setName(e.target.value)}></input>
                      
                    </label>
                  </div>
                  <br></br>
                  <div>
                    <label>
                      <input type='text' value={desc} placeholder='Description of item' onChange={(e)=>setDesc(e.target.value)}></input>
                    
                    </label>
                  </div>
                  <br></br>
                  <div>
                    <label>
                      <input type='text' value={img} placeholder='Image of item' onChange={(e)=>setImg(e.target.value)}></input>
                      
                    </label>
                  </div>
                </div>
                <button className='add-btn' onClick={handleAddItem}>Add items</button></div>
            </div>
    );
}

export default Home;
