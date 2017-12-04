import React, { Component } from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { Text } from "react-native"
import FriendList from "../FriendList"
import ChannelList from "../ChannelList"

export default class Drawer extends Component {
  render() {
    const { setGroupSelection, setChannelSelection, groups } = this.props
    console.log("set drawer", setChannelSelection)
    return (
      <Container>
        <FriendList
          setGroupSelection={setGroupSelection}
          setChannelSelection={setChannelSelection}
          groups={groups}
        />
        <ChannelList />
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: 10px;
  background-color: transparent;
`
