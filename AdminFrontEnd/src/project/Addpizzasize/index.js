
import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { PIZZAHOST } from '../../config'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from '../Home'
import { useLocation } from 'react-router'

const Addpizzasize = () => {

    const {state} = useLocation()
    const {itemid, pizza} = state

    
    console.log(itemid)
    const [itemId, setitemid] = useState("")
    const [size, setsize] = useState("")
    const [price, setprice] = useState("0.0")

    const url = `${PIZZAHOST}/item/latest`

    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setitemid(itemid)

        console.log(itemid)

    }, [])

    // const getProducts = () => {
    //     axios.get(url, { withCredentials: true }).then((response) => {
    //         const result = response.data

    //         if (response.status === 201) {
    //             setProducts([result])
    //         }
    //         //   if (result['status'] == 'success') {
    //         //     setProducts(result['data'])
    //         //     const { itemId  } = result['data']

    //         //       }
    //     })
    // }
    const ColoredLine = (color) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3
            }}
        />
    );
    function addpizzasize() {
        // if (itemid === "")
        //     alert("Enter itemid")
        // else if (size === "")
        //     alert("Enter pizza size")
        // else if (price === "")
        //     alert("Enter pizza price")
        // else {
            const body = {
                itemId,
                size,
                price,

            }


            const url = `${PIZZAHOST}/itemSize/addItemSize`

            axios.post(url, body, { withCredentials: true }).then((response) => {
                const result = response.data
                console.log(result)

                if (response.status === 201) {
                    toast.success('pizza size and price Added successfully')
                    navigate('/editpizza', { state: { itemId: itemId, pizza: pizza } })
                }

            })



        // }
    }




    return (
        <>
            <Home />
            <div className="outerdiv-emp-form">

                {/* {products.map((product,i) => {
                    return (
                        <p  key={i}> */}
                            <p>item_id: {itemId}</p>
                            

                            <ColoredLine color="black" />


                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter item id</label>
                                <br />
                                <input type="text" value = {itemId} className="form-control form-control-sm" id="exampleFormControlInput1" readOnly="readonly"/>
                                {/* onChange={(e) => setitemid(e.target.value)} */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter item size</label>
                                <br />
                                <select className="form-select form-select-sm" onChange={(e) => setsize(e.target.value)} aria-label="Default select example">
                                    <option>choose Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Large">Large</option>
                                    <option value="200ml">200ml</option>
                                    <option value="500ml">500ml</option>
                                    <option value="750ml">750ml</option>
                                </select>
                                {/* <input type="text" value={size} onChange={(e) => setsize(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza size" /> */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter item price</label>
                                <br />
                                <input type="number" value={price} onChange={(e) => setprice(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza price" />
                            </div>
                            {/* <h5><b>Add Pizza Image</b></h5>
                <Pizzaimage /> */}
                <br /> 
                            <button type="button" onClick={addpizzasize} className="btn btn-sm btn-success  mx-3">Add</button>
                            <button onClick={() => (navigate('/showallpizza'))} className="btn btn-sm btn-primary mx-3">Add Image</button>
                            <button onClick={() => (navigate('/editpizza', { state: { itemId: itemId , pizza : pizza} }))} className="btn btn-sm btn-danger mx-3 ">cancel</button>
                        {/* </p> , { state: { itemId: itemId } }

                    )
                })} */}
            </div>

        </>

    )

}
export default Addpizzasize;