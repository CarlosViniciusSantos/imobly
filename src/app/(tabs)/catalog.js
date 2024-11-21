import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import NavbarPadrao from '../../components/NavbarPadrao';
import CardCatalog from '../../components/CardCatalog';
import render from '../../utils/render.js';

export default function Catalog() {
    const [properties, setProperties] = useState([]);

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
            <NavbarPadrao texto='Catálogo'/>
            {properties.length > 0 ? properties.map(property => (
                <CardCatalog 
                    key={property.id} 
                    id={property.id}
                    nome={property.nome}
                    descricao={property.descricao}
                    foto_imovel={property.foto_imovel}
                />
            )) : <Text>não há imoveis cadastrados...</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC'
    }
});