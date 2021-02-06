import { Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.css';
import '@fortawesome/fontawesome-free/js/solid';

import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { UsersPage } from './pages/Users';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={RegisterPage} />
        <Route path="/users" component={UsersPage} />
      </Switch>
    </div>
  );
}

export default App;
