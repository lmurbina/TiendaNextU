import React, { Component } from 'react'
import TopBar from './TopBar'
import { db, firebase } from '../Firebase'
import CartList from '../Cart/List'  // temporalmente hasta que lo cree
import './mainStyle.css'

export default class CartShopPage extends Component {
  constructor(props){
    super(props)
    document.title='Tienda Online'
    this.state = {
      user        : null,
      itemsInCart : [],
      total       : 0
    }
  }
  //================================================================//
  componentWillMount(){
    document.body.style.backgroundImage = "url('./img/main-fondo.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  //====================================================================//
  componentDidMount(){
    const { history } = this.props;

    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser){
        this.setState({user: authUser})
        db.getProductsInCart(authUser.uid).on('value', snapshot => {
          if (snapshot.val()) {
            this.setState({itemsInCart: snapshot.val()})
          } else this.setState({itemsInCart: []})
          //snapshot.val() ? this.setState({itemsInCart: snapshot.val()}) : null
        })
      } else history.push('/login')
    })
  }
  //====================================================================//
  shouldComponentUpdate(nexProps, nextState){
    let total = 0
    nextState.itemsInCart.map((item, index) => 
      total += (item.product.precio * item.cantidad)
    )
    nextState.total = total
    return true
  }
  //====================================================================//
  handlePay = () => {
    const { history } = this.props
    // Como los datos ya fueron tomados de la lista de productos para crea el carrito del cliente
    // al pagar solo debemos elimiar el carrito para que haga una nueva compra
    db.getProductsInCart(this.state.user.uid).remove().then(() => history.push('/'))
  }
  //====================================================================//
  handleCancel = () => {
    const { history } = this.props
    const item = this.state.itemsInCart.map((item, key) => item )
    let disponible = parseInt(item[0].product.disponible, 10)
    let cantidad = parseInt(item[0].cantidad, 10)
    item[0].product.disponible = (disponible + cantidad)     //Regresamos la cantidad tomada al producto
    db.getProduct(item[0].id).update(item[0].product)        //Lo acutalizamos en la base de datos
    
    db.getProductsInCart(this.state.user.uid).remove().then(() => history.push('/'))
  }
  //====================================================================//
  render(){
    return(
      <div>
        <TopBar itemsInCart={this.state.itemsInCart} />
        <div className='container'>        
          <div className='row'>
            <div className='col s8 offset-s2'>
              <h3> Carrito de compras </h3>
            </div>
            <div className='col s7'>
              <CartList products={this.state.itemsInCart} /> 
            </div>
            <div className='col s5'>
              <h4> Total a pagar </h4>
              <h5> US${' '}{(this.state.total).toFixed(2)} </h5>
                
              <div className='buttonToolbar'>
                <button className='btn' onClick={this.handleCancel}> Cancelar </button>
                <button className='btn' onClick={this.handlePay}> Pagar </button>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
  }
  //====================================================================//
}