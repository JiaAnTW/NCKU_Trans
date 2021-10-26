import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function RouteAdmin({ path, component, token }) {
    const Component = component;
    return (
        <Route
            path={path}
            render={({ location }) =>
                token && token !== '' ? (
                    <Component isAdmin={true} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/admin/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
