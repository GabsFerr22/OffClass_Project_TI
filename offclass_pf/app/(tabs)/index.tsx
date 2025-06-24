import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useProfile } from '../../context/ProfileContext';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';


const atividades = [
  {
    id: '1',
    titulo: 'Doação de Roupas',
    pontos: 20,
    imagem: 'https://www.jornaldafranca.com.br/wp-content/uploads/2023/06/roupa-para-doacao-freepik-scaled.jpg',
  },
  {
    id: '2',
    titulo: 'Aula de Reforço Escolar',
    pontos: 30,
    imagem: 'https://cdn.awsli.com.br/2500x2500/2425/2425359/produto/217991041/placa_refor-o_escolar_-vgeaeh9s7e.jpg',
  },
  {
    id: '3',
    titulo: 'Mutirão de Limpeza',
    pontos: 25,
    imagem: 'https://ribeiraodasneves.mg.gov.br/wp-content/uploads/2024/02/e024366fc83339fc9c4dbf30783ac11f_XL-e1708369566334.jpg',
  },
];

const categorias = ['Sort', 'Voluntariado', 'Faxina', 'Exercícios', 'Viagem'];

export default function Home() {
  const { image, name } = useProfile();
  const [lista, setLista] = useState(atividades);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
});


  if (!fontsLoaded) return null;

  const adicionarAoHistorico = async (atividade: any) => {
  try {
    const atividadesAtuais = await AsyncStorage.getItem('atividadesAtuais');
    const atividades = atividadesAtuais ? JSON.parse(atividadesAtuais) : [];

    const novaAtividade = { ...atividade, data: new Date(), idUnico: `${atividade.id}-${Date.now()}` };
    const novaLista = [...atividades, novaAtividade];
    await AsyncStorage.setItem('atividadesAtuais', JSON.stringify(novaLista));

    router.push({ pathname: '/(tabs)/historico', params: { atividadeId: novaAtividade.idUnico } });
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível salvar a atividade.');
  }
};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Início</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="account-circle" size={35} color="#2E4599" />
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#2E4599" />
        <TextInput
          placeholder="Pesquise Atividades"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriaContainer}>
        {categorias.map((item, index) => (
          <TouchableOpacity key={index} style={styles.categoriaButton}>
            <Text style={styles.categoriaText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Atividades Recentes */}
      <Text style={styles.recentTitle}>Atividades Recentes</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.points}>🎯 {item.pontos} pontos</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => adicionarAoHistorico(item)}>
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Barra de Navegação */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.tabButton}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/historico')} style={styles.tabButton}>
          <Ionicons name="pricetag-outline" size={24} color="#fff" />
          <Text style={styles.tabLabel}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/offtimer')} style={styles.tabButton}>
          <Ionicons name="timer-outline" size={24} color="#fff" />
          <Text style={styles.tabLabel}>OFFTimer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.tabButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileIcon} />
          ) : (
            <MaterialIcons name="account-circle" size={24} color="#fff" />
          )}
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  
  container: { flex: 1, backgroundColor: '#fff' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#2E4599',
    fontFamily: 'Poppins_700Bold',
  },
  profileImage: { width: 35, height: 35, borderRadius: 17.5 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: { flex: 1, padding: 8, color: '#333', fontFamily: 'Poppins_400Regular' },
  categoriaContainer: { paddingHorizontal: 16, marginBottom: 10 },
  categoriaButton: {
    backgroundColor: '#FABC14',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  categoriaText: { color: '#2E4599', fontFamily: 'Poppins_700Bold' },
  recentTitle: {
    fontSize: 18,
    color: '#2E4599',
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { width: '100%', height: 150 },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  title: { fontSize: 16, color: '#2E4599', fontFamily: 'Poppins_700Bold' },
  points: { color: '#777', marginTop: 4, fontFamily: 'Poppins_400Regular' },
  addButton: {
    backgroundColor: '#2E4599',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2E4599',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabButton: { alignItems: 'center' },
  tabLabel: { color: '#fff', fontSize: 10, marginTop: 2, fontFamily: 'Poppins_400Regular' },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
