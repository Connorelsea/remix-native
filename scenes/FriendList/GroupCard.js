import React from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"

export default class GroupCard extends React.Component {
  render() {
    const { name, users = [], userId, type, id } = this.props
    const isFriend = type === "FRIENDS"
    // const selfUser = users.filter(user.id === userId)
    console.log("users in groupcard", users)
    const otherUser =
      users.length > 1 ? users.filter(user => user.id != userId)[0] : users[0]

    console.log("other user", otherUser)

    console.log("group id", id)

    return (
      <Button onPress={() => this.props.setGroupSelection(id)}>
        <Container>
          <Header>
            <Name>{otherUser.name}</Name>
            <OnlineStatus />
          </Header>
        </Container>
      </Button>
    )
  }
}

const Button = styled.TouchableHighlight``

const Container = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  height: 100px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`

const Name = styled.Text`
  color: black;
  font-size: 25px;
  font-weight: 800;
`
const OnlineStatus = styled.View`
  height: 20px;
  width: 20px;
  background: grey;
  border-radius: 10px;
  margin-left: 10px;
`
