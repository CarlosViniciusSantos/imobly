import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function CardProperty() {

    const router = useRouter();

    const handleSearchPress = () => {
        router.push('/detailsProperty');
    };

    return (
        <View style={styles.companiesContainer}>
            <View style={styles.companyCard}>
                <View style={styles.companyHeader}>
                    <Image source={require('../../assets/images/logo-imobly.png')} style={styles.logo} />
                    <Text style={styles.companyName}>Maré</Text>
                </View>
                <Text style={styles.companyDescription}>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Image source={require('../../assets/images/imovel1.png')} style={styles.propertyImage} />

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.commentButton}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                        <Text style={styles.commentText}>Comentários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton} onPress={handleSearchPress}>
                        <Text style={styles.viewText}>Visualizar</Text>
                        <Feather name="arrow-right-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.companyCard}>
                <View style={styles.companyHeader}>
                    <Image source={require('../../assets/images/logo-imobly.png')} style={styles.logo} />
                    <Text style={styles.companyName}>Maré</Text>
                </View>
                <Text style={styles.companyDescription}>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Image source={require('../../assets/images/imovel1.png')} style={styles.propertyImage} />

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.commentButton}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                        <Text style={styles.commentText}>Comentários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewText}>Visualizar</Text>
                        <Feather name="arrow-right-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.companyCard}>
                <View style={styles.companyHeader}>
                    <Image source={require('../../assets/images/logo-imobly.png')} style={styles.logo} />
                    <Text style={styles.companyName}>Maré</Text>
                </View>
                <Text style={styles.companyDescription}>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <Image source={require('../../assets/images/imovel1.png')} style={styles.propertyImage} />

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.commentButton}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                        <Text style={styles.commentText}>Comentários</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewText}>Visualizar</Text>
                        <Feather name="arrow-right-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    },
    companiesContainer: {
        paddingHorizontal: 10,
    },
    companyCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3A8A',
    },
    companyDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 5,
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewText: {
        fontSize: 14,
        color: '#000',
        marginRight: 5,
    },
});