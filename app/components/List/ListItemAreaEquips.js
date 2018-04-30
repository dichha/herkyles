import React, {Component} from 'react'; 
import PropTypes from "prop-types"; 
import styles from "./styles";
import {View, TouchableHighlight, Text, Image, Button} from 'react-native'; 

const ListItemAreaEquips = ({item, onPress, onLongPress})=>
    (
    <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
    <View style={styles.areaLi}>
    <Text style={styles.areaLiTitle}>{item.eName}</Text>
    <Text style={styles.areaLiTitle}>
    {item.quan}</Text>
    </View>
    </TouchableHighlight>

);
ListItemAreaEquips.prototype = {
    item: PropTypes.func, 
    onPress: PropTypes.func, 
    onLongPress: PropTypes.func,
};

export default ListItemAreaEquips; 