import axios from "axios";
import { useEffect, useState } from "react";
import Home from "../Home";
import './index.css'
import { PIZZAHOST } from "../../config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const url = `${PIZZAHOST}/DeliveryStatus/alldelivery`;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  useEffect(
    () => {
      getProducts();
    },
    [],
    [location]
  );

  const getProducts = () => {
    axios.get(url,{withCredentials: true}).then((response) => {
      const result = response.data;
      console.log(result);
//       if (result["status"] == "success") {
//         setProducts(result["data"]);
//       }
      if(response.status == 200) 
          setProducts(result)
    });
  };

  const ColoredLine = ( props ) => (
    <hr
      style={{
        color: props,
        backgroundColor: props,
        height: 3,
      }}
    />
  );

  return (
    <>
      <Home />

      <div className="outerdiv-emp-form">
          <h1 >All Orders </h1>
          <hr></hr>
        {products.map((x, i) => {
          return (
              
            
            <div key={i}>
             
           
              <div className="row">
                <div className="col">
                  <p>
                    <b>Name :</b> {x['users']['firstName']}{" "}
                    {x['users']['lastName']}
                   
                  </p>
                  <p>
                    <b>email :</b> {x['users']['email']}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <b>Plot No :</b> {x['address']['plotNo']} {x['address']['streetName']}
                  </p>
                  <p>
                    <strong>city :</strong> {x['address']['city']}-{x['address']['pincode']}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <b>totalAmount :</b> {x['payments']['totalAmount']}
                  </p>
                  <p>
                    <strong>payStatus :</strong> {x['payments']['payStatus']}
                  </p>
                </div>
                <div className='update'>
              
              <button type="button" onClick={()=>(navigate('/changestatus',{state:{deliveryId:x['deliveryId']}}))} className="btn btn-sm btn-success">Change Status</button>           
              
              </div>
              </div>

               
             
              
              <ColoredLine color="black" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductPage;
