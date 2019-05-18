import React, { Component } from "react";
import Setup from "./expo_native_base_setup/Setup";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class App extends Component {
  render() {
    return <Setup />;
  }
}
