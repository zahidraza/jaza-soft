import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import Restricted from "./auth/Restricted";

export interface OwnProps {
  resource: string;
  list?: React.ComponentType<any>;
  create?: React.ComponentType<any>;
  edit?: React.ComponentType<any>;
  view?: React.ComponentType<any>;
  remove?: React.ComponentType<any>;
}

const CrudRoute = ({ resource, list, create, edit, view, remove }: OwnProps) => {
  const commonProps = {
    resource,
    hasList: !!list,
    hasEdit: !!edit,
    hasView: !!view,
    hasCreate: !!create,
    hasDelete: !!remove
  };
  const restrictPage = (component: React.ComponentType<any>, route: string) => {
    const RestrictedPage = (routeProps: RouteComponentProps<any>) => (
      <Restricted userCheckParam={{ resource, route }} pathname={routeProps.location.pathname}>
        {React.createElement(component, {
          ...commonProps,
          ...routeProps
        })}
      </Restricted>
    );
    return RestrictedPage;
  };
  return (
    <Switch>
      {list && <Route exact path={`/${resource}`} render={restrictPage(list, "list")} />}
      {create && (
        <Route exact path={`/${resource}/create`} render={restrictPage(create, "create")} />
      )}
      {edit && <Route exact path={`/${resource}/:id`} render={restrictPage(edit, "edit")} />}
      {view && <Route exact path={`/${resource}/:id/show`} render={restrictPage(view, "show")} />}
      {remove && (
        <Route exact path={`/${resource}/:id/delete`} render={restrictPage(remove, "delete")} />
      )}
    </Switch>
  );
};

export default CrudRoute;
