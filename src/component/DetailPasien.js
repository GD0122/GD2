import React, { useEffect } from 'react';
import { SelErrPass, SelLoad, SelPasienDetail, getDetailPass } from '../Redux/Reducer/_Pasien';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Pasiens from '../components/Pasiens';
import { useNavigate } from 'react-router-dom';
import FotoPasien from './FotoPasien';
import AddImgModals from '../components/AddImgModals';
import Rekam from '../components/Rekam';
import { tambah_jadwal } from '../Config/_Form';
import { _addJad, _addJadwal } from '../Config/_Calls';
import Modals_comp from '../components/Modals_comp';
import './containers-bg.css'
import _LoadingD from '../Pages/_LoadingD';
import { _Decrypt } from '../Config/_Decrypt';
import { FaWhatsapp } from 'react-icons/fa';
export function DetailPasien() {
  const Navigates = useNavigate();
  const pasiens = useSelector(SelPasienDetail);
  const isLoad = useSelector(SelLoad);
  const isErr = useSelector(SelErrPass);
  const { id, page } = useParams();
  const dispatch = useDispatch();
  const checkData = async () => {

    const res =  await dispatch(getDetailPass(id));
    if (res.payload === null) {
      Navigates('/')
    }
  };

  useEffect(() => {
    checkData();
    document.title = 'Galuh Dental | Detail Pasien';
   
  }, []);
  
 const sendWa= async(data)=>{
  const dats = _Decrypt(data)
  window.location.href='https://wa.me/'+dats
 }
  return (
    <div className='containers-bg' style={{ minHeight: '100vh', minWidth: '100%' }}>
      <div style={{ marginTop: '100px' }}>
        <h1>Detail Pasien</h1>
      </div>
     

      {isLoad ? (isErr ? <>ups...something err</> : 
      <>
        <_LoadingD/>
      </>) : (
        <>
          {pasiens && Object.keys(pasiens).length > 0 ? (
            <React.Fragment>
              <div className='container-pas'>
                <Pasiens data={pasiens} updates={checkData} edit={true} />
              </div>
              <div className='pt-5'>
                <Modals_comp  header={'Tambah Jadwal'} data={tambah_jadwal}  idPas={id} Actions={_addJadwal} but={'Tambah Jadwal'} />
              </div>
              <div className='pt-5'>
                <Rekam idP={id} />
              </div>
              <div className='pt-5'>
                <FotoPasien id={id} />
              </div>
              <div className='pt-5 pb-5'>
                <AddImgModals idP={id} page={page} onUpdates={checkData} />
              </div>
              <div className="whatsapp-icon" style={{
                position:'absolute',position:'fixed',
                bottom:'10em',
                right:'10px',
                zIndex:'10'
                }}
                onClick={()=>{sendWa(pasiens?.noTelp)}}
                 >
                 <FaWhatsapp size={50} color="green"
                    style={{ transform: 'rotateY(190deg)', backgroundColor:'white',
                      borderRadius:'50%'
                 }}
                 /> 
              </div>
            </React.Fragment>
          ) : (
            <div className='pt-2'>
              <h1>Data tidak ditemukan</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
