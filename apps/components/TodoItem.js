/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';

const TodoItem = ({id, content, checked, onRemove, onToggle}) => {

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPressOut={() => onToggle(id, checked)}>
                {(checked === 1) ? (
                    <View style={styles.circle}>
                        <Icon name="circledown" size={30} color="#00b3b3" />
                    </View>
                ) : (
                    <View style={styles.circle}>
                        <Icon name="circledowno" size={30} color="#00b3b3" />
                    </View>
                )}
            </TouchableOpacity>
            <Text
                children={content}
                style={[styles.itemText,
                    checked ? styles.strikeText : styles.unstrikeText]}
            />
            <TouchableOpacity onPressOut={() => onRemove(id)}>
                <View style={styles.delete}>
                    <FIcon name="delete" size={30} color="#ff6666" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        marginLeft:20,
        marginRight: 20,
    },
    itemText: {
        fontSize: 20,
        marginVertical: 15,
        flex: 1,
    },
    strikeText: {
        color: '#9e9e9e',
        textDecorationLine: 'line-through',
    },
    unstrikeText: {
        color: '#222222',
    },
    delete: {
        marginLeft: 20,
        marginRight: 20,
    },
});

export default TodoItem;