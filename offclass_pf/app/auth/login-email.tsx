import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { useState } from 'react';

export default function LoginEmail() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (email && senha) {
      setTimeout(() => {
        router.replace('/auth/profile-setup'); 
      }, 800);
    } else {
      Alert.alert('Erro no login', 'Preencha email e senha corretamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/auth/login-code')}>
        <ArrowLeft color="#2E4599" size={28} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo1.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Mail color="#888" style={styles.icon} />
        <TextInput placeholder="Email ou CNPJ" style={styles.input} value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Lock color="#888" style={styles.icon} />
        <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 300, height: 260, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2E4599', marginBottom: 24 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
  },
  button: {
    backgroundColor: '#2E4599',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
});
