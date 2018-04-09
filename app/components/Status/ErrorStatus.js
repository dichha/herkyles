import React from "react"; 
import {View,Text} from "react-native"; 
import styles from "./styles";
import PropTypes from "prop-types"; 

const ErrorStatus = ({text}) => (
    <View style={styles.container}>
        <Text style={styles.error}>{text}</Text>
    </View>
);

ErrorStatus.propTypes = {
    text: PropTypes.string, 
    
};

export default ErrorStatus; 