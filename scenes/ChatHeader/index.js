import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { LinearGradient } from "expo"

export default class Chat extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={[
          "rgba(255, 255, 255,1)",
          "rgba(255, 255, 255,1)",
          "rgba(255, 255, 255,1)",
          "rgba(255, 255, 255,0)",
        ]}
        style={{
          position: "absolute",
          top: 0,
          zIndex: 9000,
          width: "100%",
        }}
      >
        <Container>
          <Name>Connor Elsea</Name>
          <OnlineStatus>Last seen 7m ago</OnlineStatus>
        </Container>
      </LinearGradient>
    )
  }
}

const Container = styled.View`
  background-color: transparent;
  padding-top: 20px;
  padding-left: 15px;
  padding-bottom: 60px;
  border-radius: 10px;
`

const Name = styled.Text`
  font-size: 45px;
  font-weight: 800;
  color: black;
  font-family: System;
`

const OnlineStatus = styled.Text`
  color: ${colors.grey[500]};
`
