import React, { Component } from 'react'; 
import { View, Text, StyleSheet, AsyncStorage, Button, KeyboardAvoidingView} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig';

import {Container} from '../components/Container'; 
import {TitledInput} from '../components/TitledInput'; 
import {Spinner} from '../components/Spinner';  
import ErrorStatus from '../components/Status/ErrorStatus'; 
import SuccessStatus from '../components/Status/SuccessStatus'; 
import {LinkBtns} from '../components/Buttons/LinkBtns';
import {LinkTouch} from '../components/Buttons/LinkTouch'; 


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
        this.state = {email: '', password: '', error: '', loading: false, signupToLoginStatus: ''}; 
        this._getStatus(); 
    }; 
    _getStatus = async () =>{
        try{
            let status = await AsyncStorage.getItem('signupToLogin');
            console.log("status in login: " + status);
            this.setState({signupToLoginStatus: status});
            console.log("status from state: "+ this.state.signupToLoginStatus);
            
        }catch(e){
            console.log(e);
        }
    }; 
    
    _signInAsync = async (email) => {
        const userTokenValue = Math.round((Math.random()*1000));

        await AsyncStorage.setItem("userToken", userTokenValue.toString());
        await AsyncStorage.setItem("userEmail", email);

        let userToken = await AsyncStorage.getItem("userToken");
        console.log("userToken after setting: " + userToken);
        
        this.props.navigation.navigate('Auth');
    }; 
    _removeSignupToLoginStatus = async () => {
        await AsyncStorage.removeItem('signupToLogin'); 
    }; 


    onLoginPress = () => {
        this.setState({ error: '', loading: true, signupToLoginStatus: '' });
        {this._removeSignupToLoginStatus()}; 
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: "", loading: false });
                console.log("Logged in successfully");
                this._signInAsync(email);
                       
            })
            .catch((error) => {
                //Login was not successful, give an error message
                console.log("In error catch scope");
                console.log(error.code);
                this.setState({ error: 'Authentication failed.', loading: false });
                
            });
    }; 
    renderButtonOrSpinner(){

        if (this.state.loading) {
            return <Spinner />    
        }; 
        
          
        return <LinkBtns  
                text="Log in"
                onPress={this.onLoginPress}  />;
    }
    renderSuccessStatus = () => {
        if(this.state.signupToLoginStatus){
            return <SuccessStatus text={this.state.signupToLoginStatus}/>
        }; 
    }
   
    handleSignupPress = () => {
        this.props.navigation.navigate('Signup'); 
        console.log("Sign up pressed"); 
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
                     
                {this.renderSuccessStatus()}

                
                {this.renderButtonOrSpinner()}
                <LinkTouch 
                    text="No account? Signup" onPress={this.handleSignupPress}
                />  
            </Container>            
        );
    }
}
export default Login; 