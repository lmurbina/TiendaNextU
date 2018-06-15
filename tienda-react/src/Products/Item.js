import React, { Component } from 'react'
import Modal from 'react-modal'
//import ProductDetail from './Detail'
import './style.css'


export default class ProductItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      cantidad   : 1,
      ShowModal : false
    } 
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  //====================================================================//
  handleChange = (event) => this.setState({cantidad: event.target.value})
  //====================================================================//
  handleOpenModal = () => this.setState({ showModal: true })
  //====================================================================//
  handleCloseModal = () => this.setState({ showModal: false })
  //====================================================================//
  handleAddItem = () => {
    this.props.add(this.props.product, this.state.cantidad)
  }
  //====================================================================//
  render(){
    const imagen =  `img/${this.props.product.imagen}`;
    return(
      <div className='content-item'>
        <div className='imagen'>
          <img src={imagen} alt='thumbnail'/>
        </div>
        <h4> {this.props.product.nombre} </h4>
        <p><b>Precio: </b>US${' '}{(this.props.product.precio).toFixed(2)}</p>
        <p><b>Disponible: </b> {this.props.product.disponible}</p>
        <div className='row'>
          <div className='col s4'>
            <button className='info' onClick={this.handleOpenModal}> Detalle </button>
          </div>
          <div className='col s4'>
            <button className='primary' onClick={this.handleAddItem} > Añadir </button>
          </div>
          <div className='col s4'>
            <input type='number' min='1' max={this.props.product.disponible} name='cantidad' defaultValue='1'
              onChange={this.handleChange.bind(this)}/>
          </div>
        </div>
        
        <Modal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            className="Modal">
          <div className='imagen-modal'>
            <img src={imagen} alt='thumbnail'/>
          </div>
          <h4> {this.props.product.nombre} </h4>
          <p><b>Descripcion: </b> {this.props.product.descripcion}</p>
          <p><b>Precio: </b>US${' '}{(this.props.product.precio).toFixed(2)}</p>
          <p><b>Disponible: </b> {this.props.product.disponible}</p>
         
          <button onClick={this.handleCloseModal}>Cerrar</button>
        </Modal>
        
      </div>
    )
  }
  //====================================================================//
}
