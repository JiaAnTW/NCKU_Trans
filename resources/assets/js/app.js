import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import NavLayout from '@/components/NavLayout';
import Major from './page/Major';
import Post from './page/Post/index';
import Login from './page/Login';
import Department from './page/Department';
import GlobalStyle from './theme/global';

import { Provider } from 'react-redux';
import { store } from './model/store.js';

import { ThemeProvider } from '@material-ui/styles';
import { materialTheme } from './theme/global';
import RouteAdmin from './RouteAuth.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            fliter: '',
        };
        this.setToken = this.setToken.bind(this);
    }

    setToken(token) {
        Cookies.set('adminToken', token, { expires: 7 });
        const set = new Promise((resolve) => {
            this.setState({ token: token });
            resolve();
        });
        set.then((resolve) => {
            location.href = '/#/admin/major';
        });
    }

    render() {
        return (
            <HashRouter>
                <Provider store={store}>
                    <ThemeProvider theme={materialTheme}>
                        <GlobalStyle />
                        <Switch>
                            <NavLayout>
                                <Route exact path="/" component={Major} />
                                <Route path="/post" component={Post} />
                                <Route
                                    path="/admin/login"
                                    render={(props) => (
                                        <Login setToken={this.setToken} />
                                    )}
                                />
                                <RouteAdmin
                                    path="/admin/major"
                                    component={Major}
                                    token={this.token}
                                />
                                <RouteAdmin
                                    path="/admin/post"
                                    component={Post}
                                    token={this.token}
                                />
                                <RouteAdmin
                                    path="/admin/department"
                                    component={Department}
                                    token={this.token}
                                />
                            </NavLayout>
                        </Switch>
                    </ThemeProvider>
                </Provider>
            </HashRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
