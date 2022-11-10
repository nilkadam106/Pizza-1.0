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


const Edittoppings = () => {
    const {state} = useLocation()
    const {topping} = state
    
    const [products, setProducts] = useState('')
    const [pizzasize, setPizzasize] = useState([])

    let [toppingName,setToppingName]=useState('')
    let [price,setPrice]=useState('')
    // let  toppingId = 0;

    // let toppingName = ''
    // let price = ''

    const navigate=useNavigate()
    const location = useLocation();
  console.log(location);

    useEffect(() => {
  
        getProducts()
        setToppingName(topping.toppingName)
        setPrice(topping.price)
        // toppingId = topping.toppingId

    },[])

    

      
  
    const save = () => {
        if (toppingName.length == 0) {
            toast.warning('please enter topping name')
          } else if (price.length == 0) {
            toast.warning('please enter price')
          }  else {
            const body = {
                toppingName,
                price,
             
            }

           
                
             
          const url =`${PIZZAHOST}/toppings/updateTopping/${topping['toppingId']}`
            axios.put(url,body,{withCredentials: true}).then((response) => {
                const result =response.data
                if(response.status == 200){
                      toast.success('successfully updated ')
                      navigate('/showtoppings')
                }


                // if(result['status']=='success'){
                //     toast.success('successfully updated ')
                //     navigate('/showtoppings')
                // }else{
                //     toast.error(result['error'])
                // }
            })
        }
    }
  
    
      const getProducts = () => {
        const url=`${PIZZAHOST}/toppings/toppingListbyId/${topping['toppingId']}`
        axios.get(url,{withCredentials: true}).then((response) => {
          const result = response.data
          if(response.status == 200){
            setProducts(result)
            toppingName = result.toppingName
            price = result.price
        }

          // if (result['status'] == 'success') {
          //   setProducts(result['data'])
           
          // }
        })
      }
    return (
        <><div>
          <Home />
        </div>
        <div className='edit'>
            <h2 className="title"><b>Update Topping</b></h2>
           
            <div className="form">
              <div className="mb-3">
                <label htmlFor="name" className="label-control">
                  Topping Name    :
                </label>
                <input
                  placeholder={toppingName}
                  onChange={(e) => {
                    toppingName = e.target.value
                  } }
                  type="text"
                  className="form-control"/>
              </div>
      
              <div className="mb-3">
                <label htmlFor="price" className="label-control">
                  Price :
                </label>
                <input
                  placeholder={price}
                  onChange={(e) => {
                    price = e.target.value
                  } }
                  type="text"
                  className="form-control"/>
              </div>
      
      
              <div className="mb-3">
                <button onClick={save} className="btn btn-success btn-sm mx-2" >
                  update Topping
                </button>
                
                <button type="button" onClick={()=>(navigate('/toppingimage',{state:{toppingId:topping.toppingId}}))} className="btn btn-sm btn-info  mx-2"> 
                  image 
                </button>   
                <Link to="/showtoppings" className="btn btn-danger float-end mx-2">
                  Cancel
                </Link>
            
    
               </div>
              </div>
            
             
            </div>

            
            <div>
                  

            </div>
            </>
          
        )
      }

// const ToppingImageComponent = (props) => {
//   return(

//     <>
//       {props}
//     </>

//   )
// }

export default Edittoppings;
