import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../../components/ButtonDetails';
import NavbarPadrao from '../../components/NavbarPadrao.js';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../../stores/useLoginStore';
import { getObjectData, storeObjectData } from '../../utils/asyncStorage';

export default function AtualizarDadosUser() {
    const { user, login } = useLoginStore();
    const router = useRouter();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    // const [nascimento, setNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await getObjectData('userLogged');
            if (storedUser) {
                setName(storedUser.nome);
                setCpf(storedUser.cpf);
                // setNascimento(storedUser.nascimento);
                setEmail(storedUser.email);
                setCidade(storedUser.cidade);
                setEstado(storedUser.estado);
                setTelefone(storedUser.telefone);
            }
        };

        loadUserData();
    }, []);

    const handleUpdate = async () => {
        const userData = {
            nome: name,
            cpf,
            // nascimento,
            email,
            cidade,
            estado,
            telefone,
        };

        try {
            const response = await fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                login({ ...user, ...data });
                await storeObjectData('userLogged', { ...user, ...data });
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
            <NavbarPadrao texto="Editar dados"/>
            <ScrollView style={styles.container2}>
                <View style={styles.image}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/nophoto.jpg')}
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
                    <View style={styles.row}>
                        <TextInputMask
                            type={'cpf'}
                            style={[styles.input, styles.cidadeEstado]}
                            placeholder="CPF"
                            value={cpf}
                            onChangeText={setCpf}
                        />
                        {/* <TextInputMask
                            type={'datetime'}
                            options={{ format: 'DD/MM/YYYY' }}
                            style={styles.input}
                            placeholder="Data de Nascimento"
                            value={nascimento}
                            onChangeText={setNascimento}
                        /> */}
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.cidadeEstado]}
                            placeholder="Cidade"
                            value={cidade}
                            onChangeText={setCidade}
                        />
                        <TextInput
                            style={[styles.input, styles.cidadeEstado]}
                            placeholder="Estado"
                            value={estado}
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
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType='numeric'
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
