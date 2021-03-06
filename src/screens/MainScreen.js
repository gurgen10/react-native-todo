import React, { useState, useEffect, useContext, useCallback} from 'react';
import { View,  StyleSheet, FlatList, Image, Dimensions  } from 'react-native';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/UI/AppLoader';
import { AppTextBold } from '../components/UI/AppText';
import { AppButton } from '../components/UI/AppButton';

export const  MainScreen = () => {
    const { addTodo, todos, removeTodo, fetchTodo, loading, error } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)
    const [ deviceWidth, setDeviceWidth ] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );

    const loadTodos = useCallback(async () =>  await fetchTodo(), [fetchTodo]);
    
    useEffect(() => {
        loadTodos()

    }, []);

    useEffect(()=> {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width)

        }
        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    }, [])
    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                data={todos}
                renderItem={ ({item}) => <Todo todo={item} removeTodo={removeTodo} openTodo={changeScreen}/> } 
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
    if(!todos.length) {
        content = (
            <View style={styles.imageWrap}>
                <Image  style={styles.image} source={require('../../assets/no-items.png')}/>
            </View>
        )
    }

    if(loading) {
        return <AppLoader/>
    }

    if(error) {
        return (
            <View style={styles.center}>
                <AppTextBold style={styles.error}>{error}</AppTextBold> 
                <AppButton onPress={loadTodos}>Կրկին փորձել</AppButton>
            </View>
        )
    }
    return (
        <View >
            <AddTodo addTodo={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({ 
    imageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: 'pink',
        fontSize: 20
    }
})

