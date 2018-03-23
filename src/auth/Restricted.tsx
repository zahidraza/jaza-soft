import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userCheck as userCheckAction, UserCheckParam } from '../action/authAction';
import {AppState} from "../reducer";
import {DataType} from "../types";


export interface PropsFromDispatch {
  userCheck: Function
}

export interface OwnProps {
  userCheckParam: UserCheckParam,
  pathname: string,
  children: React.ReactElement<any>
}

export type Props = OwnProps & PropsFromDispatch;

/**
 * Restrict access to children
 *
 * Expects an authClient prop, which will be called with AUTH_CHECK upon mount and update
 *
 * Useful for Route components - used in CrudRoute
 *
 * @example
 * <Route path="/foo" render={routeParams =>
 *   <Restricted authClient={authClient} pathname={routeParams.pathname}>
 *     <Foo />
 *   </Restricted>
 * } />
 */
export class Restricted extends Component<Props, {}> {

    componentWillMount() {
        this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.pathname !== this.props.pathname) {
            this.checkAuthentication(nextProps);
        }
    }

    checkAuthentication(props: Props) {
        const { userCheck, userCheckParam, pathname } = props;
        userCheck(userCheckParam, pathname);
    }

    // render the child even though the AUTH_CHECK isn't finished (optimistic rendering)
    render() {
        const {
            children,
            userCheck,
            userCheckParam,
            pathname,
            ...rest
        } = this.props;
        return React.cloneElement(children, rest);
    }
}

export default connect< {}, PropsFromDispatch, OwnProps, AppState<DataType>>(null, {
  userCheck: userCheckAction
})(Restricted);

