'use client'


import './App.css';
import DataPasien from './component/DataPasien';
import Header from './component/Header.js';
import Total from './component/Total.js';
import * as ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Jadwal from './component/Jadwal.js';
import Stock_barang from './component/Stock_barang.js';
import DetailPasien from './component/DetailPasien.js';
import Footer from './component/Footer.js';
import Page404 from './Pages/Page404.js';
import ErrorPage from './Pages/ErrorPage.js';
import ScrolltoTop from './component/ScrolltoTop.js';
import _Logins from './Pages/_Logins.js';
import React,{useState,useEffect} from 'react';
import _UsersVal from './Pages/_UsersVal.js';
import Test from './Pages/Test.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

 

  return (
    <div className="App">
  
 
    

      
        <Router>
        <Header />
        {/* <Test /> */}
        <ToastContainer />
          <ScrolltoTop>
          <Routes>
         
           <Route path='/login' element={<_Logins/>} />
           <Route path='/' element={<_UsersVal><DataPasien/></_UsersVal>}/>
    

            <Route path='/detail_pasien/:nama_pasien' element={<_UsersVal><DetailPasien/></_UsersVal>}/>
            <Route path='/jadwal' element={<_UsersVal><Jadwal/></_UsersVal>} />
            <Route path='/Stock_barang' element={<_UsersVal><Stock_barang/></_UsersVal>}/>
            <Route path='/total' element={<_UsersVal><Total/></_UsersVal>} />
            
            <Route path='/error_page' element={<ErrorPage/>}/>
            <Route path='*' element={<Page404/>}/>
          </Routes>
          </ScrolltoTop>
        </Router>
        <Footer/>
        {/* <Formpasien/> */}
        
    </div>
  );
}


export default App;
