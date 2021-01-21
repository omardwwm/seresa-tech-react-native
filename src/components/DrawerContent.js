import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Caption,
  Drawer,
  Switch,
  Text,
  Title,
  TouchableRipple,
} from "react-native-paper";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { onUserLogout, getForm, getExercice, getPatient } from "../redux";

const _DrawerContent = (props) => {
  const { userReducer, onUserLogout, getForm, getExercice, getPatient } = props;
  const { user, isUserLogged } = userReducer;

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {isUserLogged && (
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row-reverse" }}>
                <Avatar.Image
                  source={require("../assets/image/woman-avatar.png")}
                  size={50}
                  style={{
                    marginRight: 10,
                    backgroundColor: "gold",
                  }}
                />
                <View
                  style={{
                    marginRight: 10,
                  }}
                >
                  <Title style={styles.title}>{/*user.nickname*/}</Title>
                  <Caption style={styles.caption}>
                    {/*user.first_name + " " + user.last_name*/}
                  </Caption>
                </View>
              </View>
            </View>
          )}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Bienvenida"
              icon={({ color, size }) => (
                <Ionicons name="md-home" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
              style={[styles.drawerItem]}
            />
            {!isUserLogged && (
              <View>
                <DrawerItem
                  label="Inscribirse"
                  icon={({ color, size }) => (
                      <FontAwesome name="sign-in" size={24} color="black" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Inscription");
                  }}
                  style={[styles.drawerItem]}
                />
                <DrawerItem
                  label="Conexion"
                  icon={({ color, size }) => (
                      <MaterialCommunityIcons name="login" size={24} color="black" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                  style={[styles.drawerItem]}
                />
                <DrawerItem
                  label="Fisio"
                  icon={({ color, size }) => (
                      <Fontisto name="doctor" size={26} color="#67b4aa" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Fisio");
                    getPatient();
                  }}
                  style={[styles.drawerItem]}
                />
              </View>
            )}
            {isUserLogged && (
              <View>
                <DrawerItem
                  label="Profile"
                  icon={({ color, size }) => (
                      <FontAwesome name="user" size={24} color="black" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Profile");
                  }}
                  style={[styles.drawerItem]}
                />
                <DrawerItem
                  label="Formulaire"
                  icon={({ color, size }) => (
                    <Ionicons name="md-list" color={color} size={size} />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Form");
                    getForm(user);
                  }}
                  style={[styles.drawerItem]}
                /><DrawerItem
                  label="Presentation"
                  icon={({ color, size }) => (
                      <MaterialCommunityIcons name="presentation-play" size={24} color="black" />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Presentation");
                  }}
                  style={[styles.drawerItem]}
                />
                <DrawerItem
                  label="Phases"
                  icon={({ color, size }) => (
                      <FontAwesome5 name="layer-group" size={24} color="green" />
                  )}
                  onPress={() => {
                    getExercice(user);
                    props.navigation.navigate("Phases");
                  }}
                  style={[styles.drawerItem]}
                />
              </View>
            )}
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {user !== null && (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Sign Out"
            icon={({ color, size }) => (
              <Ionicons name="md-exit" color="red" size={size} />
            )}
            style={{
              marginLeft: 100,
            }}
            onPress={() => {
              props.navigation.navigate("Home");
              onUserLogout();
            }}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    marginLeft: 100,
  },
  drawerSection: {
    marginTop: 15,
  },

  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

export const DrawerContent = connect(mapStateToProps, {
  onUserLogout,
  getForm,
  getExercice,
  getPatient,
})(_DrawerContent);
