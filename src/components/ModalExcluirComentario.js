import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import render from '../utils/render.js';

const ModalExcluirComentario = ({ visible, onClose, commentId, onCommentDeleted }) => {
    const [loading, setLoading] = useState(false);
    const { accessToken } = useLoginStore();
    const router = useRouter();

    const handleDeleteComment = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${render}comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Comentário excluído com sucesso.');
                onClose();
                onCommentDeleted(commentId);
            } else {
                const data = await response.json();
                Alert.alert('Erro ao excluir comentário', data.error || 'Erro desconhecido');
                console.log(data.error);
            }
        } catch (error) {
            Alert.alert('Erro ao excluir comentário', 'Erro de rede ou servidor');
            console.error('Erro ao excluir comentário:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.close}>
                        <AntDesign name="close" size={24} color="black" onPress={onClose} />
                    </View>
                    <View style={styles.textview}>
                        <Text style={styles.text2}>Deseja realmente excluir o comentário?</Text>
                    </View>
                    <View style={styles.textpor}>
                        <Text style={styles.text3}>Depois que você excluir o comentário, não há como voltar atrás. Por favor, tenha certeza.</Text>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.botao2} onPress={handleDeleteComment} disabled={loading}>
                            <Text style={styles.text}>{loading ? 'Excluindo...' : 'Excluir'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} onPress={onClose}>
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    close: {
        width: '100%',
    },
    botao: {
        width: '40%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#1E3A8A',
        alignItems: 'center',
        elevation: 3,
    },
    botao2: {
        width: '40%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 10,
    },
    textview: {},
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text3: {
        fontSize: 17,
    },
    textpor: {
        padding: 25,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ModalExcluirComentario;