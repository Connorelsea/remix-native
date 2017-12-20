import React, { Component } from "react"
import { Alert } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { bind } from "decko"

import Title from "../../components/Title"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default class NewUser extends Component {
  state = {
    username: "",
    password: "",
    name: "",
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
  handleNewUserPress() {
    const { screenProps: { signup } } = this.props
    const { username, password, name } = this.state

    if (username.trim() === "" || password.trim() === "")
      return Alert.alert("Please enter your information before singing up")

    signup({ username, password, name })
  }

  render() {
    return (
      <Container>
        <Padding>
          <Title>New User</Title>
        </Padding>
        <Input
          label="Username"
          name="username"
          onChangeText={this.handleChangeUsername}
          state={this.state}
        />
        <Input
          label="Password"
          name="password"
          onChangeText={this.handleChangePassword}
          secureTextEntry
          state={this.state}
        />
        <Input
          last
          label="Display Name"
          name="name"
          onChangeText={this.handleChangePassword}
          state={this.state}
        />
        <Padding>
          <Button onPress={this.handleNewUserPress}>Join</Button>
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
