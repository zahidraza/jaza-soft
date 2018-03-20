import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from 'redux';
import { Provider } from 'react-redux';
import {createHashHistory, History} from 'history';
// import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
// import {withContext} from 'recompose';


import createAppReducer from './reducer';
import JAppRoutes from './JAppRoutes';
// import TranslationProvider from './i18n/TranslationProvider';

import {FnAuthClient, FnRestClient} from './rest/httpClients';

export interface Context {
  authClient?: FnAuthClient
}

export type componentType = React.ComponentType<any> | Function;

export interface Props {
  appName: string,
  restClient?: FnRestClient,
  authClient?: FnAuthClient,
  history?: History,
  locale?: string,
  theme?: string,
  messages?: object,
  customReducers?: ReducersMapObject,
  initialState?: object,
  customSagas?: any,
  customRoutes?: any,
  children?: Function | React.ReactNode,
  appLayout?: componentType,
  dashboard?: componentType,
  menu?: componentType,
  loginPage?: React.ComponentClass<any> | React.StatelessComponent<any>,
  logout?: string | Function | React.ReactNode,
  catchAll?: componentType,
}

const JApp = ({
  appName,
  restClient,
  authClient,
  history,
  locale = 'en',
  theme = 'light',
  messages = {},
  customReducers = {},
  customRoutes = [],
  customSagas = [],
  children,
  appLayout,
  dashboard,
  menu,
  loginPage,
  logout,
  catchAll
}: Props) => {
  const routerHistory = history || createHashHistory();
  const rootReducer = createAppReducer(customReducers, locale);
  // type AppState = typeof rootReducer;

  let devTools = (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f;
  const store = createStore (
    rootReducer, 
    compose(
      applyMiddleware(routerMiddleware(routerHistory)),
      devTools
    )
  );

  // const logoutButton = authClient ? React.createElement(logout ) : null;

  return (
    <Provider store={store} >
        <ConnectedRouter history={routerHistory}>
          <Switch >
            {loginPage && (
              <Route 
                exact
                path='/login'
                render={({location}) => React.createElement(loginPage, {location, appName, theme})}
                /> 
            )}
            <Route 
              path="/"
              render={(routeProps) => (
                <JAppRoutes 
                  dashboard={dashboard} 
                  appLayout={appLayout}
                  menu={menu}
                  logout={logout}
                  theme={theme}
                  appName={appName}
                  catchAll={catchAll}
                  {...routeProps}
                >
                  {children}
                </JAppRoutes>
              )}
            />
          </Switch>
        </ConnectedRouter>
    </Provider>
  );
};

export default JApp;

// export default withContext<Context, Props>(
//   {
//       authClient: PropTypes.func,
//   },
//   ({ authClient }): Context => ({ authClient })
// )(JApp);