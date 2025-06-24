import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginEmail() {
  const router = useRouter();

  const [emailOuCnpj, setEmailOuCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoConta, setTipoConta] = useState('usuario'); 

  const handleLogin = async () => {
    if (emailOuCnpj && senha) {
      try {
        const url =
          tipoConta === 'usuario'
            ? 'https://offclassprojectti-production.up.railway.app/api/usuarios/login'
            : 'https://offclassprojectti-production.up.railway.app/api/instituicoes/login';

        const body =
          tipoConta === 'usuario'
            ? { email: emailOuCnpj, senha }
            : { email_ou_cnpj: emailOuCnpj, senha };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Login', 'Login realizado com sucesso!');

          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('tipoConta', tipoConta);

          console.log('Token:', data.token);

          router.replace('/auth/profile-setup');
        } else {
          Alert.alert('Erro no login', data.erro || 'Credenciais inválidas.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro de conexão com o servidor.');
        console.error(error);
      }
    } else {
      Alert.alert('Erro no login', 'Preencha email/CNPJ e senha corretamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/auth/login-code')}>
        <ArrowLeft color="#2E4599" size={28} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo1.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, tipoConta === 'usuario' && styles.switchButtonSelected]}
          onPress={() => setTipoConta('usuario')}
        >
          <Text style={[styles.switchButtonText, tipoConta === 'usuario' && styles.switchButtonTextSelected]}>
            Usuário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, tipoConta === 'instituicao' && styles.switchButtonSelected]}
          onPress={() => setTipoConta('instituicao')}
        >
          <Text style={[styles.switchButtonText, tipoConta === 'instituicao' && styles.switchButtonTextSelected]}>
            Instituição
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Mail color="#888" style={styles.icon} />
        <TextInput
          placeholder={tipoConta === 'usuario' ? 'Email' : 'Email ou CNPJ'}
          style={styles.input}
          value={emailOuCnpj}
          onChangeText={setEmailOuCnpj}
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock color="#888" style={styles.icon} />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
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

  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
  },
  switchButtonSelected: {
    backgroundColor: '#2E4599',
  },
  switchButtonText: {
    textAlign: 'center',
    color: '#2E4599',
    fontWeight: '600',
  },
  switchButtonTextSelected: {
    color: 'white',
  },

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
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
});
