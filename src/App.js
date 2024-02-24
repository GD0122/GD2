
import './App.css';
import Formpasien from './Form/Formpasien';
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
import Tmbh_jdwal from './component/Tambh_jdwal.js';
import Tambah_pengeluaran from './component/Tambah_pengeluaran.js';
import Stock_barang from './component/Stock_barang.js';
import Edit_Brng from './component/Edit_Brng.js';
import FormDaftarPasien from './Form/FormDaftarPasien.js';
import DetailPasien from './component/DetailPasien.js';
import Footer from './component/Footer.js';
import Page404 from './Pages/Page404.js';
import ErrorPage from './Pages/ErrorPage.js';
import ScrolltoTop from './component/ScrolltoTop.js';
import _Logins from './Pages/_Logins.js';
import React,{useState,useEffect} from 'react';
import _UsersVal from './Pages/_UsersVal.js';
import Home_test from './test/Home_test.js';



function App() {

 

  return (
    <div className="App">
  
 
    

        <Header />
        <Router>
          <ScrolltoTop>
          <Routes>
        
           <Route path='/login' element={<_Logins/>} />
           <Route path='/' element={<_UsersVal><Home_test/></_UsersVal>}/>
    


            {/* <Route path='/' element={<_UsersVal><DataPasien/></_UsersVal>}/> */}
            {/* <Route path='/tambah_data' element={<_UsersVal><FormDaftarPasien/></_UsersVal>}/>
            <Route path='/tambah_data/:nama_pasien' element={<_UsersVal><Formpasien/></_UsersVal>}/>
            <Route path='/jadwal' element={<_UsersVal><Jadwal/></_UsersVal>} />
            <Route path='/tmbah_jdwl/:nama_pasien' element={<_UsersVal><Tmbh_jdwal/></_UsersVal>} />
           
            <Route path='/Pembelian_barang' element={<_UsersVal><Tambah_pengeluaran/></_UsersVal>}/>
            <Route path='/Stock_barang' element={<_UsersVal><Stock_barang/></_UsersVal>}/>
            <Route path='/edit_barang/:nama_barang' element={<_UsersVal><Edit_Brng/></_UsersVal>}/>
            <Route path='/detail_pasien/:nama_pasien' element={<_UsersVal><DetailPasien/></_UsersVal>}/>
            <Route path='/total' element={<_UsersVal><Total/></_UsersVal>} /> */}
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
