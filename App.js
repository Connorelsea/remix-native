import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthManager from "./scenes/AuthManager";
import { ApolloProvider } from "react-apollo";
const client = require("./client.js").default;

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AuthManager />
      </ApolloProvider>
    );
  }
}
