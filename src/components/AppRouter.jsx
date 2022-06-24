import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {publicRoutes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route path={route.path}
                       exact={route.exact}
                       element={route.component}
                       key={route.path}
                />
            )}
        </Routes>

    );
};

export default AppRouter;