import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavbarPadrao from '../components/NavbarPadrao';
import CardBalloons from '../components/CardBalloons';
import { useLocalSearchParams } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import render from '../utils/render'

export default function Comments() {
    const { id } = useLocalSearchParams(); // id do imóvel
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id: userId } = useLoginStore(); // id do usuário logado

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(`${render}comments/list`);
                const data = await response.json();
                const filteredComments = data.filter(comment => comment.id_imovel === +id);
                setComments(filteredComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments();
    }, [id]);

    const handlePostComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Erro', 'O comentário não pode estar vazio.');
            return;
        }

        const commentData = {
            id_imovel: parseInt(id),
            id_usuario: parseInt(userId),
            comentario: newComment,
        };

        try {
            const response = await fetch(`${render}comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (response.ok) {
                const newCommentData = await response.json();
                setComments([...comments, newCommentData]);
                setNewComment('');
            } else {
                const data = await response.json();
                Alert.alert('Erro ao postar comentário', data.error || 'Erro desconhecido');
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Erro ao postar comentário', 'Erro de rede ou servidor');
            console.error('Erro ao postar comentário:', error);
        }
    };

    return (
        <View style={styles.container}>
            <NavbarPadrao texto="Comentários" />
            <View style={styles.container}>

                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CardBalloons author_id={item.id_usuario} text={item.comentario} />
                    )}
                />

            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escreva um comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.button} onPress={handlePostComment}>
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