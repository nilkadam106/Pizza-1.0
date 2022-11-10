/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from '../Home'
import { PIZZAHOST } from '../../config'
import './index.css'
import { useLocation } from 'react-router-dom'
// import { Navigate, useNavigate } from 'react-router-dom'


const ProductPage = () => {

  const [products, setProducts] = useState([])
  // const navigate=useNavigate()

  const location = useLocation();
  console.log(location);

  // const userId=sessionStorage['userId']
  const firstName = sessionStorage['firstName']
  const lastName = sessionStorage['lastName']
  const email = sessionStorage['email']
  const phoneNo = sessionStorage['phoneNo']

  useEffect(() => {
    getProducts()
  }, [], [location])

  const getProducts = () => {
    const url = `${PIZZAHOST}/user/profile`
    axios.get(url, { withCredentials:true }).then((response) => {
      const result = response.data
      //       console.log(result)
      if (response.status === 200) {
        setProducts(result)
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
  function deletesize(itemId) {
    const url = `${PIZZAHOST}/item/deleteAll/${itemId}`
    axios.delete(url).then((response) => {
      window.location.reload(false);

    })
  }

  return (
    <>
      <Home />
      <div className="outerdiv-emp-form">
        <div>
          <h3>Here Is The Current login user Details </h3>
          <h5><b>Hello,</b> {firstName} {lastName}</h5>
          <h5>
            <b>email:</b>{email}
          </h5><h5>
            <b>phoneNo:</b>{phoneNo}
          </h5>
        </div>
        <ColoredLine color="black" />

        <div className='customer'>
          <h3>Customer Details</h3>
        </div>


        <table className="table table-success table-striped">
          <thead className="thead-dark">
            <tr>

              <th scope="col">firstname </th>
              <th scope="col">lastname  </th>
              <th scope="col">email  </th>
              <th scope="col">phoneno  </th>

            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              return (
                <tr key={i}>
                  {console.log(product)}
                  <td>{product['firstName']}</td>
                  <td>{product['lastName']}</td>
                  <td>{product['email']}</td>
                  <td>{product['phoneNo']}</td>

                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default ProductPage
