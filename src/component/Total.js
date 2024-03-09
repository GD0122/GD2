import React, { useEffect,useState } from 'react'
import Form from 'react-bootstrap/Form'
import apis from '../api/Datass'
import Pembelian from './container/Pembelian'
import SubPembelian from './container/SubPembelian'
import Button from 'react-bootstrap/esm/Button'
import Pembayaran from './container/Pembayaran'
import SubPembayaran from './container/SubPembayaran'
import Pendapatan from './container/Pendapatan'
import SubPendapatan from './container/SubPendapatan'
import '../component/datapasien.css'
import moment from 'moment'
function Total() {
    const years = new Date().getFullYear()
    const month = new Date().getMonth()+1
    const [dataPendapatan,setDataPendapatan] = useState()
    const [dataPembayaran,setDataPembayaran] = useState()
    const [dataPembelian,setDataPembelian] = useState() 
    const [searchM,setSearchM] = useState()
    const [subPembelian,setSubPembelian] = useState()
    const [subDPembayaran,setSubDPembayaran] = useState()
    const [subDPendapatan,setSubDPendapatan] = useState()
    const [selected,setSelected] = useState(true)
     

    const getData = async()=>{
       
        try {
            const fullData = await apis.get()
            const dat = fullData.data.data
            const getDataPem = await dat?.filter((data)=>data.Jenis === "Pembelian Barang")
            setDataPembelian(getDataPem)
            const getDataPembyrn = await dat?.filter((data)=>data.Jenis === "Pembayaran Dokter")
            const filPmbnyrnDktr = await getDataPembyrn?.filter((data)=> data.Bersih > 0)
            setDataPembayaran(filPmbnyrnDktr)
            const getPend = await dat?.filter((data)=>data.Jenis === "Pendapatan Pasien")
            setDataPendapatan(getPend)
            
        } catch (error) {
            console.log("Sorry something Err")
        }
    }

    const getFullData = async()=>{
       setSelected(true)
        try {
       
            const local_pas = await JSON.parse(localStorage.getItem('data_adm'))
            const getDataPem = await local_pas?.filter((data)=>data.Jenis === "Pembelian Barang")
            setDataPembelian(getDataPem)
            const getdok = await local_pas?.filter((data)=>data.Jenis === "Pembayaran Dokter" && data.Bersih > 0)
            setDataPembayaran(getdok)
            const getPend = await local_pas?.filter((data)=>data.Jenis === "Pendapatan Pasien")
            setDataPendapatan(getPend)


        } catch (error) {
            console.log("Sorry something Err")
        }
    }

    const getSubData = async(e)=>{
        setSelected(false)
        e.preventDefault()

        try {
            const searchMonth = await document.getElementById("bulan").value
            const data1 = dataPembelian.filter((data)=>new moment(data.Tanggal).format('MMM') === new moment(searchMonth).format('MMM'))
            setSubPembelian(data1)
            const getSubPemb = dataPembayaran?.filter((data)=>new moment(data.Tanggal).format('MMM') === new moment(searchMonth).format('MMM'))
            setSubDPembayaran(getSubPemb)
             
            const getSubPend = dataPendapatan?.filter((data)=>new moment(data.Tanggal).format('MMM') === new moment(searchMonth).format('MMM'))
            setSubDPendapatan(getSubPend)
            setSearchM(searchMonth)
        } catch (error) {
            
        }

    }
  
    useEffect(()=>{
     getData()

    },[])
  return (
    <div className='containers'>
        <div>
            <h1>Total Pendapatan Dan Pengeluaran</h1>
        </div>
        
        <div style={{display:'flex',justifyContent:'center'}}>
        <Form.Group className="mb-3">
        <Form.Label>Bulan</Form.Label>
        <Form.Select defaultValue={month} id="bulan"  >
            <option  value={1}>January</option>
            <option  value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
        </Form.Select>
        <Form.Label>Tahun</Form.Label>
        <Form.Select >
          <option>{years}</option>
        </Form.Select>
      </Form.Group>
      
     
        </div>
        <div>
      <Button style={{margin:'10px'}} onClick={(e)=>getSubData(e)}>Cari</Button>
      <Button onClick={(e)=>{getFullData(e)}}>Lihat Semua</Button>   
      </div>
      
        <div>
            
            <div style={{display:selected?"none":"block"}}>
                <SubPembelian>{{searchM,subPembelian}}</SubPembelian>
                <SubPembayaran>{{searchM,subDPembayaran}}</SubPembayaran>
                <SubPendapatan>{{searchM,subDPendapatan}}</SubPendapatan>
                
            </div>
            <div>
            
            </div>
            <div style={{display:selected?"block" :"none"}} >
                <Pembelian>{dataPembelian}</Pembelian>
                <Pembayaran>{dataPembayaran}</Pembayaran>
                <Pendapatan>{dataPendapatan}</Pendapatan>
            </div>
        </div>
    </div>
  )
}

export default Total