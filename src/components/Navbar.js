import React from 'react'
import { StyleSheet, View, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from '../components/UI/AppText';

const Navbar = ({title}) => {
    
    return (
        <View style={{...styles.navbarContainer, ...Platform.select({
            ios: styles.navbarIos,
            android: styles.navbarAndroid
        })}}>
            <AppTextBold style={styles.text}>{ title }</AppTextBold> 
        </View>
    )
    
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: THEME.MAIN_COLOR,
        height: 70,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10
    },
    navbarAndroid: {
        borderBottomColor: THEME.MAIN_COLOR,
    },
    navbarIos: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR :  '#fff',
        fontSize: 24
    }
})

export default Navbar;
