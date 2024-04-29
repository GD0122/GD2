import React, { Component, useCallback } from 'react'
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { connect } from 'react-redux';
import './pagepagination.css'
import { getPass } from '../Redux/Reducer/_Pasien'
class PagePagination extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
        isShow: parseInt(props.totalData) < 1,
        totalCount: null,
        perPage: localStorage.getItem(`${props?.pageName}`) || 5,
        isdisable: false,
        activePage: props?.activePages || 1,
    };
    this.formRef = React.createRef();
}


componentDidUpdate(prevProps) {
  if (prevProps.activePages !== this.props.activePages) {
      this.setState({ activePage: this.props.activePages });
  }
}
    componentDidMount(){
      
      const pages = Math.ceil( this.props?.totalData / this.state.perPage)
      const count = Array.from({ length: pages }, (_, index) => index + 1);
      this.setState({totalCount:count})
    }
 
    onChangeActivePage = async(dataIndex)=>{
     
        try {
            
            await this.props?.Actions({page:dataIndex,perPage:this.state.perPage});
            await this.props?.OnPageChange(dataIndex)   
        } catch (error) {
            console.log(error);
        }
    
    }
    onChangeperPage = async(jml)=>{
      
      const { totalData,pageName } = this.props;
    
      if(jml > totalData){
        alert('maaf, jumlah data belum mencapai limit')
      }else{
        
        await localStorage.setItem(`${pageName}`,jml)
        const pages = Math.ceil( this.props?.totalData / jml)
        const count = Array.from({ length: pages }, (_, index) => index + 1);
        this.setState({totalCount:count})
        this.setState({perPage:jml})
      }
    }
    render(){
      const { activePage, perPage, } = this.state;
      const { totalData,pageName } = this.props;
      const dataLimit = localStorage.getItem(`${pageName}`)
      const totalPages = Math.ceil(totalData / perPage);
      const siblingCount = 1;
      let startPage = Math.max(1, activePage - siblingCount);
      let endPage = Math.min(totalPages, activePage + siblingCount);
  
      if (activePage - siblingCount <= 1) {
          endPage = Math.min(endPage + siblingCount - activePage + 1, totalPages);
      }
  
      if (totalPages - activePage <= siblingCount) {
          startPage = Math.max(startPage - siblingCount + (totalPages - activePage), 1);
      }
  
      const startIdx = (activePage - 1) * perPage + 1;
      const endIdx = Math.min(activePage * perPage, totalData)
      const options = [];
      const initialValue = 5; 
      
      
      for (let i = initialValue; i <= totalData; i += initialValue) {
          options.push(i);
      }
      if (totalData === 0 || !totalData) {
        return null;
       }
   
        return(
          
          <div>
          
           <div className='mt-3 mb-3' style={{
             display:'flex', 
             width:'100%'
             ,justifyContent:'center'
             ,alignItems:'center',
             

          
          }}>
          
             <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                  <Form.Label style={{color:'white'}}>Limit : </Form.Label>
                  <Form.Select
                    style={{ maxWidth: '70px' }}
                    onChange={(e) => { this.onChangeperPage(e.target.value) }}
                    value={dataLimit || perPage}
                    >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                      {totalData % initialValue === 0 ? null : <option value={totalData}>{totalData}</option>}
                </Form.Select>
             
             
             </div>
              <div >
                  <p ><i> List : {startIdx}-{endIdx}  of  {totalData} </i></p>
              </div>
          </div>
          <div>
              <Pagination style={{ justifyContent: 'center', display: 'flex' }}>
                    <Pagination.First disabled={activePage === 1} onClick={() => this.onChangeActivePage(1)} />
                    <Pagination.Prev disabled={activePage === 1} onClick={() => this.onChangeActivePage(activePage - 1)} />
                    
                    {startPage > 1 && 
                    <>
                    <Pagination.Item  onClick={() => this.onChangeActivePage(1)}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    </>
                    }
                     {Array.from({ length: Math.max(endPage - startPage + 1, 0) }).map((_, i) => (
                        <Pagination.Item key={startPage + i} active={activePage === startPage + i} onClick={() => this.onChangeActivePage(startPage + i)}>
                            {startPage + i}
                        </Pagination.Item>
                    ))}
                    {endPage < totalPages &&
                    <>
                   
                      <Pagination.Ellipsis />
                      <Pagination.Item  onClick={() => this.onChangeActivePage(totalPages)}>{totalPages}</Pagination.Item>
                    </>
                  
                    }
                    <Pagination.Next disabled={activePage === totalPages} onClick={() => this.onChangeActivePage(activePage + 1)} />
                    <Pagination.Last disabled={activePage === totalPages} onClick={() => this.onChangeActivePage(totalPages)} />
                </Pagination>
          </div>
      </div>
        
        )
    }
}



export default connect()(PagePagination);