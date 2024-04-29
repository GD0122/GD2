
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import "../component/datapasien.css"
import "./login.css"
import axios from 'axios'
import { Active, SelUsers } from '../Redux/Reducer/_Users'
import Form from 'react-bootstrap/Form'
import _getUser from '../Config/_Validator'
import { useDispatch, useSelector } from 'react-redux';
import _InterCon from '../api/_InterCon'
import _TokenVal from '../Config/_TokenVal'
import { jwtDecode } from 'jwt-decode'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { RiLockPasswordLine } from 'react-icons/ri';
import { URLAPIS } from '../Config/_Calls'


function _Logins() {

  const [disabled,setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const users = useSelector(SelUsers)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
 const Submit=async(e)=>{
   setDisabled(true)
   e.preventDefault()
  
   const formEl = document.getElementById('form-login')
   const forms = new FormData(formEl)
   const uname = forms.get('username')
   const pass = forms.get('password')


    try {
      await axios.post(`${URLAPIS}account/login`,
      
      {origin:'http://localhost:3000',
        username:uname,
        password:pass
      },{withCredentials:true,})
      .then((res)=>{
        localStorage.setItem('ac',res.data.ac)
        const dt =  _TokenVal(localStorage.getItem('ac'))
        const us = jwtDecode(dt)
        dispatch(Active(us))
        Message({type:'succes',message:res.data.message})
        setDisabled(false)
        formEl.reset()
        navigate('/')
      }).catch((err)=>{
         throw err
      })
    } catch (error) {
      if(error.code === "ERR_NETWORK"){
       Message({type:'err',message:"terlalu banyak permintaan, cobalah beberapa saat lagi"})
         setDisabled(false)
      }
      Message({type:'err',message:error?.response?.data?.message})
      setDisabled(false)
     }
  }



useEffect(()=>{
    document.title = "Loading..."
    const getUs = setTimeout(()=>{
      setIsLoading(false)
      if(users.length !==0){
            navigate('/')
        }
    },1200)
    document.title="Galuh Dental | Login"
    return()=>{
      clearTimeout(getUs)
      document.title="Galuh Dental | Login"
    }
  
},[users])



new Notification('test')
     
  return (

    <div className='container-page'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
        
        }}>
         
          <Form id='form-login' onSubmit={(e) => Submit(e)} style={{ 
              maxWidth: '300px', 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.26)', /* Warna latar belakang dengan transparansi */
              backdropFilter: 'blur(5.9px) saturate(150%)', /* Efek backdrop filter untuk tampilan kaca */
              borderRadius: '20px', /* Memanjangkan sudut */
              padding: '20px' ,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              border:' 1px solid rgba(255, 255, 255, 0.41)',
          }}>
             <div className='fa-locks' style={{ marginBottom: '20px' }}> {/* Mengatur jarak bawah untuk ikon gembok */}
                <RiLockPasswordLine  className='icon-lock'/> {/* Menambahkan ikon gembok */}
              </div>
              <fieldset disabled={disabled}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" autoComplete='off' name="username" placeholder="Enter username" required style={{ borderRadius: '20px', marginBottom: '15px' }} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" autoComplete='off' name="password" placeholder="Password" required style={{ borderRadius: '20px', marginBottom: '15px' }} />
                  </Form.Group>
                  <Button type='submit' style={{ width: '100%', borderRadius: '20px', backgroundColor: '#007bff', border: 'none' }}>
                      Login
                  </Button>
              </fieldset>
          </Form>
      </div>
          <div>
            
          </div>
   </div>
  )
}

export default _Logins