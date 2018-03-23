import * as React from "react";
import * as PropTypes from "prop-types";
import { connect, MapStateToProps } from "react-redux";
import {Switch, Route} from "react-router-dom";

import { FnAuthClient } from "./rest/httpClients";
import { declareResources, Payload } from "./action/resourceAction";
import { AppState } from "./reducer";
import { DataType, MenuItems } from "./types";
import {Props as ResourceProps} from "./Resource";


import DefaultLayout from "./mui/layout/Layout";
import CrudRoute from "./CrudRoute";


///////  Declarations ////////////
export interface PropsFromDispatch {
  declareResources: Function;
}
export interface State {
  resources?: ResourceProps[];
}
export interface OwnProps {
  dashboard?: React.ComponentType<any>;
  appLayout?: React.ComponentType<any>;
  menu?: React.ComponentType<any>;
  authClient?: FnAuthClient;
  customRoutes?: any[];
  theme?: object;
  appName?: string;
  logout?: string | Function | React.ReactNode;
  children?: Function | React.ReactNode;
  catchAll?: React.ComponentType<any>;
}

class JAppRoutes extends React.Component<OwnProps & PropsFromDispatch, State> {
  static contextTypes = {
    authClient: PropTypes.func
  };

  componentWillMount() {
    const {children} = this.props;
    let resources: ResourceProps[] = [];
    React.Children.forEach(children, child => {
      if (child) {
        const c = child as React.ReactElement<any>;
        if (React.Children.count(c.props.children) === 0) {
          resources.push(c.props);
        } else {
          const nestedProps = React.Children.map(
            c.props.children, 
            child2 => (child2 ? (child2 as React.ReactElement<any>).props: false)
          );
          resources = resources.concat(nestedProps.map((r: any) => ({...r, name: c.props.name + '/' + r.name})));
        }
      }
    });
    this.setState({resources});
  }
  

  componentDidMount() {
    this.initializeResources(this.props.children);
  }

  initializeResources(children: Function | React.ReactNode) {
    // if (typeof children === "function") {
    //   if (!this.context.authClient) {
    //     // throw new Error(getMissingAuthClientError("Admin"));
    //     throw new Error('Missing AuthClient');
    //   }

    //   this.context.authClient(AUTH_GET_PERMISSIONS).then(permissions => {
    //     const resources = children(permissions)
    //       .filter(node => node)
    //       .map(node => node.props);
    //     this.props.declareResources(resources);
    //   });
    // } else {
    //   const resources = React.Children.map(children, child => (child ? child.props : false)) || [];
    //   this.props.declareResources(resources.filter(r => r));
    // }
    let resources: any = [];
    React.Children.forEach(children, child => {
      if (child) {
        const c = child as React.ReactElement<any>;
        if (React.Children.count(c.props.children) === 0) {
          resources.push(c.props);
        } else {
          const nestedProps = React.Children.map(
            c.props.children, 
            child2 => (child2 ? (child2 as React.ReactElement<any>).props: false)
          );
          resources = resources.concat(nestedProps);
        }
      }
    });
    this.props.declareResources(resources);
  }

  menuItems = (children: Function | React.ReactNode): MenuItems[] => {
    let menuItems: MenuItems[] = [];
    React.Children.forEach(children, child => {
      if (child) {
        const c = child as React.ReactElement<any>;
        if (React.Children.count(c.props.children) === 0) {
          if (c.props.list) {
            menuItems.push({name: c.props.name, icon: c.props.icon});
          }
        } else {
          const nestedMenuItems: MenuItems[] = []
          React.Children.forEach(
            c.props.children, 
            child2 => {
              if (child2) {
                const c2 = child2 as React.ReactElement<any>;
                if (c2.props.list) {
                  nestedMenuItems.push({name: c2.props.name, icon: c2.props.icon});
                }
              }
            }
          );
          menuItems.push({name: c.props.name, nestedMenuItems});
        }
      }
    });
    return menuItems;
  }


  render(): JSX.Element {
    const {
      appLayout = DefaultLayout,
      appName,
      dashboard,
      menu,
      logout,
      theme,
      customRoutes,
      catchAll,
      children
    } = this.props;

    const {resources} = this.state;

    const menuItems = this.menuItems(children);

    return (
      <Switch>
        
        <Route
          path="/"
          render={routeProps => React.createElement(appLayout, {
            dashboard,
            logout,
            menu,
            menuItems,
            catchAll,
            theme,
            appName,
            customRoutes,
            children: (
              <Switch>
                {resources && resources.map(resource => (
                  <Route
                    path={`/${resource.name}`}
                    key={resource.name}
                    render={() => (
                      <CrudRoute
                        resource={resource.name}
                        list={resource.list}
                        create={resource.create}
                        edit={resource.edit}
                        view={resource.view}
                        remove={resource.remove}
                      />
                    )}
                  />
                ))}
              </Switch>
            )
          })}
        />
      </Switch>
    );
  }
}

// const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, AppState<DataType>> = (
//   state: AppState<DataType>,
//   ownProps: OwnProps
// ): PropsFromState => ({
//   resources: Object.keys(state.jazasoft.resources).map(key => state.jazasoft.resources[key].props)
// });

const connectedCmp = connect< {}, PropsFromDispatch, OwnProps, AppState<DataType>>(null, {
  declareResources
})(JAppRoutes);

export default connectedCmp;
