import React from 'react';
import ReactDOM from 'react-dom';
import mainPage from './mainPage';
import chooseScreen from './chooseScreen';
import {Route, BrowserRouter, HashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from '../css/main.css';

ReactDOM.render(
    <HashRouter basename="/">
     	<Route path='/page:page' component={mainPage} />
    </HashRouter>,
    document.getElementById("root")
);