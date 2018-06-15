import React, { Component } from 'react'
import './style.css'


export default class CartItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      imagen   : '',
      subTotal : 0
    }
  }
  //====================================================================//
  componentDidMount(){
    this.setState({imagen: `img/${this.props.item.product.imagen}`})
    this.setState({subTotal: (this.props.item.product.precio * this.props.item.cantidad)})
  }
  //====================================================================//
  render(){
    return(
      <div className='row list-group-item'>
        <div className='col s6'>
          <div className='imagen'>
            <img src={this.state.imagen} alt='thumbnail' />
          </div>
        </div>
        <div className='col s6'>
          <h3>{this.props.item.product.nombre} </h3>
          <p><b>Unidades: </b>{this.props.item.cantidad}</p>
          <p><b>Precio: </b>US${' '}{(this.props.item.product.precio).toFixed(2)}</p>
          <p><b>SubTotal: </b>US${' '}{(this.state.subTotal).toFixed(2)}</p>
        </div>
      </div>
    )
  }
  //====================================================================//
}