import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {store} from "./store";                                //icons


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<Provider store={store}>*/}
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        {/*</Provider>*/}
    </React.StrictMode>
)
