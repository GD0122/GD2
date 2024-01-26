
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

function App() {
  return (
    <div className="App">

        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<DataPasien/>}/>
            <Route path='/tambah_data' element={<FormDaftarPasien/>}/>
            <Route path='/tambah_data/:nama_pasien' element={<Formpasien/>}/>
            <Route path='/jadwal' element={<Jadwal></Jadwal>}/>
            <Route path='/tmbah_jdwl/:nama_pasien' element={<Tmbh_jdwal/>} />
            <Route path='/tmbh_jdwl' element={<Tmbh_jdwal/>}/>
            <Route path='/Pembelian_barang' element={<Tambah_pengeluaran/>}/>
            <Route path='/Stock_barang' element={<Stock_barang/>}/>
            <Route path='/edit_barang/:nama_barang' element={<Edit_Brng/>}/>
            <Route path='/detail_pasien/:nama_pasien' element={<DetailPasien/>}/>
            <Route path='/total' element={<Total/>} />
            <Route path='/error_page' element={<ErrorPage/>}/>
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </Router>
        <Footer/>
        {/* <Formpasien/> */}
        
    </div>
  );
}


export default App;
