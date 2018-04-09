import React from 'react'; 
import {View,Text} from 'react-native'; 
import styles from './styles';
import PropTypes from 'prop-types'; 

const SuccessStatus = ({text}) => (
    <View>
        <Text style={styles.success}>{text}</Text>
    </View>
);

SuccessStatus.propTypes = {
    text: PropTypes.string,  
}

export default SuccessStatus; 