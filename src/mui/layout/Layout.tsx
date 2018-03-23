import * as React from "react";

import classNames from "classnames";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List, { ListItem, ListItemIcon, ListItemText }  from "material-ui/List";
import { MenuItem } from "material-ui/Menu";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import ChevronRightIcon from "material-ui-icons/ChevronRight";
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  WithStyles,
  Theme,
  StyledComponentProps
} from "material-ui/styles";

import Menu from "./Menu";
import {MenuItems} from "../../types";


const drawerWidth = 240;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    // position: "absolute",
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
    // position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  WithStyles<"root" | "appBar" | "appBarShift" | "appBarShift-left" | "menuButton" | "hide" | "drawerPaper" | "drawerHeader" >;

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
    const { theme, classes, appName, menuItems } = this.props;
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
        {/* <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List> */}
      </Drawer>
    );

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <AppBar position="absolute"
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
          <div>
            Hello World
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)<OwnProps>(Layout);
