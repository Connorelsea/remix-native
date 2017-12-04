import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"

import Button from "../../components/Button"

export default class FriendList extends React.Component {
  static navigationOptions = {
    title: "Home",
  }

  render() {
    return (
      <Container>
        <Text>To see friends list, slide.</Text>
        <Button
          to="signup"
          title="Sign Up"
          navigation={this.props.navigation}
        />
      </Container>
    )
  }
}

const Container = styled.View`
  background-color: white;
  flex: 1;
`
