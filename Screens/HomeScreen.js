import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen(props) {
    //const { token } = props.route.params;
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    function logOut(props) {
        AsyncStorage.removeItem('token').then(() => {
            props.navigation.replace("Login");
        })
    }

    async function showEmail() {
        setToken(await AsyncStorage.getItem('token'))
        //console.log('token is '+token)
        fetch("http://10.7.44.152:3000/", {
            headers: new Headers({
                Authorization: "Bearer "+token
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(email)
                setEmail(data.email);
            })

    }
    useEffect(() => {
        showEmail();
    })

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontSize: 20 }}>Email is: {email}</Text>

            <Button icon="" mode="contained" onPress={() => logOut(props)}>
                Log Out
        </Button>
        </View>
    );
}

