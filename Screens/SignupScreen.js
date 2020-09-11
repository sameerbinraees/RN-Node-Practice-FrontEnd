import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AsyncStorage } from 'react-native';

export default function SignupScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const error_signup = <Text style={{ color: 'red', marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }}>
        {error}
    </Text>;
    const error_email = <Text style={{ color: 'red', marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }}>
        {'*Email is required'}
    </Text>;
    const error_password = <Text style={{ color: 'red', marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }}>
        {'*Password is required'}
    </Text>;

    async function sendCred(props) {

        fetch("http://10.7.44.152:3000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then(res => res.json())
            .then(async (data) => {
                //console.log(data)
                try {
                    if (data.Error) {
                        setError(data.Error);
                        Alert.alert(
                            "Email or Password is incorrect"
                        )
                    }
                    else if (!data.Error) {
                        setError('');
                    }
                    await AsyncStorage.setItem("token", data.token);
                    props.navigation.replace('Home');
                } catch (e) {
                    console.log("Error: ", e)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    return (
        <>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                    <Text style={{ marginTop: 35, marginLeft: 15, marginRight: 15, fontSize: 30 }}>Welcome to Signup Screen</Text>
                    <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 20 }}>Plese enter your credentials to Signup</Text>

                    <View
                        style={{
                            marginLeft: 15,
                            marginRight: 140,
                            borderBottomWidth: 5,
                            marginTop: 15,
                            borderRadius: 40,
                            borderBottomColor: 'blue'
                        }}>
                    </View>
                    <>
                        {error ? error_signup : <></>}
                        {!email ? error_email : <></>}
                        {!password ? error_password : <></>}
                    </>
                    <TextInput
                        style={styles.input}
                        mode="outlined"
                        label='Email'
                        theme={{ colors: { primary: "blue" } }}
                        value={email}
                        onChangeText={(text) => { setEmail(text) }}
                        placeholder="Email"
                    />

                    <TextInput
                        style={styles.input}
                        mode="outlined"
                        label='Password'
                        theme={{ colors: { primary: "blue" } }}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => { setPassword(text) }}
                        placeholder="Password"
                    />
                    <Button icon="" mode="contained" onPress={() => sendCred(props)} style={styles.input}>
                        Sign Up
    </Button>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15, fontSize: 18 }}
                            onPress={() => props.navigation.replace("Login")}
                        >Already have an account? Sign In</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        marginTop: 40, marginLeft: 15, marginRight: 15,
    }
});
