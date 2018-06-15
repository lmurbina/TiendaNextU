import React, { Component } from 'react'
import { auth } from '../Firebase'
import { Link } from 'react-router-dom'
import './loginStyle.css'

//================================================================//
//================================================================//
export default class LoginPage extends Component {
  constructor(props){
    super(props)
    document.title = 'Iniciar Sesión'
    this.state = {
      email      : '',
      password   : '',
      emailValid : false,
      passValid  : false,
      error  : null
    }
  }
  //================================================================//
  componentWillMount(){
    document.body.style.backgroundImage = "url('./img/login-fondo.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  //================================================================//
  handleSubmit = event => {
    event.preventDefault()
    const { history } = this.props
    auth.doSignIn(this.state.email, this.state.password).then(authUser => {
      console.log('Usuario validado', authUser)
      history.push('/')
    }).catch(error => {
      console.log('Error al intentar logearse', error);
      this.setState({error: error})
    })
  }
  //================================================================//
  render(){
    return(
      <div className='content'>
        <h1> Iniciar Sesión </h1>
        <form onSubmit={this.handleSubmit}>
          <label> Emails
            <input name='email' type='email' placeholder='Correo Electronico' 
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              onChange={event => this.setState({'email': event.target.value})}/>
          </label>
          <label> Password
            <input name='password' type='password' placeholder='Contraseña' 
              onChange={event => this.setState({'password': event.target.value})}/>
          </label>
          <button type='submit'> Iniciar </button>
        </form>
        <p className='left-align'>
          No tienes un cuenta? 
          {' '}
          <Link to={'/signup'}> Registrarse </Link>
        </p>
      </div>
    )
  }
  //================================================================//

}