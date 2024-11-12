import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavbarPadrao from '../components/NavbarPadrao';
import CardBalloons from '../components/CardBalloons';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: Date.now().toString(), text: newComment }]);
            setNewComment('');
        }
    };

    const renderComment = ({ item }) => (
        <CardBalloons comment={item} />
    );

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Comentários" />
            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={item => item.id}
                style={styles.commentsList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escreva um comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={handleAddComment} style={styles.button}>
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