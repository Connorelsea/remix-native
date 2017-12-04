import React, { Component } from "react"
import { Button } from "react-native"
import styled from "styled-components/native"

export default class NativeButton extends Component {
  render() {
    return (
      <Button
        onPress={() =>
          this.props.navigation.navigate(this.props.to, this.props.options)}
        title={this.props.title}
      />
    )
  }
}

const StyledButton = styled.Button`
  border: 1px solid black;
  background-color: white;
`
