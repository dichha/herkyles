import React, { Component } from "react"; 
import { View, Text, StyleSheet } from "react-native"; 

import {Container} from "../components/Container"; 

class GymStats extends Component{
    static navigationOptions = {
        title: "Gym Stats", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: "#FFFF00",
    };
    render(){
        return (
                <Container>
                    <Text> Hello from Gym Stats! </Text>
                </Container>            
        );
    }
}

export default GymStats; 