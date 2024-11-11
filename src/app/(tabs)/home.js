import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../../stores/useLoginStore';
import Header from '../../components/Header';
import CardCompany from '../../components/CardCompany';

export default function Home() {
    const { logout } = useLoginStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

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