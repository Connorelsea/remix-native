import { fromEvent, FunctionEvent } from "graphcool-lib"
import { GraphQLClient } from "graphql-request"
import * as bcrypt from "bcryptjs"
import * as validator from "validator"

interface User {
  id: string
}

interface EventData {
  username: string
  password: string
  name: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api("simple/v1")

    const { username, password, name } = event.data

    // if (!validator.isEmail(email)) {
    //   return { error: "Not a valid email" }
    // }

    // check if user exists already
    const userExists: boolean = await getUser(api, username).then(
      r => r.User !== null
    )
    if (userExists) {
      return { error: "Email already in use" }
    }

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    // create new user
    const userId = await createGraphcoolUser(api, username, hash, name)

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(userId, "User")

    return { data: { id: userId, token } }
  } catch (e) {
    console.log(e)
    return { error: "An unexpected error occured during signup." }
  }
}

async function getUser(
  api: GraphQLClient,
  username: string
): Promise<{ User }> {
  const query = `
    query getUser($username: String!) {
      User(username: $username) {
        id
      }
    }
  `

  const variables = {
    username,
  }

  return api.request<{ User }>(query, variables)
}

async function createGraphcoolUser(
  api: GraphQLClient,
  username: string,
  password: string,
  name: string
): Promise<string> {
  const mutation = `
    mutation createGraphcoolUser($username: String!, $password: String!, $name: String!) {
      createUser(
        username: $username
        password: $password
        name: $name
      ) {
        id
      }
    }
  `

  const variables = {
    username,
    password,
    name,
  }

  return api
    .request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
