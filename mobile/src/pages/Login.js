import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function getUser() {
            const _id = await AsyncStorage.getItem('user')
            if (_id) {
                redirectToMain(_id);
            }
        }

        getUser();
    }, []);

    async function handleLogin() {
        const { _id } = await api.createUser(user);
        await AsyncStorage.setItem('user', _id);
        redirectToMain(_id);
    }

    function redirectToMain(_id) {
        return navigation.navigate('Main', { _id });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={logo} />

            <TextInput placeholder="Digite seu usuário no github"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#999"
                value={user}
                onChangeText={setUser}
                style={styles.input} />

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
