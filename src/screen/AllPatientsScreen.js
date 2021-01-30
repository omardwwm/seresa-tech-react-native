import React from "react";
import {ScrollView, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, VirtualizedList, StatusBar} from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';


import { connect } from "react-redux";
import { getPatient } from "../redux";
import {ActivityIndicator} from "react-native-paper";
// tu update, change by getMyPatents function , to create!!


const _AllPatientsScreen = (props)=> {
    const {userReducer, getPatient} = props;
    const {patients} = userReducer;
    // console.log(patients);
    if (patients !== null) {
        let allPatientsArray = Object.keys(patients).map(function (i) {
            return patients[i];
        });
        // console.log(allPatientsArray);
        return (
            <SafeAreaView>
                <FlatList key={allPatientsArray.index}
                    data={allPatientsArray}
                    renderItem={({ item }) => {
                        return [
                            <View style={styles.item} >
                                <Text>
                                    {item.date}  {item.name}
                                </Text>
                                <Text>Indice Oswestry: {item.indice}</Text>
                                <Text>Patient suivie ou non A implementer!!</Text>
                                <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})}>
                                    <Text style={styles.btnDetails}>Lire la suite</Text>
                                </TouchableOpacity>
                            </View>
                        ]
                    }}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#FD9854"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item:{
        padding: 10,
        margin: 10,
        fontSize: 18,
        borderWidth: 1,
        borderRadius:6,
        backgroundColor:"#e3985a"
    },
    btnDetails:{
        alignItems: "center",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#8fe2b3",
        borderRadius: 6,
        width: 120
    }
});

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const AllPatientsScreen = connect(mapStateToProps, { getPatient })(_AllPatientsScreen);

export default AllPatientsScreen;