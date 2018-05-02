
import React from "react";
import {TouchableOpacity, View, Text, Dimensions} from "react-native"; 
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from "prop-types"; 
import styles from "./styles";

const deviceWidth = Dimensions.get('window').width;

const GymBtns = ({image, gym, WDHours, WEHours, address, onPressNav, onPressCoords}) => (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={ 0.75 } style={ styles.button } onPress={onPressNav}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <AutoHeightImage width={deviceWidth - 125} source={{uri: image}} />
            </View>
            
            <Text style={styles.title}>{'\n' + gym}</Text>
            <Text style={styles.coords} onPress={onPressCoords}>{address}</Text>
            <Text style={{textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>{'Hours'}</Text>
            <Text style={styles.hours}>{WDHours}</Text>
            <Text style={styles.hours}>{WEHours}</Text>
        </TouchableOpacity>
    </View>
);

GymBtns.propTypes = {
    image: PropTypes.string,
    gym: PropTypes.string,
    WDHours: PropTypes.string,
    WEHours: PropTypes.string,
    address: PropTypes.string,
    onPressNav: PropTypes.func, 
    OnPressCoords: PropTypes.func, 
};

export default GymBtns; 