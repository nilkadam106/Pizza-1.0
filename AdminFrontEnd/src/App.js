import Signin from './project/Signin'
import Home from './project/Home'
import Addpizza from './project/Addpizza'
import Addpizzasize from './project/Addpizzasize'
import Addtoppings from './project/Addtoppings'
import Showallpizza from './project/showallpizza'
import Showtoppings from './project/showtoppings'
import Showfeedback from './project/showfeedback'
import Editpizza from './project/editpizza'
import Editpizzasize from './project/editpizzasize'
import Addpizzasizes from './project/Addpizzasizes'
import Viewprofile from './project/viewprofile'
import Pizzaimage from './project/pizzaimage'
import Edittoppings from './project/edittoppings'
import Orderstatus from './project/orderstatus'
import Changestatus from './project/changestatus'
import UploadToppingImg from './project/toppingimage'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import './App.css';
import React, { Component } from 'react';
import Header from './project/Header'
import { ErrorBoundary } from './project/ErrorBoundary'


const AuthorizeUser = () => {
  const loginStatus = sessionStorage['loginStatus']
  return loginStatus == '1' ? <Home /> : <Signin />
  //  if (loginStatus == '1') {
  //    return <Home />
  //  } else {
  //    return <Signin />
  //  }
}



function App() {
  
  return (
    <>

  
    <div>
      
      <ErrorBoundary>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AuthorizeUser />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addpizza" element={<Addpizza />} />
        <Route path="/addpizzasize" element={<Addpizzasize />} />
        <Route path="/showallpizza" element={<Showallpizza />} />
        <Route path="/addtoppings" element={<Addtoppings />} />
        <Route path="/showtoppings" element={<Showtoppings />} />
        <Route path="/showfeedback" element={<Showfeedback />} />
        <Route path="/editpizza" element={<Editpizza />} />
        <Route path="/editpizzasize" element={<Editpizzasize />} />
        <Route path="/addpizzasizes" element={<Addpizzasizes />} />
        <Route path="/viewprofile" element={<Viewprofile />} />
        <Route path="/pizzaimage" element={<Pizzaimage />} />
        <Route path="/edittoppings" element={<Edittoppings />} />
        <Route path="/orderstatus" element={<Orderstatus />} />
        <Route path ="/changestatus" element={<Changestatus />} />
        <Route path ="/toppingimage" element={<UploadToppingImg />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
      </ErrorBoundary>
    </div>
    
    </>
  )
}

export default App