import React, { Component } from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { Text, FlatList, View } from "react-native"

import ScrollView from "react-native-invertible-scroll-view"
import ChatHeader from "../ChatHeader"

function isEmoji(str) {
  var ranges = [
    "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
    "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
    "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
  ]
  if (str.match(ranges.join("|"))) {
    return true
  } else {
    return false
  }
}

class Message extends Component {
  render() {
    const emojiStyle = isEmoji(this.props.text) && this.props.text.length <= 6
    return (
      <MessageContainer isCurrentUser={this.props.isCurrentUser}>
        <Bubble emojiStyle={emojiStyle} color={this.props.sender.color}>
          <MessageText emojiStyle={emojiStyle}>{this.props.text}</MessageText>
        </Bubble>
      </MessageContainer>
    )
  }
}

const MessageContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.isCurrentUser ? "flex-end" : "flex-start"};
  padding-left: 14px;
  padding-right: 15px;
  padding-bottom: 7px;
  padding-top: 0px;
`

const Bubble = styled.View`
  border-radius: 20px;
  background-color: ${props => props.color || colors.grey[400]};
  padding: ${({ emojiStyle }) => (emojiStyle ? "5px 8px" : "11px 15px")};
`

const MessageText = styled.Text`
  color: white;
  font-family: System;
  font-size: ${({ emojiStyle }) => (emojiStyle ? 90 : 18)};
`

export default class MessageList extends Component {
  render() {
    const messages = this.props.messages
      ? [...this.props.messages].reverse()
      : [{ text: "hello" }, { text: "yo dog wassuup" }, { text: "yo" }]

    return (
      <Container>
        <ChatHeader />

        <FlatList
          inverted
          data={messages}
          contentInset={{ top: 10, bottom: 70 }}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <Message
              {...item}
              isCurrentUser={this.props.userId === item.sender.id}
            />
          )}
        />
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`
