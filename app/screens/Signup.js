import React, { Component } from "react"; 
import { View, Text, StyleSheet } from "react-native"; 

import {Container} from "../components/Container"; 

class Signup extends Component{
    static navigationOptions = {
        title: "Signup", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    render(){
        return (
                <Container>
                    <Text> Hello from Signup Stats! </Text>
                </Container>            
        );
    }
}

export default Signup; 