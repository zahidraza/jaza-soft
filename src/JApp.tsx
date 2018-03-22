import * as React from "react";
import * as PropTypes from "prop-types";
import { createStore, applyMiddleware, compose, ReducersMapObject, Reducer } from "redux";
import { Provider } from "react-redux";
import { createHashHistory, History } from "history";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { Route, Switch } from "react-router-dom";
import { withContext } from "recompose";

import createAppReducer, { AppState } from "./reducer";
import JAppRoutes from "./JAppRoutes";
import TranslationProvider from "./i18n/TranslationProvider";

import { FnAuthClient, FnRestClient } from "./rest";
import { DataType } from "./types";

export interface Context {
  authClient?: FnAuthClient;
  appName?: string;
}

export type componentType = React.ComponentType<any> | Function;

export interface Props {
  appName: string;
  restClient?: FnRestClient;
  authClient?: FnAuthClient;
  history?: History;
  locale?: string;
  theme?: string;
  messages?: object;
  customReducers?: ReducersMapObject;
  initialState?: object;
  customSagas?: any;
  customRoutes?: any;
  children?: Function | React.ReactNode;
  appLayout?: componentType;
  dashboard?: componentType;
  menu?: componentType;
  loginPage?: React.ComponentClass<any> | React.StatelessComponent<any>;
  logout?: string | Function | React.ReactNode;
  catchAll?: componentType;
}

class JApp extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {
      appName,
      restClient,
      authClient,
      history,
      locale = "en",
      theme = "light",
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
    } = this.props;

    const routerHistory = history || createHashHistory();
    const rootReducer: Reducer<AppState<DataType>> = createAppReducer(customReducers, locale);
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore<AppState<DataType>>(
      rootReducer,
      composeEnhancers(applyMiddleware(routerMiddleware(routerHistory)))
    );

    // const logoutButton = authClient ? React.createElement(logout ) : null;

    return (
      <Provider store={store}>
        <TranslationProvider messages={messages}>
          <ConnectedRouter history={routerHistory}>
            <Switch>
              {loginPage && (
                <Route
                  exact
                  path="/login"
                  render={({ location }) =>
                    React.createElement(loginPage, { location, appName, theme })}
                />
              )}
              <Route
                path="/"
                render={routeProps => (
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
        </TranslationProvider>
      </Provider>
    );
  }
}

export default withContext<Context, Props>(
  {
    authClient: PropTypes.func
  },
  ({ authClient }): Context => ({ authClient })
)(JApp);

/*
  // static childContextTypes = {
  //   authClient: PropTypes.func,
  //   appName: PropTypes.string
  // }
  // getChildContext(): Context  {
  //   return {
  //         authClient: this.props.authClient,
  //         appName: this.props.appName
  //     }
  // }
 */
