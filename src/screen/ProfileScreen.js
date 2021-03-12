import React, {useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { onUserLogin, hideModal, getUserMeta, getPatient } from "../redux";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { Card } from 'react-native-elements'

const _ProfileScreen = (props) => {
  const { userReducer, getUserMeta, getPatient } = props;
  const { user, userMeta, patients } = userReducer;

  if (user === null) {
    return null;
  }
  const role = user && user.role;
  // let userId = user.id
  console.log('userProfile', user);
  // useEffect(()=>{
  //   getPatient();
  // }, [])

  // console.log(patients);
  //   const allPatientsArray = patients && Object.keys(patients).map(function (i) {
  //     return user && patients[i];
  //   });
  //   const currentPatient = allPatientsArray && allPatientsArray.filter(function (item){
  //     return item.paciente ===  userId;
  //   });
  //   const currentUser = currentPatient && currentPatient[0];
    // console.log('Im current user', currentUser);

    // const myPhysioId = currentUser && currentUser['id fisio'];
    const myKine = user && user.juiz_list_fisio && user.juiz_list_fisio[0];
    // console.log('im your kine now', myKine);
    // console.log('his ID is : ', myPhysioId);
    useEffect(()=>{
      // console.log('id inside useeffet', myPhysioId);
      if (myKine && myKine !== 0){
        getUserMeta(myKine)
      }
    }, [myKine])
  // if (userMeta){
  //   console.log('les donnes de kinee: ', userMeta);
  // }
  // const myPhysio = ()=>{
  //   if (myPhysioId !== 0){
  //     return userMeta && userMeta.data;
  //   }
  // }
  const makeCall = ()=>{
    let phoneNumber = userMeta && userMeta.data.phone_number[0];
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber)
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileBox}>
          {role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente" ?
              (
                  (user && user.gender[0].slice(14, -3) === "Femme" || user && user.gender[0] === "Femme")?
                  (<Avatar.Image
                      source={require("../assets/image/woman-avatar.png")}
                      size={120}
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
          <Card>
            <Card.Title>Mes infos</Card.Title>
            {user && <Text>Firstname : {user.first_name}</Text>}
            {user && <Text>Lastname : {user.last_name}</Text>}
            {(role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente") && <Text>Numero de phase : {user.mod6_capabilities[0].slice(29, 30)}</Text>}
            {user &&  <Text>Mon tel : {user.phone_number}</Text>}
            {user && <Text>Email : {user.email}</Text>}
          </Card>

          {(role && role !== "um_fisioterapeuta" || user && user.mod6_capabilities[0].slice(11, 22) === "um_paciente") ? (
              (myKine && myKine !== 0 ? (
                      <>
                        <Card>
                          <Card.Title>Mon physio</Card.Title>
                          <View style={{alignItems: 'center', justifyContent:'center'}}>
                            <Text>le Dr : {userMeta && userMeta.data.first_name} {userMeta && userMeta.data.last_name}</Text>
                            {userMeta && userMeta.email ? (
                                    <TouchableOpacity onPress={()=> Linking.openURL(`mailto:${userMeta.email}`)}
                                                      style={styles.contactStyle}
                                    >
                                      <Text style={{fontWeight: 'bold'}}>
                                        <MaterialCommunityIcons name="email-edit-outline" size={20} color="black" />  {userMeta.email}
                                      </Text>
                                    </TouchableOpacity>
                                ):
                                (<Text>Le physio n'a pas communique son Email</Text>)
                            }
                            {userMeta && userMeta.data.phone_number ? (
                                    <TouchableOpacity onPress={makeCall} style={styles.contactStyle}>
                                      <Text>
                                        <Ionicons name="phone-portrait-outline" color="#000000" size={20} style={{ alignSelf: "center"}}/>
                                        {userMeta && userMeta.data.phone_number[0]}
                                      </Text>
                                    </TouchableOpacity>
                                ):
                                (<Text><Ionicons name="phone-portrait-outline" color="#000000" size={20} style={{ alignSelf: "center"}}/>Le physio n'a pas communique de numero</Text>)
                            }
                          </View>
                        </Card>
                      </>
                  )
                  :(
                      <>
                        <View >
                          <Card>
                            <Card.Title>Mon physio</Card.Title>
                            <Text>Vous n'etes pas suivi, vous n'avez pas de physio traitant</Text>
                            <Text>Contacter la direction : sur ces coordonnées (A INSERER PLUS TARD)</Text>
                          </Card>
                        </View>
                      </>
                  ))
              ):
              null
          }

          <TouchableOpacity
            style={{...styles.buttonBox, marginVertical:48}}
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
    marginHorizontal: 20,
    backgroundColor: "#FD9854",
    padding: 5,
    borderRadius: 10,
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
    borderBottomWidth: 3,
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
  contactStyle: { width: '85%', padding: 5, backgroundColor: '#87e3b4', borderRadius: 8, alignItems: 'center', marginVertical:12

  }
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const ProfileScreen = connect(mapStateToProps, { getUserMeta })(_ProfileScreen);

export default ProfileScreen;
