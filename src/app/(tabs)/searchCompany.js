import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import CardCompany from '../../components/CardCompany';

export default function SearchCompany() {

    return (
        <ScrollView style={styles.container}>
            <Header />
            <CardCompany />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});