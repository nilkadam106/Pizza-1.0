import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../Header/Header'
import Address from '../../Component/AddressComp/Address'
import URL from '../URL/Url'
import { Button } from "reactstrap"
import{Link} from "react-router-dom"

export default function Profile() {

    const navigate = useNavigate()

    const addAddress = () => {
        navigate('/addAddress')
        window.scrollTo(0, 0)
    }


  

    const [address, setAddress] = useState([])
    const getAddress = () => {
        const url = `${URL}address/getaddress/${currentuserId}`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status === 201) {
                setAddress(result)
            } else {
                toast.warning("No address is available!!")
            }
        })
    }

    useEffect(() => {
        getAddress()
    }, [])

    const { currentuserId,
        currentfirstName,
        currentlastName,
        currentemail,
        currentphoneNo } = sessionStorage

    const [userId, setuserId] = useState(currentuserId)
    const [firstName, setFirstName] = useState(currentfirstName)
    const [lastName, setLastName] = useState(currentlastName)
    const [email, setemail] = useState(currentemail)
    const [phoneNo, setphoneNumber] = useState(currentphoneNo)
    // const [password, setPassword] = useState('')
    // const [ConfirmPassword, setConfirmPassword] = useState('')
    // const [role, setrole] = useState('User')
    
    const userEdit = () => {
        navigate('/editProfile') // pass state here 
        window.scrollTo(0, 0)
    }

    
    return (
        
        <div style={{ overflowX: "hidden" }} className='fixedcontent'>
            <Header /> 
            <br/>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container shadow-lg' style={{ backgroundColor: "white" }}>
                    <br />
                    <div>
                        <h4>Personal Information</h4><br />
                        <table  className='table-responsive' id='prtable'>
                            <tr>
                                <td style={{ textAlign: "right" }}><b>First Name</b></td>
                                <td><input type="text" value={firstName} className="personalInfo" readOnly="true" /></td>
                            </tr><br />
                            <tr>
                                <td style={{ textAlign: "right" }}><b>Last Name</b></td>
                                <td><input type="text" value={lastName} className="personalInfo" readOnly="true" /></td>
                            </tr><br />
                            <tr>
                                <td style={{ textAlign: "right" }}><b>Email</b></td>
                                <td><input type="text" value={email} className="personalInfo" readOnly="true" /></td>
                            </tr><br />
                            <tr>
                                <td style={{ textAlign: "right" }}><b>Phone Number</b></td>
                                <td><input type="text" value={phoneNo} className="personalInfo" readOnly="true" /></td>
                            </tr><br />
                            <tr>
                                <td colSpan={2}>
                                    <button className='float-end editUser' onClick={userEdit}>
                                        Edit Profile
                                    </button>
                                </td>
                            </tr><br />
                        </table>
                    </div><hr />
                    <div className=''>
                        <div>
                            <div className="row">
                                <div className="col">
                                    <h4>Your Addresses</h4><br />
                                </div>
                                <div className="col">
                                    <button className='float-end addAddress' onClick={addAddress}>Add Address</button>
                                </div>
                            </div>
                            {address.map((add) => {
                                return <Address addres={add} />
                            })}
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <br />
        </div>
    )
}
