import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PIZZAHOST } from '../../config'
import { useLocation } from 'react-router'
import Home from '../Home'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Placeholder } from 'react-bootstrap'


const Editpizza = () => {
  const { state } = useLocation()
  const { itemId, pizza } = state

  const [products, setProducts] = useState([])
  const [pizzasize, setPizzasize] = useState([])

  const [type, settype] = useState('')
  const [itemName, setitemName] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    settype(type)
    setitemName(itemName)
    setDescription(description)
    getProducts()
    getSize()
  }, [])





  const save = () => {
    if (type.length == 0) {
      toast.warning('please enter pizza type')
    } else if (itemName.length == 0) {
      toast.warning('please enter pizza name')
    } else if (description.length == 0) {
      toast.warning('please enter description')
    } else {
      const body = {
        type,
        itemName,
        description,
      }




      const url = `${PIZZAHOST}/item/update/${itemId}`
      axios.put(url, body, { withCredentials: true }).then((response) => {
        const result = response.data
        if (response.status == 200) {
          toast.success('successfully updated ')
          navigate('/showallpizza')
        }

        // if(result['status']=='success'){
        //     toast.success('successfully updated ')
        //     navigate('/showallpizza')
        // }else{
        //     toast.error(result['error'])
        // }
      })
    }
  }


  const getProducts = () => {
    const url = `${PIZZAHOST}/item/byid/${itemId}`
    axios.get(url, { withCredentials: true }).then((response) => {
      const result = response.data
      if (response.status == 200) {
        setProducts([result])
      }
      // if (result['status'] == 'success') {
      //   setProducts(result['data'])

      // }
    })
  }

  const getSize = () => {
    const url = `${PIZZAHOST}/itemSize/itemsizeId/${itemId}`
    axios.get(url, { withCredentials: true }).then((response) => {
      const result = response.data
      console.log(result)
      if (response.status == 200) {
        setPizzasize(result)
        console.log(pizzasize)
      }

      // if(result.status == "success"){
      //     setPizzasize(result.data)
      // }else{
      //     toast.error("you did't add pizza sizes and price")
      // }
    })
  }
  function deletesize(sizeId) {
    const url = `${PIZZAHOST}/itemSize/delete/${sizeId}`
    axios.delete(url, { withCredentials: true }).then((response) => {
      window.location.reload(false);

    })
  }


  return (
    <>
      <div>
        <Home />
      </div>
      <div className='edit'>
          <h2 className="title"><b>Update item</b></h2>
            {products.map((product, i) => {
            return (

              <div className="form" key={i}>
                Id number: {product['itemid']}
                <div className="mb-3">
                  <label htmlFor="" className="label-control">
                  item Type     :
                  </label>
                  <select className="form-select form-select-sm" onChange={(e) => settype(e.target.value)} aria-label="Default select example">
                    <option>choose Type</option>
                    <option value="veg">Veg</option>
                    <option value="veg">NonVeg</option>
                  </select>
                </div>

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                item Name :
                </label>
                <input
                   placeholder={pizza.itemName}
                  onChange={(e) => {
                    setitemName(e.target.value)
                  }}
                  type="text"
                  className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Description :
                </label>
                <input
                  // value={pizza.description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}

                  className="form-control" placeholder={product['description']} />
              </div>

              <div className="mb-3">
                <button onClick={save} className="btn btn-success" >
                  Save item
                </button>
                <button onClick={() => (navigate('/Addpizzasize', { state: { itemid: product['itemid'], pizza : product } }))} className="btn btn-primary mx-3 ">Add itemsize</button>
                <Link to="/showallpizza" className="btn btn-danger float-end">
                  Cancel
                </Link>

                <div>

                  <br />
                  <table className="table table-dark">
                    <thead>
                      <tr>

                        <th>sizeId</th>
                        <th>Size</th>

                        <th>Price</th>
                        <th>   </th>
                        <th>   </th>
                      </tr>
                    </thead>

                    <tbody>
                      {pizzasize.map((size,i) => {
                        return (

                          <tr key={i}>
                            {console.log(size)}
                            <td>{size['sizeId']}</td>
                            <td>{size['size']}</td>
                            <td>{size['price']}</td>
                            <td><button onClick={() => (navigate('/Editpizzasize', { state: { sizeId: size['sizeId'] , itemId : itemId, pizza: pizza} }))} className="btn btn-primary mx-3 ">Update</button></td>
                            <td><button onClick={() => deletesize(size['sizeId'])} className="btn btn-danger">delete</button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>

  )
}

export default Editpizza;
