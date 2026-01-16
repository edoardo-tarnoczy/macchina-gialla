import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Macchina Gialla 🚖</Text>

            <TextInput
                style={styles.input}
                placeholder="Tuo Nome"
                onChangeText={setName}
                value={name}
            />

            <TextInput
                style={styles.input}
                placeholder="Codice Stanza"
                onChangeText={setCode}
                value={code}
                autoCapitalize="characters"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Game', { roomCode: code, username: name })}
            >
                <Text style={styles.buttonText}>Entra nella Stanza</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#FFD700', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#333', color: 'white', padding: 15, borderRadius: 10, marginBottom: 15 },
    button: { backgroundColor: '#FFD700', padding: 20, borderRadius: 10, alignItems: 'center' },
    buttonText: { fontWeight: 'bold', fontSize: 18 }
});
