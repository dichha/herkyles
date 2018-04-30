import React, {Component} from 'react'; 
import {View, Text, StyleSheet, ListView, AlertIOS, Alert, Button} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {Container} from '../components/Container';
import {ListItemAreaEquips} from '../components/List';
import LinkBtns from "../components/Buttons/LinkBtns";


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
            nextInputId: '',
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
                                    console.log("Total length is: " + eNames.length);
                                    this.setState({nextInputId: eNames.length});
                                    for(var eName in eNames){
                                        //console.log(eNames[eName].name);
                                        console.log(eNames.indexOf(eNames[eName]));
                                        equips.push({
                                            gymId: this.state.gymId, 
                                            areaId: this.state.areaId,
                                            eName: eNames[eName].name, 
                                            quan: eNames[eName].quantity,
                                            _key: eNames.indexOf(eNames[eName]),  

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
            AlertIOS.prompt(
                'Update Quantity', 
                'Update Quantity for ' + item.eName, 
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
                    {text: 'OK', onPress: (text) => {
                        //console.log(this.mainRef.child(item.gymId).child("workoutAreas").child(item.areaId).child("equipment").child(item._key))}}
                        this.mainRef.child(item.gymId).child("workoutAreas").child(item.areaId).child("equipment").child(item._key).update({quantity: text})},
                    }
                ],
                
            );
        }
        const onLongPress = () => {
            console.log("onLongPress");
            Alert.alert(
                'Delete Item', 
                'Delete equipment ' + item.eName,
                [
                    {text: 'Cancel', onPress: () => console.log('cancel pressed'), style: 'cancel'}, 
                    {text: 'OK', onPress: () => {
                        this.mainRef.child(item.gymId).child("workoutAreas").child(item.areaId).child("equipment").child(item._key).remove()},
                    }
                ], 
            )   
        }
        
        return (
            <ListItemAreaEquips item={item} onPress={onPress} onLongPress={onLongPress}/>
        );
    }
    /*
    addItem = ()=>{
        AlertIOS.prompt(
          'Add Item', 
          null, 
          [
            {text: 'Cancel', onPress: () => console.log('cancel Pressed'), style: 'cancel'}, 
            {text: 'OK', onPress: (text) => //this.itemsRef.push({title: text})
                console.log("AddItem Pressed")
            },
          ],
        );
      }
    */
   addItem = () => {
       console.log('add equipment btn pressed');
       this.props.navigation.navigate('EquipEntry', {gymId:this.state.gymId, areaId:this.state.areaId, nextInputId:this.state.nextInputId});
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
                
                <Button
                    onPress={this.addItem}
                    title='Add Equipment'
                    color='#FF8C00' 
                />
                
            </View>
        )
    }  
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f2f2f2', 
      flex: 1
    }, 
    listView: {
      flex: 1
    }, 
    
  });

export default RecAreas; 