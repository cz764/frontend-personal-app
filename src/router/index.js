import { Route, Switch } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/register" component={Register}></Route>
  </Switch>
);

export default Router;
