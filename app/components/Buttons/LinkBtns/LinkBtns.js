import React from "react";
import {TouchableOpacity, View,Text, StyleSheet} from "react-native";  
import PropTypes from "prop-types"; 
import styles from "./styles"; 

const LinkBtns = ({text, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
);

LinkBtns.propTypes = {
    text: PropTypes.string, 
    onPress: PropTypes.func, 
};

export default LinkBtns; 
