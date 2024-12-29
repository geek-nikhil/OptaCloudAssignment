import React from "react";
import { Provider } from "react-redux";
import store from "./utilities/appStore";
import Body from "./Components/Body";

export default function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}
