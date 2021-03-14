import Cookies from 'universal-cookie';

class UserService {
  async getUserList(page){
    const url = '/api/users?page='+page;
    return await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': this.getToken()},
    }).then(res => {
      if (!res.ok && res.status === 500) { 
        return { "status": 500, "error": "ocurrió un error al comunicarnos con el servidor"};
      }
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }
  
  async getUser(id){
    return await fetch('/api/users/'+id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': this.getToken()},
    }).then(res => {
      if (!res.ok && res.status === 500) { 
        return { "status": 500, "error": "ocurrió un error al comunicarnos con el servidor"};
      }
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }

  async getUserRoles(){
    return await fetch('/api/roles/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': this.getToken()},
    }).then(res => {
      if (!res.ok && res.status === 500) { 
        return { "status": 500, "error": "ocurrió un error al comunicarnos con el servidor"};
      }
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }

  async registerUser(email, password, firsName, lastName, rol, state){
    const data = {
      'Email': email,
      'Password': password,
      'FirsName': firsName,
      'LastName': lastName,
      'Enabled': state,
      'Rol': rol,
    }
    return await fetch('/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': this.getToken()},
      body: JSON.stringify(data)
    }).then(res => {
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }

  async editUser(id, email, password, firsName, lastName, rol, state){
    const data = {
      'Email': email,
      'Password': password,
      'FirsName': firsName,
      'LastName': lastName,
      'Enabled': state,
      'Rol': rol,
    }
    return await fetch('/api/users/'+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': this.getToken()},
      body: JSON.stringify(data)
    }).then(res => {
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }

  async deleteUser(id){
    return await fetch('/api/users/'+id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': this.getToken()}
    }).then(res => {
      return res.json()
    }).then(results => {
      return results;
    }).catch((err) => {
      return err;
    });
  }

  getToken(){
    const cookies = new Cookies();
    return cookies.get('auth');
  }
}

export default new UserService();