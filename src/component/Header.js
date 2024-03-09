import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./header.css"
import { useDispatch, useSelector } from 'react-redux';
import { SelUsers, userLogout } from '../Redux/Reducer/_Users';
import Button from 'react-bootstrap/esm/Button';
import { googleLogout } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom';


function Header() {

const users = useSelector(SelUsers)
const dispatch = useDispatch()
const Navs = useNavigate()
const Logout = async()=>{

    googleLogout();
    localStorage.removeItem('access_dental')
    dispatch(userLogout())
    alert("Logout Berhasil")
    Navs('/login')
   
 
    
}



  return (
    <div style={{zIndex:'100000'}}>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/' >
           <span className='span-header'></span><img  className='images image-cover'/></Navbar.Brand>
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
            {users&&users.map((data,i)=>{
              return(
                <Button  onClick={()=>{Logout()}}>Logout</Button>
              )
            })}
          
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header