import { useState } from 'react'
import './index.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router'
import { PIZZAHOST } from '../../config';
import { Cookies, useCookies } from 'react-cookie';



const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookies] = useCookies('')


  // const [cookies, setCookie] = useCookies(['user']);

  const navigate = useNavigate()

  const signinUser = () => {


    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const body = {
        email,
        password,
      }

      // url to make signin api call
      const url = `${PIZZAHOST}/user/signin`

      // make api call using axios
      axios.post(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)
        if (result['message'] === "Admin Auth successful!") {
          toast.success('Welcome to the application')

          setCookies('token', result.jwt)
          const { userId, firstName, lastName, email, phoneNo, role } = result['user']
          // setCookie('token', result['jwt'], { path: '/' });
          // // persist the logged in user's information for future use
          sessionStorage['userId'] = userId 
          sessionStorage['firstName'] = firstName
          sessionStorage['lastName'] = lastName
          sessionStorage['email'] = email
          sessionStorage['phoneNo'] = phoneNo
          sessionStorage['role'] = role
          sessionStorage['loginStatus'] = 1
          navigate('/home')
        } else {
          toast.error('Invalid user name or password')
        }
      })
      .catch(e => {
        if(({...e}.response.status)===401){
          toast.error('Invalid user name or password')
        }
        else{
          toast.error(e.message)
        }
      })
      // navigate('/home')
    }
  }

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">




        <div className=" formdiv">
          <h2>Admin Login</h2>
          <input className='my-3' onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" type="text" name="email" />

          <input className='my-3' onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" type="password" name="password" />
          <br />
          <button onClick={signinUser} className="btn btn-md btn-primary" type="submit">Login</button>
          <br />


        </div>
      </div>
      <div className="col"></div>
    </div>


  )
}

export default Signin
