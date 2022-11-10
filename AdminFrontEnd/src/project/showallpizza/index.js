import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from '../Home'
import './index.css'
import {PIZZAHOST} from '../../config'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ProductPage = () => {
  const url = `${PIZZAHOST}/item/itemList`
  const [products, setProducts] = useState([])
const navigate=useNavigate()

const location = useLocation();
  console.log(location);

  useEffect(() => {
    getProducts()
  }, [],[location])

  const getProducts = () => {
    axios.get(url,{withCredentials: true}).then((response) => {
      const result = response.data
//       console.log("oye--------")
//       console.log(result)
      if(response.status == 200){
          console.log(result)
        setProducts(result)
      }

      else{
        toast.error(response.message)
      }

      // if (result['status'] == 'success') {
      //   setProducts(result['data'])
      // }
    })
    .catch((error) => toast.error(error.message))
  }
  const edit = ()=>{
    navigate('/editpizza')
  }
 
  

  const ColoredLine = (color ) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);
function deletesize(itemId){
  const url =`${PIZZAHOST}/item/deleteAll/${itemId}`
  axios.delete(url,{withCredentials: true}).then((response)=>{
    window.location.reload(false);

  })
}

  return (
      <>
            <Home />
      
        <div className="outerdiv-emp-form">
          
          {products.map((product, i ) => {
            return (
                
                
              <div key={i}>
             
                
                <b className='mx-2'>ID :{product['itemid']}</b> 
                
                <strong className='mx-2'>Pizza Type :</strong> {product['type']}
                <div>
                  <strong className='mx-2'>Pizza Name :</strong> {product['itemName']}
                </div>
                <div>
                  <strong className='mx-2'>Description :</strong> {product['description']}
                </div>
                <div className='update my-3'>
              
                <button onClick={()=>(navigate('/editpizza',{state:{itemId:product['itemid'], pizza: product}}))} className="btn btn-sm btn-success">Update</button>           
                <button onClick={()=>deletesize(product['itemid'])} className="btn btn-sm btn-danger mx-3">delete</button>
                <button onClick = {() => navigate('/pizzaimage', {state:{itemId:product['itemid']}})} className="btn btn-sm btn-info">View Image</button>

                

                
                </div>



                <ColoredLine color="black" />
                </div>
               

            )
          })}
      </div>
     
   
    </>
  )
}

export default ProductPage
