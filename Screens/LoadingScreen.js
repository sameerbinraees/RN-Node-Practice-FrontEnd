import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';

export default function LoadingScreen(props) {

    async function detectLogin() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
                props.navigation.replace("Home");
            }
            else {
                props.navigation.replace("Login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        detectLogin();
    }, []);
    return (
        <>
            <ActivityIndicator size="large" color="blue" />
        </>
    );
}

