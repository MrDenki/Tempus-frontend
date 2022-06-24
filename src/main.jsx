import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<Provider store={store}>*/}
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        {/*</Provider>*/}
    </React.StrictMode>
)
