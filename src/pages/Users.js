import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import UserService from '../services/UserService';
import { NavBar } from '../components/NavBar';
import { UserList } from '../components/UserList';
import { Hero } from '../components/Hero';
import { UserForm } from '../components/UserForm';
import swal from 'sweetalert';

export class UsersPage extends Component {
  state = {
    redirect: null,
    results : [],
    user: null,
    page: 1,
    totalUsers: 0
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.page !== this.state.page){
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    UserService.getUserList(this.state.page).then((res) => {
      if(!res.error){
        if(res.length !== 0){
          this.setState({results: res.users, totalUsers: res.total});
        }
      }else{
        swal(res.error, "", "error");
        this.setState({redirect: '/login'});
      }
    }).catch((err) => {
      swal(err.message, "", "error");
      this.setState({redirect: '/login'});
    })
  }

  changePage = (page) => {
    this.setState({page: page});
  }

  renderResults = () =>{
    return (typeof  this.state.results == "undefined") 
      ? <p>Sin resultados</p> 
      : <UserList users={this.state.results} editUser={this.getUser} deleteUser={this.deleteUser} changePage={this.changePage}/>
  }

  getUser = (id) => {
    UserService.getUser(id).then((res) => {
      if(!res.error){
        if(res.length !== 0){
          this.setState({user: res});
        }
      }else{
        swal(res.error, "", "error");
      }
    }).catch((err) => {
      swal(err.message, "", "error");
    });
  }

  deleteUser = (id) => {
    UserService.deleteUser(id).then((res) => {
      if(!res.error){
        if(res.length !== 0){
          swal( "Eliminado correctamente", "", "success" ).then(()=>{
            window.location.reload();
          });
        }
      }else{
        swal(res.error, "", "error");
      }
    }).catch((err) => {
      swal(err.message, "", "error");
    });
  }

  renderForm = () => {
    const { user } = this.state;
    return (user === null)
    ?<UserForm />
    :<UserForm editForm={true} user={user} changeForm={this.changeForm}/>
  }

  changeForm = () => {
    this.setState({user: null});
  }

  renderPagination = () => {
    const pag = Math.ceil(this.state.totalUsers/5);
    const { page } = this.state;
    var list = [];
    for(let i = 1; i <= pag; i++){
      list.push(
          <li key={i+"pag"}>
            <button className={(page === i)?"pagination-link is-current":"pagination-link"} aria-label="Page 1" onClick={()=>{this.changePage(i)}}>{i}</button>
          </li>
      )
    }
    return list;
  }

  render(){
    const { redirect, page, totalUsers } = this.state;
    if (redirect) {
      return <Redirect to={redirect}/>
    }
    return(
      <div>
        <NavBar />
        <div className="container">
          <Hero title='UserList' />
          {this.renderForm()}
          {this.renderResults()}
          <div>
            <nav className="pagination" role="navigation" aria-label="pagination">
              <button className="pagination-previous" title="This is the first page" 
                disabled={(page === 1)} 
                onClick={ () => {
                  this.setState({page: this.state.page-1})
                }}>
                  Anterior
              </button>

              <button className="pagination-next" 
                disabled={(page === (Math.ceil(totalUsers/5)))}
                onClick={ () => {
                  this.setState({page: page+1})
                }}>
                  Siguiente
              </button>
              <ul className="pagination-list"> 
                { this.renderPagination() }
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}