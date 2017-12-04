import React, { Component } from "react"
import { View, Text, Button } from "react-native"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"
import styled from "styled-components/native"
import { AsyncStorage } from "react-native"

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.createUser = this.createUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
  }
  async createUser() {
    const { username, password, name } = this.state

    try {
      console.log(this.props)

      const response = await this.props.signupUserMutation({
        variables: { username, password, name },
      })

      AsyncStorage.setItem("graphcoolToken", response.data.signupUser.token)
      // localStorage.setItem("graphcoolToken", response.data.signupUser.token)
      // this.props.history.push("/")
      // this.props.navigation.navigate("Dashboard")
    } catch (e) {
      console.error("An error occured: ", e)
      // this.props.navigation.navigate("Dashboard")
      // this.props.history.push("/")
    }
  }

  async loginUser() {
    const { username, password } = this.state

    console.log("LOGGING IN USER")

    try {
      console.log(this.props)

      const response = await this.props.authenticateUserMutation({
        variables: { username, password },
      })

      console.log(response.data)

      AsyncStorage.setItem(
        "graphcoolToken",
        response.data.authenticateUser.token
      )
    } catch (e) {
      console.error("An error occurred: ", e)
    }
  }

  state = {
    username: "",
    password: "",
    name: "",
    login: false,
  }

  render() {
    return (
      <Container>
        <InnerContainer>
          <Logo>Remix</Logo>
          <Title>{this.state.login ? "Log In" : "Sign Up"}</Title>
          <FormInput
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            returnKeyType="next"
          />
          <FormInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
          />
          {!this.state.login && (
            <FormInput
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholder="First M. Last"
              secureTextEntry={true}
            />
          )}
          {this.state.login ? (
            <Button title="Login" onPress={this.loginUser} />
          ) : (
            <Button title="Create New Account" onPress={this.createUser} />
          )}

          {this.state.login ? (
            <Button
              title="Create New User Instead"
              onPress={() =>
                this.setState({
                  login: false,
                })
              }
            />
          ) : (
            <Button
              title="Existing User - Log In"
              onPress={() =>
                this.setState({
                  login: true,
                })
              }
            />
          )}
        </InnerContainer>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const InnerContainer = styled.View`
  width: 70%;
`

const Logo = styled.Text`
  font-size: 60;
  font-weight: 800;
`

const Title = styled.Text`
  font-size: 20;
  padding-bottom: 20;
`

const FormInput = styled.TextInput`
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
`

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

export default compose(
  graphql(SIGN_UP_USER, { name: "signupUserMutation" }),
  graphql(AUTH_USER, { name: "authenticateUserMutation" })
)(SignUp)
