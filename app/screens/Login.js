import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 

import {Container} from '../components/Container'; 

class Login extends Component{
    static navigationOptions = {
        title: 'Login', 
        headerStyle: {
            backgroundColor: '#000000',
        }, 
          headerTintColor: '#FFFF00',
    };
    render(){
        return (
                <Container>
                    <Text> Hello from Login page! </Text>
                </Container>            
        );
    }
}

export default Login; 