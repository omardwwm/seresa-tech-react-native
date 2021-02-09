import React, {useEffect, useRef, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { getForm, hideFormModal, sendFormData, setIsLoading, getExercice, getPatient } from "../redux";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';
import CountDown from "react-native-countdown-component";


const { width } = Dimensions.get("window");

const _FormScreen = (props) => {
  const {
      userReducer,
      getForm,
      sendFormData,
      setIsLoading,
      hideFormModal,
      getExercice,
      getPatient
    } = props;
  const {
    form,
    user,
    patients,
    isFormLoading,
    showFormModal,
    isLoading,
    formError,
  } = userReducer;

  // useEffect(() => {
  //   // getPatient();
  //   getForm();
  // }, []);
  // console.log(patients);
  // if (patients !== null) {
    const allPatientsArray = patients && Object.keys(patients).map(function (i) {
      return patients[i];
    });
    // console.log(allPatientsArray);
  // console.log(form);
    const currentPatient = allPatientsArray && allPatientsArray.filter(function (item){
      return item.paciente ===  user.id;
    });
    // console.log(currentPatient);
  let lastDateForm = currentPatient && currentPatient[0].date
  let numberPhase = currentPatient && currentPatient[0]['phase du relevé'];
  let dateForNextForm;
  console.log(numberPhase);
  switch (numberPhase){
    case '0':
      dateForNextForm = moment(lastDateForm, "YYYY-MM-DD hh:mm:ss").add(8, 'days');
       break;
    case '1':
      dateForNextForm = moment(lastDateForm, "YYYY-MM-DD hh:mm:ss").add(15, 'days');
      break;
    case '4':
      dateForNextForm = moment(lastDateForm, "YYYY-MM-DD hh:mm:ss").add(21, 'days');
      break;
    default:
      dateForNextForm = moment(lastDateForm, "YYYY-MM-DD hh:mm:ss").add(21, 'days');
  }

    console.log(dateForNextForm);
  // const limitDateLine = lastDateForm.setDate(lastDateForm.getDate() + daysOfPhase);
  // console.log(lastDateForm2.setDate(lastDateForm2.getDate()));
  // }

  const [checked, setChecked] = useState({
    form: {},
    showModal: false,
    modalText: "",
    errorForm: true,
  });

  const [viewLayout, setViewLayout] = useState([]);
  const [viewNumber, setViewNumber] = useState(0);

  const scrollRef = useRef();

  const handleNav = (number, step = null) => {
    if (step == "last") number = number - 2;
    scrollRef.current.scrollTo({
      x: viewLayout[number] - 10,
      animated: true,
    });
  };
  /*
  useEffect(() => {
    getForm(user);
  }, []);
  */
  const handleSubmit = () => {
    console.log(checked.form);
    if (
        Object.keys(checked.form).length !==
        Object.keys(form.pages[0].elements).length
    ) {
      setChecked({
        ...checked,
        showModal: true,
        errorForm: true,
      });
    } else {
      setIsLoading();
      sendFormData(user, checked.form);
    }
  };
  const toggleModal = () => {
    hideFormModal(showFormModal);
    getExercice(user);
    props.navigation.navigate("Phases");
  };
  /*
  if (true) {
    return (
      <View>
        <Button title="debug" onPress={() => console.log(form)} />
      </View>
    );
  }*/

  if (form != null) {
    // if (form.date !== undefined) {
    //   return (
    //       <View
    //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    //       >
    //         <Text style={styles.title}>
    //           Temps restant avant la prochaine phase :
    //         </Text>
    //         <CountDown
    //             until={parseInt(
    //                 (Date.parse(form.date.replace(/\s/g, "T")) - new Date()) / 1000
    //             )}
    //             size={30}
    //         />
    //       </View>
    //   );
    // }

    return (
        <View style={{ flex: 1 }}>

          <View
              style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{...styles.title, fontSize: 16, marginBottom:5}}>
              Temps restant avant la prochaine phase :
            </Text>
            <CountDown
                until={parseInt
                    (dateForNextForm - moment(new Date())) / 1000
                }
                size={16}
            />
          </View>

          <ScrollView
              horizontal
              decelerationRate={0}
              snapToInterval={width}
              snapToAlignment={"center"}
              ref={scrollRef}
              contentContainerStyle={{ marginBottom: 10 }}
              showsHorizontalScrollIndicator={false}
          >
            {form.pages[0].elements.map((current, index) => {
              if (current.type == "rating") {
                const rating = [];
                for (
                    let index = current.rateMin;
                    index <= current.rateMax;
                    index++
                ) {
                  rating.push(
                      <View
                          key={index}
                          style={{
                            flexDirection: "row", flexWrap: 'wrap', height: "5%", alignItems: "center", marginBottom: 20, marginLeft:10
                          }}
                      >
                        <RadioButton
                            value={parseInt(index)}
                            status={
                              checked.form[current.name] === parseInt(index)
                                  ? "checked"
                                  : "unchecked"
                            }
                        />
                        <Text style={{marginRight:60}}>{index}</Text>
                      </View>
                  );
                }
                return (
                    <View key={index}>
                      <Text style={{ ...styles.title, marginTop: 10 }}>
                        {current.title}
                      </Text>
                      <View
                          key={current.name}
                          style={{
                            ...styles.view,
                            flexWrap: "wrap",
                            marginTop: 0,
                            flexDirection: "row",
                            marginLeft:20,
                            width:width-35
                          }}
                          onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setViewLayout([...viewLayout, layout.x]);
                          }}
                      >
                        <RadioButton.Group
                            onValueChange={(value) => {
                              setChecked({
                                ...checked,
                                form: {
                                  ...checked.form,
                                  [current.name]: value,
                                },
                              });
                            }}
                        >
                          {rating}
                        </RadioButton.Group>
                        <View style={{flexDirection: "row"}}>
                          <Image source={require('../assets/image/escala_dolor.png')} style={{width:150, height: "100%"}}/>
                        </View>
                      </View>
                      <View>
                        {index == 0 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index, "last")}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  left: 0,
                                }}
                            >
                              <Text style={styles.textStyle}>&#x3C;</Text>
                            </TouchableOpacity>
                        )}
                        {index == form.pages[0].elements.length - 1 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index + 1)}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  right: 10,
                                }}
                            >
                              <Text style={styles.textStyle}>&gt;</Text>
                            </TouchableOpacity>
                        )}
                      </View>
                    </View>
                );
              }
              if (current.type == "radiogroup") {
                return (
                    <View
                        key={current.name}
                        style={styles.view}
                        onLayout={(event) => {
                          const layout = event.nativeEvent.layout;
                          setViewLayout([...viewLayout, layout.x]);
                        }}
                    >
                      <Text style={styles.title}>{current.title}</Text>
                      <RadioButton.Group
                          onValueChange={(value) => {
                            setChecked({
                              ...checked,
                              form: {
                                ...checked.form,
                                [current.name]: value,
                              },
                            });
                          }}
                      >
                        {current.choices.map((currentChoice) => {
                          return (
                              <View key={currentChoice.text} style={styles.radioBox}>
                                <RadioButton
                                    value={parseInt(currentChoice.value)}
                                    status={
                                      checked.form[current.name] ===
                                      parseInt(currentChoice.value)
                                          ? "checked"
                                          : "unchecked"
                                    }
                                />
                                <Text>{currentChoice.text} </Text>
                              </View>
                          );
                        })}
                      </RadioButton.Group>
                      <View
                          style={{
                            flexDirection: "row",
                          }}
                      >
                        {index == 0 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index, "last")}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  left: 5,
                                }}
                            >
                              <Text style={styles.textStyle}>&#x3C;</Text>
                            </TouchableOpacity>
                        )}
                        {index == form.pages[0].elements.length - 1 ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleNav(index + 1)}
                                style={{
                                  ...styles.stepButton,
                                  position: "absolute",
                                  right: 5,
                                }}
                            >
                              <Text style={styles.textStyle}>&gt;</Text>
                            </TouchableOpacity>
                        )}
                      </View>
                      <View>
                        {index=== form.pages[0].elements.length -1  ?
                        <TouchableOpacity
                            style={{
                              ...styles.submitButton
                            }}
                            onPress={() => {
                              handleSubmit();
                            }}
                        >
                          {isLoading ? (
                              <ActivityIndicator size="large" color="white" />
                          ) : (
                              <Text style={styles.textStyle}>Valider mon formulaire</Text>
                          )
                          }
                        </TouchableOpacity>: null}
                      </View>
                    </View>
                );
              }
            })}
          </ScrollView>
          {/*<View>*/}
          {/*  <TouchableOpacity*/}
          {/*      style={{*/}
          {/*        ...styles.submitButton,*/}
          {/*      }}*/}
          {/*      onPress={() => {*/}
          {/*        handleSubmit();*/}
          {/*      }}*/}
          {/*  >*/}
          {/*    {isLoading ? (*/}
          {/*          <ActivityIndicator size="large" color="white" />*/}
          {/*      ) : (*/}
          {/*          <Text style={styles.textStyle}>Okk</Text>*/}
          {/*      )*/}
          {/*    }*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
          <Modal animationType="slide" transparent={true} visible={showFormModal}>
            <View style={styles.centeredModal}>
              <View style={styles.modal}>
                <Text>
                  {formError
                      ? "Un problème à été rencontré"
                      : "Formulaire envoyé avec succès"}
                </Text>
                <Ionicons
                    name={formError ? "md-warning" : "md-checkmark-circle"}
                    color={formError ? "#ED4337" : "#59ed9c"}
                    size={60}
                    style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      toggleModal();
                    }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
              animationType="slide"
              transparent={true}
              visible={checked.showModal}
          >
            <View style={styles.centeredModal}>
              <View style={styles.modal}>
                <Text>Vous devez remplir tous les champs</Text>
                <Ionicons
                    name="md-warning"
                    color="#ED4337"
                    size={60}
                    style={{ alignSelf: "center" }}
                />
                <TouchableOpacity
                    style={{
                      ...styles.openButton,
                    }}
                    onPress={() => {
                      setChecked({
                        ...checked,
                        showModal: !checked.showModal,
                      });
                    }}
                >
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
    );
  } else {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FD9854" />
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  openButton: {
    backgroundColor: "#FD9854",
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    width: "80%",
  },
  radioBox: {
    flexDirection: "row",
    width: width - 50,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#FD9854",
    padding: 10,
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: 100,
  },
  stepButton: {
    backgroundColor: "#FD9854",
    padding: 12,
    borderRadius: 20,
  },
  view: {
    marginTop: 50,
    width: width - 20,
    margin: 10,
    borderRadius: 10,
    height: "80%"
  },
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const FormScreen = connect(mapStateToProps, {
  getPatient,
  getForm,
  sendFormData,
  setIsLoading,
  hideFormModal,
  getExercice,
})(_FormScreen);

export default FormScreen;
