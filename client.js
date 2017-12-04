import { AsyncStorage } from "react-native"
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { split } from "apollo-link"
import { onError } from "apollo-link-error"
import { setContext } from "apollo-link-context"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
// import fragmentTypes from "./data/fragmentTypes"

const localLink = "http://localhost:60000/simple/v1/cjapyg0er00040174a4ej7m7e"
const localSubLink =
  "ws://localhost:60000/subscriptions/v1/cjapyg0er00040174a4ej7m7e"

const prodLink = "https://api.graph.cool/simple/v1/cjaaovndu02xu0118e5pn7q4b"
const prodSubLink =
  "wss://subscriptions.us-west-2.graph.cool/v1/cjaaovndu02xu0118e5pn7q4b"

const httpLink = new HttpLink({
  uri: prodLink,
})

const wsLink = new WebSocketLink({
  uri: prodSubLink,
  options: {
    reconnect: true,
  },
})

const finalLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httpLink
)

let token

const withToken = setContext(async request => {
  if (!token) {
    token = await AsyncStorage.getItem("graphcoolToken")
    console.log("token")
    console.log(token)
  }

  console.log(request)

  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
})

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    console.log()
    // remove cached token on 401 from the server
    token = undefined
  }
})

const authFlowLink = withToken.concat(resetToken)

const link = authFlowLink.concat(finalLink)

// const cache = new InMemoryCache({
//   fragmentMatcher: new IntrospectionFragmentMatcher({
//     introspectionQueryResultData: fragmentTypes,
//   }),
// })

export default new ApolloClient({
  link,
  // cache,
  cache: new InMemoryCache(),
})
