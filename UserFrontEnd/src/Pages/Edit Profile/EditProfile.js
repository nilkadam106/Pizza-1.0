import React, { useState, useEffect }from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../Header/Header'
import URL from '../URL/Url'
import { useParams } from 'react-router'


export default function EditProfile() {

  
    const navigate = useNavigate()


    const { currentuserId } = sessionStorage
    const { currentfirstName } = sessionStorage
    const { currentlastName } = sessionStorage
    const { currentemail } = sessionStorage
    const { currentphoneNo } = sessionStorage

    const [userId, setuserId] = useState(currentuserId)
    const [password, setPassword] = useState('')
    const [role, setrole] = useState('User')

    const logout = () => {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('firstName')
        sessionStorage.removeItem('lastName')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('loginStatus')
        navigate('/')
    }

    const updateUser = (e) => {
        e.preventDefault();

        var firstName = document.getElementById('FirstName').value
        var lastName = document.getElementById('LastName').value
        var email = document.getElementById('Email').value
        var phoneNo = document.getElementById('PhoneNo').value

        if(phoneNo.length != 10){
            toast.error("Phone Number must be of 10 digits")
        }

        if(firstName && lastName && email && phoneNo){
                const body = {
                firstName, lastName, email, phoneNo, password, role
            }
            const url = `${URL}user/update/${currentuserId}`
            axios.put(url, body,{withCredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (response.status == 200) {
                    // currentfirstName = result.data.firstName
                    navigate('/profile')
                    toast.success("Address added successfully")
                    toast.success("Please Re-login to See Updated profile")
                }
            })
        }
        else{
            toast.error("All Fields are Mandatory!!!")
        }
    }


    return (
        <>
        <div style={{ overflowX: "hidden" }} className='fixedcontent'>
            <Header/>
            <br/>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container shadow-lg userInfo' style={{ backgroundColor: "white" }}>
                    <br />
                    <div>
                        <>
                            <center><h4>Edit Profile</h4></center><br />
                            <div className='container-fluid'>
                                <div className='row align-content-center justify-content-around'>
                                    <div className='col-6'>
                                        <form onSubmit={updateUser}>
                                                <div class="mb-3">
                                                    <label for="uid" className="form-label">User Id</label>
                                                    <input type="text" id="uid" class="form-control" value={userId} readOnly />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="FirstName" className="form-label">First Name</label>
                                                    <input type="text" className='form-control' id='FirstName' defaultValue={currentfirstName}/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="LastName" className="form-label">Last Name</label>
                                                    <input type="text" className='form-control' id='LastName' defaultValue={currentlastName}/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="Email" className="form-label">Email</label>
                                                    <input type="email" className='form-control' id='Email' defaultValue={currentemail} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="PhoneNo" className="form-label">Phone Number</label>
                                                    <input type='tel' className='form-control' id='PhoneNo' defaultValue={currentphoneNo}/>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </>
                    </div><hr />
                </div>
                <br />
            </div>
            <br />
        </div>
        </>

    )
}
