import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useHistory } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header.css';
import { Cookies, useCookies } from 'react-cookie';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    //const history = useHistory();
    //const navigate = useNavigate()
    const Logout = () => {

        removeCookie('token')
        sessionStorage.clear()
        window.location = '/Signin';
    }



    return (
        <>
        <div className='d-flex justify-content-center align-items-center'>

            <div className="p-2">welcome to pizza backend</div>
            <div className="ml-auto p-2"><button onClick={Logout} className="btn btn-primary">Logout</button></div>
        </div>
            {/* <div style={{ float: 'right' }}>
                <button onClick={Logout} className="btn btn-primary">Logout</button>
            </div> */}
        </>




    )
}

export default Header;
