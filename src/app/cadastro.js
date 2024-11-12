import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import Button from '../components/Button';

export default function Cadastro() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login } = useLoginStore();
    const router = useRouter();

    const handleRegister = () => {
        // Simulação de registro
        const user = { email, name, accessToken: 'dummy-token' };
        login(user);
        router.replace('/home');
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

                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        value={cpf}
                        onChangeText={setCpf}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data de Nascimento"
                        value={nascimento}
                        onChangeText={setNascimento}
                    />
                </View>
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
        position: 'relative', // Permite que o título "Login" seja posicionado dentro da caixa
        marginTop: 100
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