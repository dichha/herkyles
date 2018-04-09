import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
 
import {Container} from '../components/Container'; 
import { firebaseApp } from '../../db/DbConfig';


var databaseRef = firebaseApp.database();
var testArray = [];
var testArray2=[];

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
};

class GymStats extends Component{
    static navigationOptions = {
        title: 'Gym Stats', 
        headerStyle: {
            backgroundColor: '#000000',
        }, 
          headerTintColor: '#FFFF00',
    };
    constructor(props) {
        super(props);

        /*databaseRef.ref('/attendance_FitnessEast').on('value', function(snapshot) {
            console.log(snapshotToArray(snapshot[i]));
            testArray2.push(snapshotToArray(snapshot[i]));
        });*/

    //console.log("\n\nTest array 2\n\n " +testArray2);

        this.state = {
            tableHead: [],
            tableData: []
        }
        var that = this;
        var attendanceRef = databaseRef.ref("attendance_FitnessEast");
        
        attendanceRef.once("value").then(function(dataSnapshot) {
            //testArray = snapshotToArray(dataSnapshot);
            //console.log(testArray);
            //tableData = testArray;
            /*this.state = {
                tableHead: ['Head1', JSON.stringify(testArray[0]), 'Head2', 'Head3'],
                tableData: [ testArray ]
            }*/
            //console.log("\n\nthis.state\n\n"+this.state.tableData[0]);
            var i = 0;
            dataSnapshot.forEach(function(testingSnap){
                testArray.push(testingSnap.child("0").val());
                i++;
            })
            console.log(testArray);
            this.state={
                tableHead : ["test"],
                tableData : testArray
            }
            console.log(this.tableHead);
            console.log(this.tableData);
        })

        //console.log("\n\nTest array\n\n " + tableHead);



        //try to move a setstate statement into function above
       /* this.state = {
            tableHead: ['Head1', JSON.stringify(testArray[0]), 'Head2', 'Head3'],
            tableData: [ testArray ]
        }*/
    }
    
    
    render(){
        const state = this.state;
        return (
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>                  
        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});



export default GymStats; 