import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UserRoles extends Component {
  static propTypes = {
    roles: PropTypes.array
  }

  render(){
    const { roles, handleChangeRol, valueRol } = this.props;
    return(
      <div className="select">
        <select onChange={handleChangeRol} value={valueRol} required>
          <option value="">--</option>
          {
            roles.map(rol => {
              return  <option value={rol._id} key={rol._id}>{rol.Name}</option>
            })
          }
        </select>
      </div>
    )
  }
}