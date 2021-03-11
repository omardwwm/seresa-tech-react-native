import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell,} from "react-native-table-component";
import { connect } from "react-redux";
import { getPatient } from "../redux";


const _DatosScreen = (props) => {
  const { userReducer, getPatient } = props;
  const { patients } = userReducer;
  // console.log(patients);

    let tableHeadArray = [];
  let tableDataArray = [];
  let widthArr = [
      70,
      100,
      90,
      80,
      60,
      60,
      100,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
      70,
  ];

  if (patients !== null) {
    Object.keys(patients[0]).forEach((element) => {
      tableHeadArray.push(element);
    });

    Object.keys(patients).forEach((element) => {
      let currentArray = [];
      Object.values(patients[element]).forEach((element) => {
        currentArray.push(element);
      });
      tableDataArray.push(currentArray);
      // console.log(tableDataArray);
    });
///// added

    // const element = (data) => (
    //     <TouchableOpacity onPress={() =>  props.navigation.navigate('FichePatient', {data})}>
    //       <View>
    //         <Text style={styles.btnText}>Voir plus</Text>
    //       </View>
    //     </TouchableOpacity>
    // );
  //////// end added
    return (
      <ScrollView>
        <ScrollView horizontal>
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={tableHeadArray}
                style={styles.head}
                textStyle={styles.text}
                widthArr={widthArr}
              />
              {/*{*/}
              {/*  tableDataArray.map((rowData, index) => (*/}
              {/*      <Table key={index} style={{flexDirection: 'row'}} >*/}
              {/*        {*/}
              {/*          rowData.map((cellData, cellIndex) => (*/}
              {/*              <Cell key={cellIndex} data={cellIndex === 18 ? element(rowData, index) : cellData} textStyle={styles.text}/>*/}
              {/*          ))*/}
              {/*        }*/}
              {/*      </Table>*/}
              {/*  ))*/}
              {/*}*/}

                <Rows
                    data={tableDataArray}
                    textStyle={styles.text}
                    widthArr={widthArr}
                />
            </Table>
          </View>
        </ScrollView>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FD9854" />
      </View>
    );
  }

  /*
  return (
    <ScrollView>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {Object.keys(patients[0]).map((element) => {
              return (
                <DataTable.Title key={element} style={{ margin: 10 }}>
                  {element}
                </DataTable.Title>
              );
            })}
          </DataTable.Header>
          {Object.keys(patients).map((element) => {
            return (
              <DataTable.Row>
                {Object.values(patients[element]).map((current) => {
                  console.log(current);
                  return <DataTable.Cell>{current}</DataTable.Cell>;
                })}
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ScrollView>
    </ScrollView>
  ); */
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 60, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  //added style
  // btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  // btnText: { textAlign: 'center', color: '#dc4e4e' },
  //end added style
});

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const DatosScreen = connect(mapStateToProps, { getPatient })(_DatosScreen);

export default DatosScreen;
