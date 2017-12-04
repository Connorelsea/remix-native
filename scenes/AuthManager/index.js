import React, { Component } from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"
import AppLayout from "../../layout/App"
import { StyleSheet, Text, View } from "react-native"
import SignUp from "../SignUp"

class AuthManager extends Component {
  render() {
    const { loginQuery } = this.props

    console.log("AUTH MANAGER", loginQuery)

    return loginQuery.loggedInUser ? (
      <AppLayout userId={loginQuery.loggedInUser.id} />
    ) : (
      <SignUp />
    )
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

export default graphql(LOGGED_IN_USER, {
  name: "loginQuery",
  options: { fetchPolicy: "network-only" },
})(AuthManager)
