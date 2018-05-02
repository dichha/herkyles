import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 

import {Container} from '../components/Container';

import openMap from 'react-native-open-maps';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme  } from "victory-native";

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';

const deviceWidth = Dimensions.get('window').width;

var gymSelected=0;
var gymInfo=[];
var workoutAreaName=[];
var workoutAreaCapacity=[];
// var schoolAttendance=[];
// var breakAttendance=[];
var coords={};
var graph = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

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
        }
        var that=this;
        
        if (this.props.navigation != undefined){
           // const { state, navigate } = this.props.navigation;
            const { params } = this.props.navigation.state;
            const { data, index } = params ? params: null;
            console.log(typeof(data))

            gymSelected=index
            data.forEach(function(data){
                gymInfo.push(data);
            })
        
            // var i=0;
            // gymInfo[gymSelected].child("attendance/Locations").forEach(function(area){
            //     // console.log(area.val())
            //     area.forEach(function(session){
            //         if (i%2==0){
            //             breakAttendance.push(session)
            //         }
            //         else{schoolAttendance.push(session)}
            //         i+=1
            //     })
            // })


            workoutAreaCapacity=[];
            workoutAreaName=[];
                gymInfo[gymSelected].child("workoutAreas").forEach(function(area){
                    workoutAreaName.push(area.child("name"));
                    workoutAreaCapacity.push(area.child("capacity"));
                })

            coords.lat=gymInfo[gymSelected].child("coords/lat").val();
            coords.lng=gymInfo[gymSelected].child("coords/lng").val();
            that.setState({
                areaNames : workoutAreaName,
                areaCapacity : workoutAreaCapacity,
            })
            
        }   
    }

    
    render(){
        console.log("*********************************")
        
        var workoutAreas = [];
        for (var i=0;i<workoutAreaName.length;i++){
            workoutAreas.push(
                <View style={styles.container}>
                    <Text style={{textAlign: 'left', fontSize: 20}}>{i+1+". "+workoutAreaName[i].val()}</Text>
                    <Text style={{textAlign: 'left', fontSize: 20}}>{"capacity: "+workoutAreaCapacity[i].val()}</Text>
                </View>
            )
        }

        // if(gymInfo[gymSelected!=undefined]){
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
                                    
                                    <VictoryChart
                                        theme={VictoryTheme.material}
                                        domainPadding={20}>

                                        <VictoryAxis
                                        tickValues={[1, 2, 3, 4]}
                                        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}/>
                                        
                                        <VictoryAxis
                                        dependentAxis
                                        tickFormat={(x) => (`$${x / 1000}k`)}/>
                                        
                                        <VictoryBar
                                        data={graph}
                                        x="quarter"
                                        y="earnings"
                                        />
                                    </VictoryChart>

                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Content>
                </Container>            
            );
        // }
        // else{
        //     console.log(gymInfo[gymSelected].child("image")==undefined)
        //     return(
        //         <Container>
        //             <Content>
        //                 <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>
        //                     <View style={styles.container}>
        //                         <TouchableOpacity activeOpacity={1}>
        //                         </TouchableOpacity>
        //                     </View>
        //                 </ScrollView>
        //             </Content>
        //         </Container>   
        //     );
        // }
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