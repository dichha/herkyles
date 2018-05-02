import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator, Linking } from 'react-native'; 

import {Container} from '../components/Container';

import openMap from 'react-native-open-maps';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
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
var allGraphs = [];

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
        
        /*this.state={
            areaNames:"",
            areaCapacity:"",
            areaSchedule:"",
            areaEquipment:"",
            areaEquipmentName:"",
            areaEquipmentQty:"",
            areaEquipmentTotal:"",
        }
        var that=this;*/
        
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
       /* that.setState({
            areaNames : workoutAreaName,
            areaCapacity : workoutAreaCapacity,
            areaEquipmentName : equipmentName,
            areaEquipmentQty : equipmentQty,
            areaEquipmentNameTotal: equipmentNameTotal,
            areaEquipmentQtyTotal: equipmentQtyTotal,
        })*/

        coords.lat=gymInfo[gymSelected].child("coords/lat").val();
        coords.lng=gymInfo[gymSelected].child("coords/lng").val();
         
    }

    
    render(){
        
        console.log("*********************************")
        
        var workoutAreas = [];
        var links = [];
        var equip = [];
        var temp = [];
        var temp2 = [];
        var equipDisplay;
        var equipDisplay2;

        checkDate();

        links.push(
            <Text style={{textAlign: 'center',marginBottom:4, fontSize: 15, color:'red', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("closures").val())}}>
            {'Link: Closures'}</Text>
        )

        if (gymSelected == 0){
            links.push(
                <Text style={{textAlign: 'center',marginBottom:4, fontSize: 15, color:'blue', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("daySchedule").val())}}>
                {'Link: Schedule'}</Text>
            )
        }
        
        if (gymSelected == 0 || gymSelected == 1){
            links.push(
                <Text style={{textAlign: 'center',marginBottom: 4, fontSize: 15, color:'blue', textDecorationLine: 'underline'}}onPress={()=> {Linking.openURL(gymInfo[gymSelected].child("rules").val())}}>
                {'Link: Rules'}</Text>
            )              
        }

        for (var i=0;i<workoutAreaName.length;i++){

            temp = equipmentNameTotal[i];
            temp2 = equipmentQtyTotal[i];

            equip.push(
                <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30,textDecorationLine: 'underline'}}>{'Equipment:'}</Text>                
            )

            if (temp[0] === undefined){
                equip.push(
                    <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30}}>{"\u2022 No Equipment Data Available\n"}</Text>
                )
            }else{
                for(var j=0;j<temp.length;j++){
                    equipDisplay = temp[j];
                    equipDisplay2 = temp2[j];
    
                    equip.push(
                        <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30}}>{'\u2022' + equipDisplay} ({equipDisplay2})</Text>
                    )
                }
            }


            //empty view to add horizontal line
            workoutAreas.push(
                <View style={{borderTopColor: 'black', borderTopWidth: 8,}}></View>
            )

            workoutAreas.push( 
                <View style={styles.listContainer} key={i}>
                    <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30, fontWeight: 'bold'}}>{'\n' + workoutAreaName[i] + '\n'}</Text>
                    {equip}
                </View>
            )

            workoutAreas.push(
                <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30,textDecorationLine: 'underline'}}>{'\nHistorical Occupancy Data:'}</Text>                
            )
            
            var temparray = allGraphs[i];

            if (temparray[0] === undefined){
                workoutAreas.push(
                    <Text style={{textAlign:'left', fontSize: 15, marginLeft: 30}}>{"\u2022 No Attendance Data Available\n"}</Text>
                )
            }
            else{
                workoutAreas.push(
                    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={20} domain={{y:[0,10]}} width={deviceWidth}>
                        <VictoryAxis label="Hour"/>
                        <VictoryAxis dependentAxis label="Avg. Occupancy Scale" />
                        <VictoryBar data={temparray}/>
                    </VictoryChart>
                )
            }
    
            equip=[];

        }

        return (
            <Container>
	            <Content>
	                <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>
                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={1}>
                                <AutoHeightImage width={deviceWidth} source={{uri:gymInfo[gymSelected].child("image").val()}} />

                                <Text style={{textAlign: 'center', fontSize: 20}}>{'\n' + gymInfo[gymSelected].child("name").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[gymSelected].child("hours/open/weekdays").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15}}>{gymInfo[gymSelected].child("hours/open/weekends").val()}</Text>

                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}}onPress={()=>openMap({latitude:coords.lat,longitude:coords.lng})}>
                                {gymInfo[gymSelected].child("address").val() + '\n'}</Text>
                               
                                <View style={{borderTopColor: 'black', borderTopWidth: 8,}}></View>

                                <Text style={{textAlign: 'center', fontSize: 20,fontWeight:'bold'}}>{'Workout Areas'}</Text>
                                {links}
                                {workoutAreas}

                            </TouchableOpacity>
                        </View>
                    </ScrollView>
	            </Content>
            </Container>            
        );
    }
}


function checkDate(){
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var currtime = date.getHours();
    var time;
    var val;
    var tod = "";
    var path;

    var g=[];
    allGraphs = [];

    gymInfo[gymSelected].child("workoutAreas").forEach(function(area){

        if(month != 1 && month != 2 && month != 3 && month != 7 && month != 8 && month != 9 && month != 10){
            if(day != 0 && day != 6){
                path = "attendance/Break Session/Weekdays";
            }
            else{
                path = "attendance/Break Session/Weekends";
            }
        }
        else{
            if(day != 0 && day != 6){
                path = "attendance/School Session/Weekdays";
            }
            else{
                path = "attendance/School Session/Weekends";
            }
        }

        console.log(path);

        area.child(path).forEach(function(period){
            time = period.child("0").val().split(":", 2)[0];
            val = period.child("1").val();
            
            if(currtime - 12 > 0 && currtime % 12 == time && tod == "\n"){
                g.push({x:time+tod, y:val, width: 10, fill: "gold"});
            }
            else if(currtime - 12 <= 0 && currtime == time && tod == ""){
                g.push({x:time+tod, y:val, width: 10, fill: "gold"});
            }
            else{
                g.push({x:time+tod, y:val, width: 10,});
            }
            if(time == "12"){
                tod = "\n"
            }
        })

        allGraphs.push(g);
        g = [];
        tod = "";
    })

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