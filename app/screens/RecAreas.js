import React, {Component} from 'react'; 
import {View, Text, StyleSheet, ListView} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {Container} from '../components/Container';
import {ListItemRecAreas} from '../components/List';

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
        const params = this.props.navigation.state.params;
        //console.log("Rec Areas params: " + params); //obj
        //console.log("Rec Areas state: " + this.props.navigation.state);//obj
        //console.log("Rec Areas navigation: " + this.props.navigation);//obj
        //console.log("Rec Areas params value: " + this.props.navigation.state.params.gymId);
        this.state={
            key:params.gymId,
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

        mainRef.on("value", (snap) => {  
            
            const data = snap.val()[this.state.key];
            gymAreas = [];
            //console.log(typeof data);
           for (var key in data){
               if(key === 'workoutAreas'){
                   const areas = data[key];
                   for(var area in areas){
                       //console.log(area);
                       const target = areas[area];
                       //console.log(target);
                       for(var tar in target){
                           if(tar === 'name'){
                               //console.log(target[tar]);
                                gymAreas.push({
                                    areaName: target[tar],
                                    _key: area,
                                });
                           }
                       }
                   }
               }
           }
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(gymAreas)
            });
        
        });
        
      
    }
    _renderItem = (item)=> {
        const onPress = () => {
            console.log("onPress");
            this.props.navigation.navigate('AreaEquip', {areaId: item._key, gymId: this.state.key, title: item.areaName });
        }
        const onLongPress = () => {
            console.log("onLongPress");
        }
        return (
            <ListItemRecAreas item={item} onPress={onPress} onLongPress={onLongPress}/>
        );
    }
   
    render(){
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

export default RecAreas; 