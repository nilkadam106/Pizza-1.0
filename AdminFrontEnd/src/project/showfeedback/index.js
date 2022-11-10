import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from '../Home'

import {PIZZAHOST} from '../../config'


const ProductPage = () => {
  const url = `${PIZZAHOST}/feedback/feedbackList`
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    axios.get(url,{withCredentials:true}).then((response) => {
      const result = response.data
      if (response.status === 200) {
        setProducts(result)
        //  var person = result['data'];

        // localStorage.setItem('person', JSON.stringify(person)); //stringify object and store
        // var retrievedPerson = JSON.parse(localStorage.getItem('person')); //retrieve the object
        // localStorage.removeItem("person")

      }
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
                
                <p><b>Name :</b> {product['firstName']}</p>
                
                <p><strong>Email Id :</strong> {product['email']}</p>
                 <p><strong>feedback :</strong> {product['feedback']}</p>
  
                <ColoredLine color="black" />
              </div>
               

            )
          })}
      </div>
     
   
    </>
  )
}

export default ProductPage
