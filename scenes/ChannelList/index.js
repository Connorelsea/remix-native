import React from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import colors from "../../colors.js"
import { isIphoneX } from "react-native-iphone-x-helper"
import Types from "prop-types"

class ChannelList extends React.Component {
  static propTypes = {
    channelQuery: Types.shape({
      loading: Types.bool,
    }),
  }

  render() {
    if (this.props.channelQuery.loading) {
      return (
        <Container>
          <Text style={{ color: "white" }}>Loading</Text>
        </Container>
      )
    } else if (this.props.channelQuery) {
      return (
        <Container>
          {/* <Title>Channels</Title>
          <ScrollView>
            {this.props.channelQuery.allChannels.map(channel => (
              <ChannelButton
                onPress={() => this.props.setChannelSelection(channel.id)}
                key={channel.id}
              >
                <Channel>
                  <Id>#</Id>
                  <ChannelText>{channel.name}</ChannelText>
                </Channel>
              </ChannelButton>
            ))}
          </ScrollView> */}
        </Container>
      )
    }
  }
}

const Id = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: #cce2f3;
`

const Title = styled.Text`
  font-size: 40px;
  letter-spacing: -0.2px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-top: ${isIphoneX() ? 50 : 20};
`

const Container = styled.View`
  background-color: black;
  flex: 1;
  padding: 0px 15px;
`

const ScrollView = styled.ScrollView`
  padding: 10px;
`

const ChannelButton = styled.TouchableHighlight``

const Channel = styled.View`
  padding: 20px;
  border-radius: 10px;
  background-color: #00a0e2;
  flex-direction: row;
`

const ChannelText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 15px;
`

const ALL_CHANNELS = gql`
  query allChannelsQuery($groupId: ID!) {
    allChannels(filter: { group: { id: $groupId } }) {
      id
      name
    }
  }
`

export default graphql(ALL_CHANNELS, { name: "channelQuery" })(ChannelList)
