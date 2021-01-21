import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Image } from "react-native";

import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import FormScreen from "./FormScreen";
import PhasesScreen from "./PhasesScreen";
import PasswordChangeScreen from "./PasswordChangeScreen";
import logo from "../assets/image/Logo-Seresa-Tech.png";
import FisioScreen from "./FisioScreen";
import PresentationScreen from "./PresentationScreen";
import PasswordRecuperationScreen from "./PasswordReuperationScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import {getExercice, getForm, getPatient, getUser, onUserLogin, onUserLogout} from "../redux";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";


const HomeStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FormStack = createStackNavigator();
const PhasesStack = createStackNavigator();
const PasswordChangeStack = createStackNavigator();
const FisioStack = createStackNavigator();
const PresentationStack = createStackNavigator();
const PasswordRecuperationStack = createStackNavigator();
const TabStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
// function to get the name of route and show it in the header title with navigation with tabButtonNavigation (https://reactnavigation.org/)
function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
        case 'Home':
            return 'Welcome';
        case 'Profile':
            return 'My profile';
        case 'Phases':
            return 'My Phases';
        case 'Form':
            return 'My Form';
        case 'Inscription':
            return 'Register-form';
    }
}
//the composantes of our TabButtonNavigation in function if user isLogged or not
const _TabScreen = (props) => {
    const { userReducer, getUser, onUserLogin } = props;
    const { user, isUserLogged } = userReducer;

    if (isUserLogged){
        return (
            <Tab.Navigator
                initialRouteName="Seresa"
                activeColor="#fff"
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                    options={{
                        tabBarLabel: 'perfil',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account-details" color={color} size={26}/>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Form"
                    component={FormStackScreen}
                    options={{
                        tabBarLabel: 'Formulaire',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="file-document-edit-outline" color={color} size={26}/>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Phases"
                    component={PhasesStackScreen}
                    options={{
                        tabBarLabel: 'Phases',
                        tabBarColor: '#009387',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="walk" color={color} size={26}/>
                        ),
                    }}
                />

            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator
                // initialRouteName="Home"
                // activeColor="#fff"
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#4ddcd0',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Inscription"
                    component={RegisterStackScreen}
                    options={{
                        tabBarLabel: 'Register',
                        tabBarColor: '#47e1d3',
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account-plus" color={color} size={26}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});
const TabScreen = connect(mapStateToProps, {
    onUserLogin,
    getUser
})(_TabScreen);
export default TabScreen;



//establishment of our StackNavigation (components)
// Header bar
const ScreenOption = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: "#67b4aa",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 26,
    },
    headerLeft: () => (
      <Image
        source={logo}
        style={{
          height: "100%",
          resizeMode: "contain",
          position: "absolute",
          left: -60,
        }}
      />
    ),
    headerRight: () => (
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={{
          marginRight: 10,
        }}
      >
        <Ionicons name="md-menu" size={45} />
      </Pressable>
    ),
  };
};

export const TabStackScreen = ({navigation}) =>(
    <TabStack.Navigator screenOptions={ScreenOption({ navigation })}>
        <TabStack.Screen
            name="Tab"
            component={TabScreen}
            options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
            })}
        />
    </TabStack.Navigator>
);

export const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Bienvenida" }}
    />
  </HomeStack.Navigator>
);

export const PresentationStackScreen = ({navigation})=>(
    <PresentationStack.Navigator screenOptions={ScreenOption({ navigation })}>
        <PresentationStack.Screen name="Presentation"
                                  component={PresentationScreen}
                                  options={{title: "espalda baja"}}
        />
    </PresentationStack.Navigator>
);

export const PasswordRecuperationStackScreen = ({navigation})=>(
    <PasswordRecuperationStack.Navigator screenOptions={ScreenOption({ navigation })}>
        <PasswordRecuperationStack.Screen name="PasswordRecuperation"
                                  component={PasswordRecuperationScreen}
                                  options={{title: "reset password"}}
        />
    </PasswordRecuperationStack.Navigator>
);

export const RegisterStackScreen = ({ navigation }) => (
  <RegisterStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <RegisterStack.Screen
      name="Inscription"
      component={RegisterScreen}
      options={{ title: "Inscribirse" }}
    />
  </RegisterStack.Navigator>
);

export const LoginStackScreen = ({ navigation }) => (
  <LoginStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <LoginStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Conexion" }}
    />
  </LoginStack.Navigator>
);

export const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: "Perfil" }}
    />
  </ProfileStack.Navigator>
);

export const FormStackScreen = ({ navigation }) => (
  <FormStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <FormStack.Screen
      name="Form"
      component={FormScreen}
      options={{ title: "Formulaire" }}
    />
  </FormStack.Navigator>
);

export const PhasesStackScreen = ({ navigation }) => (
  <PhasesStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <PhasesStack.Screen
      name="Phases"
      component={PhasesScreen}
      options={{ title: "Phases" }}
    />
  </PhasesStack.Navigator>
);

export const PasswordChangeStackScreen = ({ navigation }) => (
  <PasswordChangeStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <PasswordChangeStack.Screen
      name="PasswordChange"
      component={PasswordChangeScreen}
      options={{ title: "PasswordChange" }}
    />
  </PasswordChangeStack.Navigator>
);

export const FisioStackScreen = ({ navigation }) => (
  <FisioStack.Navigator screenOptions={ScreenOption({ navigation })}>
    <FisioStack.Screen
      name="Fisio"
      component={FisioScreen}
      options={{ title: "Fisio" }}
    />
  </FisioStack.Navigator>
);
