import React, { Component } from 'react';
import UserService from '../services/UserService';
import { UserRoles } from './UserRoles';
import swal from 'sweetalert';

export class UserForm extends Component{
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rol: '',
    state: false,
    error: '',
    roles: [],
    userId: ''
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  handleChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }
  handleChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }
  handleChangeRol = (e) => {
    this.setState({ rol: e.target.value });
  }
  handleChangeState = (e) => {
    this.setState({ state: e.target.checked });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { email, password, firstName, lastName, rol, state, userId } = this.state;
    const { editForm } = this.props;
    if(editForm){
      UserService.editUser(userId, email, password, firstName, lastName, rol, state).then((res) => {
        if(res.status === 200){
          this.setState({error: ''});
          swal( "Actualizado correctamente", "", "success" ).then(()=>{
            window.location.reload();
          });
        }else{
          if(res.error){
            this.setState({error: res.error});
          }else{
            this.setState({error: 'ocurrio un error interno, por favor intenta mas tarde'});
          }
        }
      }).catch((err)=>{
        this.setState({error: err.message});
      });
    }else{
      UserService.registerUser(email, password, firstName, lastName, rol, state).then((res) => {
        if(res.Email === email){
          this.setState({error: ''});
          swal( "Registrado correctamente", "", "success" ).then(()=>{
            window.location.reload();
          });
        }else{
          if(res.error){
            this.setState({error: res.error});
          }else{
            this.setState({error: 'ocurrio un error interno, por favor intenta mas tarde'});
          }
        }
      }).catch((err)=>{
        this.setState({error: err.message});
      });
    }
  }

  componentDidMount(){
    UserService.getUserRoles().then((res) => {
      if(!res.error){
        if(res.length !== 0){
          this.setState({roles: res});
        }
      }else{
        swal(res.error, "", "error");
      }
    }).catch((err) => {
      swal(err.message, "", "error");
    });
  }

  componentDidUpdate() {
    const { editForm, user } = this.props;
    const { userId } = this.state;
    if(editForm && userId !== user._id){
      this.setState({
        email: user.Email,
        password: '',
        firstName: user.FirsName,
        lastName: user.LastName,
        rol: user.Rol._id,
        state: user.Enabled,
        userId: user._id
      });
    }
    if(!editForm && userId !== ''){
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        rol: '',
        state: false,
        userId: ''
      });
    }
  }


  render(){
    const { editForm } = this.props;
    const { state,firstName,lastName,email,password,rol } = this.state
    return(
      <div className="columns is-centered mb-6">
        <form className="column is-8" onSubmit={this.handleSubmit}>
          {(this.state.error)&&
          <div className="notification is-danger">
            {this.state.error}
          </div>}
          <div className="field-body">
            <div className="field">
              <label className="label">Nombres</label>
              <p className="control is-expanded">
                <input className="input" type="text" value={firstName} placeholder="Nombres" onChange={this.handleChangeFirstName} required/>
              </p>
            </div>
            <div className="field">
              <label className="label">Apellidos</label>
              <p className="control is-expanded">
                <input className="input" type="text" value={lastName} placeholder="Apellidos" onChange={this.handleChangeLastName} />
              </p>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label">Email</label>
              <p className="control is-expanded">
                <input className="input" value={email} placeholder="Email" onChange={this.handleChangeEmail} required/>
              </p>
            </div>
            <div className="field">
              <label className="label">Contraseña</label>
              <p className="control is-expanded">
                <input className="input" type="password" value={password} placeholder="*******" onChange={this.handleChangePassword} required={(!editForm)&& 'required'} disabled={(editForm)&& 'disabled'}/>
              </p>
            </div>
          </div>
          <div className="field-body mb-3">
            <div className="field">
              <label className="label">Rol</label>
              <div className="control is-expanded">
                <UserRoles roles={this.state.roles} handleChangeRol={this.handleChangeRol} valueRol={rol} />
              </div>
            </div>
            <div className="field">
              <label className="label">Estado</label>
              <p className="control is-expanded">
                <input onChange={this.handleChangeState} type="checkbox" defaultChecked={state} />
              </p>
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button className="button is-primary">{(editForm)?'Actualizar':'Guardar'}</button>
            </p>
              {
                (editForm)&& <p className="control"><button className="button is-light" onClick={()=>{this.props.changeForm()}}>Cancelar</button></p>
              }
          </div>
        </form>
      </div>
      
    )
  }
}