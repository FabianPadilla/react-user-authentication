import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UserList extends Component {
  static propTypes = {
    users: PropTypes.array
  }


  render(){
    const { users } = this.props;
    
    return(
      <div>
        <div className="table-container mb-6">
          <table className="table is-bordered is-hoverable">
            <thead>
              <tr>
                <td>Nombres</td>
                <td>Apellidos</td>
                <td>Email</td>
                <td>Rol</td>
                <td>Estado</td>
                <td>CreatedAt</td>
                <td>UpdateAt</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
            {
            users.map(user => {
                return  <tr key={user._id}>
                          <td>{user.FirsName}</td>
                          <td>{user.LastName}</td>
                          <td>{user.Email}</td>
                          <td>{user.Rol.Name}</td>
                          <td>{(user.Enabled)?<span className="tag is-success">Activo</span>:<span className="tag is-danger">	Inactivo</span>}</td>
                          <td>{user.CreatedAt}</td>
                          <td>{user.UpdateAt}</td>
                          <td>
                            <button className="button is-small is-danger" onClick={() => { this.props.deleteUser(user._id) }}>
                              Eliminar
                            </button>
                            <button className="button is-small is-info" onClick={() => { this.props.editUser(user._id)}}>
                              Editar
                            </button>
                          </td>
                        </tr>
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}