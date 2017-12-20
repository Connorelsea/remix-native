import React, { Component } from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"

export default class Loading extends Component {
  render() {
    return (
      <Container>
        <Text>Loading</Text>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 30px;
`
