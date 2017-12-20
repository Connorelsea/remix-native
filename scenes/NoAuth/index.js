import { StackNavigator } from "react-navigation"

import Home from "./Home"
import Login from "./Login"
import NewUser from "./NewUser"

const screens = {
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  NewUser: {
    screen: NewUser,
  },
}

const config = {
  headerMode: "none",
}

const Navigator = StackNavigator(screens, config)

export default Navigator
