// @flow
import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import type { Store } from "redux";

import App from "../components/App";
import type { Action, Dispatch, State } from "../types";

const Root = ({ store }: { store: Store<State, Action, Dispatch> }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

export default Root;
