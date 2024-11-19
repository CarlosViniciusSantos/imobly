import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Header from '../../components/Header';
import CardCompany from '../../components/CardCompany';
import render from '../../utils/render';

export default function SearchCompany() {
    const [companies, setCompanies] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function fetchCompanies() {
                try {
                    const response = await fetch(`${render}companies/list`);
                    const data = await response.json();
                    setCompanies(data);
                } catch (error) {
                    console.error('Error fetching companies:', error);
                }
            }

            fetchCompanies();
        }, [])
    );


    return (
        <ScrollView style={styles.container}>
            <Header />
            {companies.length > 0 ? companies.map(company => (
                <CardCompany 
                    key={company.id} 
                    id={company.id}
                    nome={company.nome}
                    email={company.email}
                    foto_perfil={company.foto_perfil}
                />
            )): <Text>não há empresas cadastradas no momento...</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});