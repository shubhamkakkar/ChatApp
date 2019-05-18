import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import ChatScreen from "../../src/screens/ChatScreen";
import AllUsers from "../../src/screens/AllUsers";
import AuthScreen from "../../src/screens/AuthScreen/AuthScreen";

const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const UserStack = createStackNavigator(
  {
    User: AllUsers,
    Chat: ChatStack
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
    User: UserStack
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// const TabNavigator = createBottomTabNavigator({
//   UserStack
//   // ChatStack
//   // SettingsStack
// });

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

const AppNavigator = createSwitchNavigator({
  Auth: AuthStack,
  Home: UserStack
});

export default AppNavigator;
