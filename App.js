import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux";
import { connect } from "react-redux";

import {
  HomeStackScreen,
  RegisterStackScreen,
  LoginStackScreen,
  ProfileStackScreen,
  FormStackScreen,
  PhasesStackScreen,
  PasswordChangeStackScreen,
  FisioStackScreen, PresentationStackScreen, PasswordRecuperationStackScreen
} from "./src/screen/MainTabScreen";
import { DrawerContent } from "./src/components/DrawerContent";
import {userReducer} from "./src/redux/reducers/UserReducer";
import {Text, TouchableOpacity} from "react-native";
// import PresentationScreen from "./src/screen/PresentationScreen";

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { user, isUserLogged } = userReducer;

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerPosition="right"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Inscription" component={RegisterStackScreen} />
            <Drawer.Screen name="Login" component={LoginStackScreen} />
            <Drawer.Screen name="Profile" component={ProfileStackScreen} />
            <Drawer.Screen name="Presentation" component={PresentationStackScreen}/>
            <Drawer.Screen name="PasswordRecuperation" component={PasswordRecuperationStackScreen } />
            <Drawer.Screen name="Form" component={FormStackScreen} />
            <Drawer.Screen name="Phases" component={PhasesStackScreen} />
            <Drawer.Screen
              name="PasswordChange"
              component={PasswordChangeStackScreen}
            />
            <Drawer.Screen name="Fisio" component={FisioStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
