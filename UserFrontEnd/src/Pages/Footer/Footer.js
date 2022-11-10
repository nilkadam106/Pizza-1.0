import React from 'react'
import { useNavigate } from 'react-router'
import {motion} from  'framer-motion'
import './Footer.css'

export default function Footer() {
  const navigate = useNavigate()
  
  return (
    <div className='footer' style={{ overflowX: "hidden",fontFamily:'Courier New' }}><br />
      <div className="row linkRow">
        <div className="col">
          <table className='table-responsive' >
            <th><h5 style={{fontWeight:'bold'}}>About</h5></th>
            <tbody>
              <tr><a className='footerLink' onClick={()=>(navigate('/FAQs'))}>FAQ's</a></tr>
              <tr><a className='footerLink' onClick={()=>(navigate('/aboutUs'))}>About Us</a></tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <table>
            <th><h5 style={{fontWeight:'bold'}}>Legal</h5></th>
            <tbody>
              <tr> <a className='footerLink' onClick={()=>(navigate('/Terms-and-condition'))}>Terms and Conditions</a></tr>
            </tbody>
          </table>
        </div><div className="col">
          <table>
            <th><h5 style={{fontWeight:'bold'}}>Social Media</h5></th>
            <tbody >
              <tr> <a className='footerLink' href="https://www.facebook.com/" target="_blank" >FaceBook</a></tr>
              <tr> <a className='footerLink' href="https://www.youtube.com/" target="_blank">YouTube</a></tr>
              <tr> <a className='footerLink' href="https://www.instagram.com/" target="_blank">Instagram</a></tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <h6 className='feedbackRow' style={{fontFamily:'Courier New'}}>Help us in serving you better <motion.button className='feedbackBtn'
          whileHover={{backgroundColor:"gray",color:"white"}}
          onClick={()=>(navigate('/Feedback'))}
        >Give Feedback</motion.button></h6>
      </div>
      <br />
      {/* <div>
        <h6 className='info'>Order a delicious pizza on the go, anywhere, anytime. Pizza Hut is happy to assist you with your home delivery. Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply.</h6>
        <h6 className='info'>Hurry up and place your order now!</h6>
        <h6 className='info'>© 2022 Pizza Hut India. All rights reserved. License Number: 45781256894512</h6>
      </div> */}
      {/* <br /> */}
    </div>
  )
}
