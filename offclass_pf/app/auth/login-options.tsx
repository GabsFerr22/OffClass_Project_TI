import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }

      const joined = newCode.join('');
      if (joined.length === 6) {
        handleCodeLogin(joined);
      }
    }
  };

  const handleCodeLogin = async (codigo) => {
    try {
      const response = await fetch('http://localhost:3000/instituicoes/login-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Instituição autenticada:', data.token);
        router.replace('/'); 
      } else {
        const error = await response.json();
        Alert.alert('Código inválido', error.message || 'Verifique o código fornecido.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível autenticar.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/auth/login-code')}>
        <ArrowLeft color="#2E4599" size={28} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo1.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Ponha o Código!</Text>
      <Text style={styles.helper}>Código de inscrição fornecido pela instituição</Text>

      <View style={styles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleCodeLogin(code.join(''))}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  logo: { width: 300, height: 260, marginBottom: 12 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#2E4599', marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2E4599' },
  helper: { fontSize: 12, color: '#666', marginBottom: 16 },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 60,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 10,
    fontSize: 24,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2E4599',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
