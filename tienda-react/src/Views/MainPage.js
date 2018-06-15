import React, { Component } from 'react'
import TopBar from './TopBar'
import ProductSearch from '../Products/Search'
import ProductList from '../Products/List'
//import ProductItem from '../Products/Item'

import { db, firebase } from '../Firebase'
import './mainStyle.css'



class MainPage extends Component {
  constructor(props, context) {
    super(props, context)
    document.title = 'Tienda Online'
    this.state = {
      user        : null,
      filter      : '',
      products    : [],
      itemsInCart : []
    }
  }
  //================================================================//
  componentWillMount(){
    document.body.style.backgroundImage = "url('./img/main-fondo.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  componentDidMount(){
    const { history } = this.props
    try{
      firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          this.setState({user: authUser})
        db.getProductsInCart(authUser.uid).on('value', snapshot => {
          if (snapshot.val()) {
            this.setState({itemsInCart: snapshot.val()})
          } else this.setState({itemsInCart: []})
          //snapshot.val() ? this.setState({itemsInCart: snapshot.val()}) : null       
        })
      } else {
        console.log('No estas logeado')
        history.push('/login')
      }
    })
  }catch (error){ alert(error) }
    // Otras consultas a la bd
    db.getProducts().on('value', snapshot => {
      this.setState({products: snapshot.val()})
    })
  }
  //====================== Buscar un Producto ====================//
  searchProduct = (input) => this.setState({filter: input.target.value})
  //====================== Agregar al Carrito ====================//
  addToCart = (product, amount) => {
    console.log('Quieres agregar este item ????')
    const id = this.state.products.indexOf(product)
    const userid = this.state.user.uid 
    product.disponible = (product.disponible - amount)
    db.getProduct(id).update(product)
    db.getProductsInCart(userid)
      .set([
        ...this.state.itemsInCart, 
        {
          id       : id, 
          product  : product, 
          cantidad : amount
        }])
    console.log('Has agregado este item ????')
  }
 
  //===================== Renderizamos ===========================//
  render(){
    const { products } = this.state
    return( 
      <div>
        <TopBar itemsInCart={this.state.itemsInCart} />
        <div className='container'>
          <div className='row'>
            <div className='col s8'>
              <h3>Catálogo de Productos</h3>
            </div>
            <div className='col s4'>
              <ProductSearch search={this.searchProduct.bind(this)} />
            </div>
          </div>
          <div className='row'>
          { !!products && <ProductList products={products}
                                        filter  ={this.state.filter}
                                        add     ={this.addToCart.bind(this)}/>}
          </div>
        </div>
      </div>
      
    )
  } 
}
 //==============================================================//

export default MainPage
