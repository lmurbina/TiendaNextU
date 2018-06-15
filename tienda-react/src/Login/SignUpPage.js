import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../Firebase';
import './loginStyle.css'

class SignUpPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      nombre      : '',
      email       : '',
      passwordOne : '',
      passwordTwo : '',
      error       : null   
    }
  }
  //================================================================//
  componentWillMount(){
    document.body.style.backgroundImage = "url('./img/login-fondo.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  //=========================================================================//
  handleSubmit = async event => {
    event.preventDefault()
    const {nombre, email, passwordOne } = this.state
    let password = passwordOne
    try {
      auth.doCreateUser(email, passwordOne).then(authUser => {
        db.ref(`usuarios/${authUser.user.uid}`).set({
          nombre, email, password
        })
      })
      this.props.history('/login')
    } catch (error) { alert(error) }    
  }
  //=========================================================================//
  render(){
    const {
      nombre,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;
    // Con esto el boton de submit no se activara al menos que se cumplan los requisitos
    const isInvalid = passwordOne !== passwordTwo ||
                      passwordOne === '' || email === '' || 
                      nombre === '';
    return(
      <div className='content'>        
        <h1> Registrarse</h1>
        <form onSubmit={this.handleSubmit}>
          <input value={nombre}
            onChange={event => this.setState({'nombre': event.target.value})}
            type='text' placeholder='Nombre completo' name='nombre'
          />
          <input value={email}
            onChange={event => this.setState({'email': event.target.value})}
            type="text" placeholder="Correo electronico" name='email'
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState({'passwordOne': event.target.value})}
            type="password"
            placeholder="Contraseña"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState({'passwordTwo': event.target.value})}
            type="password"
            placeholder="Repetir Contraseña"
          />
          <button disabled={isInvalid} type='submit'>Registrarse</button>
          { error && <p>{error.message}</p> }
        </form> 
        <Link to='/login'> Atras </Link>       
      </div>
    )
  }
  //=========================================================================//
}

export default SignUpPage;