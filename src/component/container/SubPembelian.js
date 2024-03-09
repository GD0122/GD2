import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './total.css'
import moment from 'moment';
import { _Formater } from '../../Config/Formatter';

export default function (data) {
    

    const [total,setTotal] = useState()


    const formater = new Intl.NumberFormat('id-ID',{
      style:'currency',
      currency:'ind'
  })
     
    function sumSimpleArray(array) {
          let sum = 0;
          for(let i = 0; i < array?.length; i++) {
               sum += array[i];
          }
          setTotal(sum)
          
      }
    
      const datas = data && data?.children?.subPembelian?.map((data)=>data.Bersih) 
    useEffect(()=>{
        sumSimpleArray(datas)
    },[data])
    
    
  return (
    <div className='container-total'>
    <div>
      <div >
        <h1 className='header-total'>Data Pembelian Bulan {new Date(data?.children?.searchM).toLocaleString('id',{month:'long'})}</h1>
      </div>
          <div>
          <Table style={{fontSize:'10px'}} striped bordered hover variant="dark">
              <thead>
                            <tr>
                              <th>Tanggal </th>
                              <th>Total Pembayaran</th>
                              <th>Keterangan</th>
                            </tr>
                            </thead>
              <tbody>
              {data && data?.children?.subPembelian?.map((data,i)=>{
                return (
                  <tr key={i}>
                        {/* <p>Tanggal: {new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</p>
                        <p>Keterangan: {data.Ket}</p>
                        <p style={{borderBottom:'2px solid black'}}></p>
                        <p>Total Pembayaran: {formater.format(data.Bersih).replace("IND","Rp.")}</p>
                        <p style={{borderBottom:"5px solid black"}}></p> */}
                
                                <td>{new moment(data.Tanggal).format('LL')}</td>
                                <td>{_Formater.format(data.Bersih).replace("IND","Rp.")}</td>
                                <td>{data.Ket}</td>
                             
                   
                    </tr>
                    
                )
              })}
              <tr><td colSpan={'3'}>Total Semua Pembelian Barang {_Formater.format(total).replace("IND","Rp.")}</td>
              </tr>
              </tbody>
              </Table>
           
          

          </div>

       
        
    </div>
  </div>
  )
}
