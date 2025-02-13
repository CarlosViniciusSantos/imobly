import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Header from '../../components/Header';
import CardProperty from '../../components/CardProperty';
import render from '../../utils/render.js'

export default function Home() {
    const [properties, setProperties] = useState([]);
    const router = useRouter();

    const fetchProperties = async () => {
        try {
            const response = await fetch(`${render}properties/list`);
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, [])
    );
    return (
        <ScrollView style={styles.container}>
            <Header />
            {properties.length > 0? properties.map(property => (
                <CardProperty 
                    key={property.id} 
                    id={property.id}
                    foto_imovel={property.foto} 
                    descricao={property.descricao} 
                    id_empresa={property.id_empresa}
                    foto_perfil={property.foto_perfil}
                />
            )): <Text>não há imoveis cadastrados...</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});