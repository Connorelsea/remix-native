import React, { Component } from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"
import AppLayout from "../../layout/App"
import { StyleSheet, Text, View, AsyncStorage } from "react-native"

import NoAuth from "../NoAuth"

class AuthManager extends Component {
  state = {
    loading: true,
    loggedIn: false,
    logout: false,
    user: undefined,
    errors: [],
  }

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.signup = this.signup.bind(this)
  }

  checkAuthentication() {
    const { loginQuery } = this.props
    const { loggedIn } = this.state

    if (!loggedIn)
      this.setState({ loggedIn: loginQuery.loggedIn ? true : false })
  }

  async signup({}) {}

  async login({ username, password }) {
    console.debug("AuthManager: Logging In User")
    console.log(username, password)
    const { loginQuery } = this.props

    try {
      const response = await this.props.authenticateUserMutation({
        variables: { username, password },
      })

      AsyncStorage.setItem(
        "graphcoolToken",
        response.data.authenticateUser.token
      )
    } catch (e) {
      console.error("An error occurred: ", e)
      this.setState({
        errors: ["Login failed, please try again."],
      })
    }

    this.setState({ loggedIn: true, user: loginQuery.loggedInUser })
  }

  logout() {
    AsyncStorage.removeItem("graphcoolToken")
    this.setState({ loggedIn: false, logout: true })
  }

  render() {
    const { loginQuery } = this.props
    const { loading, loggedIn, user, logout } = this.state
    const { login, signup } = this

    if (loginQuery.loading != loading) {
      this.setState({ loading: loginQuery.loading })
    }

    if (loginQuery.loggedInUser && !loggedIn && !logout) {
      this.setState({ loggedIn: true, user: loginQuery.loggedInUser })
    }

    if (loggedIn) return <AppLayout userId={user.id} logout={this.logout} />
    else {
      if (logout) this.setState({ logout: false })
      return (
        <NoAuth
          screenProps={{
            login: this.login,
          }}
        />
      )
    }
  }
}

const AUTH_USER = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      id
      token
    }
  }
`

const SIGN_UP_USER = gql`
  mutation SignupUser($username: String!, $password: String!, $name: String!) {
    signupUser(username: $username, password: $password, name: $name) {
      id
      token
    }
  }
`

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(LOGGED_IN_USER, {
    name: "loginQuery",
    options: { fetchPolicy: "network-only" },
  }),
  graphql(SIGN_UP_USER, { name: "signupUserMutation" }),
  graphql(AUTH_USER, { name: "authenticateUserMutation" })
)(AuthManager)
