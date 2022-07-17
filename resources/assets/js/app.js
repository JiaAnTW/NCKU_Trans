import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import NavLayout from '~/components/NavLayout';
import Major from './page/Major';
import Post from './page/Post/index';
import Login from './page/Login';
import Department from './page/Department';
import Announcement from './page/Announcement';
import Study from './page/Study';

import GlobalStyle from './theme/global';

import { Provider } from 'react-redux';
import { store } from './model/store.js';

import { ThemeProvider } from '@material-ui/styles';
import { NavSearchProvider } from './components/NavLayout/NavSearchProvider';
import { materialTheme } from './theme/global';
import RouteAdmin from './RouteAuth.js';

function App() {
    const [token, setToken] = useState('');

    const updateToken = useCallback((tokenNext) => {
        Cookies.set('adminToken', tokenNext, { expires: 7 });
        setToken(tokenNext);
    }, []);

    return (
        <BrowserRouter>
            <Provider store={store}>
                <NavSearchProvider>
                    <ThemeProvider theme={materialTheme}>
                        <GlobalStyle />
                        <Switch>
                            <NavLayout>
                                <Route
                                    exact
                                    path={['/', '/major:id?']}
                                    component={Major}
                                />
                                <Route path="/study" component={Study} />
                                <Route path="/post" component={Post} />
                                <Route
                                    path="/admin/login"
                                    render={(props) => (
                                        <Login setToken={updateToken} />
                                    )}
                                />
                                <RouteAdmin
                                    path="/admin/study"
                                    component={Study}
                                    token={token}
                                />
                                <RouteAdmin
                                    path="/admin/major"
                                    component={Major}
                                    token={token}
                                />
                                <RouteAdmin
                                    path="/admin/post"
                                    component={Post}
                                    token={token}
                                />
                                <RouteAdmin
                                    path="/admin/department"
                                    component={Department}
                                    token={token}
                                />
                                <RouteAdmin
                                    path="/admin/announcement"
                                    component={Announcement}
                                    token={token}
                                />
                            </NavLayout>
                        </Switch>
                    </ThemeProvider>
                </NavSearchProvider>
            </Provider>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
