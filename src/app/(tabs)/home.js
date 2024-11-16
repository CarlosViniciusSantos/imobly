import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import CardProperty from '../../components/CardProperty';
import render from '../../utils/render'

export default function Home() {
    const [properties, setProperties] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await fetch(`${render}properties/list`);
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }

        fetchProperties();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Header />
            {properties.map(property => (
                <CardProperty 
                    key={property.id} 
                    id={property.id}
                    foto_imovel={property.foto_imovel} 
                    descricao={property.descricao} 
                    id_empresa={property.id_empresa}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});