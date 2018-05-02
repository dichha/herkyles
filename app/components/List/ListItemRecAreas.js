import React, {Component} from 'react'; 

import {View, TouchableHighlight, Text, Image, Button, Platform} from 'react-native'; 
import PropTypes from "prop-types"; 
import styles from "./styles";
import {Ionicons} from '@expo/vector-icons';
const ICON_PREFIX = Platform.OS === 'ios'? 'ios': 'md'; 
const ICON_COLOR = '#708090'; 
const ICON_SIZE = 15;

const ListItemRecAreas = ({item, onPress,onLongPress}) => (
    <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
    <View style={styles.areaLi}>
    <Text style={styles.areaLiTitle}>{item.areaName}</Text>
    {<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE}/>}
    </View>
    </TouchableHighlight>

);


export default ListItemRecAreas; 