import React, { Component } from 'react'; 
import {Button, View, Text, StyleSheet, AsyncStorage} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig'; 
import {LinkBtns} from '../components/Buttons/LinkBtns';

import {Container} from '../components/Container';
import ErrorStatus from '../components/Status/ErrorStatus';  
import t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet'; 

const Form = t.form.Form;
const styles = EStyleSheet.create({ 
    container: {
        backgroundColor: '#ffffff', 
        justifyContent: 'center',
        //marginTop: 50, 
        padding: 20,
    },
    status: {
        justifyContent: 'center',
        color: 'red',
    }

}); 
const User = t.struct({
    email: t.String, 
    username: t.maybe(t.String), 
    password: t.String, 
    terms: t.Boolean, 
}); 

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
        marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '400',
        marginBottom: 7,
        },
        // the style applied when a validation error occours
        error: {
        color: '#7F7D7D',
        fontSize: 12,
        marginBottom: 7,
        fontWeight: '400'
        }
    }
}; 
const options = {
    fields: {
      email: {
        error: 'Please enter an email',
      },
      password: {
        error: 'Please enter a password',
        password: true, 
        secureTextEntry: true, 
      },
      terms: {
        label: 'Agree to Terms',
      },
    },
    stylesheet: formStyles,
};


class Signup extends Component{
    static navigationOptions = {
        title: "Signup", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    state = {status: ''};
    _signUpAsync = async () => {
        try{
            const statusFlag = 'successfully signed up!';
            await AsyncStorage.setItem("signupToLogin",statusFlag);
            let stlStatus = await AsyncStorage.getItem("signupToLogin"); 
            console.log('status from signup ' + stlStatus );
            this.props.navigation.navigate('Login', {});

        }catch(e){
            console.log(e);
        }
    };
    handleSubmit = () => {
        //const value = 'apple';
        const value = this._form.getValue(); // use that ref. to get the form value
        console.log(value);
        //console.log('value', value.email + " " + value.password + " " + value.terms); 
        if (value != null){
            //const {email, password} = [value.email.toString(), value.password.toString()];

            firebaseApp.auth().createUserWithEmailAndPassword(value.email, value.password).then(()=> {
                console.log("successful");
                this._signUpAsync();

            }).catch((error) => {
                // Sign up was not successful
                console.log("sign up was not successful");
                this.setState({status:error.code});
            });
            
        }
    };
    render(){
        return (
                <Container>
                    <Form
                    ref={c=>this._form=c} // assign a ref
                    type={User}
                    options={options}
                    />
                    <LinkBtns 
                    text='Sign up'
                    onPress={this.handleSubmit}
                    />
                     <ErrorStatus 
                    text={this.state.status} 
                    />
                   
               
                </Container>            
        );
    }
};

export default Signup; 