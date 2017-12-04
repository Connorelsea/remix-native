import React, { Component } from "react"
import Chat from "../Chat"
import { Text } from "react-native"

export default class ChatManager extends Component {
  render() {
    const {
      messages,
      groups,
      senderId,
      groupSelection,
      channelSelection,
      userId,
    } = this.props

    console.log("groups in cht manager", groups)

    const group = groups.filter(({ id }) => id == groupSelection)[0]

    if (!group) {
      return <Text>No group selected</Text>
    }

    let filteredMessages = messages.filter(
      ({ channel: { group: { id } } }) => id === group.id
    )

    return (
      <Chat
        messages={filteredMessages}
        groups={groups}
        groupSelection={groupSelection}
        channelSelection={channelSelection}
        senderId={senderId}
        userId={userId}
      />
    )
  }
}
