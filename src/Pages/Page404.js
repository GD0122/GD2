import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Pageall.css'

function Page404() {
    const Nav = useNavigate()
    const [detik,setDetik] = useState(5)
    useEffect(()=>{
        document.title = 'Galuh Dental | Page Not Found'
        const Navi = setInterval(()=>{
            Nav('/')
        },7000)
       
        return ()=>{clearInterval(Navi)}

    },[])

    useEffect(() => {
        const countdown = setInterval(() => {
            setDetik(detik => detik - 1); // Mengurangi detik setiap detiknya
        }, 1000);

        // Membersihkan interval setelah komponen tidak lagi digunakan
        return () => clearInterval(countdown);
    }, []); // Menggunakan array kosong agar useEffect hanya dijalankan sekali

  return (
    <div className='container-page'>
        <div className='img-page' style={{
            backgroundImage: `url(${process.env.PUBLIC_URL+'/assets/tooth.webp'})`,
            minHeight: '100vh',
            minWidth: '100%',
            backgroundSize: '300px',
            margin: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'left center',
            zIndex:'10',
            position:'absolute'
        }}>
        
        </div>
        <div className='pesan' style={{
        border: '10px solid black',
        minHeight: '300px',
        margin: 'auto', /* Menengahkan secara horizontal dan vertikal */
        maxWidth: '80%',
        display: 'flex', /* Menggunakan flexbox */
        justifyContent: 'center', /* Menengahkan secara horizontal */
        alignItems: 'center', /* Menengahkan secara vertikal */
        borderRadius: '10px',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0', /* Warna latar belakang */
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', /* Bayangan */
        padding: '20px', /* Padding agar konten tidak terlalu dekat dengan tepi */
        zIndex: '100',
        marginTop:'200px',
        borderRadius:'10px 100px'
        }}>
    <div className='head-pesan' style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: '0' }}>Page Belum Tersedia</h3> {/* Menyisipkan margin 0 agar tidak ada jarak ekstra */}
    </div>
    <div className='isi-pesan' style={{ color: 'black', textAlign: 'left' }}> {/* Mengatur teks ke kiri */}
        <p style={{ margin: '0' }}>Sepertinya halaman yang Anda cari belum tersedia. Anda akan dialihkan kembali ke halaman home.</p>
       
    </div>
    {detik >= 0 ? <p style={{ margin: 'auto' }}>
         <span style={{color:'red'}}>
            {detik} 
         </span> 
           detik
         </p> : 
         <p style={{ margin: 'auto',color:'red' }}>
            Siap dialihkan!
        </p>}
    </div>
       
        
    </div>
  )
}

export default Page404