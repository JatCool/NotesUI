import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import NoteDetail from './NoteDetail';
import AddEditNote from './AddEditNote';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
        <Route exact path="/" component={App} />
        <Route exact path = "/detail/:id" component = {NoteDetail}/>
        <Route exact path = "/edit/:id" component = {AddEditNote}/>
        <Route exact path = "/create" component = {AddEditNote}/>
        <Route component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
