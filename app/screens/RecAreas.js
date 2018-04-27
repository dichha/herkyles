import React, {Component} from 'react'; 
import {View, Text, StyleSheet, ListView} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {Container} from '../components/Container';
import ListItem from '../components/ListItem';


import EStyleSheet from 'react-native-extended-stylesheet'; 

const db = firebaseApp.database();
class RecAreas extends Component{ 
    static navigationOptions =({navigation}) => ({
        title: navigation.state.params.title,
    
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    });
    constructor(props){
        super(props); 
        this.state={
            key:this.props.navigation.state.params.gymId,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
        };
        this.mainRef = db.ref("facilities");
       
    }
    componentDidMount(){
        this.listenForItem(this.mainRef)
    }
    listenForItem = (mainRef) => {

        mainRef.once("value").then((dataSnapShot) => {  
           const arr = dataSnapShot.val(); 
           const arr2 = Object.keys(arr); 
           arr2.forEach((key) => {

               console.log("GymId" + this.state.key);
               
               if(key === this.state.key){
                    console.log('******Found the key******')
                    console.log(key);
                    var areas = []
                    dataSnapShot.forEach((datas) => {
                        console.log("*******workouts******")
                        datas.forEach((data) => {
                            //console.log(data.child);
                          console.log(data);  
                        });
                        /*
                        workouts.forEach((workout) => {
                            //console.log(workout.child("name").val())
                            //console.log(workout);
                        })
                        */
                        
                    });


               }
               
               
           }) 
            /*
            var items = [];
            dataSnapShot.forEach((testingSnap) =>{
                //console.log(testingSnap.child("name").val());
                items.push({
                    gymName: testingSnap.child("name").val(),
                    _key: testingSnap.key,
                     
                });
              
            });
            
            items.forEach((item) => {
                console.log(item);
            });
            //console.log(gymList + " this"); 
            
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
            */
        });
        
      
    }
    /* 
    printGyms = (gyms) => {
        console.log("In printGym()");
        gyms.forEach((gym) => {
            console.log(gym.gymName + " " + gym._key);
        });
    }

    handlePress = () => {
        console.log('row press'); 
    }
    */
    render(){
        //this.printGyms(this.state.dataSource);
        const state = this.props.navigation.state;
        const gymName = state.params.title;
        console.log("*****params******");
        console.log(state);
        return(
            <View style={styles.container}>
               <Text> In RecAreas {state.params.gymId} </Text> 
            </View>
        )
    }  
}
const styles = {
    container: {
      backgroundColor: '#f2f2f2', 
      flex: 1
    }, 
    listView: {
      flex: 1
    }
  };

export default RecAreas; 