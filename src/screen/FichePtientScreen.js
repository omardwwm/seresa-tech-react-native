import React from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {stopPatient} from "../redux"



import { connect } from "react-redux";
import { getPatient } from "../redux"; // tu update, change by getPatientFiche function , to create!!


const _FichePatientScreen = (props)=>{
    const {userReducer} = props;
    const {user} = userReducer;
    const {item} = props.route.params;
    // console.log(item);
    const idFisio = item['id fisio'];
    const addThisPatientToMyList = ()=>{
        Alert.alert('adding patient function to implemente');
    }
    const removePatientFromMyList = (user)=>{
        Alert.alert('remove patient function to implemente');
       // stopPatient(user); // to implement!!!

    }
    return (
        <View style={{margin:10}}>

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
            </ScrollView>
        </View>
    )
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const FichePatientScreen = connect(mapStateToProps, { getPatient })(_FichePatientScreen);

export default FichePatientScreen;