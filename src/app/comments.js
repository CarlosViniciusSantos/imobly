import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavbarPadrao from '../components/NavbarPadrao';
import CardBalloons from '../components/CardBalloons';

export default function Comments() {

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Comentários" />
            <View style={styles.container}>

            <CardBalloons/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escreva um comentário..."
                    value={''}
                    onChangeText={''}
                />
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commentsList: {
        flex: 1,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    commentContent: {
        marginLeft: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        flex: 1,
    },
    commentText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#1E3A8A',
        borderRadius: 20,
        padding: 10,
    },
});