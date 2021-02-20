import React, {useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { onUserLogin, hideModal, getUserMeta, getPatient } from "../redux";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const _ProfileScreen = (props) => {
  const { userReducer, getUserMeta, getPatient } = props;
  const { user, userMeta, patients } = userReducer;

  if (user === null) {
    return null;
  }
  const role = user && user.role;
  let userId = user.id
  // console.log(user);

  useEffect(()=>{
    getPatient();
  }, [])

    const allPatientsArray = patients && Object.keys(patients).map(function (i) {
      return user && patients[i];
    });
    const currentPatient = allPatientsArray && allPatientsArray.filter(function (item){
      return item.paciente ===  userId;
    });
    const currentUser = currentPatient && currentPatient[0];
    console.log('Im current user', currentUser);

    const myPhysioId = currentUser && currentUser['id fisio'];
    console.log('his ID is : ', myPhysioId);
    useEffect(()=>{
      if (myPhysioId !== 0){
        getUserMeta(myPhysioId)
      }
    }, [])
  if (userMeta){
    console.log('les donnes de kine: ', userMeta);
  }
  const myPhysio = ()=>{
    if (myPhysioId !== 0)
      return userMeta && userMeta.data;
  }
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileBox}>
          {role && role !== "um_fisioterapeuta"?
              (
                  (user && user.gender[0].slice(14, -3) === "Femme" || user && user.gender[0] === "Femme")?
                  (<Avatar.Image
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
                          />
                )
              : null}
          {/*{user.gender[0].slice(14, -3) === "Femme" ? (<Avatar.Image*/}
          {/*    source={require("../assets/image/woman-avatar.png")}*/}
          {/*    size={150}*/}
          {/*    style={{*/}
          {/*      marginRight: 10,*/}
          {/*      backgroundColor: "gold",*/}
          {/*    }}*/}
          {/*/>): <Avatar.Image*/}
          {/*    source={require("../assets/image/man-avatar.png")}*/}
          {/*    size={150}*/}
          {/*    style={{*/}
          {/*      marginRight: 10,*/}
          {/*      backgroundColor: "gold",*/}
          {/*    }}*/}
          {/*/>}*/}

          {/*<Avatar.Image*/}
          {/*  source={require("../assets/image/massage.jpg")}*/}
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
          <Text>Role : {user && user.role}</Text>
          {/*<Text>genre : {user && user.gender[0].slice(14, -3)}</Text>*/}
          {(role && role !== "um_fisioterapeuta") ? (
              (myPhysioId && myPhysioId !== 0 ? (
                      <>
                        <Text>Contacter mon Physio</Text>
                        <Text>le Dr : {myPhysio().first_name} {myPhysio().last_name}</Text>
                        {myPhysio().user_email ? (
                                <Text>{myPhysio().user_email}</Text>
                            ):
                            (<Text>Le physio n'a pas communique son Email</Text>)
                        }
                        {myPhysio().phone_number ? (
                                <Text>{myPhysio().phone_number}</Text>
                            ):
                            (<Text>Le physio n'a pas communique un numero de telephone</Text>)
                        }

                      </>
                  )
                  :(
                      <>
                        <Text>Vous etes pas suivi, vous n'avez pas de physio traitant </Text>
                      </>
                  ))
              ):
              null
          }

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
  // modal: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
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

const ProfileScreen = connect(mapStateToProps, {getUserMeta, getPatient})(_ProfileScreen);

export default ProfileScreen;
