import {DefaultTheme, DarkTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export var current_theme = DarkTheme;

export var setCurrentTheme = async() => {
    const value = await AsyncStorage.getItem('@theme');
        if (value !== null) {
            if (value === 'dark') {
                current_theme = DarkTheme;
            } else {
                current_theme = DefaultTheme;
            }
        } else {
            current_theme = DarkTheme;
        }
}

export var updateTheme = async() => { // function to update the theme
    const value = await AsyncStorage.getItem('@theme');
    if(value !== null) {
        if (value === 'dark') {
            current_theme = DarkTheme;
        } else {
            current_theme = DefaultTheme;
        }
    } else {
        current_theme = DarkTheme;
    }
    
}


DefaultTheme.colors.primary = DefaultTheme.colors.surface; 