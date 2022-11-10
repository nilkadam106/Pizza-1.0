import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../../Header/Header'
import URL from '../../URL/Url'

export default function EditAddress(props) {


    const { currentuserId } = sessionStorage
    const navigate = useNavigate()

    const { state } = useLocation()
    const { addressId } = state

    const getaddressbyid = () => {
        const url = `${URL}address/getaddressbyid/${addressId}`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status === 201) {
                const { city, pincode, plotNo, soverignState, district, streetName } = result
                sessionStorage['thiscity'] = city
                sessionStorage['thisdistrict'] = district
                sessionStorage['thispincode'] = pincode
                sessionStorage['thisplotNo'] = plotNo
                sessionStorage['thisstate'] = soverignState
                sessionStorage['thisstreetName'] = streetName
            }
        })
    }

    useEffect(() => {
        console.log(addressId)
        getaddressbyid()
    }, [])

    const { thiscity } = sessionStorage
    const { thispincode } = sessionStorage
    const { thisplotNo } = sessionStorage
    const { thisstate } = sessionStorage
    const { thisstreetName } = sessionStorage
    const { thisdistrict } = sessionStorage
    const userId = currentuserId


    // const [plotNo, setplotNo] = useState('')
    // const [streetName, setstreetName] = useState('')
    // const [city, setcity] = useState('')
    // const [soverignState, setsoverignState] = useState('')
    // const [pincode, setpincode] = useState('')
    // const [district, setdistrict] = useState('')

    const updateaddress = (e) => {
        e.preventDefault();
        console.log("inside update address ")
        var plotNo = document.getElementById('plotno').value
        var streetName = document.getElementById('street').value
        var city = document.getElementById('city').value
        var district = document.getElementById('dist').value
        var soverignState = document.getElementById('state').value
        var pincode = document.getElementById('pin').value
        // if (plotNo.length == 0) {
        //     setplotNo(document.getElementById('plotno').value)
        //     console.log(document.getElementById('plotno').value)
        //     //toast.error("Enter new Plot No")
        // }
        // if (streetName.length == 0) {
        //     setstreetName(document.getElementById('street').value)
        //     console.log(document.getElementById('street').value)
        //     //toast.error("Enter new Street Name")
        // }
        // if (city.length == 0) {
        //     setcity(document.getElementById('city').value)
        //     console.log(city)
        //     //toast.error("Enter new City")
        // }
        // if (district.length == 0) {
        //     setdistrict(document.getElementById('dist').value)
        //     console.log(district)
        //     //toast.error("Enter new District")
        // }
        // if (soverignState.length == 0) {
        //     setsoverignState(document.getElementById('state').value)
        //     console.log(soverignState)
        //    // toast.error("Enter new State")
        // }
        // if(pincode.length == 0){
        //     setpincode(document.getElementById('pin').value)
        //     console.log(pincode)
        // } 
        if(pincode.length != 6) {
            toast.error("Enter New Pincode")
            console.log("pin code is ok")
        }

        if(plotNo && streetName && city &&  district && soverignState && pincode ) {
            console.log(currentuserId)
            const body = {
                soverignState, city, pincode, plotNo, streetName, userId, district
            }
            const url = `${URL}address/updateAddress/${addressId}`
            axios.put(url, body,{withCredentials:true}).then((response) => {
                const result = response.data
                console.log(result)
                if (response.status == 201) {
                    navigate('/profile')
                    sessionStorage.removeItem('thiscity')
                    sessionStorage.removeItem('thisdistrict')
                    sessionStorage.removeItem('thispincode')
                    sessionStorage.removeItem('thisplotNo')
                    sessionStorage.removeItem('thisstate')
                    sessionStorage.removeItem('thisstreetName')
                    toast.success("Address Updated!!!")
                } else {
                    toast.error("Error while adding the Address")
                }
            })
        }
        else{
            toast.error("All fields are mandatory!!")
        }
    }
    const scrollUp=()=>{
        window.scrollTo(0,0)
    }

    return (
        <div style={{ overflowX: "hidden" }} onLoad={scrollUp} className='fixedcontent'>
            <Header/>
            <br/>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container shadow-lg userInfo' style={{ backgroundColor: "white" }}>
                    <br />
                    {/* <div>
                        <h4>Edit Your Address</h4><br />
                        <div className="form personalinfo" style={{ marginLeft: "15%" }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>Plot No.</b></td>
                                        <td><input onChange={e => (
                                            setplotNo(e.target.value)
                                        )}
                                            defaultValue={thisplotNo}
                                      
                                            type="text" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>Street Name</b></td>
                                        <td><input onChange={e => (
                                            setstreetName(e.target.value)
                                        )}
                                        defaultValue={thisstreetName}
                                            type="text" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>City</b></td>
                                        <td><input onChange={e => (
                                            setcity(e.target.value)
                                        )}
                                        defaultValue={thiscity}
                                            type="text" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>District</b></td>
                                        <td><input onChange={e => (
                                            setdistrict(e.target.value)
                                        )}
                                        defaultValue={thisdistrict}
                                            type="text" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>State</b></td>
                                        <td><input onChange={e => (
                                            setsoverignState(e.target.value)
                                        )}
                                        defaultValue={thisstate}
                                            type="text" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td style={{ textAlign: "right" }}><b>Pin code</b></td>
                                        <td><input onChange={e => (
                                            setpincode(e.target.value)
                                        )}
                                        defaultValue={thispincode}
                                            type="number" className='personalInfo' required /></td>
                                    </tr><br />
                                    <tr>
                                        <td colSpan={2}>
                                            <button className='float-end editUser' onClick={updateaddress}>
                                                Update
                                            </button>
                                        </td>
                                    </tr><br />
                                </tbody>
                            </table>
                        </div>
                    </div><hr /> */}
                    <>
             <center><h4>Edit Address</h4></center><br />
             <div className='container-fluid'>
                 <div className='row align-content-center justify-content-around'>
                     <div className='col-6'>
                <form onSubmit={updateaddress}>
                 <div class="mb-3">
                     <label for="plotno" className="form-label">Plot No.</label>
                     <input type="text" className='form-control' id='plotno' defaultValue={thisplotNo}
                     />
                 </div>
                 <div class="mb-3">
                     <label for="street" className="form-label">Street Name</label>
                     <input type="text" className='form-control' id='street' defaultValue={thisstreetName}
                     />
                 </div>
                 <div class="mb-3">
                     <label for="city" className="form-label">City</label>
                     <input type="text" className='form-control' id='city' defaultValue={thiscity}
                     />
                 </div>
                 <div class="mb-3">
                     <label for="dist" className="form-label">District</label>
                     <input type="text" className='form-control' id='dist' defaultValue={thisdistrict}
                     />
                 </div>
                 <div class="mb-3">
                     <label for="state" className="form-label">State</label>
                     <input type="text" className='form-control' id='state' defaultValue={thisstate}
                     />
                 </div>
                 <div class="mb-3">
                     <label for="pin" className="form-label">Pin Code</label>
                     <input type="text" className='form-control' id='pin' name='pin' defaultValue={thispincode}
                     />
                 </div>
                 <button type="submit" className="btn btn-primary">update</button>
             </form>
                     </div>
                </div>
             </div>

         </>
                </div>
                <br />
            </div>
            <br />
        </div>
    )
}
