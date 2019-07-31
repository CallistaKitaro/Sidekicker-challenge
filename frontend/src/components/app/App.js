/* 
 * Setting up the application structure and routes
 * Header : Contains the navigation links. All routes have the same header
 * Route :  The content of the route, depending on the link selected
 */
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './app.css';
import ListJobs from '../listJob/ListJobs';
import PostJob from '../postJob/PostJob';
import ViewJob from '../listJob/viewJob';

function App() {
  return (
    <div className="app">
      <Router>

        {/* Application header */}
        <div className="header-wrapper">
          <header className="header-content">
            <Link to="/" className="header-link">Sidekicker Job Board</Link>
            <Link to="/postjob" className="header-link">Add Job</Link>
          </header>
        </div>

        {/* Application content */}
        <div className="content-wrapper">
          <Route exact path="/" component={ListJobs} />
          <Route path="/postjob" component={PostJob} />
          <Route path="/job/:id" component={ViewJob} />
        </div>

      </Router>
    </div>
  );
}

export default App;
