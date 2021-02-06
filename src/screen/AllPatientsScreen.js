import React, {useEffect} from "react";
import {ScrollView, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, VirtualizedList, StatusBar} from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';


import { connect } from "react-redux";
import { getPatient } from "../redux";
import {ActivityIndicator} from "react-native-paper";
// tu update, change by getMyPatents function , to create!!


const _AllPatientsScreen = (props)=> {
    const {userReducer, getPatient} = props;
    const {patients} = userReducer;
    useEffect(() => {
        getPatient();
    }, []);
    // console.log(patients);
    if (patients !== null) {
        const allPatientsArray = Object.keys(patients).map(function (i) {
            return patients[i];
        });

        // console.log(allPatientsArray);

        return (
            <SafeAreaView>
                <FlatList
                    data={allPatientsArray}
                    renderItem={({ item }) => (

                            <View style={styles.item} key={item.id}>
                                <View style={styles.itemContent}>
                                    <Text>
                                        {item.date}  {item.name}
                                    </Text>
                                    <Text>Indice Oswestry: {item.indice}</Text>
                                    <View style={{marginVertical:3}}>
                                        {item['id fisio']===0?
                                            (
                                                <Text><Fontisto name="doctor" size={24} color="grey" />  Non Suivi</Text>
                                            ):
                                            <Text><Fontisto name="doctor" size={24} color="green" />  Suivi</Text>

                                        }
                                    </View>

                                    <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})} style={{alignItems: "center"}}>
                                        <Text style={styles.btnDetails}>Lire la suite</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )}
                    // keyExtractor={item => item.id}
                    keyExtractor = { (item, index) => index.toString() }
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
        marginHorizontal: 5,
        marginVertical:6,
        borderRadius:6,
        backgroundColor:"#d39f56",
        shadowOffset: {width: 3, height:3},
        shadowColor:'#232422',
        shadowRadius:3,
        shadowOpacity:0.5
    },
    itemContent:{
        marginHorizontal: 15,
        marginVertical: 10
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