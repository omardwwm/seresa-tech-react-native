import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions } from "react-native";
import { getForm, hideFormModal, sendFormData, getExercice } from "../redux";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
// import Video from "react-native-video";
import { Video } from 'expo-av';


const _PhasesScreen = (props) => {
  const { userReducer, getExercice } = props;
  const { user, exercice } = userReducer;
  useEffect(() => {
    getExercice(user);
  }, []);
  const { width } = Dimensions.get('window');
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
        <ScrollView>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>La phase N { user && user.mod6_capabilities[0].slice(29, -7)}</Text>
            <Image source={{uri:`${exercice.url[0]}`}} style={{width:250, height:250}}/>
            <View style={{margin:10}}>
              <Video
                  source={{uri:"https://sans-filtre.fr/wp-content/uploads/2020/03/51426439_233047627628437_2347714357619589120_n.mp4?_=1"}}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  useNativeControls
                  // shouldPlay
                  style={{width, height: 300}}
              />
            </View>
          </View>
        </ScrollView>
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
