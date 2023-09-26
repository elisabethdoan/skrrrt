import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Branches from './components/commits/Branches';
import HomePage from './components/profile/HomePage';
import IssueComponent from './components/issues/IssueComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/issues">
            <IssueComponent />
          </Route>
          <Route path="/branches">
            <Branches />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
