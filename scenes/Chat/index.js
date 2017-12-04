import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"

import MessageList from "../MessageList"
import ChatInput from "../ChatInput"
import ChatHeader from "../ChatHeader"

import { KeyboardAwareView } from "react-native-keyboard-aware-view"

import Spacer from "react-native-keyboard-spacer"

export default class Chat extends React.Component {
  render() {
    const {
      messages,
      groups,
      selection,
      senderId,
      channelSelection,
      userId,
    } = this.props
    return (
      <Container>
        {/* <StatusSpacer /> */}
        <View style={{ flex: 1 }}>
          <MessageList
            messages={messages}
            senderId={senderId}
            userId={userId}
          />
        </View>
        <ChatInput channelSelection={channelSelection} senderId={senderId} />
        <Spacer />
      </Container>
    )
  }
}

const Container = styled.View`
  background-color: black;
  flex: 1;
`

const StatusSpacer = styled.View`
  height: 40px;
  width: 100%;
`
