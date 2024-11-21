import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter, useFocusEffect } from 'expo-router';
import render from '../utils/render.js';

export default function CardProperty({ id, foto_imovel, descricao, id_empresa }) {
    const [empresa, setEmpresa] = useState({});
    const router = useRouter();

    const fetchEmpresa = async () => {
        try {
            const response = await fetch(`${render}companies/${id_empresa}`);
            const data = await response.json();
            setEmpresa(data);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEmpresa();
        }, [id_empresa])
    );

    const handleSearchPress = () => {
        router.push({ pathname: '/detailsProperty', params: { id } });
    };

    const handleComments = () => {
        router.push({ pathname: '/comments', params: { id } });
    };

    return (
        <View style={styles.companiesContainer}>
            <View style={styles.companyCard}>
                <View style={styles.companyHeader}>
                    <Image source={empresa.foto_perfil ? { uri: empresa.foto_perfil } : require('../../assets/images/imobly-azul.png')} style={styles.logo} />
                    <Text style={styles.companyName}>{empresa.nome ? empresa.nome : 'empresa'}</Text>
                </View>
                <Text style={styles.companyDescription}>
                    {descricao}
                </Text>
                <Image source={foto_imovel ? { uri: foto_imovel } : require('../../assets/images/imovel1.png')} style={styles.propertyImage} />

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.commentButton} onPress={handleComments}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                        <Text style={styles.commentText}>Comentários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton} onPress={handleSearchPress}>
                        <Text style={styles.viewText}>Visualizar</Text>
                        <Feather name="arrow-right-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    companiesContainer: {
        paddingHorizontal: 10,
    },
    companyCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3A8A',
        margin: 5
    },
    companyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 5,
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewText: {
        fontSize: 14,
        color: '#000',
        marginRight: 5,
    },
});