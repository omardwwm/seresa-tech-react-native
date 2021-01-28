import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux";
// import { connect } from "react-redux";
// import TabScreen from "./src/screen/MainTabScreen";

import TabScreen, {
  HomeStackScreen,
  RegisterStackScreen,
  LoginStackScreen,
  ProfileStackScreen,
  FormStackScreen,
  PhasesStackScreen,
  PasswordChangeStackScreen,
  FisioStackScreen, PresentationStackScreen, PasswordRecuperationStackScreen, TabStackScreen, AllPatientsStackScreen,
} from "./src/screen/MainTabScreen";
import { DrawerContent } from "./src/components/DrawerContent";
import {Text, TouchableOpacity} from "react-native";
// import PresentationScreen from "./src/screen/PresentationScreen";

const Drawer = createDrawerNavigator();



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
            <Drawer.Screen name="HomeMainStack" component={TabScreen} />
            {/*<Drawer.Screen name="Home" component={HomeStackScreen} />*/}
            {/*<Drawer.Screen name="Inscription" component={RegisterStackScreen} />*/}
            {/*<Drawer.Screen name="Login" component={LoginStackScreen} />*/}
            {/*<Drawer.Screen name="Profile" component={ProfileStackScreen} />*/}
            {/*<Drawer.Screen name="Presentation" component={PresentationStackScreen}/>*/}
            {/*<Drawer.Screen name="PasswordRecuperation" component={PasswordRecuperationStackScreen } />*/}
            <Drawer.Screen name="Form" component={FormStackScreen} />
            {/*<Drawer.Screen name="Phases" component={PhasesStackScreen} />*/}
            {/*<Drawer.Screen*/}
            {/*  name="PasswordChange"*/}
            {/*  component={PasswordChangeStackScreen}*/}
            {/*/>*/}
            <Drawer.Screen name="AllPatients" component={AllPatientsStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
