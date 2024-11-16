import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import NavbarPadrao from '../components/NavbarPadrao';
import ButtonDetails from '../components/ButtonDetails';
import render from '../utils/render';

export default function DetailsProperty() {
    const [property, setProperty] = useState(null);
    const router = useRouter();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        async function fetchProperty() {
            try {
                const response = await fetch(`${render}properties/${id}`);
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        }

        fetchProperty();
    }, [id]);

    const handleSearchPress = () => {
        router.push('/enviarProposta');
    };

    if (!property) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Detalhes"/>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={property.foto_imovel ? { uri: property.foto_imovel } : require('../../assets/images/imovel1.png')}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{property.nome}</Text>
                    </View>
                    <Text style={styles.price}>R$ {property.valor}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.type}>{property.tipo}</Text>
                    <Text style={styles.address}>{property.cidade} - {property.estado}</Text>
                    <Text style={styles.details}>{property.descricao}</Text>
                </View>
            </ScrollView>

            <ButtonDetails onPress={handleSearchPress}>Falar com a Empresa</ButtonDetails>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    scrollContent: {
        paddingBottom: 80, 
    },
    image: {
        width: '100%',
        height: 350,
        marginBottom: 20,
    },
    content: {
        padding: 20,
    },
    tagContainer: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    tag: {
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10, 
    },
    rent: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
        marginBottom: 10, 
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10, 
    },
    address: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
        marginBottom: 10, 
    },
    details: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10, 
    },
});
