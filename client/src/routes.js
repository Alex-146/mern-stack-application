
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Promocode from "./Pages/Promocode";
import Create from "./Pages/Create";
import Detail from "./Pages/Detail";
import Auth from "./Pages/Auth";

export function useRoutes(isAuthorized) {
  if (isAuthorized) {
    return (
      <Switch>
        <Route path="/promocode" exact >
          <Promocode />
        </Route>
        <Route path="/create" exact >
          <Create  />
        </Route>
        <Route path="/detail/:id" >
          <Detail  />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }
  else {
    return (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }
}