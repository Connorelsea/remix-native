import { fromEvent, FunctionEvent } from "graphcool-lib"
import { GraphQLClient } from "graphql-request"

interface FunctionArguments {
  friendRequestId: string
}

interface User {
  id: string
  friends: { id: string }
}

interface FriendRequest {
  id: string
  fromUser: User
  toUser: User
}

export default async (event: FunctionEvent<FunctionArguments>) => {
  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api("simple/v1")

    const { friendRequestId } = event.data

    // get user by username
    const friendRequest = await getFriendRequest(api, friendRequestId).then(
      r => r.FriendRequest
    )

    console.log("FRIEND REWUQESTTTT")
    console.log(JSON.stringify(friendRequest))

    const { fromUser, toUser } = friendRequest

    // get fromUser and toUser from the friend request
    // create group with fromUser and toUser
    //

    addFriend(api, fromUser.id, toUser.id, fromUser.friends)
    addFriend(api, toUser.id, fromUser.id, toUser.friends)
    deleteFriendRequest(api, friendRequestId)
    const group = await createGroup(api, fromUser.id, toUser.id).then(
      r => r.createGroup
    )

    console.log("GROUPPPPPP")
    console.log(JSON.stringify(group))

    // create a set of default channels for every group made

    const defaultChannels = ["chat", "notes"]

    defaultChannels.forEach(channel => createChannel(api, group.id, channel))

    return group
  } catch (e) {
    console.log(e)
    return { error: "An unexpected error occured during authentication." }
  }
}

interface Return {
  id: string
}

async function addFriend(
  api: GraphQLClient,
  userOneId: string,
  userTwoId: string,
  friendsArray: any
): Promise<{ Return }> {
  const arr = [...friendsArray.map(f => f.id), userTwoId]

  const query = `
  mutation updateUser($userOneId: ID!, $userTwoId: ID!){
    updateUser(id: $userOneId friendsIds: [${arr}]) {
      id
    }
  }
  `

  // BUG: This erases the previous array

  const variables = {
    userOneId,
    userTwoId,
  }

  return api.request<{ Return }>(query, variables)
}

async function getFriendRequest(
  api: GraphQLClient,
  friendRequestId: string
): Promise<{ FriendRequest }> {
  const query = `
  query getFriendRequest($friendRequestId: ID!) {
    FriendRequest(id: $friendRequestId) {
      id,
      fromUser { id, friends { id } },
      toUser { id, friends { id } }
    }
  }
  `

  const variables = {
    friendRequestId,
  }

  return api.request<{ FriendRequest }>(query, variables)
}

async function deleteFriendRequest(
  api: GraphQLClient,
  friendRequestId: string
): Promise<{ FriendRequest }> {
  const query = `
  mutation deleteFriendRequest($friendRequestId: ID!) {
    deleteFriendRequest(id: $friendRequestId) {
      id
    }
  }
  `

  const variables = {
    friendRequestId,
  }

  return api.request<{ FriendRequest }>(query, variables)
}

interface createGroup {
  id: string
}

async function createGroup(
  api: GraphQLClient,
  userOneId: string,
  userTwoId: string
): Promise<{ createGroup }> {
  const query = `
    mutation createGroup($userOneId: ID!, $userTwoId: ID!) {
      createGroup(usersIds: [$userOneId, $userTwoId], type: FRIEND) {
        id
      }
    }
  `

  return api.request<{ createGroup }>(query, {
    userOneId,
    userTwoId,
  })
}

async function createChannel(
  api: GraphQLClient,
  groupId: string,
  name: string
): Promise<{ FriendRequest }> {
  const query = `
    mutation createChannel($groupId: ID!, $name: String!) {
      createChannel(groupId: $groupId, name: $name) {
        id
      }
    }
  `

  return api.request<{ FriendRequest }>(query, {
    groupId,
    name,
  })
}

interface UserReturn {
  friends: User[]
}

// async function getFriends(
//   api: GraphQLClient,
//   userId: string
// ): Promise<{ User }> {
//   const query = `
//   query getUser($userId: ID!) {
//     User(id: $userId) {
//       friends {
//         id
//       }
//     }
//   }
//   `

//   const variables = {
//     userId,
//   }

//   return api.request<{ User }>(query, variables)
// }
