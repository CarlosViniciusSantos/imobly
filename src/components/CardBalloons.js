import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLoginStore } from '../stores/useLoginStore';
import render from '../utils/render';

export default function CardBalloons({ author_id, text, onEdit, onDelete }) {
    const { id: userId } = useLoginStore();
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const response = await fetch(`${render}users/${author_id}`);
                const data = await response.json();
                setAuthorName(data.nome);
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        }

        fetchAuthor();
    }, [author_id]);
    return (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <View style={styles.row}>
                    <Ionicons name="person-circle" size={40} color="gray" />
                    <Text style={styles.commentAuthor}>{authorName}</Text>
                </View>
                {userId === author_id && (
                    <View style={styles.row2}>
                        <TouchableOpacity onPress={onEdit}>
                            <Ionicons name="pencil" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete}>
                            <Ionicons name="trash" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.commentText}>{text}</Text>
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