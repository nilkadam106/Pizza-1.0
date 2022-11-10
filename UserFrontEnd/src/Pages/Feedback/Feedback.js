import React, { useState } from 'react'
import logo from '../../images/colorLogo.png'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import './Feedback.css'
import { toast } from 'react-toastify'
import URL from '../URL/Url'
import axios from 'axios'

export default function Feedback() {
    const navigate = useNavigate()
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [email,setemail] = useState('')
    const [phoneNo,setPhoneNumber] = useState('')
    const [feedback,setfeedback] = useState('')

    const loginstatus = sessionStorage.getItem('currentloginStatus')

    const giveFeedback=()=>{
        if(firstName.length ===0){
            toast.error("Please Enter First name")
        }else if(lastName.length ===0){
            toast.error("Please Enter Last name")
        }else if(email.length ===0){
            toast.error("Please Enter email name")
        }else if(phoneNo.length !== 10){
            toast.error("Please Enter valid Mobile Number")
        }else if(feedback.length ===0){
            toast.error("Please Enter Feedback")
        }else{
            const body={
                firstName,lastName,email,phoneNo,feedback
            }
            const url = `${URL}feedback/addFeedback`
            axios.post(url,body).then((response)=>{
                const result = response.data
                console.log(result)
                if(response.status === 201){
                    toast.success('Thanks for your Valuable Feedback')
                    if(loginstatus == 1){
                        navigate('/pizza')
                    }else{
                        navigate('/')
                    }
                }else{
                    toast.error("Something went wrong. Please try again")
                }
            })
        }
    }

    return (
        <div onLoad={() => { window.scrollTo(0, 0) }}>
             <div className="row shadow sticky-top"  >
                {/* <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "darkslateblue" }}>
                    <div className="container-fluid">
                        <a className="navbar-brand"><img src={logo} alt="" id='headerlogoProfile' onClick={()=>(navigate('/'))} style={{cursor:"pointer"}}/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "white" }}>
                            <span className="navbar-toggler-icon" style={{ backgroundColor: "black" }}></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" onClick={() => (navigate('/pizza'))} id='headerBtn'>Pizzas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => (navigate('/Vegpizza'))} id='headerBtn'>Veg pizzas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => (navigate('/beverages'))} id='headerBtn'>Beverages</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav> */}
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "lightblue" }}>
              <div className="container-fluid">
                {/* <a className="navbar-brand"><img src={logo} alt="" id='headerlogoProfile' /></a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "white" }}>
                  <span className="navbar-toggler-icon" style={{ backgroundColor: "grey" }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li className="nav-item" >
                      <a className="nav-link active" aria-current="page" onClick={() => (navigate('/pizza'))} id='headerBtn' style={{color:'black'}}>Pizzas</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={() => (navigate('/Vegpizza'))} id='headerBtn'style={{color:'black'}}>Veg pizzas</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={() => (navigate('/beverages'))} id='headerBtn' style={{color:'black'}}>Beverages</a>
                    </li>
                    <li>
                      
                    </li>
                  </ul>
                   <div className=''>
                    <motion.button className='btn btn-primary SignButton'
                      whileHover={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                      whileTap={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                      onClick={()=>(navigate('/signin'))}
                    >Sign In</motion.button>
                   
                      
                    {/* <Button className='primary'>SignIn</Button> */}
                  </div>
                  <div className=''>
                    <motion.button className='btn btn-primary SignButton float-start'
                      whileHover={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                      whileTap={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                      onClick={()=>(navigate('/signup'))}
                    >Sign up</motion.button>
                  </div>
                  
                </div>
              </div>
            </nav>
            </div >
            <br />
            <div className='fixedcontent'>
                <div style={{ backgroundColor: "whitesmoke" }}>
                    <br />
                    <div className='container shadow-lg feedImg'>
                        <br />
                        <h4>Your feedback is Most Valuable for us !!</h4>
                        <hr />
                        <div className='feedbackContainer'>
                            <div className="form feedForm">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="" className="label-control">First Name</label>
                                            <input onChange={e=>{
                                                setfirstName(e.target.value)
                                            }}
                                            type="text" className="form-control shadow active" placeholder='John' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="" className="label-control">Last Name</label>
                                            <input onChange={e=>{
                                                setlastName(e.target.value)
                                            }}
                                            type="text" className="form-control shadow" placeholder='Smith' />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="label-control">Email</label>
                                    <input onChange={e=>{
                                        setemail(e.target.value)
                                    }}
                                    type="email" className="form-control shadow" placeholder='abc@xyz.com' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="label-control">Mobile Number</label>
                                    <input onChange={e=>{
                                        setPhoneNumber(e.target.value)
                                    }} 
                                    minLength={10} maxLength={10}
                                    type="number" className="form-control shadow" placeholder='9988776655' />
                                </div>
                                <div>Add Your Feedback</div>
                                <div>
                                    <textarea onChange={e=>{
                                        setfeedback(e.target.value)
                                    }}
                                        name="" id="commentarea" cols="30" rows="3.5" className="form-control shadow" placeholder=''>
                                    </textarea>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <motion.button className='feedBtn float-end'
                                            whileHover={{ backgroundColor: "rgb(244, 197, 110)" }}
                                            onClick={giveFeedback}
                                        >Add feedback</motion.button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}
