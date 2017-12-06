import React, { Component } from "react"
import { View, TextInput, Text } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"

class PathChooser extends Component {
  state = { username: "", password: "" }

  constructor(props) {
    super(props)

    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  setUsername(username) {
    this.setState({ username })
  }

  setPassword(password) {
    this.setState({ password })
  }

  render() {
    const { login, signup } = this.props

    return (
      <PathView>
        <ViewTitle>Remix</ViewTitle>
        <ViewSubtitle>MADE BY ELSEA LABS</ViewSubtitle>
        <PathCard>
          <PathTitle title="Login" subtitle="Existing User" />
          <InputContainer>
            <Input placeholder="Username" onPress={this.setUsername} />
            <Input placeholder="Password" onPress={this.setPassword} />
          </InputContainer>
          <ButtonContainer>
            <Button color="black" onPress={login}>
              <ButtonText>Log In</ButtonText>
            </Button>
          </ButtonContainer>
        </PathCard>
        <PathCard>
          <PathTitle title="Sign Up" subtitle="New User" />
          <InputContainer>
            <Input placeholder="Username" onPress={this.setUsername} />
          </InputContainer>
          <ButtonContainer>
            <Button color={colors.blue[400]} onPress={signup}>
              <ButtonText>Sign Up</ButtonText>
            </Button>
          </ButtonContainer>
        </PathCard>
      </PathView>
    )
  }
}

const ViewTitle = styled.Text`
  font-size: 70px;
  font-weight: 200;
  color: white;
`

const ViewSubtitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.grey[700]};
  margin-bottom: 30px;
`

const PathView = styled.View`
  padding: 40px;
  background-color: black;
  flex: 1;
  justify-content: center;
`

const PathCard = styled.View`
  background-color: white;
  padding: 20px 25px;
  border-radius: 12px;
  margin-bottom: 25px;
`

const PathTitle = ({ title, subtitle }) => [
  <PathMainTitle key={title}>{title}</PathMainTitle>,
  <PathSubTitle key={subtitle}>{subtitle.toUpperCase()}</PathSubTitle>,
]

const PathMainTitle = styled.Text`
  font-size: 32px;
  color: black;
  font-weight: 800;
  font-family: System;
  padding-bottom: 5px;
`

const PathSubTitle = styled.Text`
  font-size: 14px;
  color: ${colors.grey[400]};
  font-weight: 700;
  margin-top: 2px;
  margin-bottom: 15px;
  font-family: System;
`

const InputContainer = styled.View`
  padding: 0 15px;
  margin-bottom: 10px;
`

const Input = styled.TextInput`
  padding: 6px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey[200]};
  padding-bottom: 10px;
  margin-bottom: 10px;
`

const ButtonContainer = styled.View`
  align-items: flex-end;
`

const Button = styled.TouchableOpacity`
  background-color: ${props => props.color};
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 17px;
  margin-left: 10px;
`

const ButtonText = styled.Text`
  font-size: 14px;
  font-family: System;
  font-weight: 600;
  color: white;
`

const VIEW_SIGNUP = Symbol("VIEW_SIGNUP")
const VIEW_LOGIN = Symbol("VIEW_LOGIN")
const VIEW_PATH = Symbol("VIEW_PATH")

class Onboarding extends Component {
  state = {
    username: "",
    password: "",
    view: VIEW_PATH,
  }

  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(username, password) {
    this.setState({
      username,
      password,
      view: VIEW_LOGIN,
    })
  }

  signup(username) {
    this.setState({
      username,
      view: VIEW_SIGNUP,
    })
  }

  render() {
    const { login, signup } = this
    const { view } = this.state

    switch (view) {
      case VIEW_LOGIN:
        return <Text>Login</Text>

      case VIEW_SIGNUP:
        return <Text>Signup</Text>

      default:
      case VIEW_PATH:
        return <PathChooser login={login} signup={signup} />
    }
  }
}

export default Onboarding
