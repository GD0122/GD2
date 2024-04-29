import React, { Component, Suspense, useEffect, useState } from 'react';
import _InterCon from '../api/_InterCon';
import axios from 'axios';
import moment from 'moment';
import './fotopasien.css';
import {
    TransformWrapper,
    TransformComponent,
    useControls
  } from "react-zoom-pan-pinch";
import { Button, Carousel,Modal, Spinner } from 'react-bootstrap';
import PagePagination from '../components/PagePagination';
import ControlsImg from '../components/ControlsImg';
import { URLAPIS } from '../Config/_Calls';


class FotoPasien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fotoPasien: null,
            totalData:null,
            error: null,
            page: 1,
            perPage: 6,
            showModal: false, 
            previewImageIndex: null,
            isLoading:true
        };
    }
    componentDidUpdate(prevProps, prevState) {
        // Memeriksa apakah page telah berubah setelah handlerActionsPage dijalankan
        if (prevState.page !== this.state.page) {
            // Panggil kembali _getPhotos atau fungsi apa pun yang diperlukan setelah perubahan page
            this.handlerActionsPage();
        }
    }
    

    componentDidMount() {
        this._getPhotos();
       
    }

    _getPhotos = async () => {
        this.setState({isLoading:true})
        let perPage = localStorage.getItem('fotoLimit') || 5
        try {
            const dt2 = await _InterCon.get(`${URLAPIS}files/gambars?idP=${this.props.id}&page=${1}&perPage=${perPage}`, {
                withCredentials: true
            });
          
            this.setState({
                fotoPasien: dt2?.data?.images,
                totalData:dt2?.data?.totalData,
                isLoading:false
            });
        } catch (error) {
            console.log('error');
        }
    }
    handlerActionsPage = async () => {
        this.setState({isLoading:true})
        let perPage = localStorage.getItem('fotoLimit') || 5
        try {
            const dt2 = await _InterCon.get(`${URLAPIS}files/gambars?idP=${this.props.id}&page=${this.state.page}&perPage=${perPage}`, {
                withCredentials: true
            });
          
            this.setState({
                fotoPasien: dt2?.data?.images,
                totalData:dt2?.data?.totalData,
                isLoading:false
            });
        } catch (error) {
            console.log('error');
        }
    }
    handlerActivePages = async(newPage)=>{
        await this.setState({...this.state,page:newPage})
    }
  

    handlePreview = (index) => { 
        this.setState({
            previewImageIndex: index,
            showModal: true
        });
    }

    handleCloseModal = () => {
        this.setState({
            previewImageIndex: null,
            showModal: false
        });
    }
    handleNextSlide = () => {
        const { previewImageIndex, fotoPasien } = this.state;
        const nextIndex = (previewImageIndex + 1) % fotoPasien.length;
        this.setState({
            previewImageIndex: nextIndex
        });
    }

    handlePrevSlide = () => {
        const { previewImageIndex, fotoPasien } = this.state;
        const prevIndex = (previewImageIndex - 1 + fotoPasien.length) % fotoPasien.length;
        this.setState({
            previewImageIndex: prevIndex
        });
    }


    render() {
        
        const { fotoPasien, previewImageIndex, showModal,totalData,page } = this.state;
       

   
        return (
            <div>
                <div>
                    <h3>Foto Pasien</h3>
                </div>
                {this.state.isLoading && <Spinner  variant="primary" className='mt-2 mb-2' animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                <div className="foto-container">
                    {fotoPasien && fotoPasien.map((data, i) => (
                        <div key={data.name + i} className="foto-wrapper">
                            <img 
                                src={`https://drive.google.com/thumbnail?id=${data.datas}&sz=w500 `}

                                className="foto img-res"
                                onClick={() => this.handlePreview(i)} 
                                loading='lazy'
                                alt={`img ${data.name}`}
                            
                            />
                        
                        </div>
                    ))}
                   
                </div>
                <PagePagination totalData={totalData}
                  
                      Actions={this.handlerActionsPage}
                      activePages = {this.state.page}
                      OnPageChange = {this.handlerActivePages}
                      pageName={'fotoLimit'}
                 />

              

                <Modal show={showModal} onHide={this.handleCloseModal} centered>
                    <Modal.Body style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                        <Carousel defaultActiveIndex={previewImageIndex} slide={false} interval={null}>
                            {fotoPasien && fotoPasien.map((data, index) => (
                                <Carousel.Item key={data.name + index}
                               
                                >
                                    <p>tanggal upload: {new moment(data.createdAt).format('LL')}</p>
                                    <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <TransformWrapper>
                                        {/* <Controls /> */}
                                        <ControlsImg idP={data.pasienId} imgId={data.id} imgGdId={data.datas} refreshImg={this._getPhotos} Close={this.handleCloseModal} />
                                        <TransformComponent>
                                            <img className='img-preview'
                                                src={`https://drive.google.com/thumbnail?id=${data.datas}&sz=w600`}
                                                alt="Slide"
                                                loading='lazy'
                                            
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Modal.Body>
                </Modal>
              
              
            </div>
        );
    }
}

export default FotoPasien;


