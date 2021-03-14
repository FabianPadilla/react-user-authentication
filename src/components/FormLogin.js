import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import AuthService from '../services/AuthService';

export class FormLogin extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirect: null
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { email, password } = this.state;
    AuthService.login(email, password).then(res => {
      if(res.status === 500){
        this.setState({error: res.error});
      }else{
        if(res.Email === email){
          this.setState({error: ''});
          this.setState({ redirect: "/" });
        }else{
          this.setState({error: 'usuario o contraseña incorrectos'});
        }
      }
    });
  }
  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <form className="box" onSubmit={this.handleSubmit}>
        {(this.state.error)&&
        <div className="notification is-danger">
          {this.state.error}
        </div>}
        <div className="field">
          <label htmlFor="" className="label">Email</label>
          <div className="control">
            <input type="email" placeholder="email@gmail.com" className="input" required onChange={this.handleChangeEmail} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">Contraseña</label>
          <div className="control">
            <input type="password" placeholder="*******" className="input" required onChange={this.handleChangePassword}/>
          </div>
        </div>
        <div className="field mt-2">
          <p className="mb-2 is-size-7">¿no tienes una cuenta? <br/>
            <Link to={'/signup'} className="has-text-link">
              Regístrate
            </Link>
          </p>
          <button className="button is-success">
            Login
          </button>
        </div>
      </form>
    )
  }
}