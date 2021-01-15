import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { onUserLogin, hideModal, changePassword } from "../redux";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, TextInput, Modal, Portal } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const _ProfileScreen = (props) => {
  const { userReducer, changePassword } = props;
  const { user } = userReducer;

  if (user === null) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileBox}>
          {user && user.gender[0].slice(14, -3) === "Femme" ? (<Avatar.Image
              source={require("../assets/image/woman-avatar.png")}
              size={150}
              style={{
                marginRight: 10,
                backgroundColor: "gold",
              }}
          />): <Avatar.Image
              source={require("../assets/image/man-avatar.png")}
              size={150}
              style={{
                marginRight: 10,
                backgroundColor: "gold",
              }}
          />}

          {/*<Avatar.Image*/}
          {/*  source={require("../assets/image/woman-avatar.png")}*/}
          {/*  size={150}*/}
          {/*  style={{*/}
          {/*    marginRight: 10,*/}
          {/*    backgroundColor: "gold",*/}
          {/*  }}*/}
          {/*/>*/}
          <Text style={styles.username}>{user && user.nickname}</Text>
        </View>
        <Animatable.View animation="bounceInLeft" duration={500}>
          <Text>Firstname : {user && user.first_name}</Text>
          <Text>Lastname : {user && user.last_name}</Text>
          <Text>Phone number : {user && user.phone_number}</Text>
          {/*<Text>Phase-Role : {user.mod6_capabilities[0].slice(29, 30)}</Text>*/}
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => props.navigation.navigate("PasswordChange")}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Changer de mot de passe</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    marginTop: 20,
    backgroundColor: "#FD9854",
    padding: 10,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "crimson",
    fontWeight: "bold",
  },
  inputBox: {
    margin: 10,
    width: "80%",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileBox: {
    marginTop: 30,
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "white",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  username: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const ProfileScreen = connect(mapStateToProps, {
  onUserLogin,
  hideModal,
  changePassword,
})(_ProfileScreen);

export default ProfileScreen;
