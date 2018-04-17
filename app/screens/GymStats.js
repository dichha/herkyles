import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 
import { StackNavigator } from "react-navigation"; 
import {Container} from '../components/Container';

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';
import openMap from 'react-native-open-maps';

const deviceWidth = Dimensions.get('window').width;

var gymDB ={};
var pageArray = []
var nameArray = [];
var imageArray = [];
var routeArray = [];
var addressArray =[];
var weekdayHours = [];
var weekendHours = [];
var coords = [];

class GymStats extends Component{
    static navigationOptions = {
        title: "Gym Stats", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    handleGymPress = (i) => {
        this.props.navigation.navigate("DetailedGymInfo",{data:gymDB,index:i});
        console.log("Handled pressing on Gym");
    }

    constructor(props) {
        super(props);
        this.state={
            gyms: "",
            images: "test",
            pages: "",
            routes: "",
            address:"",
            WDHours: "",
            WEHours: "",
            coords:"",
        }
        var that = this;
        var mainRef = firebaseApp.database().ref("facilities")
        
        mainRef.once("value").then(function(dataSnapshot) {
          var i = 0;
          gymDB=dataSnapshot;
          dataSnapshot.forEach(function(testingSnap){
            nameArray[i] = testingSnap.child("name").val();
            imageArray[i] = testingSnap.child("image").val();
            pageArray[i] = testingSnap.child("page").val();
            addressArray[i] = testingSnap.child("address").val();
            weekdayHours[i] = testingSnap.child("hours/open/weekdays").val();
            weekendHours[i] = testingSnap.child("hours/open/weekends").val();
            coords[i] =testingSnap.child("coords").val();
            routeArray[i] = i;
            i++;
          })
          that.setState({
            gyms : nameArray,
            images : imageArray,
            pages : pageArray,
            routes : routeArray,
            address: addressArray,
            WDHours : weekdayHours,
            WEHours : weekendHours,
            coords : coords,
          })
        })
    }

    render(){

        var screen = [this.state.gyms.length]
        return (
            <Container>
	            <Content>
	                <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>
                        
                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={()=>this.handleGymPress(0)}>
                                <AutoHeightImage width={deviceWidth} source={{uri: this.state.images[0]}} />
                                <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + this.state.gyms[0]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WDHours[0]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WEHours[0]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.pages[0]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}} onPress={()=>openMap({ latitude: this.state.coords[0].lat, longitude: this.state.coords[0].lng })}>{this.state.address[0]}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={()=>this.handleGymPress(1)}>
                                <AutoHeightImage width={deviceWidth} source={{uri: this.state.images[1]}} />
                                <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + this.state.gyms[1]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WDHours[1]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WEHours[1]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.pages[1]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}} onPress={()=>openMap({ latitude: this.state.coords[1].lat, longitude: this.state.coords[1].lng })}>{this.state.address[1]}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={()=>this.handleGymPress(2)}>
                                <AutoHeightImage width={deviceWidth} source={{uri: this.state.images[2]}} />
                                <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + this.state.gyms[2]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WDHours[2]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WEHours[2]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.pages[2]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}} onPress={()=>openMap({ latitude: this.state.coords[2].lat, longitude: this.state.coords[2].lng })}>{this.state.address[2]}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.container}>
                            <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={()=>this.handleGymPress(3)}>
                                <AutoHeightImage width={deviceWidth} source={{uri: this.state.images[3]}} />
                                <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + this.state.gyms[3]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WDHours[3]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WEHours[3]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.pages[3]}</Text>
                                <Text style={{textAlign: 'center', fontSize: 15, color:'blue'}} onPress={()=>openMap({ latitude: this.state.coords[3].lat, longitude: this.state.coords[3].lng })}>{this.state.address[3]}</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
	            </Content>
            </Container>            
        );
    }
}

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

export default GymStats; 