/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import TodoItem from './TodoItem';

const TodoList = ({todos, onRemove, onToggle}) => {
    const TodoListItems = todos.map((item, index) =>
        <TodoItem key={index} id={item.id} content={item.content} checked={item.checked} onRemove={onRemove} onToggle={onToggle} />
    );

    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {TodoListItems}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});

export default TodoList;
