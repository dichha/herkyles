import React, { Component } from "react"; 
import { View, Text, StyleSheet, StatusBar, Linking} from "react-native"; 
import { StackNavigator } from "react-navigation"; 
 
import Container from "../components/Container/Container";
import LinkBtns from "../components/Buttons/LinkBtns/LinkBtns"; 
import Logo from "../components/Logo/Logo";
import {firebaseApp} from '../../db/DbConfig';
 
var buttonLink = "";


class Home extends Component{
    static navigationOptions = {
        title: "Home", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    

    handleGymStatsPress = () => {
        this.props.navigation.navigate("GymStats"); 
        console.log("handle gym stats press"); 
    }

    handleGroupPress = () => {
        Linking.openURL(this.state.link);
        console.log("handle group press"); 
    }

    handleCodeScannerPress = () => {
        this.props.navigation.navigate("CodeScanner");
        console.log("handle code scanner press");
    }

    handleLoginPress = () => {
        this.props.navigation.navigate("Login"); 
        console.log("handle login press"); 
    }

    handleCodeScannerPress = () => {
        this.props.navigation.navigate("CodeScanner"); 
        console.log("handle code scanner press"); 
    }

    constructor(props){
        super(props);

        var mainRef = firebaseApp.database().ref("groupFitnessScheduleLink")
        
        mainRef.once("value").then(function(dataSnapshot) {
            buttonLink = dataSnapshot.val();
        })
    }
    render(){
        return (
            <Container>
                
                <StatusBar transclucent={false} barStyle="light-content"/>
                <Logo/>
                <LinkBtns
                    text="Gyms"
                    onPress={this.handleGymStatsPress}
                />
                <LinkBtns
                    text="Group Fitness Schedule"
                    onPress={()=> {Linking.openURL(buttonLink)}}
                />
                <LinkBtns
                    text="QR Code Scanner"
                    onPress={this.handleCodeScannerPress}
                />
                <LinkBtns
                    text="Login"
                    onPress={this.handleLoginPress}
                />
            </Container>
          
        );
    }
}
 


export default Home; 