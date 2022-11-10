import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import URL from '../../Pages/URL/Url'
import './Address.css'

export default function Address(props) {
  const { addres } = props

  const navigate = useNavigate()
  const deleteAddress = () => {
    const url = `${URL}address/deleteByAddressId/${addres.addressId}`
    axios.delete(url,{withCredentials:true}).then((response) => {
      const result = response.data
      console.log(result)
      setTimeout(function () {
        window.location.reload();
      }, 1000);
      toast.success("deleted")
    })

  }

  return (
    <div className=''>
      <div className='address-box'>
        <div className='address'>
          {addres.plotNo}, {addres.streetName}, {addres.city}, {addres.district}, {addres.soverignState} - {addres.pincode} <br />
          <button className='float-end edit' onClick={() => {
                            navigate('/editAddress', { state: { addressId: addres.addressId } })
          }}>Edit</button>
          <button className='float-end delete' onClick={deleteAddress}>Delete</button>
          <br />
        </div>
      </div>
      <br />
    </div>
  )
}

// addressId: 1
// city: "qwe"
// pincode: "123123"
// plotNo: "qwe"
// state: "qwe"
// streetName: "qwe"