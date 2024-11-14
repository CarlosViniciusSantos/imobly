import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import Button from '../components/Button';
import { storeObjectData } from '../utils/asyncStorage';
import render from '../utils/render';

export default function Cadastro() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login } = useLoginStore();
    const router = useRouter();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        const userData = {
            nome: name,
            cpf,
            telefone,
            cidade,
            estado,
            email,
            senha: password,
        };

        try {
            const response = await fetch(`${render}users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                login({ accessToken: data.token, ...data.usuario });
                await storeObjectData('userLogged', { accessToken: data.token, ...data.usuario });
                router.replace('/login');
            } else {
                const data = await response.json();
                Alert.alert('Erro ao cadastrar', data.error || 'Erro desconhecido');
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Erro ao cadastrar', 'Erro de rede ou servidor');
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.loginBox}>
                <View style={styles.loginTitleContainer}>
                    <Text style={styles.loginTitle}>Cadastre-se</Text>
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        style={[styles.input, styles.nome]}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <TextInput
                    style={[styles.input, styles.nome]}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                />
                <View style={styles.formGroup}>
                    <TextInput
                        style={[styles.input, styles.nome]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                        value={cidade}
                        onChangeText={setCidade}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Estado"
                        value={estado}
                        onChangeText={setEstado}
                    />
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        style={[styles.input, styles.nome]}
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
                <Button onPress={handleRegister}>Cadastrar</Button>
                <Text style={styles.signupText}>
                    Já tem uma conta?{' '}
                    <Text
                        style={styles.signupLink}
                        onPress={() => router.push('/login')}
                    >
                        Entre aqui
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loginBox: {
        width: '100%',
        paddingVertical: 50,
        paddingHorizontal: 30,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
        marginTop: 100,
    },
    loginTitleContainer: {
        position: 'absolute',
        top: -30,
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
        width: '48%',
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
        marginBottom: 40,
    },
    signupLink: {
        fontWeight: 'bold',
        color: '#000',
    },
    formGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10
    },
    nome: {
        width: '100%'
    },
});