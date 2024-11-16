import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function CardCatalog({ id, nome, descricao, foto_imovel }) {

    const router = useRouter();

    const handleSearchPress = () => {
        router.push({pathname: '/detailsProperty', params: {id}})
    };

    return (
        <View style={styles.catalogContainer}>
            <View style={styles.catalogCard}>
            <Image source={foto_imovel ? { uri: foto_imovel } : require('../../assets/images/imovel1.png')} style={styles.logo} />

                <View style={styles.catalogInfo}>
                    <Text style={styles.catalogName}>{nome}</Text>
                    <Text style={styles.catalogDescription}>
                        {descricao}
                    </Text>
                    <TouchableOpacity onPress={handleSearchPress}>
                        <Text style={styles.linkText}>Clique aqui para ver os Detalhes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    catalogContainer: {
        paddingHorizontal: 10,
    },
    catalogCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    catalogInfo: {
        flex: 1,
    },
    catalogName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    catalogDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    linkText: {
        fontSize: 14,
        color: '#1E3A8A',
    },
});