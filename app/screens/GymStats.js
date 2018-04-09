import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
 
import {Container} from '../components/Container'; 
import { firebaseApp } from '../../db/DbConfig';


var databaseRef = firebaseApp.database();
var testArray = [];
var headerArray = [];
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

        this.state = {
            tableHead: [],
            tableData: []
        }
        var that = this;
        
        databaseRef.ref('/attendance_FitnessEast').on('value', function(snapshot) {
            //console.log(snapshotToArray(snapshot));
            testArray.push(snapshotToArray(snapshot));
        
            that.setState({
                tableHead : ["Fitness East"],
                tableData : testArray
            })
            //console.log("\n\nstate.tableData\n\n"+this.state.tableData);
        });

    
    }
    
    
    render(){
        const state = this.state;
        console.log("\n\n\nthis.state in render\n\n\n"+this.state.tableData[0]);
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