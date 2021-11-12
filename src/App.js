import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import Home from './Home';
import Login from './Login';
import QuoteGet from './QuoteGet';
import MyQuotations from './MyQuotations';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/QuoteGet">
              <QuoteGet />
            </Route>
            <Route pathe="/MyQuotations">
              <MyQuotations />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;