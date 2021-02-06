import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import AuthService from '../services/AuthService';

export class FormRegister extends Component {
  state = {
    email: '',
    password: '',
    firsName: '',
    lastName: '',
    error: '',
    redirect: null
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firsName, lastName } = this.state;
    AuthService.signup(email, password, firsName, lastName).then((res) => {
      if(res.Email === email){
        this.setState({error: ''});
        this.setState({ redirect: "/" });
      }else{
        this.setState({error: 'ocurrio un error interno, por favor intenta mas tarde'});
      }
    }).catch((err)=>{
      this.setState({error: err.message});
    });
  }

  handleFirsName = (e) => { this.setState({ firsName: e.target.value }) }

  handleChangeLastName = (e) => { this.setState({ lastName: e.target.value }) }

  handleChangeEmail = (e) => { this.setState({ email: e.target.value }) }

  handleChangePassword = (e) => { this.setState({ password: e.target.value }) }

  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <form className="box" onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Nombres</label>
          <div className="control">
            <input type="text" className="input" required onChange={this.handleFirsName} />
          </div>
        </div>
        <div className="field">
          <label className="label">Apellidos</label>
          <div className="control">
            <input type="text" className="input" onChange={this.handleChangeLastName} />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input type="email" className="input" required onChange={this.handleChangeEmail} />
          </div>
        </div>
        <div className="field">
          <label className="label">Contraseña</label>
          <div className="control ">
            <input type="password" placeholder="*******" className="input" required onChange={this.handleChangePassword}/>
          </div>
        </div>
        <strong className="has-text-danger error-message">{this.state.error}</strong>
        <div className="field mt-2">
          <p className="mb-2 is-size-7">¿Ya tienes una cuenta? <br/>
            <Link to={'/login'} className="has-text-link">
              Iniciar sesión
            </Link>
          </p>
          <button className="button is-success">
            Registrarse
          </button>
        </div>
      </form>
    )
  }
}