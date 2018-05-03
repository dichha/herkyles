import React, {Component} from 'react'; 
import {ScrollView,StatusBar, ListView, View} from 'react-native'; 
import {ListItem} from '../components/List';

import {firebaseApp} from '../../db/DbConfig'; 

import PropTypes from 'prop-types';

import EStyleSheet from 'react-native-extended-stylesheet'; 

 

const db = firebaseApp.database();

class RecOptions extends Component{
    static navigationOptions={
        title: "Manage Gyms", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    constructor(props){
        super(props); 
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2
            })
        };
        this.mainRef = db.ref("facilities");
       
    }
    componentDidMount(){
        this.listenForItem(this.mainRef)
    }
    listenForItem = (mainRef) => {

        mainRef.on("value", (dataSnapShot) => {
            var items = [];
            dataSnapShot.forEach((testingSnap) =>{
                //console.log(testingSnap.child("name").val());
                items.push({
                    gymName: testingSnap.child("name").val(),
                    _key: testingSnap.key,
                     
                });
              
            });
            /*
            items.forEach((item) => {
                console.log(item);
            });
            */
            //console.log(gymList + " this"); 
            
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
      
    }
  
    _renderItem = (item)=> {
        const onPress = () => {
            console.log("onPress");
            //this.props.navigation.setParams({title: item.gymName});
            this.props.navigation.navigate('RecAreas', {gymId: item._key, title: item.gymName });
        }
        const onLongPress = () => {
            console.log("onLongPress");
        }
        return (
            <ListItem item={item} onPress={onPress} onLongPress={onLongPress}/>
        );
    }
    /*
    printGyms = (item) => {
        console.log("In printGym()");
        console.log(item)
    }
    */
   render(){
       //this.printGyms(this.state.dataSource);
       return(
           <View style={styles.container}>
               <ListView
                dataSource={this.state.dataSource}
                
                renderRow={this._renderItem}
                enableEmptySections={true}
                style={styles.ListView}
                /> 
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

export default RecOptions; 