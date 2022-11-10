import axios from 'axios'
import { Collapse } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Header from '../Header/Header'
import URL from '../URL/Url'
import './Itemsize.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/Actions/ItemAction'


export default function Itemsize() {
    const { state } = useLocation()
    const { itemid } = state
    const [open, setOpen] = useState(false);

    const [size, setsize] = useState([])
    const getItemSize = () => {
        const url = `${URL}itemSize/${itemid}/regular`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status == 200) {
                setsize(result)
            } else {
                toast.error("Error while loading the pizza size")
            }
        })
    }

    const [topping, settopping] = useState([])
    const getToppings = () => {
        const url = `${URL}toppings/showAll`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status == 200) {
                settopping([...result])
            } else {
                toast.error("error has occured while loading the toppings")
            }
        })
    }

    useEffect(() => {
        getItemSize()
        getToppings()
    }, [])

    function ChangeSize() {
        let change = document.getElementById("sizeChange").value
        const url = `${URL}itemSize/${itemid}/${change}`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status == 200) {
                setsize(result)
            } else {
                toast.error("failed to load the changed size pizza")
            }
        })
    }

    const dispatch = useDispatch()
    const Add2cart = (varioussize) => {
        dispatch(addToCart(varioussize))
    }

    const [counter, setCounter] = useState(1)
    const incrementCounter = () => {
        setCounter(counter + 1)
    }
    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    const [topping_Id, settoppingId] = useState('')
    const [topping_price, settoppingprice] = useState('')
    const addtopping = (thisTopping) => {
        toast.success(thisTopping.toppingName +  " Toppings Added Sucessfully"  )
        settoppingId(thisTopping.toppingId)
        settoppingprice(thisTopping.price)
    }

    const add2db = (varioussize) => {
        const sizeId = varioussize.sizeId
        const userId = sessionStorage.getItem('currentuserId')
        const quantity = counter
        const toppingId = topping_Id
        const toppingprice = topping_price
        const price = (varioussize.price + toppingprice) * quantity
        const bodywithtopping = {
            userId, sizeId, toppingId, quantity, price
        }
        const bodywithouttopping = {
            userId, sizeId, quantity, price
        }
        if (toppingId === '') {
            const url = `${URL}cart/addWithoutToppings`
            axios.post(url, bodywithouttopping,{withCredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (result.status === 'success') {
                    toast.success("Added to cart")
                    Navigate("/pizza")
                } else {
                    toast.error("Please Login to order your favourite Pizza")
                }
            })
        } else {
            const url = `${URL}cart/addWithToppings`
            axios.post(url, bodywithtopping,{withCredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (result.status === 'success') {
                    toast.success("Added to cart")
                    Navigate("/pizza")
                } else {
                    toast.error("Please Login to order your favourite Pizza")
                }
            })
        }

    }


    return (
        <div style={{ overflowX: "hidden" }} className='fixedcontent' onLoad={() => { window.scrollTo(0, 0) }}>
            <Header />
            <br />
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container' style={{ backgroundColor: "white", minHeight: "500px" }}>
                    <div>
                        {size.map((varioussize) =>
                            <div>
                                <br /><br />
                                <div>
                                    <div className="row">
                                        <div className="col">
                                            <center>
                                                <motion.img src={URL + 'itemImage/item/' + varioussize.item.itemid} alt="itemImage" className='shadow img-thumbnail' style={{ height: "380px", width: "480px", borderRadius: "10px", minWidth: "350px",marginBottom:"2%" }}
                                                    whileHover={{ scale: 1.03 }} />
                                            </center>
                                        </div>
                                        <div className="col">
                                            <div>
                                                <motion.button className='float-end addCartbtn'
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 1, backgroundColor: "rgb(255, 86, 86)" }}
                                                    onClick={() => { Add2cart(varioussize); add2db(varioussize) }}
                                                >Add To Cart</motion.button>
                                            </div>
                                            <h1>{varioussize.item.itemName} </h1>
                                            <h4 style={{ color: "gray" }}>{varioussize.item.type}</h4>
                                            <h5>Description: <br />{varioussize.item.description}</h5>
                                            <h5>Size  : {varioussize.size}</h5>
                                            <h5>Price : {varioussize.price} Rs.</h5>
                                            <hr />
                                            <h6>Other Sizes</h6>
                                            <div className="form" id=''>
                                                <div className="row">
                                                    <div className="col">
                                                        <select name="sizeChange" id="sizeChange" style={{ width: "200px" }}>
                                                            <option value="Regular">Regular</option>
                                                            <option value="small">Small</option>
                                                            <option value="large">Large</option>
                                                        </select>
                                                    </div>
                                                    <div className="col" id='buttoninComp'>
                                                        <button id='changeBtn' onClick={ChangeSize}>Select Size</button>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <h6>Quantity</h6>
                                                </div>
                                                <div className="row">

                                                    <div className="col">
                                                        <input type="number" value={counter} style={{ width: "200px" }} />
                                                    </div>

                                                    <div className="col">
                                                        <h5>
                                                            <button onClick={incrementCounter}>
                                                                +
                                                            </button>
                                                            <span style={{ margin: '10px' }}>{counter}</span>
                                                            <button onClick={decrementCounter} >
                                                                -
                                                            </button>
                                                        </h5>
                                                    </div>

                                                </div>
                                            </div>
                                            <span><p><b>Note:</b> Only one topping can be added</p></span>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                            </div>
                        )}
                    </div>
                    <div className=''>
                        <center>
                            <Button
                                className='collapseBtn'
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                <h5>Add Topping</h5>
                            </Button>
                        </center>
                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <hr />
                                <div className="row toppingRow">
                                    <div className="col">
                                        <h6>Topping Image</h6>
                                    </div>
                                    <div className="col">
                                        <h6>Topping Name</h6>
                                    </div>
                                    <div className="col">
                                        <h6>price (Rs)</h6>
                                    </div>
                                    <div className="col">
                                        <h6>Add🍕</h6>
                                    </div>
                                </div>
                                <hr />
                                {topping.map((thisTopping) =>
                                    <div>
                                        <div className="row toppingRow" id='toppingSelected'>
                                            <div className="col">
                                                <img src={URL + 'toppingImages/attachment/' + thisTopping.toppingId} alt="" />
                                            </div>
                                            <div className="col">
                                                {thisTopping.toppingName}
                                            </div>
                                            <div className="col">
                                                {thisTopping.price} Rs
                                            </div>
                                            <div className="col">
                                                <button className='btn btn-link addLink' id={thisTopping.toppingId}
                                                    onClick={() => { addtopping(thisTopping) }}
                                                >Add</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Collapse>
                    </div> <br />
                </div> <br />
            </div>
        </div>
    )
}