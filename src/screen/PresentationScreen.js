import React from "react";
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import imgDos from "../assets/image/presentation-dos.png";



const PresentationScreen = (props)=>{
    return <View >
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>Presentación</Text>
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}> Estadisticas de dolor de espalda baja</Text>

                <Image source={imgDos} style={styles.image}/>
                <Text>
                    Prevalencia se estima en 60% a 70% en paises industrializados (prevalencia de un año 15% a 45%, incidencia de adultos 5% por año).{"\n"}
                    La prevalencia para niños y adolescentes es menor que en adultos, pero esta aumentado.{"\n"}
                    La prevalencia aumenta y alcenza su punto maximo entre las edades de 35 y 55.4 años.{"\n"}
                    Latinoamerica prevalencia 10.5%.
                </Text>
                <Image
                    source={require('../assets/image/presentation-dos2.png')}
                    style={{width: "100%", height: 250, margin:5}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    Subsistemas de la estabilidad espinal
                </Text>
                <Text>
                    ESTABILIZADORES PASIVOS (Vértebras-Fascia-ligamentos){"\n"}ESTABILIZADORES ACTIVOS (Core muscular : tronco, pelvis y cadera){"\n"}
                    CONTROL NEURAL (ajuste postural anticipatorio)
                </Text>
                <Image source={require('../assets/image/presentation-dos3.png')}
                       style={{width: '100%', height: 200, margin:5}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    El Core
                </Text>
                <Text>Puede ser descrito como una caja muscular con los abdominales – anterior espinales – y – posterior gluteos – , – superior diafragma – y – inferior piso pélvico -. Dentro de esta caja se encuentran 29 pares de musculos.
                </Text>
                <Image source={require('../assets/image/presentation-dos4.png')}
                       style={{width: '100%', height: 250, margin:5}}
                />
                <Text style={{fontWeight:"bold", fontSize:22, color:"#FD9854", marginTop:10}}>
                    Evaluacion
                </Text>
                <Image  source={require('../assets/image/presentation-dos5.png')}
                        style={{width: '100%', height: 300, margin:5}}
                />
                <Image  source={require('../assets/image/presentation-dos6.png')}
                        style={{width: '100%', height: 250, marginTop:10}}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate("Phases")} style={styles.btnStyle}>
                    <Text style={styles.textBtn}>Acceder a vos exercices</Text>
                </TouchableOpacity>
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
        width:300,
        height:250,
    },
    btnStyle: {
        backgroundColor:"#fd9854",
        margin: 10,
        borderRadius: 15,
    },
    textBtn: {
        fontSize: 20,
        color:"#ffffff",
        textAlign: "center"
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