import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import NavbarCatalog from '../../components/NavbarCatalog';
import CardCatalog from '../../components/CardCatalog';

export default function SearchCompany() {

    return (
        <ScrollView style={styles.container}>
            <NavbarCatalog />
            <CardCatalog />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
    }
});