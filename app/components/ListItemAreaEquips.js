import React, {Component} from 'react'; 

import {View, TouchableHighlight, Text, Image, Button} from 'react-native'; 

class ListItem extends Component{
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
            <View style={styles.li}>
            <Text style={styles.liTitle}>{this.props.item.eName}</Text>
            <Text style={styles.liTitle}>
            {this.props.item.quan}</Text>
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