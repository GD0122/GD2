import React, { useEffect, useState } from 'react'
import './home.css'
import Pasiens from '../components/Pasiens'
import {Button} from 'react-bootstrap'
import {connect, useDispatch,useSelector} from 'react-redux'
import { SelErrPass, SelLoad, SelPasien, _getSearch, getPass } from '../Redux/Reducer/_Pasien'
import _LoadingD from '../Pages/_LoadingD'
import Modals_Comp from '../components/Modals_comp'
import { pendaftaran_pasien } from '../Config/_Form'
import { _addPass, origin, URLAPIS } from '../Config/_Calls'
import {Form,Col,Row} from 'react-bootstrap'
import './containers-bg.css'
import  PagePagination  from '../components/PagePagination'
import axios from 'axios'
function Home() {

    const dispatch = useDispatch()
    const passiens = useSelector(SelPasien)
    const isLoad = useSelector(SelLoad)
    const Err = useSelector(SelErrPass)
    const [search,setSearch] = useState()
    const [page,setPage] = useState(1)
    

 const Search = async()=>{
    setPage(1)
    search
    ?await dispatch(_getSearch({names:search,page}))
    :await dispatch(getPass(page))
    
 }


 const CheckCookie = async () => {
    try {
        const response = await axios.get('https://test-apis-five.vercel.app/check-cookie',{withCredentials:true});
       
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const getCookie = async()=>{
  
    const response2 = await axios.post('https://test-apis-five.vercel.app/tester',{origin},{withCredentials:true});
    console.log('rsa',response2)
}
 useEffect(()=>{
    Search()
    // getCookie()
  
    document.title = 'Galuh Dental | Home'
 },[])

const handlerActionsPage = async(data)=>{
    search
    ?dispatch(_getSearch({names:search,page:data?.page}))
    :dispatch(getPass({page:data?.page,perPage:data?.perPage}))
}
 const handlerPage = async(newPage)=>{
    await setPage(newPage)
   
 }

 const clearSearch = () => {
    setSearch('');
};
  return (
    <div className='home containers-bg' style={{ background: '#8a2be2',
       
    }} >
        <div style={{marginTop:"100px"}}>
        
        <Form onSubmit={(e) => { e.preventDefault(); }}>
            <Row className='justify-content-center'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <div className="input-wrapper">
                        <Form.Control
                            id="searchInput"
                            type="text"
                            placeholder="Search"
                            className="mx-2 my-2 input-field"
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                        {search && (
                            <Button onClick={clearSearch} className='clear-button'>x</Button>
                        )}
                    </div>
                </Col>
                <Col xs="auto">
                    <Button onClick={Search} className='my-2 mx-2'>Cari Pasien</Button>
                </Col>
            </Row>
        </Form>
        </div>

        <div className='mt-2'>
         <Modals_Comp but={'Tambah Pasien'} data={pendaftaran_pasien} header={'FORM DAFTAR PASIEN'} 
          Actions = {_addPass} onUpdates={handlerActionsPage}
         />
        </div>
        <div  >
        {
                isLoad ? (
                    Err ? <h1>Gagal Memuat Data..</h1> : <_LoadingD/>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
                       {passiens  && passiens['pasien']?.length === 0   ? (
                            <h3 className='mt-5'>Pasien tidak ditemukan</h3>
                        ) : (
                            <div className='mt-2' style={{
                                display: 'flex', 
                                flexDirection: 'row'
                                , justifyContent: 'center',
                                flexWrap: 'wrap', flex: 1 ,
                                alignContent:'flex-start',
                                alignItems:'center'}}>
                                {passiens['pasien']?.map((data, i) => {
                                    return (
                                        <div key={i} className='test' style={{ maxHeight: '200px' }}>
                                            <Pasiens data={data} edit={false} page={page} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                     
                        <div>
                            <PagePagination 
                             totalData={passiens['pages']?.totalData}
                             pageName={'pasienLimit'}
                             Actions={handlerActionsPage}
                             activePages = {page}
                             OnPageChange = {handlerPage}
                            />
                        </div>
                        
                    </div>
                )
            }
           
        </div>
       
    </div>
  )
}
export default Home;