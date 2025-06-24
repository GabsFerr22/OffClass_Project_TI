// historico.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProfile } from '../../context/ProfileContext';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

const mockLigas = [
  {
    id: '1',
    titulo: 'Física',
    professor: 'Alexandre de Moraes',
    imagem:
      'https://blog.mackenzie.br/wp-content/uploads/2021/11/shutterstock_1702863208-1-1024x539.jpg',
    tempoRestante: '80h',
    progresso: 30,
  },
  {
    id: '2',
    titulo: 'Matemática',
    professor: 'Carvalho',
    imagem:
      'https://d9radp1mruvh.cloudfront.net/media/challenge_img/BNCC-QUESTOES-1024x576.jpg',
    tempoRestante: '50h',
    progresso: 55,
  },
];

export default function Historico() {
  const [fontsLoaded] = useFonts({ Poppins_500Medium });
  const [abaAtiva, setAbaAtiva] = useState<'atividades' | 'ligas'>('ligas');
  const [atividades, setAtividades] = useState<any[]>([]);
  const [ligas, setLigas] = useState(mockLigas);
  const [modalVisible, setModalVisible] = useState(false);
  const [ligaSelecionada, setLigaSelecionada] = useState<any>(null);

  const router = useRouter();
  const { image } = useProfile();
  const { atividadeId } = useLocalSearchParams();

  useEffect(() => {
    carregarAtividades();
  }, []);

  useEffect(() => {
    if (atividadeId) setAbaAtiva('atividades');
  }, [atividadeId]);

  const carregarAtividades = async () => {
    const dados = await AsyncStorage.getItem('atividadesAtuais');
    if (dados) {
      setAtividades(JSON.parse(dados));
    }
  };

  const validarAtividade = async (idUnico: string) => {
    const picker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!picker.canceled) {
      const novas = atividades.map((a) =>
        a.idUnico === idUnico ? { ...a, imagemValidada: picker.assets[0].uri, validada: true } : a
      );
      setAtividades(novas);
      await AsyncStorage.setItem('atividadesAtuais', JSON.stringify(novas));
      Alert.alert('✅ Atividade Validada', 'Sua atividade foi validada com sucesso!');
    }
  };

  const abrirDetalhesLiga = (liga: any) => {
    setLigaSelecionada(liga);
    setModalVisible(true);
  };

  const renderLiga = ({ item }: any) => {
    const scale = new Animated.Value(1);
    return (
      <Animated.View style={{ transform: [{ scale }], marginBottom: 16 }}>
        <Pressable
          onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
          onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
          onPress={() => abrirDetalhesLiga(item)}
          style={styles.card}
        >
          <View>
            <Image source={{ uri: item.imagem }} style={{ width: '100%', height: 120 }} />
            <View style={styles.tempoRestante}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>{item.tempoRestante}</Text>
            </View>
          </View>
          <View style={{ padding: 12 }}>
            <Text style={{ color: '#2E4599', fontWeight: 'bold', fontSize: 16 }}>{item.titulo}</Text>
            <Text style={{ color: '#777', marginTop: 2 }}>Professor(a): {item.professor}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progresso}%` }]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#777', fontSize: 12 }}>Progresso: {item.progresso}%</Text>
              <View style={styles.botaoLiga}>
                <Text style={{ color: '#2E4599', fontWeight: 'bold', fontSize: 13 }}>ver liga →</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.topBar}>
        <Text style={styles.titulo}>Histórico</Text>
      </View>

      <View style={styles.abas}>
        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'atividades' && styles.abaAtiva]}
          onPress={() => setAbaAtiva('atividades')}
        >
          <Text style={styles.abaTexto}>Atividades Atuais</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.aba, abaAtiva === 'ligas' && styles.abaAtiva]}
          onPress={() => setAbaAtiva('ligas')}
        >
          <Text style={styles.abaTexto}>Ligas Atuais</Text>
        </TouchableOpacity>
      </View>

      {abaAtiva === 'ligas' ? (
        <FlatList
          data={ligas}
          keyExtractor={(item) => item.id}
          renderItem={renderLiga}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      ) : (
        <FlatList
          data={atividades}
          keyExtractor={(item) => item.idUnico}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => !item.validada && validarAtividade(item.idUnico)}
              style={[styles.card, item.validada && { borderColor: '#2E4599' }]}
            >
              <Image source={{ uri: item.imagem }} style={{ width: '100%', height: 140 }} />
              <View style={{ padding: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#2E4599' }}>
                  {item.titulo} {item.validada && '✅'}
                </Text>
                <Text style={{ color: '#777', marginTop: 6 }}>🎯 {item.pontos} pontos</Text>
                <Text style={{ color: '#aaa', marginTop: 4, fontSize: 12 }}>
                  {item.validada ? 'Atividade concluída' : 'Toque para validar com foto'}
                </Text>

                {item.imagemValidada && (
                  <Image
                    source={{ uri: item.imagemValidada }}
                    style={{ marginTop: 10, width: '100%', height: 140, borderRadius: 8 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>
              Nenhuma atividade atual
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {ligaSelecionada && (
              <>
                <Image
                  source={{ uri: ligaSelecionada.imagem }}
                  style={{ width: '100%', height: 150, borderRadius: 8 }}
                />
                <Text style={styles.modalTitulo}>{ligaSelecionada.titulo}</Text>
                <Text style={styles.modalProfessor}>Professor(a): {ligaSelecionada.professor}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${ligaSelecionada.progresso}%` }]} />
                </View>
                <Text style={{ color: '#777', marginBottom: 10 }}>Progresso: {ligaSelecionada.progresso}%</Text>

                <Text style={styles.modalRankingTitulo}>🏆 Ranking</Text>
                {Array.from({ length: 10 }).map((_, i) => {
                  const medalhas = ['🥇', '🥈', '🥉'];
                  return (
                    <View key={i} style={styles.rankingItem}>
                      <Text style={{ fontSize: 16 }}>
                        {i < 3 ? medalhas[i] : `${i + 1}.`}
                      </Text>
                      <Text style={{ marginLeft: 8, fontWeight: i < 3 ? 'bold' : 'normal' }}>
                        Aluno {i + 1}
                      </Text>
                      <Text style={{ marginLeft: 'auto', color: '#2E4599', fontWeight: 'bold' }}>
                        {1000 - i * 50} pts
                      </Text>
                    </View>
                  );
                })}

                <TouchableOpacity
                  style={styles.fecharModal}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.tabBar}>
        <TabItem icon="home-outline" label="Home" onPress={() => router.push('/(tabs)')} />
        <TabItem icon="pricetag-outline" label="Histórico" onPress={() => router.push('/(tabs)/historico')} />
        <TabItem icon="timer-outline" label="OFFTimer" onPress={() => router.push('/(tabs)/offtimer')} />
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Image
            source={image ? { uri: image } : require('../../assets/avatar.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabItem({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.tabLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titulo: {
    fontSize: 24,
    color: '#2E4599',
    fontWeight: 'bold',
  },
  abas: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#eee',
    borderRadius: 25,
  },
  aba: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  abaAtiva: {
    backgroundColor: '#FABC14',
  },
  abaTexto: {
    color: '#2E4599',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  tempoRestante: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2E4599',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FABC14',
    borderRadius: 3,
  },
  botaoLiga: {
    backgroundColor: '#FABC14',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2E4599',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#fff',
    marginTop: 2,
    fontFamily: 'Poppins_500Medium',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 16,
    padding: 16,
    elevation: 10,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontSize: 22,
    color: '#2E4599',
    fontWeight: 'bold',
    marginTop: 12,
  },
  modalProfessor: {
    color: '#777',
    marginBottom: 10,
  },
  modalRankingTitulo: {
    fontSize: 18,
    color: '#2E4599',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  fecharModal: {
    marginTop: 20,
    backgroundColor: '#2E4599',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
