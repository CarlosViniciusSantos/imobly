import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../components/ButtonDetails.js';
import NavbarPadrao from '../components/NavbarPadrao.js';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import { getObjectData, storeObjectData } from '../utils/asyncStorage';
import render from '../utils/render.js';

export default function AtualizarDadosUser() {
    const { id, nome, cpf, telefone, cidade, estado, foto_perfil, email, accessToken, updateUser } = useLoginStore();
    const router = useRouter();
    const [name, setName] = useState(nome || '');
    const [cpfState, setCpf] = useState(cpf || '');
    const [emailState, setEmail] = useState(email || '');
    const [cidadeState, setCidade] = useState(cidade || '');
    const [estadoState, setEstado] = useState(estado || '');
    const [telefoneState, setTelefone] = useState(telefone || '');
    const [foto_perfilState, setFoto_perfil] = useState(foto_perfil || '');
    const [userId, setUserId] = useState(id || '');
    const [token, setToken] = useState(accessToken || '');

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await getObjectData('userLogged');
            if (storedUser) {
                setName(storedUser.nome);
                setCpf(storedUser.cpf);
                setEmail(storedUser.email);
                setCidade(storedUser.cidade);
                setEstado(storedUser.estado);
                setTelefone(storedUser.telefone);
                setFoto_perfil(storedUser.foto_perfil);
                setUserId(storedUser.id);
                setToken(storedUser.accessToken);
            }
        };
        loadUserData();
    }, []);

    const handleUpdate = async () => {
        const userData = {
            nome: name,
            cpf: cpfState,
            email: emailState,
            cidade: cidadeState,
            estado: estadoState,
            telefone: telefoneState,
            foto_perfil: foto_perfilState,
        };
        try {
            const response = await fetch(`${render}users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                updateUser(data);
                await storeObjectData('userLogged', { ...data, accessToken: token });
                Alert.alert('Sucesso', 'Dados atualizados com sucesso');
                router.replace('/home');
            } else {
                const data = await response.json();
                Alert.alert('Erro ao atualizar', data.error || 'Erro desconhecido');
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Erro ao atualizar', 'Erro de rede ou servidor');
            console.error('Erro ao atualizar:', error);
        }
    };

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Editar dados" />
            <ScrollView style={styles.container2}>
                <View style={styles.image}>
                    <TouchableOpacity>
                        <Image
                            source={foto_perfil ? { uri: foto_perfil } : require('../../assets/images/nophoto.jpg')}
                            style={styles.perfilImage}
                        />
                        <Text>
                            <Feather name="edit-2" size={23} color="black" />
                            Editar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContainer}></View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInputMask
                        type={'cpf'}
                        style={styles.input}
                        placeholder="CPF"
                        value={cpfState}
                        onChangeText={setCpf}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={emailState}
                        onChangeText={setEmail}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.cidadeEstado]}
                            placeholder="Cidade"
                            value={cidadeState}
                            onChangeText={setCidade}
                        />
                        <TextInput
                            style={[styles.input, styles.cidadeEstado]}
                            placeholder="Estado"
                            value={estadoState}
                            onChangeText={setEstado}
                        />
                    </View>

                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        style={styles.input}
                        placeholder="Telefone"
                        value={telefoneState}
                        onChangeText={setTelefone}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="URL da foto de perfil"
                        value={foto_perfilState}
                        onChangeText={setFoto_perfil}
                    />
                </View>
            </ScrollView>
            <Button onPress={handleUpdate}>Confirmar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'
    },
    container2: {
        flex: 1,
        padding: 20,
        marginTop: 30,
        position: 'relative'
    },
    headerContainer: {
        marginBottom: 30,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    cidadeEstado: {
        width: '48%',
    },
    perfilImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    image: {
        alignItems: 'center'
    }
});
