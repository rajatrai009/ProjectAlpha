import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// ReactDOM.render(
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     , document.getElementById('root'));
// // registerServiceWorker();

window.mount = function () {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('qnimate')
    )
}