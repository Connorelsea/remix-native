import React from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"
import distanceInWordsToNow from "date-fns/distance_in_words_to_now"

import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

class RequestCard extends React.Component {
  constructor(props) {
    super(props)
    this.acceptRequest = this.acceptRequest.bind(this)
  }

  async acceptRequest() {
    const { acceptFriendRequest, friendRequestId } = this.props
    const friendRequest = await acceptFriendRequest({
      variables: { friendRequestId },
    })
  }

  render() {
    const { user: { name, createdAt, id } } = this.props
    return (
      <ContainerInfo>
        <Container>
          <ContainerInfo>
            <Name>{name}</Name>
            <Time>
              {distanceInWordsToNow(createdAt, { includeSeconds: true })} ago
            </Time>
          </ContainerInfo>
          <ContainerActions>
            <Choice>
              <ChoiceText color={colors.grey[800]}>Deny</ChoiceText>
            </Choice>
            <Choice onPress={this.acceptRequest}>
              <ChoiceText color={colors.grey[400]}>Accept</ChoiceText>
            </Choice>
          </ContainerActions>
        </Container>
      </ContainerInfo>
    )
  }
}

const ACCEPT_REQUEST = gql`
  mutation acceptFriendRequest($friendRequestId: ID!) {
    acceptFriendRequest(friendRequestId: $friendRequestId) {
      id
    }
  }
`

export default compose(
  graphql(ACCEPT_REQUEST, { name: "acceptFriendRequest" })
)(RequestCard)

const ContainerInfo = styled.View``

const ContainerActions = styled.View`
  flex-direction: row;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 13px;
  padding: 7px 10px;
  margin-bottom: 5px;
  /* border-bottom-width: 1px;
  border-bottom-color: ${colors.grey[800]}; */
`

const Name = styled.Text`
  color: ${colors.grey[400]};
  font-size: 17px;
  font-weight: 400;
`

const Time = styled.Text`
  color: ${colors.grey[700]};
  font-size: 14px;
  font-weight: 400;
`

const Choice = styled.TouchableHighlight`
  padding: 3px 10px;
  margin-left: 5px;
  border-radius: 13px;
`

const ChoiceText = styled.Text`
  color: ${props => props.color};
  font-weight: 600;
`
