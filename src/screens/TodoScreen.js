import React, { useState, useContext} from 'react';
import { View,  StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';
import { AppCard } from '../components/UI/AppCard';
import { AppTextSimple } from '../components/UI/AppText';

import { EditModal } from '../components/EditModal';
import { AppButton } from '../components/UI/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
    const { todos, updateTodo, removeTodo } = useContext(TodoContext);
    const { todoId, changeScreen } = useContext(ScreenContext);
    const [ modal, setModal ] = useState(false);

    const todo = todos.find(t => t.id === todoId)
   
    const onSaveHandler = async title => {
        await updateTodo(todo.id, title);
        setModal(false)
    } 

    return (
        <View >
            <EditModal 
                visible={modal} 
                onCancel={() => setModal(false)}
                value={todo.title}
                onSave={onSaveHandler}/>
            <AppCard style={styles.card}>
                <AppTextSimple style={styles.title}>{todo.title}</AppTextSimple>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20} color='#fff'/>
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton  onPress={() => (changeScreen(null))} color={THEME.GREY_COLOR}>
                        <AntDesign name='back' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton onPress={() => removeTodo(todo.id)} color={THEME.DANGER_COLOR} >
                        <FontAwesome name='remove' size={20} color='#fff'/>
                    </AppButton>
                </View>
            </View>
            
           
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15

    },
    button: {
        width: '40%'

    },
    title: {
        fontSize: 24,
        width: '70%'
    }
    
   
})
