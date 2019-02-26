import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from './home';
import Comment from './comment';
import Layout from './layout';
import Post from './post';
import Edit from './edit'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';




ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
        <Layout>
            <Route path="/comment" component={Comment}/>
            <Route path="/post" component={Post}/>
            <Route path="/admin/edit" component={Edit}/>
        </Layout>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
  );
