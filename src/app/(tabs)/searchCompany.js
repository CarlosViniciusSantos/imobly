import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import CardCompany from '../../components/CardCompany';
import render from '../../utils/render';

export default function SearchCompany() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Header />
            {companies.map(company => (
                <CardCompany 
                    key={company.id} 
                    id={company.id}
                    nome={company.nome}
                    email={company.email}
                    foto_empresa={company.foto_empresa}
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