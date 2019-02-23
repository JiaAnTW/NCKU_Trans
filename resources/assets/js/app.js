import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Link} from 'react-router-dom';
import Home from './home';
import Layout from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/comment" component={Layout}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );
