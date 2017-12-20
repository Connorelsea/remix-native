import React, { Component } from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { bind } from "decko"

import Title from "../../components/Title"

export default class NoAuthView extends Component {
  about = "A fast, beautiful, and reliable communication platform for the modern era. Stay connected with friends and meet new people - without invasive data mining or the influence of large companies."
  version = "Alpha 1.0.0"

  @bind
  handlePressLogin() {
    const { navigation } = this.props
    navigation.navigate("Login")
  }

  @bind
  handlePressNewUser() {
    const { navigation } = this.props
    navigation.navigate("NewUser")
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Remix</Title>
          <VerticalSpace px={12} />
          <About>{this.about}</About>
        </Header>

        <Body>
          <Button onPress={this.handlePressLogin}>Login</Button>
          <VerticalSpace px={12} />
          <Button onPress={this.handlePressNewUser}>New User</Button>
        </Body>

        <Footer>
          <FooterText>
            Made by <BrandName>Elsea Labs</BrandName>
          </FooterText>
          <VerticalSpace px={5} />
          <FooterText>{this.version}</FooterText>
        </Footer>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.theme.background};
  padding: 30px;
`

const VerticalSpace = styled.View`
  width: 100px;
  height: ${props => props.px}px;
`

// Header
// - Logo, app info

const Header = styled.View``

const About = styled.Text`
  font-size: 16;
  color: ${colors.grey[600]};
`

// Body
// - Auth calls to action, login + signup

const Body = styled.View`
  margin: 40px 0;
  width: 80%;
`

class Button extends React.Component {
  render() {
    return (
      <Opacity onPress={this.props.onPress}>
        <ButtonText>{this.props.children}</ButtonText>
      </Opacity>
    )
  }
}

const Opacity = styled.TouchableOpacity`
  border-radius: ${colors.theme.radius}
  overflow: hidden;
`

const ButtonText = styled.Text`
  background-color: ${colors.theme.button.background};
  padding: 15px 30px;
  text-align: center;
  font-weight: 400;
`

// Footer
// - Brand information
// - Version information

const Footer = styled.View`
  align-items: center;
`

const FooterText = styled.Text`
  font-size: 15;
  color: ${colors.grey[600]};
`

const BrandName = FooterText.extend`
  font-weight: 900;
  color: black;
`
