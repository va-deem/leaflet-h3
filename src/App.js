import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Bikes from './components/Bikes';
import NavBar from './components/NavBar';
import Geofencing from './components/Geofencing';
import GeofencingSingle from './components/GeofencingSingle';
import GeofencingSingleHex from './components/GeofencingSingleHex';
import { useState } from 'react';

const App = () => {
  const [res, setRes] = useState(9);

  const onSelectChange = (e) => {
    setRes(e.target.value);
  };

  return (
    <Router>
      <NavBar onSelectChange={onSelectChange} />
      <Switch>
        <Route exact path="/" component={Bikes} />
        <Route path="/geofencing" component={Geofencing} />
        <Route path="/geofencing-single" component={GeofencingSingle} />
        <Route
          path="/geofencing-single-hex"
          render={(props) => (
            <GeofencingSingleHex {...props} res={res} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
