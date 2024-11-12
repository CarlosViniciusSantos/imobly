import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Button from '../../components/Button';
import { useLoginStore } from '../../stores/useLoginStore';
import { useRouter } from 'expo-router';
import { deleteObjectData } from '../../utils/asyncStorage';

export default function Profile() {
    const { avatar, name, email } = useLoginStore();
    const { logout: logoutStore, accessToken } = useLoginStore();
    const router = useRouter();

    const handleLogout = async () => {
        const logout = { accessToken };

        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logout),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            logoutStore();
            await deleteObjectData('userLogged');
            router.replace('/login');
        } else {
            const data = await response.json();
            Alert.alert('Erro ao logar');
            console.log(data?.error);
        }
    };

    const handleEditProfile = () => {
        router.push('/editProfile');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/logo-imobly.png')} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Button onPress={handleEditProfile}>Editar Perfil</Button>
            <Button onPress={handleLogout}>Logout</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
});