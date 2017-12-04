import { fromEvent, FunctionEvent } from "graphcool-lib"
import { GraphQLClient } from "graphql-request"
import * as bcrypt from "bcryptjs"

interface User {
  id: string
  password: string
}

interface EventData {
  username: string
  password: string
}

const SALT_ROUNDS = 10

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api("simple/v1")

    const { username, password } = event.data

    // get user by username
    const user: User = await getUserByUsername(api, username).then(r => r.User)

    // no user with this username
    if (!user) {
      return { error: "Invalid credentials!" }
    }

    // check password
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    if (!passwordIsCorrect) {
      return { error: "Invalid credentials!" }
    }

    // generate node token for existing User node
    const token = await graphcool.generateNodeToken(user.id, "User")

    return { data: { id: user.id, token } }
  } catch (e) {
    console.log(e)
    return { error: "An unexpected error occured during authentication." }
  }
}

async function getUserByUsername(
  api: GraphQLClient,
  username: string
): Promise<{ User }> {
  const query = `
    query getUserByUsername($username: String!) {
      User(username: $username) {
        id
        password
      }
    }
  `

  const variables = {
    username,
  }

  return api.request<{ User }>(query, variables)
}
