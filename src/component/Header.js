import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./header.css"
import { useDispatch, useSelector } from 'react-redux';
import { Active, SelUsers, _uLogout } from '../Redux/Reducer/_Users';
import Button from 'react-bootstrap/esm/Button';
import _InterCon from '../api/_InterCon';
import _TokenVal from '../Config/_TokenVal';
import { jwtDecode } from 'jwt-decode'
import Message from '../components/Message';
import { URLAPIS } from '../Config/_Calls';
import { useNavigate } from 'react-router-dom';
function Header() {

const user = useSelector(SelUsers)
const dispatch = useDispatch()
const Navs = useNavigate()



const getUser = ()=>{
 
  const local = localStorage.getItem('ac')
  if(local !== null){
    const us = _TokenVal(local)
    const dec = jwtDecode(us)

    dispatch(Active(dec))
  }else{
    dispatch(_uLogout())
  }
  
}
const Logout = async()=>{
  localStorage.clear()
  const a = await _InterCon.delete(`${URLAPIS}account/logout`,{withCredentials:true}
  ).then((res)=>{
    localStorage.clear()
    Message({type:'succes',message:res?.data?.message})    
    dispatch(_uLogout())
    Navs('/login')
  }).catch((err)=>{
    Message({type:'err',message:err?.response?.data?.message})    
  })
  const nav = document.getElementById('basic-navbar-nav')
  nav.classList.remove('show')
}

useEffect(()=>{
   getUser()

},[])

  return (
    <div style={{zIndex:'100000'}}>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/' >
           <span className='span-header'></span><div className='images image-cover' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbars'>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
      
              <Nav.Link href="/jadwal">
                Lihat Jadwal
              </Nav.Link>
          
    
            <NavDropdown title="Administrasi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Stock_barang">
                Stock Barang
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/total">
                Total Pendapatan & Pengeluaran
              </NavDropdown.Item>
             
            </NavDropdown>
            {user.length !==0?<Button  onClick={()=>{Logout()}}>Logout</Button> : " "}    
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header