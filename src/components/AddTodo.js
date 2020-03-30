import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Keyboard  } from 'react-native';
import { AntDesign} from '@expo/vector-icons'

export default function AddTodo( { addTodo, children }) {
    const [value, setValue ] = useState('');

    const pressHandler = () => {
        if(value.trim() ) {
            addTodo(value);
            setValue('');
            Keyboard.dismiss()

        } else {
            Alert.alert('Գործի անունը չի կարող լինել դատարկ։' );
        }
        
    }
    return (
        <View style={styles.block}>
            
            <TextInput 
                style={styles.input} 
                onChangeText={setValue} 
                value={value}
                placeholder='Գրեք  գործի անունը'
                autoCapitalize='none'
                autoCorrect={false}keyboardType='default'></TextInput>
                <AntDesign.Button name='pluscircleo' onPress={pressHandler}>Ավելացնել</AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15

    },
    input: {
        borderBottomWidth: 2,
        padding: 10,
        borderColor: '#3949ab',
        borderStyle: 'solid',
        width: '70%'

    }
    
})

