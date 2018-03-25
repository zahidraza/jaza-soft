import * as React from "react";
import {connect, MapStateToProps} from "react-redux";
import {reduxForm, InjectedFormProps, ConfigProps} from "redux-form";

import {AppState} from "../../reducer";
import {DataType} from "../../types";
import { login as loginAction } from "../../action/authAction";

import { StyleRules, Theme, WithStyles, withStyles, StyledComponentProps } from "material-ui/styles";


const styles = (theme: Theme): StyleRules<"main"> => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main
  }
});

export interface FormData {
  username: string;
  password: string;
}

export interface State {
  open?: boolean
}

export interface OwnProps {
  name?: boolean
}

export interface PropsFromState {
  isLoading?: boolean;
}

export interface PropsFromDispatch {
  login: Function;
}

export type StyledProps = WithStyles<"main">;

export type Props = OwnProps & PropsFromState & PropsFromDispatch & StyledProps;

class Login extends React.Component<Props & InjectedFormProps<FormData, Props>, State> {

  render (): JSX.Element {
    const {
      classes,
      name,
      isLoading,
      login
    } = this.props;
    return (
      <div>Login Page</div>
    );
  }
}

const Wrapper = (props: Props & InjectedFormProps<FormData, Props>) => <Login {...props} />;

const withForm = reduxForm<Readonly<FormData>, Props>({
  form: 'login'
})(Wrapper);


const mapStateToProps: MapStateToProps<PropsFromState, OwnProps,AppState<DataType>> = (state: AppState<DataType>): PropsFromState => ({
  isLoading: state.jazasoft.loading > 0
});

const connectedCmp = connect<PropsFromState, PropsFromDispatch, OwnProps, AppState<DataType>>(mapStateToProps, 
  { login: loginAction }
)(withForm);

const styledCmp = withStyles(styles)<OwnProps>(connectedCmp);

export default styledCmp;



