import React from "react";
import {ScrollView, Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";


import { connect } from "react-redux";
import { getPatient } from "../redux"; // tu update, change by getMyPatents function , to create!!


const _MyPatientsScreen = (props)=>{
    return (
        <View>
            <ScrollView>
                <Text>THIS IS MYPATIENTS SCREEN</Text>
                <Text>Page sous forme de liste des patients d'un fisio, avec un lien pour aller a la page fiche du patient</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("FichePatient")} style={{backgroundColor:"#58e8b1"}} >
                    {/*integrer l'ID dans la navigation*/}
                    <Text >voir plus</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const MyPatientsScreen = connect(mapStateToProps, { getPatient })(_MyPatientsScreen);

export default MyPatientsScreen;