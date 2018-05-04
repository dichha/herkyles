import React, { Component } from "react"; 
import { View, Text, StyleSheet, Button, AsyncStorage, StatusBar} from "react-native"; 

import {Container} from "../components/Container"; 
import {firebaseApp} from "../../db/DbConfig"; 
import {LinkBtns} from "../components/Buttons/LinkBtns"; 
import {LinkTouch} from '../components/Buttons/LinkTouch';
import SuccessStatus from '../components/Status/SuccessStatus';

class Welcome extends Component{
    static navigationOptions = {
        title: "Welcome", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };

    constructor(props){
        super(props);
        this.state = { userEmail: ""};
        this._getUserEmail();
        this._getStatus();
    }
    handleRecOptionPress = () => {
        {this._removeSignupToWelcomeStatus()};
        this.props.navigation.navigate("RecOptions"); 
        console.log("RecOption Press"); 
    }
    _getStatus = async () =>{
        try{
            let status = await AsyncStorage.getItem('signupToWelcome');
            console.log("status in login: " + status);
            this.setState({signupToWelcomeStatus: status});
            console.log("status from state: "+ this.state.signupToWelcomeStatus);
            
        }catch(e){
            console.log(e);
        }
    }; 

    _getUserEmail = async () => {
        try{
            let email = await AsyncStorage.getItem("userEmail");
            console.log("userEmail in WelcomeAdmin: " + email);
            this.setState({userEmail: email});
            console.log("email from state: "+ this.state.userEmail);
            
        }catch(e){
            console.log(e);
        }
    }

    /*handleSignupPress = () => {
        {this._removeSignupToWelcomeStatus()};
        this.props.navigation.navigate('Signup'); 
        console.log("Sign up pressed"); 
    }*/ 

    handleLogout = async () => {
        try{
            await firebaseApp.auth().signOut();


            await AsyncStorage.clear(); 
            let userToken = await AsyncStorage.getItem("userToken");
            console.log("userToken after clearing: " + userToken);
            let userEmail = await AsyncStorage.getItem("userEmail");
            console.log("userEmail after clearing: " + userEmail);
            
            this.props.navigation.navigate("App");

            {this._removeSignupToWelcomeStatus()};
        }catch(e){
            console.log(e);
        }
    }

    /*renderSuccessStatus = () => {
        if(this.state.signupToWelcomeStatus){
            return <SuccessStatus text={this.state.signupToWelcomeStatus}/>
        };
    }*/

    /*_removeSignupToWelcomeStatus = async () => {
        await AsyncStorage.removeItem('signupToWelcome'); 
    }; */



    render(){
        return (
                <Container>
                    <StatusBar transclucent={false} barStyle="light-content"/>
                    <Text>Welcome Admin</Text>
                
                    <Text> Hello {this.state.userEmail}</Text>
                    {console.log("userEmail in render: " + this.state.userEmail)}
                    <LinkBtns
                    text="Manage Equipment"
                    onPress={this.handleRecOptionPress}
                    />
                    <LinkBtns
                    text="Create New Admin Account"
                    onPress={this.handleSignupPress}
                    />
                    <LinkTouch 
                    text="Logout"
                    onPress={this.handleLogout} />

                </Container>            
        );
    }
}

export default Welcome; 