import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function AppTextSimple(props) {
    return (
        <Text style={{...styles.simpleText, ...props.style}}>
            { props.children}
        </Text>
    )
}

export function AppTextBold(props) {
    return (
        <Text style={{...styles.boldText, ...props.style}}>
            { props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    simpleText: {
        fontFamily: 'roboto-regular'
    },
    boldText: {
        fontFamily: 'roboto-bold'
    }
});
