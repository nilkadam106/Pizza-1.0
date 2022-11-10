import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from '../../images/colorLogo.png'
import signinImg from '../../images/signin.jpg'
import URL from '../URL/Url'
import './Sign.css'

export default function ForgotPassword() {

    const scroolUp = () => {
        window.scrollTo(0, 0)
    }

    const [email, setemail] = useState('')
    const [dummy, setdummy] = useState('')
    
    const navigate = useNavigate()

    const GenerateToken = () => {
        const body = {
            email,
            dummy
        }
        const url = `${URL}user/resetPassword`
        axios.post(url, body).then((response) => {
            const result = response.data
            
            if (response.status == 200) {
                toast.success("result")
                navigate('/resetpassword')
            } else {
                toast.error("Invalid Email")
            }
        }).catch((e) => toast.error(e.message))
    }
    return (
        <motion.div style={{ overflowX: "hidden" }} onLoad={scroolUp} className='fixedcontent'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="row shadow sticky-top"  >
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
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container' style={{ backgroundColor: "white", minHeight: "300px" }}>
                    <br />
                    <center><h3>Forgot Password</h3></center> <hr />
                    <div className='row justify-content-around'>
                        {/* <div className="col">
                            <center><img src={signinImg} alt="" style={{ marginTop: "4%" }} /></center>
                        </div> */}
                        <div className="col-6" style={{ padding: "1rem" }}>
                            <div className="form">
                                <form action="JavaScript:GenerateToken()">
                                    <div className="mb-3">
                                        <label className="label-control">Enter Email</label>
                                        <input onChange={e => (
                                            setemail(e.target.value)
                                        )}
                                            required="true" type="email" className="form-control shadow" />
                                    </div>

                                    <div className="col">
                                        <motion.button className='float-end UpBtn'
                                            whileHover={{ backgroundColor: "rgb(7, 84, 133)", color: "white" }}
                                            onClick={GenerateToken}
                                        >Submit</motion.button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        </motion.div>
    )
}
