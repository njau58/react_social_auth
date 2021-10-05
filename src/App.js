
import './App.css';
import {BrowserRouter, Route, Switch,} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ResetPassword from './components/ForgotPassword/ForgotPassword'
import PageNotFound from './components/PageNotFound';


function App() {



  return (
 <BrowserRouter>
      <div className="App">
      <Switch>
        <AuthenticatedRoute exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/resetPassword' component={ResetPassword}/>
        <Route path='/register' component={Registration}/>
        <Route  component={PageNotFound}/>
      </Switch>

    </div>
    </BrowserRouter>

  
  
  );
}

export default App;
