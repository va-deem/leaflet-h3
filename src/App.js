import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Bikes from './components/Bikes';
import NavBar from './components/NavBar';
import Geofencing from './components/Geofencing';
import GeofencingSingle from './components/GeofencingSingle';
import GeofencingSingleHex from './components/GeofencingSingleHex';
import { useState } from 'react';
import GeofencingCompact from './components/GeofencingCompact';
import GeofencingReal from './components/GeofencingReal';
import GeofencingMan from './components/GeofencingMan';

const App = () => {
  const [res, setRes] = useState(9);
  const [resCompact, setResCompact] = useState(9);
  const [resReal, setResReal] = useState(9);
  const [resMan, setResMan] = useState(9);
  const [treshold, setTreshold] = useState(1);

  const onSelectChange = (e, isCompact) => {
    switch (isCompact) {
      case 'compact':
        setResCompact(e.target.value);
        break;
      case 'real':
        setResReal(e.target.value);
        break;
      case 'man':
        setResMan(e.target.value);
        break;
      default:
        setRes(e.target.value);
    }
  };

  const onTresholdChange = (e) => {
    setTreshold(e.target.value);
  };

  return (
    <Router>
      <NavBar onSelectChange={onSelectChange}
              onTresholdChange={onTresholdChange} />
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
        <Route
          path="/geofencing-real"
          render={(props) => (
            <GeofencingReal {...props} res={resReal} />
          )}
        />
        <Route
          path="/geofencing-man"
          render={(props) => (
            <GeofencingMan {...props} res={resMan} treshold={treshold} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
