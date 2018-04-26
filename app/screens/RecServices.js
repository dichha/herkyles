import React, {Component} from 'react'; 
import {View, Text, StyleSheet, FlatList} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {Container} from '../components/Container';


import EStyleSheet from 'react-native-extended-stylesheet'; 

const db = firebaseApp.database();
var gymList = []; 

class RecServices extends Component{
    static navigationOptions = {
        title: "RecServices", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    constructor(props){
        super(props); 
        this.state={
            areaName: []
        };
        this.mainRef = db.ref("facilities");
       
    }

    componentDidMount(){
        this.listenForItem(this.mainRef);
    }   
    componentDidUnMount(){
        this.state.mainRef.off('value');
    }
    listenForItem = (mainRef) => {

        mainRef.once("value").then((dataSnapShot) => {
            dataSnapShot.forEach((testingSnap) =>{
                //console.log(testingSnap.child("name").val());
                gymList.push({
                    gymName: testingSnap.child("name").val(),
                    _key: testingSnap.key,
                     
                });
              
            });
            /*
            gymList.forEach((gym) => {
                console.log(gym);
            });
            console.log(gymList + " this"); 
            */  
            this.setState({ 
                areaName: gymList
            });
        });
      
    }
     
    printGyms = (gyms) => {
        console.log("In printGym()");
        gyms.forEach((gym) => {
            console.log(gym.gymName + " " + gym._key);
        });
    }
      
    render(){
        const gyms = this.state.areaName;
        return(
         <Container>
             <Text>In RecServices page! </Text>
                {this.printGyms(gyms)}
         </Container>
        );
    };

}

export default RecServices; 