import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity, Alert, Modal} from "react-native";

import { connect } from "react-redux";
import { stopPatient, addPatient, getUserMeta, hideModal} from "../redux";
import {Ionicons} from "@expo/vector-icons"; // tu update, change by getPatientFiche function , to create!!


const _FichePatientScreen = (props)=>{
    const {userReducer, stopPatient, addPatient, getUserMeta, hideModal} = props;
    const {user, userMeta, showModal, isPatientAdded, isPatientStopped} = userReducer;
    const {item} = props.route.params;
    // console.log(item);
    const paciente_id = item.paciente;
    // console.log(paciente_id);

    // console.log(user);
    // idFisio est l'id du fisio qui suit le patient dont on consulte l'actuelle fiche
    const idFisio = item['id fisio'];
    // fisio_id est l'ID du fisio connecte
    const fisio_id = user.id;
    // console.log(fisio_id);
    useEffect(() => {
        // const paciente_id = item.paciente;
        if (idFisio === fisio_id){
            getUserMeta(paciente_id);
        }
        if (idFisio!==0 && idFisio !== fisio_id){
            getUserMeta(idFisio);
        }
    }, []);

    const addThisPatientToMyList = ()=>{
        addPatient(paciente_id, fisio_id);
    }

    const removePatientFromMyList = ()=>{
        stopPatient(paciente_id, fisio_id);
    }

    console.log(isPatientStopped);
    console.log(isPatientAdded);
    return (
        <View style={styles.itemDetails}>
            <ScrollView>
                <View style={styles.itemDetailsContent}>
                    <Text>Privé : Fiche {item['phase du relevé']} {item.name}</Text>
                    <Text>{item.date}</Text>
                    <Text>Sexe : {item.sexe}</Text>
                    <Text>Age : {item['âge']}</Text>
                    <Text>Escala dolor : {item['escala dolor']}</Text>
                    <Text>Estar de pie : {item['Estar de pie']}</Text>
                    <Text>Intensidad de dolor : {item['Intensidad de dolor']}</Text>
                    <Text>Dormir : {item.Dormir}</Text>
                    <Text>Levantar peso : {item['Levantar peso']}</Text>
                    <Text>Actividad sexual : {item['Actividad sexual']}</Text>
                    <Text>Andar : {item.Andar}</Text>
                    <Text>Vida social : {item['Vida social']}</Text>
                    <Text>Estar sentado : {item['Estar sentado']}</Text>
                    <Text>Viajar : {item.Viajar}</Text>
                    <Text>Indice : {item.indice}</Text>

                    <View  >
                        {idFisio===0 ?
                            (
                                <TouchableOpacity style={styles.btnAddStop}>
                                    <Text onPress={addThisPatientToMyList} style={styles.btnText}>Suivre ce patient</Text>
                                </TouchableOpacity>
                            ) :
                            idFisio===user.id ?
                                (
                                    <>
                                        <Text>Contacter le patient: Tel: {userMeta && userMeta.data.phone_number[0]}</Text>
                                        <Text style={{backgroundColor:"#66983a", marginBottom:8}}>Vous suivez deja ce patient</Text>
                                        <TouchableOpacity style={styles.btnAddStop}>
                                            <Text onPress={removePatientFromMyList} style={styles.btnText}>Arreter de suivre ce patient</Text>
                                        </TouchableOpacity>
                                    </>
                                ) :
                                (<Text style={{... styles.btnText, backgroundColor:"#66983a", margin:10}}>Ce patient est suivi par le kine : {userMeta.data.last_name}</Text>)
                        }
                    </View>
                </View>
            </ScrollView>
            <Modal animationType="slide" transparent={true} visible={showModal}>
                <View style={styles.centeredModal}>
                    <View style={styles.modal}>
                        <View>
                            {isPatientAdded &&
                                <>
                                    <Text style={{ marginBottom: 10 }}>
                                        vous suivez maintenant ce patient
                                    </Text>

                                    <Ionicons
                                        name="md-checkmark-circle"
                                        color="#59ed9c"
                                        size={60}
                                        style={{ alignSelf: "center" }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            ...styles.openButton,
                                            backgroundColor: "#2196F3",
                                        }}
                                        onPress={() => {
                                            hideModal(showModal);
                                            props.navigation.navigate("MyPatients");
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Ok</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemDetails:{
        marginHorizontal: 5,
        marginVertical:6,
        borderRadius:6,
        backgroundColor:"#ffffff",
        shadowOffset: {width: 5, height:5},
        shadowColor:'#000',
        shadowRadius:3,
        shadowOpacity:0.4
    },
    itemDetailsContent:{
        marginHorizontal: 10,
        marginVertical: 15,
        padding:8,
    },
    btnAddStop:{
        marginVertical:15,
        alignItems:"center",
        borderRadius: 10,
    },
    btnText:{
        textAlign:"center",
        backgroundColor:"#FD9854",
        padding: 6,
        borderRadius:6
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
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
})

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const FichePatientScreen = connect(mapStateToProps, { getUserMeta, stopPatient, addPatient, hideModal })(_FichePatientScreen);

export default FichePatientScreen;