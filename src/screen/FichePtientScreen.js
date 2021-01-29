import React from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";



import { connect } from "react-redux";
import { getPatient } from "../redux"; // tu update, change by getPatientFiche function , to create!!


const _FichePatientScreen = (props)=>{
    const {item} = props.route.params;
    // console.log(item);
    return (
        <View>

            <ScrollView>
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
                <Text></Text>
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