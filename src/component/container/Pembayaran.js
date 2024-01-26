import React, {useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';

export default function Pembayaran(data) {

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
    <div style={{marginTop:'100px', border:'3px solid black', margin:'5px',borderRadius:'10px'}}>
        <div>
            <h1 style={{fontSize:'20px'}}>Data Semua Pembayaran Dokter</h1>
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
              {data&&data?.children?.map((data,i)=>{
                return(
                    <tr key={i}>
                        <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                        <td>Total Pembayaran: {formater.format(data.Bersih).replace("IND","Rp.")}</td>
                        <td>{data.Ket}</td>
                        
                    </tr>
                )
            })}
            <tr>
                <td colSpan={'3'}>Total Semua Pembayaran {formater.format(total).replace("IND","Rp.")}</td>
            </tr>
             </tbody>
            </Table>

        </div>
      
    </div>
  )
}
