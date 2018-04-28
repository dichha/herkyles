import React, {Component} from 'react'; 
import {View, Text, StyleSheet, ListView} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {Container} from '../components/Container';
import ListItemAreaEquips from '../components/ListItemAreaEquips';


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
            areaId:this.props.navigation.state.params.areaId,
            gymId: this.props.navigation.state.params.gymId,
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
            
            const data = snap.val()[this.state.gymId];
            equips = [];
            //console.log(typeof data);
           for (var key in data){
               if(key === 'workoutAreas'){
                   const areas = data[key];
                   for(var area in areas){
                       //console.log(area);
                       if( area === this.state.areaId){
                            const target = areas[area];
                            //console.log(target);
                            for(var tar in target){
                                if(tar === 'equipment'){
                                    //console.log(target[tar]);
                                    const eNames = target[tar];
                                    for(var eName in eNames){
                                        //console.log(eNames[eName].name);
                                        
                                        equips.push({
                                            gymId: this.state.gymId, 
                                            areaId: this.state.areaId,
                                            eName: eNames[eName].name, 
                                            quan: eNames[eName].quantity, 

                                        });
                                        
                                    }
                                     
                                     
                                }
                            }
                       }
                       
                       
                   }
               }
           }
            this.setState({ 
                dataSource: this.state.dataSource.cloneWithRows(equips)
            });
        
        });
        
      
    }
    
    _renderItem = (item)=> {
        const onPress = () => {
            console.log("onPress");
            //this.props.navigation.navigate('AreaEquip', {areaId: item._key, title: item.areaName });
        }
        const onLongPress = () => {
            console.log("onLongPress");
        }
        return (
            <ListItemAreaEquips item={item} onPress={onPress} onLongPress={onLongPress}/>
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