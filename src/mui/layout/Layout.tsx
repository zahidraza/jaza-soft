import * as React from "react";

import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { List, ListItem, ListItemIcon, ListItemText, MenuItem }  from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  WithStyles,
  Theme,
  StyledComponentProps,
  StyleRules
} from "@material-ui/core/styles";

import Menu from "./Menu";
import {MenuItems} from "../../types";


const drawerWidth = 240;

const style: StyleRules<'someClass' | 'root'> = {
  someClass: {
      flexWrap: 'wrap',
      position: 'relative'
  },
  root: {
    flexGrow: 1
  },
};

export type styleRules = StyleRules<"root" | "appBar" | "appBarShift" | "appBarShift-left" | "menuButton" | "hide" | "drawerPaper" | "drawerHeader" | "content" | "content-left" | "contentShift" | "contentShift-left" >;

const styles = (theme: Theme): styleRules => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
});

export interface State {
  open: boolean;
}

export interface OwnProps {
  dashboard?: React.ComponentType<any>;
  menu?: React.ComponentType<any>;
  menuItems: MenuItems[],
  customRoutes?: any[];
  appName?: string;
  logout?: string | Function | React.ReactNode;
  children?: JSX.Element;
  catchAll?: React.ComponentType<any>;
  theme: object;
  classes: object;
}

export type PropsWithStyles = OwnProps &
  WithStyles<"root" | "appBar" | "appBarShift" | "appBarShift-left" | "menuButton" | "hide" | "drawerPaper" | "drawerHeader" | "content" | "content-left" | "contentShift" | "contentShift-left" >;

class Layout extends React.Component<PropsWithStyles, State> {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { theme, classes, appName, menuItems, children } = this.props;
    const {open} = this.state;

    const muiTheme = createMuiTheme(theme);

    const drawer = (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Menu menuItems={menuItems} />
      </Drawer>
    );

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className={classes.root} >
          <AppBar 
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes['appBarShift-left']]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {appName}
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)<OwnProps>(Layout);
