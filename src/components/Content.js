import React from 'react';
import '../style/app.css';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

class Content extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/Search" component={ Search } />
          <Route path="/Album/:id" component={ Album } />
          <Route path="/Favorites" component={ Favorites } />
          <Route path="/Profile" e component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>);
  }
}

export default Content;
