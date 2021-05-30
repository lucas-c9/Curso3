import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Jobs } from './views/Jobs';
import { Companies } from './views/Companies';
import { Cities } from './views/Cities';
import { Countries } from './views/Countries';
import NavBar from './components/NavBar';
import { NotFound} from './views/NotFound';

export class App extends React.Component {

  render (){
    return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact render={() => <Jobs></Jobs>}></Route>
          <Route path="/companies" exact render={() => <Companies></Companies>}></Route>
          <Route path="/cities" exact render={() => <Cities></Cities>}></Route>
          <Route path="/countries" exact render={() => <Countries></Countries>}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
  
}
export default App;
