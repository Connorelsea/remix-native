import { fromEvent, FunctionEvent } from "graphcool-lib"
import { GraphQLClient } from "graphql-request"

interface FunctionArguments {
  fromUserId: string
  toUserString: string
  contactType: string
}

export default async (event: FunctionEvent<FunctionArguments>) => {
  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api("simple/v1")

    const { contactType, fromUserId, toUserString } = event.data

    // get user by username
    const user: User = await getUserByUsername(api, toUserString).then(
      r => r.User
    )

    // no user with this username
    if (!user) {
      if (contactType === "PHONE_NUMBER") {
      }
      if (contactType === "EMAIL") {
        // await mutation createWaitingNewUser
        //                    -> with (contactType, fromUser)
        // await sendEmailWithLink
      }
    } else {
      const friendRequestId = await createUserAddRequest(
        api,
          fromUserId,
        user.id
      )
    }

    return {}

    // // check password
    // const passwordIsCorrect = await bcrypt.compare(password, user.password)
    // if (!passwordIsCorrect) {
    //   return { error: "Invalid credentials!" }
    // }
    //
    // // generate node token for existing User node
    // const token = await graphcool.generateNodeToken(user.id, "User")
    //
    // return { data: { id: user.id, token } }
  } catch (e) {
    console.log(e)
    return { error: "An unexpected error occured during authentication." }
  }
}

interface UserAddRequest {
  id: string
}

async function createUserAddRequest(
  api: GraphQLClient,
  fromUserId: string,
  toUserId: string
): Promise<{ UserAddRequest }> {
  const query = `
        mutation createFriendRequest($fromUserId: ID! $toUserId: ID!) {
          createFriendRequest(fromUserId: $fromUserId toUserId: $toUserId) {
            id
          }
        }
  `

  const variables = {
    fromUserId,
    toUserId,
  }

  return api.request<{ UserAddRequest }>(query, variables)
}

interface User {
  id: string
}

async function getUserByUsername(
  api: GraphQLClient,
  username: string
): Promise<{ User }> {
  const query = `
    query getUserByUsername($username: String!) {
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
