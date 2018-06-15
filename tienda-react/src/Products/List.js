import React, { Component } from 'react'
import ProductItem from './Item'

export default class ProductList extends Component {
  render(){
    return (
      this.props.products
        .filter(product => product.nombre.toLowerCase().search(this.props.filter.toLowerCase()) > -1 )
        .map((product, key) => 
        <div className='col s3' key={key}>
          <ProductItem { ...this.props } product={product} />
        </div>
      )
    )
  }
}
