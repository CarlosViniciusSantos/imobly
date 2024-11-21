import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import NavbarPadrao from '../../components/NavbarPadrao';
import CardPropCompanies from '../../components/CardPropCompanies';
import render from '../../utils/render.js';

export default function PropertiesCompanies() {
    const [properties, setProperties] = useState([]);
    const router = useRouter();
    const { id } = useLocalSearchParams()

    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await fetch(`${render}properties/list`);
                const data = await response.json();
                const filteredProperties = data.filter(property => property.id_empresa === +id);
                setProperties(filteredProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }

        fetchProperties();
    }, [id]);

    return (
        <ScrollView style={styles.container}>
            <NavbarPadrao texto='Imóveis'/>
            {properties.length > 0 ?
            properties.map(property => (
                <CardPropCompanies 
                    key={property.id} 
                    id={property.id}
                    nome={property.nome}
                    descricao={property.descricao}
                    foto_imovel={property.foto_imovel}
                />
            )): <Text>Essa empresa ainda não postou um imóvel</Text> }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
    }
});