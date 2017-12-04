import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"

export default class FriendList extends React.Component {
  render() {
    return (
      <Container>
        <Text>FriendsList</Text>
      </Container>
    )
  }
}

const Container = styled.View`
  background-color: grey;
  flex: 1;
`
