import React, { useEffect,useState } from 'react'
import Table from 'react-bootstrap/Table';

export default function Pembelian(data) {
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
const datas = data && data?.children?.map((data)=>data.Bersih)
  useEffect(()=>{
    sumSimpleArray(datas)
  },[data,total])
  return (
    <div style={{border:"3px solid black", borderRadius:'10px',margin:'5px'}}>
      <div>
        <div >
          <h1 style={{fontSize:'20px'}}>Data Semua Pembelian</h1>
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
              {data && data?.children?.map((data,i)=>{
                return (
                  <tr key={i}>
                        {/* <p>Tanggal: {new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</p>
                        <p>Keterangan: {data.Ket}</p>
                        <p style={{borderBottom:'2px solid black'}}></p>
                        <p>Total Pembayaran: {formater.format(data.Bersih).replace("IND","Rp.")}</p>
                        <p style={{borderBottom:"5px solid black"}}></p> */}
                
                                <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                <td>{formater.format(data.Bersih).replace("IND","Rp.")}</td>
                                <td>{data.Ket}</td>
                             
                   
                    </tr>
                    
                )
              })}
              <tr>
                <td colSpan={'3'}>Total Semua Pembelian Barang {formater.format(total).replace("IND","Rp.")}</td>
              </tr>
              </tbody>
              </Table>
            </div>
          
      </div>
    </div>
  )
}
