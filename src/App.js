import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from './components/header/AppHeader';
import { MoonCal } from './components/moonCal/MoonCal';




function App() {

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <MoonCal />
      </div>
    </Router>
  );
}

export default App;
