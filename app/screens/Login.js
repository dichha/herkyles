import React, { Component } from "react"; 
import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native"; 
import {firebaseApp} from "../../db/DbConfig";

import {Container} from "../components/Container"; 
import {TitledInput} from "../components/TitledInput"; 
import {Spinner} from "../components/Spinner";  
import ErrorStatus from "../components/Status/ErrorStatus"; 
import {LinkBtns} from "../components/Buttons/LinkBtns";

class Login extends Component{
    static navigationOptions = {
        title: "Login", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    
    constructor(props){
        super(props); 
        this.state = {email: "", password: "", error: "", loading: false}; 
    }
    
    _signInAsync = async (email) => {
        const userTokenValue = Math.round((Math.random()*1000));

        await AsyncStorage.setItem("userToken", userTokenValue.toString());
        await AsyncStorage.setItem("userEmail", email);

        let userToken = await AsyncStorage.getItem("userToken");
        console.log("userToken after setting: " + userToken);
        
        this.props.navigation.navigate("Auth");
    }


    onLoginPress = () => {
        this.setState({ error: "", loading: true });
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: "", loading: false });
                console.log("Logged in successfully");
                this._signInAsync(email);
                       
            })
            .catch(() => {
                //Login was not successful, give an error message
                console.log("In error catch scope");
                this.setState({ error: "Authentication failed.", loading: false });
                
            });
    }
    renderButtonOrSpinner(){
        
        if (this.state.loading) {
            return <Spinner />;    
        }
        
        
        return <LinkBtns  
                text="Log in"
                onPress={this.onLoginPress}  />;
    }
    handleLoginPress = () => {
        //this.props.navigation.navigate("Login"); 
        console.log("handle login Press"); 
    }

    render(){
        return (
            <Container>
                <TitledInput
                    label="Email Address"
                    placeholder="you@domain.com"
                    value={this.state.email}
                    onChangeText={email =>this.setState({email})}
                    secureTextEntry={false}
                />
                 <TitledInput
                    label="Password"
                    placeholder="********"
                    value={this.state.password}
                    onChangeText={password =>this.setState({password})}
                    secureTextEntry={true}
                />
                <ErrorStatus 
                    text={this.state.error} 
                />
                
                {this.renderButtonOrSpinner()}
                
             

                
                
            </Container>            
        );
    }
}
export default Login; 