import * as React from "react";
import { connect, MapStateToProps } from "react-redux";

import List from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import {Theme, WithStyles, withStyles, StyledComponentProps} from "material-ui/styles";

import { Payload } from "../../action/resourceAction";
import MenuItem from "./MenuItem";
import { AppState } from "../../reducer";
import { DataType, MenuItems } from "../../types";

export interface State {
  tabs: {
    [key: string]: boolean
  }
}

export interface OwnProps {
  logout?: any;
  hasDashboard?: boolean;
  onMenuTap?: Function;
  menuItems: MenuItems[];
}

const styles = (theme: Theme) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export type StyledProps = OwnProps & WithStyles< "nested" >;

class Menu extends React.Component<StyledProps, State> {
  
  componentWillMount() {
    const {menuItems} = this.props;
    let tabs: any = {};
    menuItems.forEach(item => {
      if (item.nestedMenuItems) {
        tabs[item.name] = false
      }
    });
    this.setState({tabs});
  }
  

  handleClick = (name: string) => {
    let {tabs} = this.state;
    tabs[name] = !tabs[name];
    this.setState({tabs});
    if (this.props.onMenuTap) {
      this.props.onMenuTap();
    }
  };

  render(): JSX.Element {
    const {menuItems, onMenuTap, classes} = this.props;
    const {tabs} = this.state;

    let items: JSX.Element[] = [];
    menuItems.forEach((item, idx) => {
      let rightIcon; 
      if (item.nestedMenuItems) {
        rightIcon = tabs[item.name] ? <ExpandLess /> : <ExpandMore />;
      }
      items.push(
        <MenuItem
          key={item.name}
          to={item.nestedMenuItems ? undefined  :`/${item.name}`}
          primaryText={item.name}
          onClick={this.handleClick.bind(this, item.name)}
          leftIcon={item.icon}
          rightIcon={rightIcon}
        />
      );
      if (item.nestedMenuItems) {
        items.push(
          <Collapse key={`${item.name}-${item.nestedMenuItems.length}`} in={tabs[item.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
              {item.nestedMenuItems.map(nItem => (
                <MenuItem
                  key={`${item.name}-${nItem.name}`}
                  to={`/${item.name}/${nItem.name}`}
                  primaryText={nItem.name}
                  leftIcon={nItem.icon}
                  onClick={onMenuTap}
                  classes={classes.nested}
                  inset
                />
              ))}
            </List>
          </Collapse>
        );
      }
    });

    return (
      <List>
        {items}
      </List>
    );
  }
}

export default withStyles(styles)<OwnProps>(Menu);
