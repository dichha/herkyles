import React, {Component} from 'react'; 
import {View, Text, StyleSheet, StatusBar, TextInput,Button} from 'react-native'; 
import {firebaseApp} from '../../db/DbConfig';
import {Container} from '../components/Container';
import {EquipInput} from '../components/EquipInput';
import { Spinner } from '../components/Spinner';
import ErrorStatus from '../components/Status/ErrorStatus'; 
import SuccessStatus from '../components/Status/SuccessStatus';

const db = firebaseApp.database();

class EquipEntry extends Component{
    static navigationOptions = {
        title: "Equipment Entry", 
        headerStyle: {
            backgroundColor: "#000000",
        }, 
          headerTintColor: '#facf33',
    };
    constructor(props){
        super(props); 
        
        this.state = {
            equipment: '', 
            quantity: '',
            gymId: this.props.navigation.state.params.gymId,
            areaId: this.props.navigation.state.params.areaId,
            loading: false,
            nextInputId: this.props.navigation.state.params.nextInputId,
            successStatus: '', 
            errorStatus: '',
        }
        this.mainRef = db.ref("facilities");
    }
    submitEntry = () => {
        console.log('Submit entry w/ values ' + this.state.equipment + " and quantity" + this.state.quantity);
        console.log('gymId: ' + this.state.gymId + " areaId " + this.state.areaId);
        this.setState({loading: true});
        //console.log(this.mainRef.child(this.state.gymId).child("workoutAreas").child(this.state.areaId).child("equipment"));
        this.mainRef.child(this.state.gymId).child("workoutAreas").child(this.state.areaId).child("equipment").child(this.state.nextInputId).set({name: this.state.equipment, quantity: this.state.quantity}).then(()=>{
            console.log("submitted successfully");
            this.setState({successStatus:'success'});
            
        })
        .catch((error)=>{
            console.log("Could not submit input. error code: "+ error.code );
            this.setState({errorStatus: 'unsuccess'})
        });

        this.setState({loading: false});
        this.setState({equipment:'', quantity:''});


    }
    renderButtonOrSpinner(){
        if(this.state.loading){
            return <Spinner/>
        }
        return <Button
            title='Submit'
            onPress={this.submitEntry}
            color='#FF8C00'
        />
    }
    renderStatus = () => {
        if(this.state.successStatus){
            return <SuccessStatus text='Entry is successfully completed!'/>
        }else if(this.state.errorStatus){    return <ErrorStatus text='Error in Entry. Please try again'/>
        }else{
            return; 
        };
        
    }
    
    render(){
        return(
            <Container>
                {/*<Text>Hello from EquipEntry page!</Text>
                */}
                
                <EquipInput
                    label='Enter Equipment Name'
                    placeholder='Equipment Name'
                    value={this.state.equipment}
                    onChangeText={equipment=>this.setState({equipment})}

                />
                <EquipInput
                    label='Enter Quantity'
                    placeholder='42'
                    value={this.state.quantity}
                    onChangeText={quantity=>this.setState({quantity})}
                    
                    
                />
                {this.renderButtonOrSpinner()}
                {this.renderStatus()}
                
               

            </Container>
        )
    }

}
export default EquipEntry; 