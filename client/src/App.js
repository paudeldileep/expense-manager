import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Redux
import { Provider} from 'react-redux';
import store from './redux/store';

//react-bootstrap

import Container from 'react-bootstrap/Container'


import PrivateRoute from './components/routing/PrivateRoute'
import Header from './components/layout/Header/Header';
import LandingPage from './components/layout/LandingPage/LandingPage'
import About from './components/layout/About'
import News from './components/layout/News'
import Home from './components/layout/Home'
import SignUp from './components/layout/SignUp'
import Addexpense from './components/Expense/Addexpense/Addexpense'


import {loaduser} from './actions/auth'
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(()=>{
    store.dispatch(loaduser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <>
        <Header/>
        <Route exact path="/" component={LandingPage}/>
        <Container fluid>
          <Switch>
          
          <Route exact path="/about" component={About} />
          <Route exact path="/news" component={News}/>
          <Route exact path="/signup" component={SignUp}/>
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/addexpense' component={Addexpense} />
          </Switch>
        </Container>
        </>
      </Router>
    </Provider>
  );
}

export default App;
