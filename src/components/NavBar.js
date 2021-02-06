import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';

export class NavBar extends Component {
  state = {
    isLogin: false,
    redirect: null
  }

  componentDidMount(){
    const token = AuthService.getToken();
    if(token){
      this.setState({isLogin : true});
    }
  }

  Logout = () => {
    AuthService.logout();
    this.setState({isLogin : false, redirect: '/login'});
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to={'/'}  className="navbar-item active">
              Home
            </Link>

            <Link to={'/users'}  className="navbar-item">
              Users
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
            {(this.state.isLogin)? 
              <div className="buttons"><button className="button is-danger" onClick={this.Logout}>Cerrar Sesión</button></div>
              : 
              <div className="buttons">
                <Link to={'/signup'}  className="button is-light">
                  Registrarse
                </Link>
                <Link to={'/login'}  className="button is-primary">
                  Ingresar
                </Link>
              </div>
            }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}