
import axios from "axios";
import { useState } from "react";
// import { useEffect } from "react";
// import './index.css'
import { PIZZAHOST } from '../../config'
// import { useNavigate, useLocation,Link } from "react-router-dom";
import { toast } from "react-toastify";
import Home from '../Home'

const Addtoppings = () => {
    const [toppingName,settoppingName] = useState("")
    const [price , setprice]= useState("0")
    
   
    // const navigate=useNavigate()

    function savePizza  ()  {
        if(toppingName==="")
        alert("Enter  topping name")
        else if(price==="")
        alert("Enter the price of the toppings")
        
       
        else{
            const body = {
                toppingName,
                price
               }
            const url = `${PIZZAHOST}/toppings/addToppings`
            
            
            axios.post(url,body,{withCredentials:true}).then((response)=> {
                const result = response.data
                console.log(result)
                // if(result['status']=='success'){
                //     toast.success('topping Added successfully')
                // }else{
                //     toast.error(result['error'])
                // }
                if(response.status === 200){
                    toast.success('topping Added successfully')
                }
            })
    }
    }
   
           
   
 
    return(
        <>
        <Home />
        <div className="outerdiv-emp-form">
                <div className="mb-3">
                
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Topping Name</label>
                    <br />
                     <input type="text" value={toppingName} onChange={(e) => settoppingName(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter topping name" />
                </div> 

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Topping  Price</label>
                    <br />
                    <input type="text" value={price} onChange={(e) => setprice(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter topping price name" />
                </div>

              
                <button type="button" onClick={()=> {
                        savePizza();
                        
                }} className="btn btn-sm btn-success">Add</button>
                   
            </div></>
    
    )

}
export default Addtoppings;