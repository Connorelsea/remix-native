import React from "react"
import styled from "styled-components/native"
import colors from "../../colors.js"

class FriendSection extends React.Component {
  render() {
    const {
      title,
      data = [],
      renderItem = () => <Section />,
      count,
    } = this.props
    return (
      <Section>
        <Header>
          <Title>{title.toUpperCase()}</Title>
          {count !== undefined && <Count count={count} />}
        </Header>
        <Body>{data.map(renderItem)}</Body>
      </Section>
    )
  }
}

export default FriendSection

const Section = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey[800]};
  margin-bottom: 20px;
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const Title = styled.Text`
  color: ${colors.grey[700]};
  letter-spacing: 1.5px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
`

const Count = ({ count }) => (
  <CountContainer>
    <CountText>{count}</CountText>
  </CountContainer>
)

const containerWidth = 25

const CountContainer = styled.View`
  width: ${containerWidth};
  height: ${containerWidth};
  background-color: red;
  border-radius: ${containerWidth / 2};
`

const CountText = styled.Text`
  color: white;
  padding-left: 7;
  padding-top: 3;
  font-weight: 700;
  background-color: transparent;
`

const Body = styled.View`
  margin-bottom: 15px;
`
