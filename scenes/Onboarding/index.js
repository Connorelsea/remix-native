import React, { Component } from "react"
import { View, TextInput, Text, StatusBar } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"

import Signup from "./Signup"

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
    const { loading, login, signup } = this.props

    if (loading) {
      return (
        <PathView>
          <StatusBar barStyle="dark-content" />
          <ViewTitle>Remix</ViewTitle>
          <PathSubTitle>MADE BY ELSEA LABS</PathSubTitle>
        </PathView>
      )
    }

    return (
      <PathView>
        <StatusBar barStyle="dark-content" />

        <PathCard>
          <PathTitle title="Remix" subtitle="Made by Elsea Labs" />
          <Paragraph>Lorem ipsum test</Paragraph>
          <VersionContainer>
            <VersionTitle>ALPHA</VersionTitle>
            <Version>1.0.0</Version>
          </VersionContainer>
        </PathCard>

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
          <PathTitle title="New User" subtitle="Join the Community" />
          <InputContainer>
            <Input placeholder="Username" onPress={this.setUsername} />
          </InputContainer>

          <ButtonContainer>
            <Button color={colors.blue[400]} onPress={signup}>
              <ButtonText>Join</ButtonText>
            </Button>
          </ButtonContainer>
        </PathCard>
      </PathView>
    )
  }
}

const VersionContainer = styled.View`
  position: absolute;
  top: 20;
  right: 15;
  padding: 5px 10px;
  background-color: ${colors.blueGrey[200]};
  border-radius: 10px;
  flex-direction: row;
`

const Version = styled.Text`
  color: ${colors.blueGrey[500]};
  background-color: transparent;
  font-weight: 300;
  text-align: right;
`

const VersionTitle = styled.Text`
  color: ${colors.blueGrey[700]};
  background-color: transparent;
  font-weight: 800;
  letter-spacing: 1;
  margin-right: 5px;
`

const Paragraph = styled.Text``

const ViewTitle = styled.Text`
  font-size: 70px;
  font-weight: 100;
  color: ${colors.blueGrey[200]};
`

const PathView = styled.ScrollView`
  padding: 30px;
  background-color: #eee;
  flex: 1;
  /* justify-content: center; */
`

const PathCard = styled.View`
  background-color: white;
  padding: 25px 20px;
  border-radius: 20px;
  margin-bottom: 25px;
  padding-bottom: 32px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: black;
  shadow-offset: 0px 10px;
  position: relative;
`

const PathTitle = ({ title, subtitle }) => [
  <PathSubTitle key={subtitle}>{subtitle.toUpperCase()}</PathSubTitle>,
  <PathMainTitle key={title}>{title}</PathMainTitle>,
  <Padding x="15" />,
]

const Padding = styled.View`
  flex: 1;
  width: 100%;
  min-height: ${props => props.x}px;
`

const PathMainTitle = styled.Text`
  font-size: 32px;
  color: black;
  font-weight: 800;
  font-family: System;
  background-color: transparent;
`

const PathSubTitle = styled.Text`
  font-size: 12px;
  color: ${colors.blueGrey[500]};
  font-weight: 800;
  font-family: System;
  letter-spacing: 1px;
`

const InputContainer = styled.View`
  padding: 0 10px;
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
  /* min-height: 35px;
  min-width: 80px; */
  padding: 12px 25px;
  border-radius: 60px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  font-size: 14px;
  font-family: System;
  font-weight: 600;
  color: white;
  background-color: transparent;
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
    const { loading } = this.props

    switch (view) {
      case VIEW_LOGIN:
        return <Text>Login</Text>

      case VIEW_SIGNUP:
        return <Signup />
      default:

      case VIEW_PATH:
        return <PathChooser loading={loading} login={login} signup={signup} />
    }
  }
}

export default Onboarding
