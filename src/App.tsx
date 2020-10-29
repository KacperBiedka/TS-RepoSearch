import React from 'react';
import './App.scss';
import { Route, BrowserRouter } from 'react-router-dom';
import routes from './routes';

const App: React.FunctionComponent = () => {
  const routeComponents = routes.map(({ path, component }, key) => {
    return (
    <Route exact path={path} component={component} key={key} />
  )});
  return <BrowserRouter>{routeComponents}</BrowserRouter>;
}

export default App;
