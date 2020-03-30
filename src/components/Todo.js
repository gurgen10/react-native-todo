import React from 'react';
import { View, StyleSheet, TouchableOpacity  } from 'react-native';

import { AppTextSimple } from '../components/UI/AppText';

export default function Todo({ todo, removeTodo, openTodo } ) {
   
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => openTodo(todo.id)}
            onLongPress={()=> removeTodo(todo.id)}>
            <View style={styles.todo}>
                <AppTextSimple>{todo.title}</AppTextSimple>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 5,
        marginBottom: 10
    }
})

