import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { getForm, hideFormModal, sendFormData, getExercice } from "../redux";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";

const _PhasesScreen = (props) => {
  const { userReducer, getExercice } = props;
  const { user, exercice } = userReducer;
  useEffect(() => {
    getExercice(user);
  }, []);
  if (exercice !== null) {
    if (exercice.url == false) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Veuillez remplir le formulaire</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/*<Text>La phase N { user && user.mod6_capabilities[0].slice(29, -7)}</Text>*/}
          <Image source={{uri:`${exercice.url[0]}`}} style={{width:250, height:250}}/>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FD9854" />
      </View>
    );
  }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const PhasesScreen = connect(mapStateToProps, {
  getForm,
  sendFormData,
  getExercice,
  hideFormModal,
})(_PhasesScreen);

export default PhasesScreen;
