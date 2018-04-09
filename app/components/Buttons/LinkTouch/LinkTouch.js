import React, {Component} from 'react'; 
import {Text, View, TouchableOpacity} from 'react-native'; 
import PropTypes from 'prop-types';

import styles from './styles'; 

const LinkTouch = ({text, onPress}) => (
        <TouchableOpacity onPress={onPress}>
            <View>  
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    
); 

LinkTouch.propTypes = {
    text: PropTypes.string, 
    onPress: PropTypes.func,
}

export default LinkTouch; 

