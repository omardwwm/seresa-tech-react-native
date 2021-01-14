import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Image, View, Text } from "react-native";

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
