import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Link} from 'react-router-dom';
import Home from './home';
import Layout from './layout';
import Post from './post';
import Edit from './edit'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';




ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/comment" component={Layout}/>
        <Route path="/post" component={Post}/>
        <Route path="/admin/edit" component={Edit}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );
