import React, { Component } from "react"
import styled from "styled-components/native"
import colors from "../colors.js"

export default class Button extends React.Component {
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
