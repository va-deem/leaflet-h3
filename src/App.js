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
import Boston from './components/Boston';
import Rome from './components/Rome';

const App = () => {
  const [res, setRes] = useState(9);
  const [resCompact, setResCompact] = useState(9);
  const [resReal, setResReal] = useState(9);
  const [resBoston, setResBoston] = useState(9);
  const [resRome, setResRome] = useState(9);
  const [trBoston, setTrBoston] = useState(1);
  const [trRome, setTrRome] = useState(1);

  const onSelectChange = (e, isCompact) => {
    switch (isCompact) {
      case 'compact':
        setResCompact(e.target.value);
        break;
      case 'real':
        setResReal(e.target.value);
        break;
      case 'boston':
        setResBoston(e.target.value);
        break;
      case 'rome':
        setResRome(e.target.value);
        break;
      default:
        setRes(e.target.value);
    }
  };

  const onTresholdChange = (e, trType) => {
    console.log(trType);
    switch (trType) {
      case 'boston':
        setTrBoston(e.target.value);
        break;
      case 'rome':
        setTrRome(e.target.value);
        break;
      default:
        break;
    }
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
          path="/geofencing-boston"
          render={(props) => (
            <Boston {...props} res={resBoston} treshold={trBoston} />
          )}
        />
        <Route
          path="/geofencing-rome"
          render={(props) => (
            <Rome {...props} res={resRome} treshold={trRome} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
