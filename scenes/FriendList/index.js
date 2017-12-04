import React from "react"
import { View, Text, Image, TouchableHighlight } from "react-native"
import styled from "styled-components/native"
import colors from "../../colors.js"
import { isIphoneX } from "react-native-iphone-x-helper"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"

import FriendSection from "./section"
import RequestCard from "./RequestCard"
import GroupCard from "./GroupCard"

class FriendIcon extends React.Component {
  render() {
    const {
      id,
      name,
      setGroupSelection,
      setChannelSelection,
      channels,
    } = this.props

    const channel = channels[0].id

    return (
      <TouchableHighlight
        onPress={() => {
          setChannelSelection(channel)
          setGroupSelection(id)
        }}
      >
        <View style={{ paddingBottom: 20 }}>
          <Image
            source={{
              uri:
                "https://www.filecluster.com/howto/wp-content/uploads/2014/07/User-Default.jpg",
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 5,
              marginBottom: 10,
            }}
          />
          <Text>{name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const SectionContainer = styled.ScrollView``

class FriendList extends React.Component {
  state = {
    addingFriend: false,
    friendUsername: "",
  }

  constructor(props) {
    super(props)

    this.onAddPress = this.onAddPress.bind(this)
    this.onCancelPress = this.onCancelPress.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.onFriendInputChange = this.onFriendInputChange.bind(this)
  }

  async addFriend() {
    const { friendUsername } = this.state
    const friend = await this.props.friendRequestMutation({
      variables: {
        contactType: "EXISTING_USER",
        fromUser: this.props.userId,
        toUser: friendUsername,
      },
    })
  }

  onAddPress() {
    this.setState({
      addingFriend: true,
      friendUsername: undefined,
    })
  }

  onCancelPress() {
    this.setState({
      addingFriend: false,
      friendUsername: undefined,
    })
  }

  onFriendInputChange(text) {
    this.setState({
      friendUsername: text,
    })
  }

  render() {
    const {
      groups = [],
      getSentRequests,
      getReceivedRequests,
      setGroupSelection,
      getAllFriends,
      userId,
    } = this.props
    const { addingFriend, friendUsername } = this.state

    const sentRequests = getSentRequests.loading
      ? []
      : getSentRequests.allFriendRequests

    const receivedRequests = getReceivedRequests.loading
      ? []
      : getReceivedRequests.allFriendRequests

    const friends = getAllFriends.loading ? [] : getAllFriends.User.friends

    console.log(friends)

    return addingFriend ? (
      <Container>
        <Title>Add Friend </Title>
        <FriendInput
          value={friendUsername}
          placeholder="username"
          onChangeText={this.onFriendInputChange}
        />
        <Button title="Add Friend" onPress={this.addFriend} />
        <Button title={"Cancel"} onPress={this.onCancelPress} />
      </Container>
    ) : (
      <Container>
        <Title>Friends</Title>
        <Button title="Add Friend" onPress={this.onAddPress} />
        {/* <Button title="New Group" /> */}

        {console.log("get friend requests", this.props.getSentRequests)}
        {console.log("GROUPS", groups)}

        <SectionContainer>
          <FriendSection
            title="Friend Requests"
            data={receivedRequests}
            count={receivedRequests.length}
            renderItem={({ id, fromUser }) => (
              <RequestCard friendRequestId={id} user={fromUser} />
            )}
          />
          <FriendSection
            title="Friends"
            data={friends}
            renderItem={({ name, username, id }) => (
              <Text style={{ color: "white" }}>{name}</Text>
            )}
          />
          <FriendSection
            title="Groups"
            data={groups}
            renderItem={({ id, name, users, type }) => (
              <GroupCard
                id={id}
                name={name}
                users={users}
                userId={userId}
                type={type}
                setGroupSelection={setGroupSelection}
              />
            )}
          />
        </SectionContainer>

        {/* <IconContainer>
          {groups.map(f => (
            <FriendIcon
              {...f}
              setChannelSelection={this.props.setChannelSelection}
              setGroupSelection={this.props.setGroupSelection}
            />
          ))}
          {groups.length < 1 && <Text>No friends or groups</Text>}
        </IconContainer> */}
      </Container>
    )
  }
}

const GET_SENT_REQUESTS = gql`
  query allFriendRequests($userId: ID!) {
    allFriendRequests(filter: { fromUser: { id: $userId } }) {
      id
      toUser {
        id
        name
        createdAt
      }
    }
  }
`

const GET_RECEIVED_REQUESTS = gql`
  query allFriendRequests($userId: ID!) {
    allFriendRequests(filter: { toUser: { id: $userId } }) {
      id
      fromUser {
        id
        name
        createdAt
      }
    }
  }
`

const SUBMIT_FRIEND_REQUEST = gql`
  mutation createFriendRequest(
    $fromUser: String!
    $toUser: String!
    $contactType: String!
  ) {
    friendRequest(
      fromUserId: $fromUser
      toUserString: $toUser
      contactType: $contactType
    ) {
      id
    }
  }
`

const GET_ALL_FRIENDS = gql`
  query getAllFriends($userId: ID!) {
    User(id: $userId) {
      friends {
        id
        name
        username
      }
    }
  }
`

export default compose(
  graphql(SUBMIT_FRIEND_REQUEST, { name: "friendRequestMutation" }),
  graphql(GET_SENT_REQUESTS, { name: "getSentRequests" }),
  graphql(GET_RECEIVED_REQUESTS, { name: "getReceivedRequests" }),
  graphql(GET_ALL_FRIENDS, { name: "getAllFriends" })
)(FriendList)

const FriendInput = styled.TextInput`
  background-color: ${colors.grey[300]};
  padding: 10px;
  font-size: 17px;
  border-radius: 10px;
`

const IconContainer = styled.View`
  flex: 1;
  align-items: center;
`

const Title = styled.Text`
  font-size: 40px;
  letter-spacing: -0.2px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  padding-top: ${isIphoneX() ? 50 : 20};
`

const Button = styled.Button``

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 20px;
`
