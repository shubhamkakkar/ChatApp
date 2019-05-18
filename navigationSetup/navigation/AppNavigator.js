import React from "react";
import { Provider } from "react-redux";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import configureStore from "../../src/store";
import MainTabNavigator from "./MainTabNavigator";

const App = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);

const store = configureStore();
store.subscribe(() => {
  const stores = store.getState();
  console.log("stores", stores);
});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
