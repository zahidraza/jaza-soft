import * as React from "react";
import {
  reduxForm,
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  GenericFieldHTMLAttributes,
  FormErrors,
  FormSubmitHandler
} from "redux-form";
import { connect, MapStateToProps, Dispatch } from "react-redux";
import {Location} from "history";

import { login as loginAction } from "../../action/authAction";
import {DataType} from "../../types";
import {AppState} from "../../reducer";

import {
  createMuiTheme,
  MuiThemeProvider,
  Theme,
  StyleRules,
  StyledComponentProps,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import {Card, CardActions, Input, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import Input, { InputLabel } from "@material-ui/core/Input";
// import { FormControl, FormHelperText } from "@material-ui/core/Form";

// const style = (
//   theme: Theme
// ): StyleRules<"main" | "card" | "avatar" | "form" | "input" | "container" | "formControl"> => ({
//   main: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: theme.palette.primary.main
//   },
//   card: {
//     minWidth: 300
//   },
//   avatar: {
//     margin: "1em",
//     textAlign: "center "
//   },
//   form: {
//     padding: "0 1em 1em 1em"
//   },
//   input: {
//     display: "flex"
//   },
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   formControl: {
//     margin: theme.spacing.unit
//   }
// });

const style = (
  theme: Theme
): StyleRules<"main" | "card" | "container" | "formControl" > => ({
    main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main
  },
  card: {
    minWidth: 300
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

const validate = (values: Readonly<FormData>): FormErrors<FormData> => {
  const errors: FormErrors<FormData> = {};

  if (!values.username) {
    errors.username = 'Username/Email Required.';
  }

  if (!values.password) {
    errors.password = 'Password Required.';
  }
  return errors;
};

export interface InputProps extends WrappedFieldProps {
  label?: string;
  disabled?: boolean;
  classes?: string;
  type?: string;
}
const renderInput = ({
  input,
  label,
  disabled,
  type,
  classes,
  meta: { touched, error },
  ...custom
}: InputProps & GenericFieldHTMLAttributes) => (
  <FormControl fullWidth className={classes} error={touched && error !== undefined} aria-describedby="name-error-text">
    <InputLabel htmlFor={"name-error" + input.name}>{label}</InputLabel>
    <Input id={"name-error" + input.name} type={type} {...input}/>
    {touched && error && <FormHelperText id="name-error-text">{error}</FormHelperText>}
  </FormControl>
);

export interface FormData {
  username: string;
  password: string;
}

export interface OwnProps {
  appName: string;
  theme: object;
  location: Location
}

export interface PropsFromState {
  isLoading: boolean;
}

export interface PropsFromDispatch {
  login: typeof loginAction;
}

export type StyledProps = WithStyles<"main" | "card" | "container" | "formControl">;

export type Props = OwnProps & PropsFromState & PropsFromDispatch & StyledProps;

class Login extends React.Component<Props & InjectedFormProps<FormData, Props>, {}> {

  onSubmit = (values: Partial<FormData>, dispatch: Dispatch<any>, props: Props) => {
    props.login(values, "/");
  }

  render (): JSX.Element {
    const { classes, theme, handleSubmit, submitting, isLoading } = this.props;
    const muiTheme = createMuiTheme(theme);
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.main}>
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(this.onSubmit)} >
              <div className={classes.container}>
                <Field
                  name="username"
                  component={renderInput}
                  label={"Username/Email"}
                  type="text"
                  disabled={isLoading}
                  classes={classes.formControl}
                />
                <Field
                  name="password"
                  component={renderInput}
                  label={"Password"}
                  type="password"
                  disabled={isLoading}
                  classes={classes.formControl}
                />
              </div>
              <CardActions>
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  fullWidth={true}
                >
                  Sign In
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = (props: Props & InjectedFormProps<FormData, Props>) => <Login {...props} />;

const withForm = reduxForm<Readonly<FormData>, Props>({
  form: 'login',
  validate
})(Wrapper);

const mapStateToProps: MapStateToProps<PropsFromState, OwnProps,AppState<DataType>> = (state: AppState<DataType>): PropsFromState => ({
  isLoading: state.jazasoft.loading > 0
});

const connectedCmp = connect<PropsFromState, PropsFromDispatch, OwnProps, AppState<DataType>>(mapStateToProps, 
  { login: loginAction }
)(withForm);

const styledCmp = withStyles(style)<OwnProps>(connectedCmp);

export default styledCmp;
