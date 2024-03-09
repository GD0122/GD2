import React, { useEffect, useState } from 'react'
import api from '../api/DataPasien';
import "./datapasien.css"
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import Form from 'react-bootstrap/Form'
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { DataAdm, DataBrng, DataJad, GetPasien, RekamPas, SelPasien } from '../Redux/Reducer/_Pasien';
import api2 from '../api/Datass'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Makeid } from '../Config/MakeId';
import moment from 'moment';
import { Bounce, toast } from 'react-toastify';



function DataPasien() {
    const salt = process.env.REACT_APP_SALT
    const salt2 = process.env.REACT_APP_SALT2
    const [datap,SetDatap] = useState([])
    const [search,setSearch] = useState("")
    const search_parameters = Object.keys(Object.assign({}, ...datap));
    const Nav = useNavigate()
    const dispatch = useDispatch()
    const pasien = useSelector(SelPasien)
    const [show,setShow] = useState(false)
    
    const dataPas = Object.values(datap)
    const isLoad = dataPas.length !== 0
    const  goToDetail = async(data)=>{
        Nav('/detail_pasien/'+data)
    }

   

    function getSearch(data){
        return data.filter((item) =>
              search_parameters.some((parameter) =>
                item[parameter].toString().toLowerCase().includes(search)
              ))
    }

   const getDatas = async()=>{
      try {
        const res = await api.get()
        const outPars = res.data.out1
        const bytes=  CryptoJS.AES.decrypt(outPars, salt)
        const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_pas',JSON.stringify(dataD.data))
        const local_pas = JSON.parse(localStorage.data_pas)
        await  dispatch(GetPasien(local_pas))
        SetDatap(dataD.data)

        const outPars1 = res.data.out2
        const bytes1=  CryptoJS.AES.decrypt(outPars1, salt)
        const dataD1 = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('info_pas',JSON.stringify(dataD1.data))
        const local_pas1 = JSON.parse(localStorage.info_pas)
        dispatch(RekamPas(local_pas1))

        const outPars2 = res.data.out3
        const bytes2=  CryptoJS.AES.decrypt(outPars2, salt)
        const dataD2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_adm',JSON.stringify(dataD2.data))
        const local_pas2 = JSON.parse(localStorage.data_adm)
        dispatch(DataAdm(local_pas2))

      } catch (error) {
        console.log("something err")
      }

    }
  
    const getDatas2 = async()=>{
      try {
        const res = await api2.get()
        const outPars = res.data.out1
        const bytes=  CryptoJS.AES.decrypt(outPars, salt)
        const dataD = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_jad',JSON.stringify(dataD.data))
        const local_pas = JSON.parse(localStorage.data_jad)
        dispatch(DataJad(local_pas))
        const outPars1 = res.data.out2
        const bytes1=  CryptoJS.AES.decrypt(outPars1, salt)
        const dataD1 = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8))
        localStorage.setItem('data_brng',JSON.stringify(dataD1.data))
        const local_pas1 = JSON.parse(localStorage.data_brng)
        dispatch(DataBrng(local_pas1))
       

      } catch (error) {
        console.log("sorry something err")
      }
    }

    useEffect(()=>{
     getDatas2()
     getDatas()
    },[])


    //modals
   const handleShow = ()=>setShow(true)
   const handleClose = ()=>setShow(false)
   const [disabled,setDisabled] = useState(false)
   async function Submit(e){
    e.preventDefault()
    setDisabled(true)
    const formEl = document.getElementById("tmbah-pasien")
    const Id = Makeid(5)
    const forms = new FormData(formEl)
    const No = forms.get('NoTelp')
    const NoE = CryptoJS.AES.encrypt(No.toString(),salt)
    // const decrypt = CryptoJS.AES.decrypt(NoE.toString(), salt)
    // const bytes = decrypt.toString(CryptoJS.enc.Utf8)
    // console.log(decrypt,bytes)
    forms.append('Id',Id)
    forms.append('salt',salt2)
    forms.set('NoTelp',NoE)


    try {
      const datas = await fetch('https://script.google.com/macros/s/AKfycbwMJlEws4b5DABDBNI26knodwudspyfiFHeasrFAIwy-vquwGtVaPkEKMJahXXWcvH2ug/exec',{
        method:"POST",
        body: forms
    })

      
    } catch (error) {
      toast.error('Gagal', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    handleClose()
    getDatas()
    toast.success('Berhasil',{
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
    setDisabled(false)
    
  
}


  return (
    <div className='containers' >
     
        {isLoad?(  
        <div >         
         <div >
            <h1 style={{color:'white'}}>Data Pasien</h1>
            <div style={{margin:'10px',alignItems:'center',display:'flex',justifyContent:'center'}}>
            <Form className="d-flex" >
            <Form.Control
              type="search"
              placeholder="Cari data pasien"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </Form>
            </div>
        </div>
        <div>
          <Button onClick={handleShow} disabled={show?'disabled':""}
            style={{background:'purple'}}
            >
             Tambah Pasien
          </Button>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='tmbah-pasien' onSubmit={(e)=>Submit(e)}>
            <fieldset disabled={disabled}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Nama</Form.Label>
                 <Form.Control type="text"   name="Nama" placeholder="Nama" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Umur</Form.Label>
                 <Form.Control type="number"   name="Umur" placeholder="Umur" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>No Telepon</Form.Label>
                 <Form.Control type="number"   name="NoTelp" placeholder="Nomer Telepon" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Tanggal Daftar</Form.Label>
                 <Form.Control type="date" name="Tanggal" placeholder="Tanggal" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Alamat</Form.Label>
                 <Form.Control className="form-comp"   as="textarea" type="text" name="Alamat" placeholder="Alamat" required/>
             </Form.Group>
             <Button className='btn-modals' variant="primary" type='submit'>
              Save Changes
             </Button>
             <Button className='btn-modals' variant="secondary" onClick={handleClose}>
               Close
             </Button>
            </fieldset>
           
            
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
       
        </Modal.Footer> */}
      </Modal>
        </div>
        
        <div className='container-datap'>
         
            {
                getSearch(pasien[0]).length === 0? 
                 <div style={{margin:'20px',display:'flex',justifyContent:'center'}}>
                   <h3>Data Tidak Ditemukan</h3>
                 </div>
                :
                getSearch(pasien[0]).map((data,i)=>{
                    return (
                       
                        <div key={i} >
                           
                             <Card style={{ width: '18rem',margin:'10px' }} className='card-pas border-purple' onClick={()=>goToDetail(data.Id)}>
                             <Card.Header >Galuh Dental</Card.Header>
                                <Card.Body>
                                <Card.Title style={{fontSize:'13px'}}>Nama Pasien: {data.Nama}</Card.Title>
                                <Card.Text>Umur : {data.Umur}</Card.Text>
                               
                                
                      <Card.Footer>
                      <small className="text-muted">Tanggal Daftar :  {new moment(data.Tanggal).format('LL')}</small>
                      </Card.Footer>
                      </Card.Body>
                      </Card>
                      </div>      
                    )
                })
            }
        </div>
        </div>
        ):(<LoadingPage/>)}

      
        
    
 
     
    </div>
    )
}


export default DataPasien