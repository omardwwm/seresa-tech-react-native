import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity, Alert} from "react-native";
// import {stopPatient} from "../redux"



import { connect } from "react-redux";
import { stopPatient, addPatient} from "../redux"; // tu update, change by getPatientFiche function , to create!!


const _FichePatientScreen = (props)=>{
    const {userReducer, stopPatient, addPatient} = props;
    const {user} = userReducer;
    // useEffect(() => {
    //     onAppLaunch();
    // }, []);
    // console.log(patients);
    const {item} = props.route.params;
    console.log(item);
    // console.log(user);
    const idFisio = item['id fisio'];
    const fisio_id = user.id;
    console.log(fisio_id);
    const paciente_id = item.paciente;
    console.log(paciente_id);

    const addThisPatientToMyList = ()=>{
        console.log(fisio_id);
        console.log(paciente_id);
        addPatient(paciente_id, fisio_id);
        Alert.alert('adding patient function to implemente');
    }

    const removePatientFromMyList = ()=>{
        stopPatient(paciente_id, fisio_id);
        Alert.alert('remove patient function to implemente');
    }

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
                    <TouchableOpacity  >
                        {idFisio===0 ?
                            (<Text onPress={addThisPatientToMyList} style={{backgroundColor:"#FD9854"}}>Suivre ce patient</Text>) :

                            idFisio===user.id ?
                                (
                                    <>
                                        <Text style={{backgroundColor:"#66983a", marginBottom:10}}>Vous suivez deja ce patient</Text>
                                        <Text onPress={removePatientFromMyList} style={{backgroundColor:"#FD9854"}}>Arreter de suivre ce patient</Text>
                                    </>

                                ) :

                                (<Text style={{backgroundColor:"#66983a", marginBottom:10}}>Ce patient est suivi par le DR dont l'id est: {item['id fisio']}</Text>)
                        }
                    </TouchableOpacity>
                    <Text>Selon le cas, page accessible avec l'Id du patient en navigation </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    itemDetails:{
        marginHorizontal: 5,
        marginVertical:6,
        borderRadius:6,
        backgroundColor:"#fff",
        shadowOffset: {width: 5, height:5},
        shadowColor:'#000',
        shadowRadius:3,
        shadowOpacity:0.4
    },
    itemDetailsContent:{
        marginHorizontal: 10,
        marginVertical: 15,
        padding:8,
    }
})

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const FichePatientScreen = connect(mapStateToProps, { stopPatient, addPatient })(_FichePatientScreen);

export default FichePatientScreen;