import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Header from '../Header/Header'
import URL from '../URL/Url'
import './Payments.css'

export default function Payments(props) {
    const { state } = useLocation()
    const { totalPay } = state
    const navigate = useNavigate()

    const [fullName, setfullName] = useState('')
    const [cardNumber, setcardNumber] = useState('')
    const [expiry, setexpiry] = useState('')
    const [cvv, setcvv] = useState('')

    const { currentuserId } = sessionStorage
    const [addresspay, setAddresspay] = useState([])
    const getAddress = () => {
        const url = `${URL}address/getaddress/${currentuserId}`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status == 201) {
                setAddresspay(result)
            } else {
                toast.error(result['error'])
            }
        })
    }

    useEffect(() => {
        getAddress()
    }, [])

    const [addresspayId, setAddresspayId] = useState([])
    const selectedAddress = (add) => {
        setAddresspayId(add.addressId)
        toast.success("Address added successfully")
    }

    const userId = sessionStorage.getItem("currentuserId")
    const paymentDone = () => {
        if (addresspayId.length == 0) {
            toast.error("Select address for Delivery")
        } else if (fullName.length === 0) {
            toast.error("Invalid full Name")
        } else if (cardNumber.length !== 16) {
            toast.error("Invalid card Number")
        } else if (expiry.length !== 7) {
            toast.error("Invalid expiry date of your card")
        } else if (cvv.length !== 3) {
            toast.error("Invalid CVV")
        } else {
            const url = `${URL}payment/addPayment`
            const body = { userId, addresspayId }
            axios.post(url, body,{withCredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (response.status == 200) {
                    toast.success("Payment Completed")
                }
                else{
                    toast.error("Payment Gateway is Busy !!! Try After some time")
                }
            })
            console.log("it works")
            const url2 = `${URL}cart/updateCartStatus/${currentuserId}`
           // const body2 = { userId }
            axios.patch(url2,{withcredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (result.status === 'success') {
                    toast.success('Order some more Pizzas')
                    navigate('/pizza')
                }
                else{
                    toast.error("Please update your email")
                }
            })
        }

    }


    return (
        <div onLoad={() => { window.scrollTo(0, 0) }}>
            <Header />
            <br />
            <div className="container p-0 fixedcontent">
                <br /><br />
                <div className="payDetail">
                    <h4>Enter Your Payments Details</h4> <hr />
                    <div className="row">
                        <div className="col payaddresscontainer">
                            <center><h3>Select Address for Delivery</h3></center>
                            {addresspay.map((add) =>
                                <> <br />
                                    <div className='address-box'>
                                        <div className='address' style={{ backgroundColor: "rgb(243, 234, 234" }}>
                                            {add.plotNo}, {add.streetName}, {add.city}, {add.district}, {add.soverignState} - {add.pincode} <br />
                                            <motion.button className='float-end thisAddress' onClick={() => (selectedAddress(add))}
                                                whileHover={{scale:1.03,backgroundColor:"blanchedalmond"}}
                                                whileTap={{scale:1}}
                                            >Delivery to this Address</motion.button>
                                            <br />
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )}
                        </div>
                        <div className="col">
                            <button className='btn btn-link float-end cancelLink' onClick={() => (navigate('/cart'))}>cancel order and go back to website</button> <br /><br />
                            <div className='payContainer shadow-lg'>
                                <div className="form">
                                    <div className="mb-3">
                                        <label htmlFor="" className="label-control">Enter Full Name</label>
                                        <input onChange={(e) => {
                                            setfullName(e.target.value)
                                        }}
                                            type="text" className="form-control shadow-sm" placeholder='John Smith' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="label-control">Enter Card Number</label>
                                        <input onChange={(e) => {
                                            setcardNumber(e.target.value)
                                        }}
                                            type="number" className="form-control shadow-sm" placeholder='1234-1234-134-1234' />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="" className="label-control">Expiry of Card</label>
                                            <input onChange={(e) => {
                                                setexpiry(e.target.value)
                                            }}
                                                type="text" className="form-control shadow-sm" placeholder='MM/YYYY' />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="" className="label-control">Enter CVV</label>
                                            <input onChange={(e) => {
                                                setcvv(e.target.value)
                                            }}
                                                type="password" className="form-control shadow-sm" placeholder='***' />
                                        </div>
                                    </div> <br />
                                    <div>
                                        <button className='finalPay' onClick={paymentDone}>Pay {totalPay}  Rs</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}


{/* <div className="row">
    <div className="col">
        <div className='payContainer shadow-lg'>
            <div className="form">
                <div className="mb-3">
                    <label htmlFor="" className="label-control">Enter Full Name</label>
                    <input onChange={(e) => {
                        setfullName(e.target.value)
                    }}
                        type="text" className="form-control shadow-sm" placeholder='John Smith' />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="label-control">Enter Card Number</label>
                    <input onChange={(e) => {
                        setcardNumber(e.target.value)
                    }}
                        type="number" className="form-control shadow-sm" placeholder='1234-1234-134-1234' />
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="" className="label-control">Expiry of Card</label>
                        <input onChange={(e) => {
                            setexpiry(e.target.value)
                        }}
                            type="text" className="form-control shadow-sm" placeholder='MM/YYYY' />
                    </div>
                    <div className="col">
                        <label htmlFor="" className="label-control">Enter CVV</label>
                        <input onChange={(e) => {
                            setcvv(e.target.value)
                        }}
                            type="password" className="form-control shadow-sm" placeholder='***' />
                    </div>
                </div> <br />
                <div>
                    <button className='finalPay' onClick={paymentDone}>Pay {totalPay}  Rs</button>
                </div>
            </div>
        </div>
    </div>
    <div className="col">
        <div>
            {addresspay.map((add) =>
                <div className=''>
                    <div className='address-box'>
                        <div className='address' style={{ backgroundColor: "rgb(243, 234, 234" }}>
                            {add.plotNo}, {add.streetName}, {add.city}, {add.district}, {add.soverignState} - {add.pincode} <br />
                            <button className='float-end delete' onClick={() => (selectedAddress(add))}>Delivery to this Address</button>
                            <br />
                        </div>
                    </div>
                    <br />
                </div>
            )}
        </div>
    </div>
</div>

 */}
