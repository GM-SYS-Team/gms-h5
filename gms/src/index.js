import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import {Helmet} from "react-helmet";


/**
 * 应用入口，指向路由
 */
ReactDOM.render(
    <div>
        <Helmet>
            <meta name="renderer" content="webkit"></meta>
        </Helmet>
        <Routes />
    </div>,
    document.getElementById('root')
);
