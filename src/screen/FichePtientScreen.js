import React from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";


import { connect } from "react-redux";
import { getPatient } from "../redux"; // tu update, change by getPatientFiche function , to create!!


const _FichePatientScreen = (props)=>{
    return (
        <View>
            <ScrollView>
                <Text>THIS IS PAGE OF PATIENT'S FICHE</Text>
                <Text>Toutes les informations sur la patient</Text>
                <TouchableOpacity  style={{color:"#f0f"}}>
                    <Text >SUIVRE CE PATIENT/ARRETER DE SUIVE CE PATIENT</Text>
                </TouchableOpacity>
                <Text>Selon le cas, page accessible avec l'Id du patient en navigation </Text>
            </ScrollView>
        </View>
    )
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const FichePatientScreen = connect(mapStateToProps, { getPatient })(_FichePatientScreen);

export default FichePatientScreen;