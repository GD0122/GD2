import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./header.css"
import test from '../logo/logo6.png'

function Header() {

  return (
    <div style={{zIndex:'10000'}}>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href='/' >
           <span className='span-header'></span><img src={test} className='images image-cover'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbars'>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tambah_data">Tambah Data Pasien</Nav.Link>
      
              <Nav.Link href="/jadwal">
                Lihat Jadwal
              </Nav.Link>
          
    
            <NavDropdown title="Administrasi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Pembelian_barang">
                Pembelian Barang
              </NavDropdown.Item>
              <NavDropdown.Item href="/Stock_barang">
                Stock Barang
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/total">
                Total Pendapatan & Pengeluaran
              </NavDropdown.Item>
             
            </NavDropdown>
   
          
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header