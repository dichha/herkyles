import React, { Component } from "react"; 
import { View, Text, StyleSheet, StatusBar, Linking} from "react-native"; 
import { StackNavigator } from "react-navigation"; 
 
import Container from "../components/Container/Container";
import LinkBtns from "../components/Buttons/LinkBtns/LinkBtns"; 
import Logo from "../components/Logo/Logo";
import {firebaseApp} from '../../db/DbConfig';
 

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

    handleLoginPress = () => {
        this.props.navigation.navigate("Login"); 
        console.log("handle login Press"); 
    }

    constructor(props){
        super(props);

        this.state={
            link: "",
        }
        var that = this;
        var mainRef = firebaseApp.database().ref("facilities/groupFitnessScheduleLink")
        var buttonLink = "";
        mainRef.once("value").then(function(dataSnapshot) {
            gymDB=dataSnapshot;
            buttonLink = dataSnapshot.val();
            })
            that.setState({
                link: buttonLink,
            })
    }
    render(){
        console.log("this.state.link="+this.state.link);
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
                    onPress={()=> {Linking.openURL("https://recserv.uiowa.edu/programs/fitness/group-fitness/group-fitness-schedule")}}
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