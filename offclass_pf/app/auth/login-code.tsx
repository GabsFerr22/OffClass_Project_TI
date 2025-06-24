// app/auth/escolha-login.tsx
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons'; // FontAwesome para o ícone demo

export default function EscolhaLogin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo1.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity style={styles.option} onPress={() => router.push('/auth/login-options')}>
        <MaterialCommunityIcons name="barcode-scan" size={24} color="#2E4599" style={styles.icon} />
        <Text style={styles.text}>Login usando Código Escolar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/auth/login-email')}>
        <Feather name="mail" size={22} color="#2E4599" style={styles.icon} />
        <Text style={styles.text}>Login com Email e Senha</Text>
      </TouchableOpacity>

      {/* Novo botão "Teste Demo" */}
      <TouchableOpacity style={styles.option} onPress={() => router.push('/auth/profile-setup')}>
        <FontAwesome name="user-circle" size={24} color="#2E4599" style={styles.icon} />
        <Text style={styles.text}>Teste Demo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={styles.link}>Não tem conta? Inscreva-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logo: { width: 300, height: 260, marginBottom: 40 },
  option: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginRight: 12 },
  text: { color: '#2E4599', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, color: '#2E4599', textDecorationLine: 'underline' },
});
