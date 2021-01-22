import React, { FC } from 'react';
import './App.scss';
import { Route, BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import routes from './routes';



const App:FC = () => {
  const routeComponents = routes.map(({ path, component }, key) => {
    return (
      <QueryParamProvider ReactRouterRoute={Route} key={key}>
            <Route exact path={path} component={component} />
      </QueryParamProvider>
  )});
  return <BrowserRouter>{routeComponents}</BrowserRouter>;
}

export default App;
