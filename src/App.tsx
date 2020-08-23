import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={MoviesPage} />
      <Route exact path="/movie/:imdbID" component={MovieDetailsPage} />
    </Switch>
  );
};

export default App;
