import React, {Component} from 'react'; 

import {View, TouchableHighlight, Text, Image, Button, Platform} from 'react-native';
import PropTypes from "prop-types"; 
import styles from "./styles"; 
import {Ionicons} from '@expo/vector-icons';  

const ICON_PREFIX = Platform.OS === 'ios'? 'ios': 'md'; 
const ICON_COLOR = '#708090'; 
const ICON_SIZE = 15;

const ListItem = ({item, onPress, onLongPress}) => (
    <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
    <View style={styles.gymLi}>
    <Text style={styles.gymLiTitle}>
    {item.gymName}</Text>
    {<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE}/>}
    
    </View>
    </TouchableHighlight>

);
ListItem.prototype = {
    item: PropTypes.func, 
    onPress: PropTypes.func, 
    onLongPress: PropTypes.func,
};

/*
class ListItem extends Component{
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.item.gymName}</Text>
            {<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE}/>}
                />
            </View>
            </TouchableHighlight>

        );
    }
};
*/

export default ListItem; 