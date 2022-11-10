
import Home from '../Home'
import axios from 'axios';
 
import React,{ useState, useEffect} from 'react';
import { useLocation,state, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PIZZAHOST } from '../../config';

const UploadToppingImg=(props)=> {
    const {state} = useLocation()
    const {toppingId} = state
    const navigate =useNavigate()
    
      // Initially, no file is selected
    const[selectedFile,setSelectedFile] = useState()

    useEffect(() => {
      // getImage();
      //fetchImage();
    },[])


    const fetchImage = async () => {
      const url=`${PIZZAHOST}/toppingImages/download/${toppingId}`;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setSelectedFile(imageObjectURL);
    };
    
    // On file select (from the pop up)
    const onFileChange = (event) => {
    
      // Update the state
      const img = ( event.target.files[0]) ;
      setSelectedFile(img)
    
    };
    
    // On file upload (click the upload button)
    const onFileUpload = () => {
        
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "file",
        selectedFile,
        //selectedFile.name,
        
      );
    
    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object

    var url = `${PIZZAHOST}/toppingImages/add/${toppingId}`
    axios.post(url, formData,{withCredentials: true})
    .then(response => {
      if(response.status == 200){
        toast.success('image added')

        setSelectedFile(selectedFile)
      }
      else{
        toast.error("Error while adding the topping image")
      }

    }
     
    )
    // .catch(error => {
    //   toast.error(error.message)
    // } 
    // );
    
  };

  const url=`${PIZZAHOST}/toppingImages/attachment/${toppingId}`;

      return (
          <><div>
              <Home />
          </div><div className="outerdiv-emp-form">

                  <div >
                      <input type="file" onChange={onFileChange}  className="form-control"  />
                      <button onClick={onFileUpload} className="btn btn-small btn-primary">
                          Upload
                      </button>
                      <button onClick={() => (navigate('/Showtoppings'))} className="btn btn-sm btn-danger mx-3 ">cancel</button>
                  </div>
                  <br/><br/>
                  <img src={url} />
                  {/* {fileData()} */}
              </div></>
      );
    }
  

 
  export default UploadToppingImg;