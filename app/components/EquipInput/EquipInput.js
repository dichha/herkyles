import React from "react";
import {TextInput, View,Text} from "react-native";  
import PropTypes from "prop-types"; 
import styles from "./styles"; 

const EquipInput = ({label,placeholder,value, onChangeText}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
            keyboardType={label === 'Enter Quantity'?'numeric': 'default'}
        />

    </View>
);

EquipInput.propTypes = {
    label: PropTypes.string, 
    placeholder: PropTypes.string, 
    value: PropTypes.string, 
    onChangeText: PropTypes.func, 
};

export default EquipInput; 