import React, { Component } from "react"; 
import { View, Text, StyleSheet, Button, AsyncStorage, StatusBar} from "react-native"; 

import {Container} from "../components/Container"; 
import {firebaseApp} from "../../db/DbConfig"; 
import {LinkBtns} from "../components/Buttons/LinkBtns"; 

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
    }
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
    handleLogout = async () => {
        try{
            await firebaseApp.auth().signOut();


            await AsyncStorage.clear(); 
            let userToken = await AsyncStorage.getItem("userToken");
            console.log("userToken after clearing: " + userToken);
            let userEmail = await AsyncStorage.getItem("userEmail");
            console.log("userEmail after clearing: " + userEmail);
            
            this.props.navigation.navigate("App");
        }catch(e){
            console.log(e);
        }
    }

    render(){
        return (
                <Container>
                    <StatusBar transclucent={false} barStyle="light-content"/>
                    <Text>Welcome Admin</Text>
                
                    <Text> Hello {this.state.userEmail}</Text>
                    {console.log("userEmail in render: " + this.state.userEmail)}

                    <LinkBtns 
                    text="Logout"
                    onPress={this.handleLogout} />
                </Container>            
        );
    }
}

export default Welcome; 