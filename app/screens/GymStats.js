import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 
import { StackNavigator } from "react-navigation"; 
import {Container} from '../components/Container';

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';
import openMap from 'react-native-open-maps';
import GymBtns from '../components/Buttons/GymBtns/GymBtns';

const deviceWidth = Dimensions.get('window').width;

var gymDB ={};
var nameArray = [];
var imageArray = [];
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
            addressArray[i] = testingSnap.child("address").val();
            weekdayHours[i] = testingSnap.child("hours/open/weekdays").val();
            weekendHours[i] = testingSnap.child("hours/open/weekends").val();
            coords[i] =testingSnap.child("coords").val();
            i++;

          })
          that.setState({
            gyms : nameArray,
            images : imageArray,
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
                        <GymBtns
                            image = {this.state.images[0]}
                            gym = {this.state.gyms[0]}
                            WDHours = {this.state.WDHours[0]}
                            WEHours = {this.state.WEHours[0]}
                            address = {this.state.address[0]}
                            onPressNav = {()=>this.handleGymPress(0)}
                            onPressCoords = {()=>openMap({ latitude: this.state.coords[0].lat, longitude: this.state.coords[0].lng, name: this.state.gyms[0]})}
                        />
                        <GymBtns
                            image = {this.state.images[1]}
                            gym = {this.state.gyms[1]}
                            WDHours = {this.state.WDHours[1]}
                            WEHours = {this.state.WEHours[1]}
                            address = {this.state.address[1]}
                            onPressNav = {()=>this.handleGymPress(1)}
                            onPressCoords = {()=>openMap({ latitude: this.state.coords[1].lat, longitude: this.state.coords[1].lng, name: this.state.gyms[1]})}
                        />
                        <GymBtns
                            image = {this.state.images[2]}
                            gym = {this.state.gyms[2]}
                            WDHours = {this.state.WDHours[2]}
                            WEHours = {this.state.WEHours[2]}
                            address = {this.state.address[2]}
                            onPressNav = {()=>this.handleGymPress(2)}
                            onPressCoords = {()=>openMap({ latitude: this.state.coords[2].lat, longitude: this.state.coords[2].lng, name: this.state.gyms[2]})}
                        />
                        <GymBtns
                            image = {this.state.images[3]}
                            gym = {this.state.gyms[3]}
                            WDHours = {this.state.WDHours[3]}
                            WEHours = {this.state.WEHours[3]}
                            address = {this.state.address[3]}
                            onPressNav = {()=>this.handleGymPress(3)}
                            onPressCoords = {()=>openMap({ latitude: this.state.coords[3].lat, longitude: this.state.coords[3].lng, name: this.state.gyms[3]})}
                        />
                    </ScrollView>
	            </Content>
            </Container>            
        );
    }
}

export default GymStats; 
