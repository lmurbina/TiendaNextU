import React, { Component } from 'react'
import CartItem from './Item'

export default class CartList extends Component {
  render(){
    return(
      <ul className='collection'>
        {
          this.props.products.map((product, index) => {
            return <CartItem key={index} item={product}/>
          })
        }
      </ul>
    )
  }
}
/*

this.props.products
        .filter(product => product.nombre.toLowerCase().search(this.props.filter.toLowerCase()) > -1 )
        .map((product, key) => 
        <div className='col s3' key={key}>
          <ProductItem { ...this.props } product={product} />
        </div>
      )
*/