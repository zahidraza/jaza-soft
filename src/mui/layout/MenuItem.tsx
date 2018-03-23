import * as React from "react";

import {withRouter, RouteComponentProps} from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText }  from "material-ui/List";
import TocIcon from 'material-ui-icons/Toc';

export interface Props extends RouteComponentProps<any> {
  to?: string,
  primaryText: string,
  secondaryText?: string,
  onClick?: Function,
  leftIcon?: JSX.Element,
  rightIcon?: JSX.Element,

  classes?: string;
  inset?: boolean;
}

class ListItemLink extends React.Component<Props, {}> {


  handleMenuTap = () => {
    const {history, onClick, to} = this.props;
    if (to) {
      history.push(to);
    }
    if (onClick) {
      onClick();
    }
  };

  render (): JSX.Element {
    const { primaryText, secondaryText, leftIcon, rightIcon, classes, inset} = this.props;
    let leftIconItem;
    if (leftIcon) {
      leftIconItem = <ListItemIcon>{leftIcon}</ListItemIcon>;
    } else {
      leftIconItem = <ListItemIcon><TocIcon /></ListItemIcon>;
    }
    return (
      <ListItem button className={classes} onClick={this.handleMenuTap} >
        {leftIconItem}
        <ListItemText inset primary={primaryText} secondary={secondaryText} />
        {rightIcon}
      </ListItem>
    );
  }
}

export default withRouter<Props>(ListItemLink);