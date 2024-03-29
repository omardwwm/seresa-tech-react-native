import React, {useEffect, useState} from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, StatusBar, RefreshControl} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import ListBarSearch from "../components/ListSearchBar";
import { connect } from "react-redux";
import {getPatient} from "../redux";
import {ActivityIndicator} from "react-native-paper";

const _AllPatientsScreen = (props)=> {
    const {userReducer, getPatient} = props;
    const {patients, isFetching} = userReducer;
    const [Fetching, setFetching] = useState(isFetching);
    const [query, setQuery] = useState('');
    useEffect(() => {
        getPatient();
    }, []);

    // console.log(patients);
    const allPatientsArray = patients && Object.keys(patients).map(function (i) {
        return patients[i];
    });
    // console.log(allPatientsArray);
    const [data, setData] = useState(allPatientsArray);
    useEffect(()=>{
        setData(allPatientsArray);
    }, []);
    // console.log('dataAfterUseEffect', data);
    const renderItem=({ item }) => (
        <View style={styles.item} key={item.id}>
            <View style={styles.itemContent}>
                <Text>
                    {item.date}  {item.name}
                </Text>
                <Text>Indice Oswestry: {item.indice}</Text>
                <View style={{marginVertical:3}}>
                    {item['id fisio']===0?
                        (
                            <Text><Fontisto name="doctor" size={24} color="grey" />{'  '}Non Suivi</Text>
                        ):
                        <Text><Fontisto name="doctor" size={24} color="green" />{'  '}Suivi</Text>
                    }
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('FichePatient', {item})} style={{alignItems: "center"}}>
                    <Text style={styles.btnDetails}>Lire la suite</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
        // console.log(isFetching);
        const keyExtractor = (item, index) => index.toString();
        ////////////////////// search bar
        const handleSearch = text => {
            if (text===''){
                setData(allPatientsArray && allPatientsArray);
            }
            const filteredData = allPatientsArray.filter(function (user){
                return user.name.substring(0, text.length).toLowerCase() === text.toLowerCase();
            });
            setQuery(text);
            setData(filteredData);
        };
        //////////// end search bar
        const onRefresh = ()=>{
            setFetching(true);
            getPatient().then(()=>{ setFetching(false)}).then(()=>{setData(allPatientsArray)}).finally(()=>setQuery(''));
        }
    if (allPatientsArray) {
        return (
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor = { keyExtractor }
                    ListHeaderComponent={<ListBarSearch handleSearch={handleSearch} value={query}/>}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={Fetching}
                            onRefresh={onRefresh}
                        />
                    }
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
        marginHorizontal: 10,
        marginVertical:8,
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
        width: 120,
        padding: 5
    }
});

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});


const AllPatientsScreen = connect(mapStateToProps, { getPatient })(_AllPatientsScreen);

export default AllPatientsScreen;