import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PIZZAHOST } from '../../config'
import { useLocation } from 'react-router'
import Home from '../Home'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

const Editpizzasize = () => {
  
    const {state} = useLocation()
    const {sizeId, itemId, pizza} = state
    const navigate=useNavigate()

    

    const [size,setSize]=useState('')
    const [price,setPrice]=useState('')
    const [pizzasize,setPizzasize]=useState([])
    useEffect(() => {
        // editSize()
    },[])

    // const getSize=()=>{
    //     const url = `${PIZZAHOST}/itemSize/itemsizeId/${sizeId}`
    //          axios.get(url).then((response)=>{
    //             const result = response.data
    //             console.log(result)
    //             if(result.status == "success"){
    //                 setPizzasize(result.data)
    //             }else{
    //                 toast.error("you did't add pizza sizes and price")
    //             }
    //         })
    //   }
    const save = () => {
        if (size.length == 0) {
            toast.warning('please enter pizza type')
          } else if (price.length == 0) {
            toast.warning('please enter pizza name')
          }  else {
            const body = {
              size,
             price,
            }

            const url=`${PIZZAHOST}/itemSize/update/${sizeId}`
            axios.put(url,body,{withCredentials: true}).then((response)=>{
                const result=response.data
                if(response.status == 200){
                  toast.success('pizza siza and price updated. ')
                  navigate('/editpizza', { state: { itemId: itemId, pizza: pizza } })
                }
                // if(result['status']=='success'){
                //     toast.success('pizza siza and price updated. ')
                //     navigate('/showallpizza')
                // }else{
                //     toast.error(result['error'])
                // }
            })
            
        }
        }


    return(
        <><Home /><div className='edit'>
            <h1>Pizza size id: {sizeId} for pizza_id_ {itemId}</h1>
       
            <div className='form'>
                <div className='mb-3'>
                    <label htmlFor='' className='label-control'>
                        Pizza Size :
                        </label>
                        <select className="form-select form-select-sm" onChange={(e) => setSize(e.target.value)} aria-label="Default select example">
                          <option >choose Type</option>
                              <option value="small">Small</option>
                              <option value="regular">Regular</option>
                              <option value="larger">Large</option>
                          </select>
                </div>
            </div>
           
                        <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Pizza Price :
                </label>
                <input
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  } }
        
                  className="form-control" placeholder= {""} />
              </div>
              <div className="mb-3">
                <button onClick={save} className="btn btn-sm btn-success" > Save Pizza </button>
                <button onClick={() => (navigate('/editpizza', { state: { itemId: itemId, pizza: pizza} }))} className="btn btn-sm btn-danger mx-3 ">cancel</button>

                </div>
        </div></>
    )
}
export default Editpizzasize;