import React, { Component } from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"
import AppLayout from "../../layout/App"
import { StyleSheet, Text, View, AsyncStorage } from "react-native"
import SignUp from "../SignUp"
import Onboarding from "../Onboarding"

class AuthManager extends Component {
  state = {
    loading: true,
    loggedIn: false,
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
    this.setState({ loggedIn: false })
    AsyncStorage.removeItem("graphcoolToken")
  }

  render() {
    const { loginQuery } = this.props
    const { loading, loggedIn, user } = this.state
    const { login, signup } = this

    if (loginQuery.loading != loading) {
      this.setState({ loading: loginQuery.loading })
    }

    if (loginQuery.loggedInUser && !loggedIn) {
      this.setState({ loggedIn: true, user: loginQuery.loggedInUser })
    }

    if (loading) return <Text>Loading</Text>
    if (loggedIn) return <AppLayout userId={user.id} logout={this.logout} />
    else return <Onboarding login={login} signup={signup} />
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
