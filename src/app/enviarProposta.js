import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import NavbarPadrao from '../components/NavbarPadrao';
import { useRouter } from 'expo-router';
import ButtonDetails from '../components/ButtonDetails';

export default function EnviarProposta() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        Alert.alert('Mensagem enviada com sucesso');

        router.back();
    };

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Enviar Proposta" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    placeholder="Mensagem"
                    multiline
                    value={mensagem}
                    onChangeText={setMensagem}
                />
                <View style={styles.flexSpacer} />
                <ButtonDetails onPress={handleSubmit}>Enviar Proposta</ButtonDetails>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    flexSpacer: {
        flex: 1,
    },
});
