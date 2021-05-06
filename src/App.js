import { Component ,Fragment} from 'react';
import {Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./screens/Home"
import Cities from "./screens/CitiesScreen"
import Countries from "./screens/CountriesScreen"
import Companies from "./screens/CompaniesScreen"
import Jobs from "./screens/JobsScreen"

export class App extends Component {

  render() {
    return (
      <Fragment>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cities" component={Cities}/>
          <Route path="/countries" component={Countries}/>
          <Route path="/companies" component={Companies}/>
          <Route path="/jobs" component={Jobs}/>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
