import { Component, useCallback, useState } from "react";
import {Modal,Form,Button} from 'react-bootstrap'
import { pendaftaran_pasien } from "../Config/_Form";
import React from "react";
import _InterCon from "../api/_InterCon";
import {useDispatch,connect} from 'react-redux'
import { _EdtPas, getDetail, getPass } from "../Redux/Reducer/_Pasien";
import Message from "./Message";
import { _Task } from "../Config/_Tasks";
import { useParams } from "react-router-dom";


class Modals_Comp extends Component {
  
  constructor(props) {
     super(props);
     
      this.state = {
         isShow: '',
   
         isdisable: false,
      };
      this.formRef = React.createRef();
    
  }

  onCloses = () => {
    this.setState({ isShow: '' });
  } 

  onShow = () => {
    this.setState({ isShow: this.props.but });
  }

  onActions = async (e) => {
    e.preventDefault();
    this.setState({ isdisable: true });
    const cs = localStorage.getItem('cs');
    const forms = new FormData(this.formRef.current);
    forms.append('cs', cs);
    if (this.props.idPas) {
      forms.append('idP', this.props.idPas);
    }
    const formsObject = {};
    for (let [key, value] of forms.entries()) {
      if (!formsObject[key]) {
        formsObject[key] = value;
    }
    }
   
    try {
      const dt = await this.props.Actions(formsObject);
      Message({ type: 'succes', message: dt });
      
      if (typeof this.props.onUpdates === 'function') {
        await this.props.onUpdates();
      }
      this.onCloses();
      this.setState({ isdisable: false });
    } catch (error) {
      Message({ type: "err", message: error });
      this.setState({ isdisable: false });
    } 
  }
  
  onDelete = async (e) => {
    e.preventDefault();
    this.setState({ isdisable: true });
    const { dispatch } = this.props;
    const cs = localStorage.getItem('cs');
    const forms = new FormData(this.formRef.current);
    forms.append('cs', cs);
    if (this.props.idPas) {
      forms.append('idP', this.props.idPas);
    }
    const formsObject = {};
    for (let [key, value] of forms.entries()) {
        formsObject[key] = value;
    }
    
    try {
      const dt = await this.props.Actions2(formsObject);
      Message({ type: 'succes', message: dt });
      

      if (typeof this.props.onUpdates === 'function') {
        await this.props.onUpdates();
      }
      this.onCloses();
      this.setState({ isdisable: false });
      
  
      
    } catch (error) {
      Message({ type: "err", message: error });
      this.setState({ isdisable: false });
    } 
  }

  
  render() {
      return (
          <>
          <Button  onClick={this.onShow}>{this.props.but}</Button>
          <div>
              <Modal show={this.state.isShow == this.props.but} onHide={this.onCloses}>
              <Modal.Header >
                  <Modal.Title>{this.props.header}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id={this.props.formId} ref={this.formRef} onSubmit={this.onActions}>
                  <fieldset disabled={this.state.isdisable}>
                     <Form.Group>
                      <Form.Control type="hidden" name="_csrf" value={`${localStorage.getItem('cs')}`} />
                     </Form.Group>
                    {this.props.data && this.props.data.map((data, i) => {
                    const locale = 'id-ID';
                    const defaultValue = data.type === 'date' || data.name === 'tgl_tdkn' ? (data.val ? new Date(data.val) : new Date()).toISOString(locale).split('T')[0] : data.val;
                     return (
                        <Form.Group key={i} className="mb-2" controlId="formBasicEmail">
                          <Form.Label hidden={data.name === 'id' || data.name === 'pasienId' || data.name === 'createdAt' || data.name === 'updatedAt'}>
                            {data.name === 'createdAt' ? "tanggal"  : data.name}
                          </Form.Label>
                          <Form.Control type={data.name === 'tgl_tdkn'?'date':data.type}
                           
                          name={data.name}  defaultValue={defaultValue} placeholder={data.name} 
                           hidden={data.name === 'id' || data.name === 'pasienId' || data.name === 'createdAt' || data.name === 'updatedAt'} pattern={data?.patern}
                          />
                          </Form.Group>      
                       )
                   })}
                      <Button variant="primary" type="submit" style={{ margin: '10px 5px', float: 'right' }} >
                          Simpan
                      </Button>
                      {this.props.Actions2 ? <Button variant="danger" onClick={this.onDelete} style={{ margin: '10px 5px', float: 'left' }} >{this.props.but2}</Button> : ""}
                      <Button variant="secondary" style={{ margin: '10px 5px', float: 'right' }} onClick={this.onCloses}>
                          Tutup
                      </Button>
                      </fieldset>
                </Form>
              </Modal.Body>
              </Modal>
          </div>
          </>
      );
  }
}

export default connect() (Modals_Comp);