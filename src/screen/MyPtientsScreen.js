import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getPatient, setIsLoading, addPatient, stopPatient } from "../redux";


const _MyPatientsScreen = (props)=>{
    const { userReducer, getPatient } = props;
    const { patients, user, isFetching } = userReducer;
    useEffect(() => {
        getPatient();
    }, []);
    // console.log(patients);
    // console.log(isFetching);

    const allPatientsArray = patients && Object.keys(patients).map(function (i) {
            return patients[i];
        });
    const myList = (allPatientsArray && allPatientsArray.filter(function (item){
        return item['id fisio'] === user.id;
    }));
    const myListLenght = myList && myList.length
    // console.log(myListLenght);
    const renderMyList = ({ item }) => (

        <View style={styles.item} key={item.id}>
            <View style={styles.itemContent}>
                <Text>
                    {item.date}  {item.name}
                </Text>
                <Text>Indice Oswestry: {item.indice}</Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})} style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.btnDetails}>Lire la suite</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    const keyExtractor = (item, index) => index.toString();
    const [Fetching, setFetching] = useState(isFetching);
    const onRefresh = ()=>{
        setFetching(true);
        getPatient().then(()=>{ setFetching(false)});
    }
    return (
            <SafeAreaView>
                {myListLenght === 0?
                    (<Text>Vous ne suivez aucun patient, veuillez consulter la liste de tous les patient pour suivre des patients non suivis</Text>) :
                    (<FlatList
                        data={myList}
                        renderItem={renderMyList}
                        // keyExtractor={item => item.id}
                        keyExtractor = { keyExtractor }
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        refreshControl={
                            <RefreshControl
                                refreshing={Fetching}
                                onRefresh={onRefresh}
                            />
                        }
                        // extraData={true}
                    />)
                }
            </SafeAreaView>

    )
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
        backgroundColor:'#8fe2b3',
        shadowOffset: {width: 4, height:4},
        shadowColor:"#000",
        shadowRadius:2,
        shadowOpacity:0.2
    },
    itemContent:{
        marginHorizontal: 15,
        marginVertical: 10
    },
    btnDetails:{
        alignItems: "center",
        textAlign:"center",
        justifyContent:"center",
        backgroundColor: "#d39f56",
        borderRadius: 6,
        width: 120
    }
});


const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const MyPatientsScreen = connect(mapStateToProps, { getPatient, setIsLoading, addPatient, stopPatient})(_MyPatientsScreen);

export default MyPatientsScreen;