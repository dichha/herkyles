import React, { Component } from 'react'; 
import {  StyleSheet, ScrollView, View, Alert, Image, Dimensions, TouchableOpacity, TouchableHighlight, Navigator } from 'react-native'; 
import { StackNavigator } from "react-navigation"; 
import {Container} from '../components/Container';

import { Ionicons } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {firebaseApp} from '../../db/DbConfig';

const deviceWidth = Dimensions.get('window').width;

var gymInfo =[];
var pageArray = []
var nameArray = [];
var imageArray = [];
var routeArray = [];
var weekdayHours = [];
var weekendHours = [];

class GymStats extends Component{
    static navigationOptions = {
        title: "Gym Stats", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    handleGymPress = () => {
        this.props.navigation.navigate("DetailedGymInfo");
        console.log("Handled pressing on Gym");
    }
    
    
    constructor(props) {
        super(props);
        this.state={
            gyms: "",
            images: "test",
            pages: "",
            routes: "",
            WDHours: "",
            WEHours: "",
        }
        var that = this;
        var mainRef = firebaseApp.database().ref("facilities")
        
        mainRef.once("value").then(function(dataSnapshot) {
          var i = 0;
            gymInfo=dataSnapshot;
          dataSnapshot.forEach(function(testingSnap){
//            gymInfo.push(testingSnap);
            nameArray[i] = testingSnap.child("name").val();
            imageArray[i] = testingSnap.child("image").val();
            pageArray[i] = testingSnap.child("page").val();
            weekdayHours[i] = testingSnap.child("hours/open/weekdays").val();
            weekendHours[i] = testingSnap.child("hours/open/weekends").val();
            routeArray[i] = i;
            i++;
          })
          that.setState({
            gyms : nameArray,
            images : imageArray,
            pages : pageArray,
            routes : routeArray,
            WDHours : weekdayHours,
            WEHours : weekendHours,
          })
        })
    }

    render(){

        var screen = [];
        for(x = 0; x < this.state.gyms.length; x++){
            testpage = "" + this.state.pages[x];
            //console.log(gymInfo);//x)
            screen.push(
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={this.handleGymPress}>
                        <AutoHeightImage width={deviceWidth} source={{uri: this.state.images[x]}} />
                        <Text style={{textAlign: 'center', fontSize: 30}}>{'\n' + this.state.gyms[x]}</Text>
                        <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'\nHours'}</Text>
                        <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WDHours[x]}</Text>
                        <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.WEHours[x]}</Text>
                        <Text style={{textAlign: 'center', fontSize: 15}}>{this.state.pages[x]}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    

        return (
            <Container>
	            <Content>
	                <ScrollView scrollsToTop={true} ref={(ref) => this.myScroll = ref}>
                        {screen}
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