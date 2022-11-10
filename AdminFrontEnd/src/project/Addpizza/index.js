
import axios from "axios";
import { useState } from "react";
import './index.css'
import { PIZZAHOST } from '../../config'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from '../Home'

const Addpizza = () => {
    const [type, settype] = useState("")
    const [itemName, setitemName] = useState("")
    const [description, setdescription] = useState("")
    //
    const [itemId, setitemid] = useState("")
    const [size, setsize] = useState("")
    const [price, setprice] = useState("0.0")


    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 3
            }}
        />
    );

    const navigate = useNavigate()

    function savePizza() {
        if (type === "")
            alert("Enter  type of pizza")
        else if (itemName === "")
            alert("Enter the pizza name")
        else if (description === "")
            alert("Enter pizza description")

        else {
            const body = {
                type,
                itemName,
                description,
            }
            const url = `${PIZZAHOST}/item/addItem`


            axios.post(url, body, { withCredentials: true }).then((response) => {
                const result = response.data
                console.log(result)
                //if(result['status']=='success'){
                if (response.status === 201) {
                    toast.success('pizza Added successfully')
                    //navigate('/Addpizzasize')
                    setitemid(result['itemid'])
                    console.log(result['itemid'])
                    addpizzasize(result)
                    // }else{
                    //     toast.error(result['error'])
                }
            })
        }
    }

    function addpizzasize(item) {
        // if (itemId === "")
        //     alert("Enter itemid")
        // else 
        if (size === "")
            alert("Enter pizza size")
        else if (price === "")
            alert("Enter pizza price")
        else {
            const body = {
                item,
                size,
                price,

            }
            const url = `${PIZZAHOST}/itemSize/addItemSize`
            axios.post(url, body, { withCredentials: true }).then((response) => {
                const result = response.data
                console.log(result)

                if (response.status === 201) {
                    toast.success('pizza size and price Added successfully')
                    navigate('/showallpizza')
                }
            })
        }
    }


    return (
        <>
            <Home />

            <div className="outerdiv-emp-form">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Item type</label>
                    <br />
                    <select className="form-select form-select-sm" onChange={(e) => settype(e.target.value)} aria-label="Default select example">
                        <option value={type}>choose Type</option>
                        <option value="veg">Veg</option>
                        <option value="Nonveg">NonVeg</option>
                        <option value="Beverages">Beverages</option>
                    </select>

                    {/* <input type="text" value={type} onChange={(e) => settype(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza Type" /> */}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Item name</label>
                    <br />
                    <input type="text" value={itemName} onChange={(e) => setitemName(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza name" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Item desription</label>
                    <br />
                    <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} className="form-control form-control-sm " id="exampleFormControlInput1" placeholder="Enter pizza desription" />
                </div>
                <ColoredLine color="black" />


                {/* <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter item id</label>
                    <br />
                    <input type="text" value={itemId} onChange={(e) => setitemid(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter item id" />
                </div> */}

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Item size</label>
                    <br />
                    <select className="form-select form-select-sm" onChange={(e) => setsize(e.target.value)} aria-label="Default select example">
                        <option value={setsize}>choose Size</option>
                        <option value="Small">Small</option>
                        <option value="Regular">Regular</option>
                        <option value="Large">Large</option>
                        <option value="200ml">200ml</option>
                        <option value="500ml">500ml</option>
                        <option value="750ml">750ml</option>
                    </select>
                    {/* <input type="text" value={size} onChange={(e) => setsize(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza size" /> */}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Item price</label>
                    <br />
                    <input type="number" value={price} onChange={(e) => setprice(e.target.value)} className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Enter pizza price" />
                </div>




                <button type="button" onClick={savePizza} className="btn btn-sm btn-success">Add</button>

            </div>
        </>

    )

}
export default Addpizza;
