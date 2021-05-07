import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Bikes from './components/Bikes';
import NavBar from './components/NavBar';
import Geofencing from './components/Geofencing';
import GeofencingSingle from './components/GeofencingSingle';
import GeofencingSingleHex from './components/GeofencingSingleHex';
import { useState } from 'react';
import GeofencingCompact from './components/GeofencingCompact';

const App = () => {
  const [res, setRes] = useState(9);
  const [resCompact, setResCompact] = useState(9);

  const onSelectChange = (e, isCompact) => {
    if (isCompact) {
    setResCompact(e.target.value);
    } else {
      setRes(e.target.value);
    }
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
        <Route
          path="/geofencing-compact"
          render={(props) => (
            <GeofencingCompact {...props} res={resCompact} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
