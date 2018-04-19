import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 

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
            areaEquipment:"",
            areaEquipmentName:"",
            areaEquipmentQty:"",
        }
        var that=this;
        
        const { state, navigate } = this.props.navigation;
        gymSelected=state.params.index
        state.params.data.forEach(function(data){
            gymInfo.push(data);
        })
        
        workoutAreaCapacity=[];
        workoutAreaName=[];
        workoutAreaEquipment=[];
        equipmentName=[];
        equipmentQty=[];
        

        if(gymSelected==0){
            var i=0;
            var j=0;
            gymInfo[gymSelected].child("workoutArea").forEach(function(area){
                //j=0;
                workoutAreaName.push(area.child("name"));
                workoutAreaCapacity.push(area.child("capacity"));

                
                gymInfo[gymSelected].child("workoutArea/"+i+"/equipment/").forEach(function(equipment){
                    //console.log("i,j= "+i+j);
                    equipmentName.push(equipment.child("name").val());
                    console.log("equipmentName["+j+"]= "+equipmentName[j]);
                    j++
                })
                that.setState({
                    areaEquipmentName : equipmentName,
                    areaEquipmentQty : equipmentQty,
                })
                i++;
            }) 
        }
        else{
            gymInfo[gymSelected].child("workoutAreas").forEach(function(area){
                workoutAreaName.push(area.child("name"));
                workoutAreaCapacity.push(area.child("capacity"));
            })
        }
        coords.lat=gymInfo[gymSelected].child("coords/lat").val();
        coords.lng=gymInfo[gymSelected].child("coords/lng").val();
        that.setState({
            areaNames : workoutAreaName,
            areaCapacity : workoutAreaCapacity,
            //areaEquipmentName : equipmentName,
            //areaEquipmentQty : equipmentQty,
        })
        
        
    }

    
    render(){
        
//        const { state, navigate } = this.props.navigation;
//        console.log("Index: "+state.params.index)
//        state.params.data.forEach(function(data){
//            gymInfo.push(data);
//        })
        console.log("*********************************")
        
        var workoutAreas = [];

        for (var i=0;i<workoutAreaName.length;i++){
            console.log("equipmentName["+i+"] in render= "+equipmentName[i]);
           // for (var j=0; j<equipmentName[i].length;j++){
               // console.log("\n\nequipment name in render"+equipmentName[i][j]);
                workoutAreas.push(
                    <View style={styles.container}>
                        <Text style={{textAlign: 'left', fontSize: 20}}>{i+1+". "+workoutAreaName[i].val()}</Text>
                        <Text style={{textAlign: 'left', fontSize: 20}}>{"capacity: "+workoutAreaCapacity[i].val()}</Text>
                        <Text style={{textAlign: 'left', fontSize: 20}}>{"Equipment Name: "+equipmentName[i]}</Text>
                    </View>
                )
           // }
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

                                <Text style={{textAlign: 'center', fontSize: 15}}>
                                {gymInfo[gymSelected].child("page").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}}onPress={()=>openMap({latitude:coords.lat,longitude:coords.lng})}>
                                {gymInfo[gymSelected].child("address").val()}</Text>

                                <Text style={{textAlign: 'left', fontSize: 25, textDecorationLine: 'underline'}}>{'\nWorkout Areas'}</Text>
                                {workoutAreas}
                                <VictoryBar data={[
                                    { x: 1, y: 2, width: 12 },
                                    { x: 2, y: 3, width: 12 },
                                    { x: 3, y: 5, width: 12 },
                                    { x: 4, y: 4, width: 12 },
                                    { x: 5, y: 6, width: 12 }
                                  ]}/>
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