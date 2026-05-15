import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {

        const fetchAllItems = async () => {

            try {

                const response = await axios.get("http://localhost:5000/books");

                console.log(response.data);

                setItems(response.data);

            }
            catch (err) {

                console.log(err);

            }

        };

        fetchAllItems();

    }, []);

    const handleAddItem = async () => {

        try {

            await axios.post("http://localhost:5000/books", {
                title: name,
                author: desc,
                image: img
            });

            alert("Book Added Successfully");

            window.location.reload();

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div
            className="App"
            style={{
                padding: "20px 20px",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: "1rem"
            }}
        >

            <div>

                <h1 style={{ textAlign: 'center' }}>Library</h1>

                {
                    items &&
                    <ul
                        style={{
                            display: 'grid',
                            gridTemplateColumns: "1fr 1fr 1fr",
                            justifyContent: 'space-between',
                            gap: '2rem',
                            listStyle: 'none'
                        }}
                    >

                        {
                            items.map((item) => (

                                <div
                                    key={item._id}

                                    onClick={() => navigate(`/item/${item._id}`)}

                                    className='list'

                                    style={{
                                        display: "flex",
                                        flexDirection: 'column',
                                        width: "25vw",
                                        gap: '1rem',
                                        margin: "40px 0",
                                        borderRadius: "20px",
                                        cursor: "pointer"
                                    }}
                                >

                                    <img
                                        src={item.image}
                                        alt="Book"
                                        height="200px"

                                        style={{
                                            borderRadius: "20px 20px 0 0",
                                            objectFit: 'cover'
                                        }}
                                    />

                                    <div>

                                        <p>{item.title}</p>

                                        <p style={{ padding: "10px 40px" }}>

                                            {item.author?.slice(0, 75)}

                                            {item.author?.length > 75 && "...."}

                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </ul>
                }

            </div>

            <div>

                <div>

                    <div>

                        <label>

                            <input
                                type='text'
                                value={name}
                                placeholder='Name of item'
                                onChange={(e) => setName(e.target.value)}
                            />

                        </label>

                    </div>

                    <br />

                    <div>

                        <label>

                            <input
                                type='text'
                                value={desc}
                                placeholder='Description of item'
                                onChange={(e) => setDesc(e.target.value)}
                            />

                        </label>

                    </div>

                    <br />

                    <div>

                        <label>

                            <input
                                type='text'
                                value={img}
                                placeholder='Image URL'
                                onChange={(e) => setImg(e.target.value)}
                            />

                        </label>

                    </div>

                </div>

                <button
                    className='add-btn'
                    onClick={handleAddItem}
                >
                    Add items
                </button>

            </div>

        </div>

    );

}

export default Home;