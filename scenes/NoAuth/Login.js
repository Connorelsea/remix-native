import React, { Component } from "react"
import { Alert } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { bind } from "decko"

import Title from "../../components/Title"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  @bind
  handleChangeUsername(text) {
    this.setState({ username: text })
  }

  @bind
  handleChangePassword(text) {
    this.setState({ password: text })
  }

  @bind
  handleLoginPress() {
    const { screenProps: { login } } = this.props
    const { username, password } = this.state
    if (username.trim() === "" || password.trim() === "")
      return Alert.alert("Please enter your information before logging in")

    console.log("handle login press")
    console.log(this.state)

    login({ username, password })
  }

  render() {
    return (
      <Container>
        <Padding>
          <Title>Login</Title>
        </Padding>
        <Input
          label="Username"
          name="username"
          onChangeText={this.handleChangeUsername}
          state={this.state}
        />
        <Input
          last
          label="Password"
          name="password"
          onChangeText={this.handleChangePassword}
          secureTextEntry
          state={this.state}
        />
        <Padding>
          <Button onPress={this.handleLoginPress}>Login</Button>
        </Padding>
      </Container>
    )
  }
}

const Padding = styled.View`
  padding: 30px;
`

const Container = styled.View`
  padding-top: 60px;
`
