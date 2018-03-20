import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { FnAuthClient } from './rest/httpClients';
import { declareResources, Payload } from './action/resourceAction';
import { AppState } from './reducer';
import { DataType } from './types';

export type componentType = React.ComponentType<any> | Function;

export interface PropsFromDispatch {
  declareResources: Function;
}

export interface PropsFromState {
  resources: Array<Payload|undefined>;
}

export interface OwnProps {
  dashboard?: componentType;
  appLayout?: componentType;
  menu?: componentType;
  authClient?: FnAuthClient;
  customRoutes?: any[];
  resources?: any[];
  theme?: string;
  appName?: string;
  logout?: string | Function | React.ReactNode;
  children?: Function | React.ReactNode;
  catchAll?: componentType;
}

// export type Props = OwnProps & PropsFromState & PropsFromDispatch;

class JAppRoutes extends React.Component<OwnProps & PropsFromState & PropsFromDispatch, {}> {
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

    const resources =
      React.Children.map(
        children,
        child => (child ? (child as React.ReactElement<any>).props : false)
      ) || [];
    this.props.declareResources(resources.filter(r => r));
  }

  render() {
    return <div>Hello</div>;
  }
}



// export default compose(
//   getContext<Context>({
//     authClient: PropTypes.func
//   }),
//   connect<PropsFromState, PropsFromDispatch, OwnProps>(mapStateToProps, {
//     declareResources
//   })
// )(JAppRoutes);

// export default getContext<Context>({
//   authClient: PropTypes.func
// })(connect<PropsFromState, PropsFromDispatch, OwnProps>(mapStateToProps, {
//   declareResources
// }))(JAppRoutes);

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps, AppState<DataType>> = (state: AppState<DataType>, ownProps: OwnProps): PropsFromState => ({
  resources: Object.keys(state.jazasoft.resources).map(key => state.jazasoft.resources[key].props)
});


const connectedCmp = connect<PropsFromState, PropsFromDispatch, OwnProps, AppState<DataType>>(mapStateToProps, {
  declareResources
})(JAppRoutes);

export default connectedCmp;

// export default getContext<Context>({ authClient: PropTypes.func })(connectedCmp);
