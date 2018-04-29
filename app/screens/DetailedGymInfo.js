import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator, Linking } from 'react-native'; 

import {Container} from '../components/Container';

import openMap from 'react-native-open-maps';
import { VictoryBar } from "victory-native";

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';

const deviceWidth = Dimensions.get('window').width;

var gymSelected=0;
var gymInfo=[];
var workoutAreaName=[];
var workoutAreaCapacity=[];
var workoutAreaEquipment=[];
var equipmentName=[];
var equipmentQty=[];
var coords={};


class DetailedGymInfo extends Component{
    static navigationOptions = {
        title: "Gym Info", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    constructor(props) {
        super(props);
        
        this.state={
            areaNames:"",
            areaCapacity:"",
            areaSchedule:"",
            areaEquipment:"",
            areaEquipmentName:"",
            areaEquipmentQty:"",
            areaEquipmentTotal:"",
        }
        var that=this;
        
        const { state, navigate } = this.props.navigation;
        gymSelected=state.params.index
        state.params.data.forEach(function(data){
            gymInfo.push(data);
        })

        
        workoutAreaCapacity=[];
        workoutAreaName=[];
    
        equipmentName=[];
        equipmentNameTotal=[];
        equipmentQty=[];
        equipmentQtyTotal=[];
        
        var i=0;
        var j=0;

        gymInfo[gymSelected].child("workoutAreas").forEach(function(area){
            workoutAreaName.push(area.child("name").val());
            workoutAreaCapacity.push(area.child("capacity").val());

            j=0;
            area.child("equipment").forEach(function(eq){
                equipmentName[j] = eq.child("name").val();
                equipmentQty[j] = eq.child("quantity").val();
                j++;
            })
                    
            equipmentNameTotal[i] = equipmentName;
            equipmentName=[];

            equipmentQtyTotal[i] = equipmentQty;
            equipmentQty=[];
            i++;
        })
            
        console.log(workoutAreaName);
        that.setState({
            areaNames : workoutAreaName,
            areaCapacity : workoutAreaCapacity,
            areaEquipmentName : equipmentName,
            areaEquipmentQty : equipmentQty,
            areaEquipmentNameTotal: equipmentNameTotal,
            areaEquipmentQtyTotal: equipmentQtyTotal,
        })

        coords.lat=gymInfo[gymSelected].child("coords/lat").val();
        coords.lng=gymInfo[gymSelected].child("coords/lng").val();
         
    }

    
    render(){
        
        console.log("*********************************")
        
        var scheduleLink = "";
        var workoutAreas = [];
        var equip = [];
        var temp = [];
        var temp2 = [];
        var equipDisplay;
        var equipDisplay2;

        for (var i=0;i<workoutAreaName.length;i++){

            temp = equipmentNameTotal[i];
            temp2 = equipmentQtyTotal[i];


            for(var j=0;j<temp.length;j++){
                equipDisplay = temp[j];
                equipDisplay2 = temp2[j];

                equip.push(
                    <Text style={{textAlign:'left', fontSize: 20, marginLeft: 30}}>{'\u2022' + equipDisplay} ({equipDisplay2})</Text>
                )
            }

            workoutAreas.push(
                <Text style={{textAlign: 'center', fontSize: 15, color:'red', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("closures").val())}}>
                {'Link: Closures'}</Text>
            )

            if (gymSelected == 0){
                workoutAreas.push(
                    <Text style={{textAlign: 'center', fontSize: 15, color:'blue', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("daySchedule").val())}}>
                    {'Link: Schedule'}</Text>
                )
            }
            
            if (gymSelected == 0 || gymSelected == 1){
                workoutAreas.push(
                    <Text style={{textAlign: 'center', fontSize: 15, color:'blue', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("rules").val())}}>
                    {'Link: Rules \n'}</Text>
                )              
            }

            //empty view to add horizontal line
            workoutAreas.push(
                <View style={{borderTopColor: 'black', borderTopWidth: 8,}}></View>
            )

            workoutAreas.push( 
                <View style={styles.listContainer} key={i}>
                    <Text style={{textAlign:'left', fontSize: 25, marginLeft: 30, fontWeight: 'bold',textDecorationLine: 'underline'}}>{'\n' + workoutAreaName[i] + '\n'}</Text>
                    {equip}
                </View>
            )
            
            workoutAreas.push(

                <VictoryBar data={[
                    { x: 1, y: 2, width: 12 },
                    { x: 2, y: 3, width: 12 },
                    { x: 3, y: 5, width: 12 },
                    { x: 4, y: 4, width: 12 },
                    { x: 5, y: 6, width: 12 }
                  ]}/>
            )
    
            equip=[];

        }

        return (
            <Container>
	            <Content>
	                <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>
                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={1}>
                                <AutoHeightImage width={deviceWidth} source={{uri:gymInfo[gymSelected].child("image").val()}} />

                                <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + gymInfo[gymSelected].child("name").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[gymSelected].child("hours/open/weekdays").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[gymSelected].child("hours/open/weekends").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}}onPress={()=>openMap({latitude:coords.lat,longitude:coords.lng})}>
                                {gymInfo[gymSelected].child("address").val() + '\n'}</Text>
                               
                                <View style={{borderTopColor: 'black', borderTopWidth: 8,}}></View>

                                <Text style={{textAlign: 'center', fontSize: 30,fontWeight:'bold'}}>{'Workout Areas'}</Text>
                                
                                {workoutAreas}

                            </TouchableOpacity>
                        </View>
                    </ScrollView>
	            </Content>
            </Container>            
        );
    }
}

/******************STYLING******************/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20,
      marginTop: 100
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        justifyContent: 'center',
      marginBottom: 20,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    },
    title:{
        
    }
  });

export default DetailedGymInfo; 