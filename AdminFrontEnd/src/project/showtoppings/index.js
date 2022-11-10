import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from '../Home'
import { toast } from 'react-toastify';

import {PIZZAHOST} from '../../config'
import { useNavigate } from 'react-router-dom'


const  ProductPage = () => {
  const url = `${PIZZAHOST}/toppings/toppingList`
  const [products, setProducts] = useState([])

  const navigate=useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    axios.get(url,{withCredentials:true}).then((response) => {
      console.log(response)
      const result = response
      if (result.status == 200) {
        console.log("Oye")
        console.log(response.data)
        setProducts(response.data)
        // setProducts(result['data'])
        //  var person = result['data'];

        // localStorage.setItem('person', JSON.stringify(person)); //stringify object and store
        // var retrievedPerson = JSON.parse(localStorage.getItem('person')); //retrieve the object
        // localStorage.removeItem("person")

      }
    })
  }
 
  function deletetopping(toppingId){
      
    const url =`${PIZZAHOST}/toppings/deleteTopping/${toppingId}`
    axios.delete(url,{withCredentials: true}).then((response)=>{
      if(response.status == 200){
        toast.success("Item deleted successfully")
        window.location.reload(false);
      }
      else(
        toast.error("Error while deleting topping")
      )
      
  
    })
  }

  const ColoredLine = (color) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);

  return (
      <>
            <Home />
      
        <div className="outerdiv-emp-form">
          
          {products.map((product, i) => {
            return (
              <div key={i}>
                  <p><strong>Topping Name  :</strong> {product['toppingName']}</p>
                 <p><strong>Topping Price :</strong> {product['price']}</p>
                 
                <div className='update'>
              
              <button type="button" onClick={()=>(navigate('/edittoppings',{state:{topping:product}}))} className="btn btn-sm btn-success"> Update </button>   
              <button onClick={()=>deletetopping(product['toppingId'])} className="btn btn-sm btn-danger mx-3">delete</button>        
              {/* <button onClick={()=>deletesize(product['itemId'])} className="btn btn-danger mx-3">delete</button> */}
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
