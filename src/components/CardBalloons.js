import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CardBalloons() {
    return (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <View style={styles.row}>
                    <Ionicons name="person-circle" size={40} color="gray" />
                    <Text style={styles.commentAuthor}>User</Text>
                </View>
                <View style={styles.row2}>
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="trash" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.commentText}>texto</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    commentCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    commentAuthor: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentText: {
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
    },
});