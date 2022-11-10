
import Home from '../Home'
import axios from 'axios';
 
import React,{useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PIZZAHOST } from '../../config';

const Upload=()=> {
    const {state} = useLocation()
    const {itemId} = state
    const navigate =useNavigate()

    // const[image, setImage] = useState('');
    
    // useEffect(() => {
    //   // getImage();
    //  // fetchImage();
    // },[])

    // const getImage = () => {
      
    //   const url=`${PIZZAHOST}/itemImage/item/${itemId}`;
    //   axios.get(url,{withCredentials: true}).then((response) => {
    //     const result = response.data
    //     // var blobUrl = PIZZAHOST.createObjectURL(result)
    //     // var img = document.getElementById("pizzaimg")
    //     // img.onload = function() {
    //     //   PIZZAHOST.revokeObjectUrl(this.src)
    //     // }

    //     // img.src = blobUrl; 

    //     if(response.status === 200){
    //       setImage(result)
    //     }
    //   }) 
    
    // }
    

    // const fetchImage = async () => {
    //   const url=`${PIZZAHOST}/itemImage/getimg/${itemId}`;
    //   const res = await fetch(url, {
    //     method: 'GET',
    //     credentials: 'include'
    //   });
    //   const imageBlob = await res.blob();
    //   const imageObjectURL = URL.createObjectURL(imageBlob);
    //   setImage(imageObjectURL);
    // };






    
      // Initially, no file is selected
    const[selectedFile,setSelectedFile] = useState()

    
    // On file select (from the pop up)
    const onFileChange = (event) => {

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
        selectedFile
        //selectedFile.name,
        
      );
    
      // Details of the uploaded file
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send formData object
   
      var url=`${PIZZAHOST}/itemImage/add/${itemId}`
      axios.post(url, formData,{withCredentials: true});
      //axios.post(url, selectedFile,{withCredentials: true});
     toast.success('image added')
    // setImage(selectedFile)
    // navigate('/addpizzasize')
    };
    
//let string = `${URL}itemImage/item/${itemComp.itemid}`
const url=`${PIZZAHOST}/itemImage/item/${itemId}`;

    
      return (
          <><div>
              <Home />
          </div>
          
          
          {/* <img id="pizzaimg" src= {`data: image/png; base64,${PIZZAHOST}/itemImage/item/${itemId}`}  alt='s'/> */}
          {/* {image} */}

          <div className="outerdiv-emp-form">

            <div>
                <input type="file" onChange={onFileChange}/>
                <button onClick={onFileUpload} className="btn btn-info btn-sm mx-2" >
                    Upload
                </button>
                <button onClick={() => navigate('/showallpizza')} className="btn btn-danger btn-sm mx-2" >
                    back
                </button>
                <br/><br/>
                {/* <img src={image} /> */}
                <img src={url}  style={{minHeight:"300px"}}/>
            </div>
            {/* {fileData()} */}
          </div>
          
          </>
      );
    }
  

 
  export default Upload;