import React, { Component } from 'react';

import AuthService from '../services/AuthService';

import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';

export class HomePage extends Component {
  state = {
    isLogin: false,
  }

  componentDidMount(){
    const token = AuthService.getToken();
    if(token){
      this.setState({isLogin : true});
    }
  }

  render(){
    return(
      <div>
        <NavBar />
        <div className="container">
          {(this.state.isLogin)? 
          <Hero title='Sesion iniciada!'/>
          :
          <Hero title='Por favor inicia sesión'/>
          }
          <span className="icon has-text-danger">
            <i className="fas fa-trash"></i>
          </span>
        </div>
      </div>
    )
  }
}