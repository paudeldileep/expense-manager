import React from 'react';
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


function App() {
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
          <PrivateRoute exact path='/home' component={Home} />
          </Switch>
        </Container>
        </>
      </Router>
    </Provider>
  );
}

export default App;
