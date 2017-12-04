import React from "react"
import {
  View,
  Text,
  Button,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native"
import styled from "styled-components/native"
import SideMenu from "react-native-side-menu"
import { StackNavigator } from "react-navigation"

import FriendList from "../scenes/FriendList"
import Dashboard from "../scenes/Dashboard"
import ChatManager from "../scenes/ChatManager"
import ChannelList from "../scenes/ChannelList"
import Chat from "../scenes/Chat"
import Profile from "../scenes/Profile"

import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

import Drawer from "../components/Drawer"

import DrawerComponent from "../scenes/Drawer"

import MessageList from "../scenes/MessageList"

import BetterDrawer from "react-native-drawer"

import Swiper from "react-native-swiper"

// const ChatStack = StackNavigator({
//   Dashboard: {
//     screen: Dashboard,
//   },
//   Chat: {
//     screen: Chat,
//     path: "/chat/:id/:channel",
//   },
//   Profile: {
//     screen: Profile,
//     path: "/profile/:id",
//   },
// })

class App extends React.Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.setGroupSelection = this.setGroupSelection.bind(this)
    this.setChannelSelection = this.setChannelSelection.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  subscribe() {
    console.log("SUBSCRIBING")

    console.log(this.props)

    this.props.allMessagesQuery.subscribeToMore({
      document: ALL_MESSAGES_SUBSCRIPTION,
      variables: {
        userId: this.props.userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("NEW MESSAGE")
        console.log(prev, subscriptionData)

        if (!subscriptionData.data) {
          return prev
        }

        const newMessage = subscriptionData.data.Message.node

        return {
          ...prev,
          allMessages: [...prev.allMessages, newMessage],
        }
      },
    })
  }

  state = {
    selection: undefined,
    groupSelection: undefined,
    channelSelection: undefined,
    subscribed: false,
  }

  setGroupSelection(id) {
    this.setState({ groupSelection: id })
  }

  setChannelSelection(id) {
    this.setState({ channelSelection: id })
  }

  setSelection(id) {
    this.setState({ selection: id })
  }

  isLoggedIn() {
    console.log(this.props)
    return this.props.userId != ""
  }

  render() {
    const groups =
      this.props.allFriendsQuery.loading != true
        ? this.props.allFriendsQuery.User.groups
        : []

    const messages =
      this.props.allMessagesQuery.loading != true
        ? this.props.allMessagesQuery.allMessages
        : []

    // if (this.state.subscribed === false && this.props.userId !== undefined) {
    //   this.setState({ subscribed: true })
    //   this.subscribe()
    // }

    const { groupSelection, channelSelection } = this.state
    const { setGroupSelection, setChannelSelection } = this

    console.log("groups")
    console.log(groups)

    return (
      <Container>
        <StatusBar barStyle="light-content" translucent={true} />
        <Swiper>
          <FriendList
            setGroupSelection={setGroupSelection}
            setChannelSelection={setChannelSelection}
            groups={groups}
            userId={this.props.userId}
          />
          {groupSelection && (
            <ChannelList
              groupId={groupSelection}
              setChannelSelection={setChannelSelection}
            />
          )}
          <ChatManager
            messages={messages}
            groups={groups}
            groupSelection={groupSelection}
            channelSelection={channelSelection}
            senderId={this.props.userId}
            userId={this.props.userId}
          />
        </Swiper>
      </Container>
    )
  }
}

const ALL_FRIENDS = gql`
  query allFriendsQuery($userId: ID!) {
    User(id: $userId) {
      groups {
        id
        name
        channels {
          id
        }
        users {
          name
          id
        }
      }
    }
  }
`

const ALL_MESSAGES = gql`
  query allMessagesQuery($userId: ID!) {
    allMessages(
      filter: { channel: { group: { users_some: { id: $userId } } } }
    ) {
      id
      text
      type
      sender {
        id
        color
      }
      channel {
        id
        group {
          id
        }
      }
    }
  }
`

const ALL_MESSAGES_SUBSCRIPTION = gql`
  subscription onNewMessage($userId: ID!) {
    Message(
      filter: {
        mutation_in: [CREATED]
        node: { channel: { group: { users_some: { id: $userId } } } }
      }
    ) {
      mutation
      node {
        id
        text
        type
        sender {
          id
          color
        }
        channel {
          id
          group {
            id
          }
        }
      }
    }
  }
`

export default compose(
  graphql(ALL_FRIENDS, { name: "allFriendsQuery" }),
  graphql(ALL_MESSAGES, { name: "allMessagesQuery" })
)(App)

const Container = styled.View`
  background-color: white;
  flex: 1;
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "red",
  },
})
