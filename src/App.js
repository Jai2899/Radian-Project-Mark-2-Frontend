import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import Home from './Home';
import Login from './Login';
import QuoteGet from './QuoteGet';
import AuthContext from "./context/auth-context";
function App() {
  const [state, setState] = useState({
    token: null,
    userId: null
  });
   const login = (token, userId, tokenExpiration) => {
    setState({ token: token, userId: userId })

  }
  const logout = () => {
    setState({ token: null, userId: null })
  };
  return (
    <Router> 
      <React.Fragment>
        <AuthContext.Provider value={{ token: state.token, userId: state.userId, login:login, logout: logout }}>
          <div className="App">

            <Navbar />
            <div className="content">
              <Switch>
                {state.token && <Redirect from="/" to="QuoteGet" exact />}
                {state.token && <Redirect from="/Login" to="QuoteGet" exact />}
                <Route exact path="/">
                  <Home />
                </Route>
                {!state.token && (<Route path="/Login">
                  <Login />
                </Route>)}
                <Route path="/QuoteGet">
                  <QuoteGet />
                </Route>
                {!state.token && <Redirect to="/Login" exact />}
              </Switch>
            </div>
            <Footer />

          </div>
        </AuthContext.Provider>
      </React.Fragment>

    </Router>
  );
}

export default App;