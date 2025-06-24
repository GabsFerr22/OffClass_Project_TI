import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const formatarTelefone = (text: string) => {
    const numeros = text.replace(/\D/g, '').slice(0, 11); 
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  const formatarCPF = (text: string) => {
    const numeros = text.replace(/\D/g, '').slice(0, 11); 
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
  };

  const handleRegister = async () => {
    setErro(false);
    setMensagem('Cadastrando...');

    setTimeout(() => {
      if (nome && email && senha) {
        setMensagem('Cadastro realizado com sucesso!');
        setErro(false);
        setTimeout(() => router.replace('/auth/login-email'), 1500);
      } else {
        setErro(true);
        setMensagem('Preencha todos os campos corretamente.');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/auth/login-code')}>
        <ArrowLeft color="#2E4599" size={28} />
      </TouchableOpacity>

      <Image source={require('../../assets/logo1.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Inscreva-se</Text>

      <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="phone-pad"
        value={numero}
        onChangeText={(text) => setNumero(formatarTelefone(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(text) => setCpf(formatarCPF(text))}
      />

      {mensagem ? (
        <Text style={[styles.mensagem, erro ? styles.erro : styles.sucesso]}>
          {mensagem}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Salvar e Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 300, height: 260, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2E4599', marginBottom: 24 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
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
  mensagem: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  erro: {
    color: '#D10000',
  },
  sucesso: {
    color: '#28A745',
  },
});
