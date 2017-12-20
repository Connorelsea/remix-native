import React from "react"
import styled from "styled-components/native"
import colors from "../colors.js"

export default ({
  secureTextEntry = false,
  last = false,
  label,
  name,
  state,
  onChangeText,
}) => (
  <InputContainer last={last}>
    <Label>{label}</Label>
    <StyledInput
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={state[name]}
      placeholder={label}
    />
  </InputContainer>
)

const InputContainer = styled.View`
  background-color: ${colors.apple.grey[0]};
  border-width: 1px;
  border-right-width: 0px;
  border-left-width: 0px;
  border-bottom-width: ${props => (props.last ? 1 : 0)}px;
  border-color: ${colors.apple.grey[3]};
  padding: 20px 25px;
`

const StyledInput = styled.TextInput`
  font-size: 17px;
  font-weight: 400;
  margin-top: 5px;
`

const Label = styled.Text`
  font-size: 17px;
  font-weight: 700;
`
