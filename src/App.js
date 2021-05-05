import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Bikes from './components/Bikes';
import NavBar from './components/NavBar';
import Geofencing from './components/Geofencing';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Bikes} />
        <Route path="/geofencing" component={Geofencing} />
      </Switch>
    </Router>
  );
};

export default App;
