import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CardBalloons({ comment }) {
    return (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <Ionicons name="person-circle" size={40} color="gray" />
                <Text style={styles.commentAuthor}>User</Text>
            </View>
            <Text style={styles.commentText}>{comment.text}</Text>
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
    },
    commentAuthor: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentText: {
        fontSize: 16,
    },
});