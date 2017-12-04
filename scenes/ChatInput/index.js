import React from "react"
import { View, Tex, Vibration } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"

import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

class ChatInput extends React.Component {
  state = {
    text: "",
  }

  render() {
    return (
      <Container>
        <Input
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={event => {
            this.props.submit({
              text: this.state.text,
              channelId: this.props.channelSelection,
              senderId: this.props.senderId,
            })
            this.setState({ text: "" })
            Vibration.vibrate()
          }}
          value={this.state.text}
          placeholder="Message..."
          returnKeyType="send"
          blurOnSubmit={false}
          placeholderTextColor={colors.grey[600]}
        />
        <Send>
          <SendText>Send</SendText>
        </Send>
      </Container>
    )
  }
}

const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!, $channelId: ID!, $senderId: ID!) {
    createMessage(
      text: $text
      type: TEXT
      channelId: $channelId
      senderId: $senderId
    ) {
      id
    }
  }
`

export default graphql(CREATE_MESSAGE, {
  props: ({ mutate }) => ({
    submit: ({ text, channelId, senderId }) =>
      mutate({ variables: { text, channelId, senderId } }),
  }),
})(ChatInput)

const Container = styled.View`
  background-color: black;
  flex-direction: row;
`

const Input = styled.TextInput`
  padding: 20px;
  color: white;
  font-size: 19px;
  background-color: transparent;
  flex-grow: 2;
`

const Send = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  width: 60;
`

const SendText = styled.Text`
  font-size: 18px;
  color: white;
  padding-right: 15px;
`
