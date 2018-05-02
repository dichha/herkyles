import React, { Component } from "react"; 
import { View, Text, StyleSheet, StatusBar} from "react-native"; 
import { StackNavigator } from "react-navigation"; 
 
import Container from "../components/Container/Container";
import LinkBtns from "../components/Buttons/LinkBtns/LinkBtns"; 
import Logo from "../components/Logo/Logo";
 

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

    handleLoginPress = () => {
        this.props.navigation.navigate("Login"); 
        console.log("handle login Press"); 
    }
    render(){
        return (
            <Container>
                
                <StatusBar transclucent={false} barStyle="light-content"/>
                <Logo/>
                <LinkBtns
                    text="Gym Stats"
                    onPress={this.handleGymStatsPress}
                />
                <LinkBtns
                    text="Admin Login"
                    onPress={this.handleLoginPress}
                />
            </Container>
          
        );
    }
}
 


export default Home; 