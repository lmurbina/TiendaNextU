import React from 'react'
import { auth } from '../Firebase'
import './mainStyle.css'

export default class TopBar extends React.Component {
  handleLogout = async event => {
    event.preventDefault()
    try {
      await auth.doSignOut()
      //this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  }
  render(){    
    return(
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">La Bodega</a>
          <ul className="right">
            <li><a href="/"><i className="material-icons">apps</i></a></li>
            <li><a href="/cart"><i className="material-icons">shopping_cart</i>
                <span className="numProd"> {this.props.itemsInCart.length} </span>
                </a></li>
            <li><a href="/"><i className="material-icons">refresh</i></a></li>
            <li><a onClick={this.handleLogout}><i className="material-icons">assignment_return</i></a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

