import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './ProfilePage.css'
import axios from 'axios'
import Header from '../Header/Header'
import URL from '../URL/Url'
import Item from '../../Component/ItemComp/Item'
import { toast } from 'react-toastify'

export default function ProfilePage() {
    const scroolUp = () => {
        window.scrollTo(0, 0)
    }
//,{withCredentials:true}
    const [item, setitem] = useState([])
    const getItem = () => {
        const url = `${URL}item/showAll`
        axios.get(url,{withCredentials:true}).then((response) => {
            const result = response.data
            console.log(result)
            if (response.status == 200) {
                setitem(result)
            }
        })
    }


    useEffect(() => {
        getItem()
    }, [])

    return (
        <motion.div style={{ overflowX: "hidden" }} onLoad={scroolUp} className='fixedcontent'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header />
            <br />
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container' style={{ backgroundColor: "white", minHeight: "500px" }}>
                    <br />
                    <center><h3>Recommended Delicious Pizza🍕</h3></center> <hr />
                    <div className='row' style={{ padding: "2rem" }}>
                        {item.map((peritem) => {
                            return <Item itemComp={peritem} />
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}