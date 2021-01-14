import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import imgDos from "../assets/image/presentation-dos.png";



const PresentationScreen = (props)=>{
    return <View >
        <ScrollView>
            <View style={styles.container}>
                <Text>presentation page</Text>
                <Text> Estadisticas de dolor de espalda baja</Text>

                <Image source={imgDos} style={styles.image}/>
                <Text>
                    Prevalencia se estima en 60% a 70% en paises industrializados (prevalencia de un año 15% a 45%, incidencia de adultos 5% por año).{"\n"}
                    La prevalencia para niños y adolescentes es menor que en adultos, pero esta aumentado.{"\n"}
                    La prevalencia aumenta y alcenza su punto maximo entre las edades de 35 y 55.4 años.
                </Text>
            </View>

        </ScrollView>

    </View>

}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        padding:5,
    },

    image:{
        margin:4,
        width:120,
        height:160,
    }
});

// const mapStateToProps = (state) => ({
//     userReducer: state.userReducer,
// });
//
// const PresentationScreen = connect(mapStateToProps)(
//     _PresentationScreen
// );

export default PresentationScreen;