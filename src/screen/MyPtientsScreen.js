import React, {useEffect} from "react";
import {
    ScrollView,
    Text,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StatusBar
} from "react-native";


import { connect } from "react-redux";
import { getPatient } from "../redux"; // tu update, change by getMyPatents function , to create!!

const _MyPatientsScreen = (props)=>{
    const {userReducer, getPatient} = props;
    const {patients, user} = userReducer;
    useEffect(() => {
        getPatient();
    }, []);
    // console.log(patients);

        const allPatientsArray = patients && Object.keys(patients).map(function (i) {
            return patients[i];
        });
    const myList = (allPatientsArray && allPatientsArray.filter(function (item){
        return item['id fisio'] === user.id;
    }));
    console.log(myList && myList);
    return (
        // <View>
        //     <ScrollView>
        //         <Text>THIS IS MYPATIENTS SCREEN</Text>
        //         <Text>Page sous forme de liste des patients d'un fisio, avec un lien pour aller a la page fiche du patient</Text>
        //         <TouchableOpacity onPress={() => props.navigation.navigate("FichePatient")} style={{backgroundColor:"#58e8b1"}} >
        //             {/*integrer l'ID dans la navigation*/}
        //             <Text >voir plus</Text>
        //         </TouchableOpacity>
        //     </ScrollView>
        // </View>
        <SafeAreaView>
            <FlatList
                data={myList}
                renderItem={({ item }) => (

                    <View style={styles.item} key={item.id}>
                        <Text>
                            {item.date}  {item.name}
                        </Text>
                        <Text>Indice Oswestry: {item.indice}</Text>
                        <Text>Patient suivie ou non A implementer!!</Text>
                        <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})}>
                            <Text style={styles.btnDetails}>Lire la suite</Text>
                        </TouchableOpacity>
                    </View>
                )}
                // keyExtractor={item => item.id}
                keyExtractor = { (item, index) => index.toString() }
            />
        </SafeAreaView>
    )
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


const MyPatientsScreen = connect(mapStateToProps, { getPatient })(_MyPatientsScreen);

export default MyPatientsScreen;