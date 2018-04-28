import React, {Component} from 'react'; 

import {View, TouchableHighlight, Text, Image, Button, Platform} from 'react-native'; 

import {Ionicons} from '@expo/vector-icons';
const ICON_PREFIX = Platform.OS === 'ios'? 'ios': 'md'; 
const ICON_COLOR = '#708090'; 
const ICON_SIZE = 15;

class ListItem extends Component{
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.item.areaName}</Text>
            {<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE}/>}
            </View>
            </TouchableHighlight>

        );
    }
};
const styles ={
    li: {
        paddingHorizontal: 20, 
        paddingVertical: 16, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor:  '#FFFFFF', 
        borderBottomColor: '#eee', 
        borderColor: 'transparent', 
        borderWidth: 1, 
        paddingLeft: 16, 
        paddingTop: 14, 
        paddingBottom: 16
    }, 
    liTitle: {
        color: '#333', 
        fontSize: 16,

    },
};
export default ListItem; 