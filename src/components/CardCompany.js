import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default function CardCompany() {
    return (
        <View style={styles.companiesContainer}>
            <View style={styles.companyCard}>
                <Image source={require('../../assets/images/imovel1.png')} style={styles.logo} />
                
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>Empresa Bastos</Text>
                    <Text style={styles.companyDescription}>
                        Descrição da empresa
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Clique aqui para ver os Imóveis</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    companiesContainer: {
        paddingHorizontal: 10,
    },
    companyCard: {
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
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    companyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    linkText: {
        fontSize: 14,
        color: '#1E3A8A',
    },
});