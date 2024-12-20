import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import Button from '../components/Button';
import { storeObjectData } from '../utils/asyncStorage';
import render from '../utils/render.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useLoginStore();
    const router = useRouter();

    const handleLogin = async () => {
        const loginData = {
            email,
            senha: password,
        };

        setLoading(true);

        try {
            const response = await fetch(`${render}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                login({ accessToken: data.token, ...data.usuario });
                await storeObjectData('userLogged', { accessToken: data.token, ...data.usuario });
                router.replace('/home');
            } else {
                const data = await response.json();
                Alert.alert('Erro ao logar', data.error || 'Erro desconhecido');
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Erro ao logar', 'Erro de rede ou servidor');
            console.error('Erro ao logar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/imobly-azul.png')} style={styles.logo} />
                <Text style={styles.title}>Imobly</Text>
            </View>

            <View style={styles.loginBox}>
                <View style={styles.loginTitleContainer}>
                    <Text style={styles.loginTitle}>Login</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button onPress={handleLogin}>Entrar</Button>
            )}

            <Text style={styles.signupText}>
                Não tem conta?{' '}
                <Text
                    style={styles.signupLink}
                    onPress={() => router.push('/cadastro')}
                >
                    Crie uma
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 80,
        display: 'flex',
        flexDirection: 'row'
    },
    logo: {
        width: 60,
        height: 60,
        margin: 3
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    loginBox: {
        width: '100%',
        paddingVertical: 60,
        paddingHorizontal: 30,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        position: 'relative', // Permite que o título "Login" seja posicionado dentro da caixa
        marginTop: 90,
        marginBottom: 70
    },
    loginTitleContainer: {
        position: 'absolute', // Faz o título flutuar sobre a caixa
        top: -30, // Posiciona o título acima da caixa
        backgroundColor: '#00557A',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
        fontSize: 16,
    },
    signupText: {
        marginTop: 10,
        fontSize: 14,
        color: '#000',
    },
    signupLink: {
        fontWeight: 'bold',
        color: '#000',
    },
});
