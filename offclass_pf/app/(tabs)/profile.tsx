import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../context/ProfileContext';
import * as Animatable from 'react-native-animatable';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();
  const { image, school, name, phone, age, goalDays, goalHours } = useProfile();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const user = {
    nome: name || 'Jefferson Ferreira Mendes',
    escola: school || 'ETE Pokemon',
    telefone: phone || '+55 (00) 00000-0000',
    avatar: image ? { uri: image } : require('../../assets/avatar.png'),
    ligasTotais: '0',
    tempoForaTela: '0 Horas 0 Minutos',
    idade: age || 0,
    metaOFF: `${goalDays || 0} Dias ${goalHours || 0} Horas`,
  };

  const atividadesMock = [
    'Campanha “OFF Total” - Maio 2025',
    'Desafio: 1 Semana Sem Redes',
    'Workshop de Mindfulness - Abril',
    'Grupo de Apoio Estudantil',
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.yellowCircle} />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/auth/profile-setup')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>

        <Animatable.View animation="fadeInUp" duration={800} style={styles.avatarWrapper}>
          <Image source={user.avatar} style={styles.avatar} />
          <Text style={styles.name}>{user.nome}</Text>
          <Text style={styles.school}>{user.escola}</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} duration={800} style={styles.profileCard}>
          <InfoBox label="Telefone" value={user.telefone} />
          <InfoBox label="Idade" value={`${user.idade} anos`} />
          <InfoBox label="Meta OFF" value={user.metaOFF} />
          <InfoBox label="Ligas Totais" value={user.ligasTotais.toString()} />
          <InfoBox label="Tempo OFF" value={user.tempoForaTela} />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} duration={800} style={styles.activitiesBox}>
          <Text style={styles.activitiesTitle}>Minhas Atividades</Text>
          {atividadesMock.map((atividade, index) => (
            <Text key={index} style={styles.atividadeItem}>• {atividade}</Text>
          ))}
        </Animatable.View>

        <Animatable.Image
          animation="fadeIn"
          delay={600}
          source={require('../../assets/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ScrollView>

      <View style={styles.tabBar}>
        <TabItem icon="home-outline" label="Home" onPress={() => router.push('/(tabs)')} />
        <TabItem icon="pricetag-outline" label="Histórico" onPress={() => router.push('/(tabs)/historico')} />
        <TabItem icon="timer-outline" label="OFFTimer" onPress={() => router.push('/(tabs)/offtimer')} />
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Image source={user.avatar} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },

  yellowCircle: {
    position: 'absolute',
    top: -210,
    left: -45,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: '#FABC14',
    zIndex: -1,
  },

  scrollContent: {
    paddingBottom: 200,
  },

  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 8,
    color: '#2E4599',
  },
  school: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
  },

  profileCard: {
    paddingHorizontal: 20,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    columnGap: 12,
  },
  infoBox: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2E4599',
    marginTop: 4,
  },

  activitiesBox: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activitiesTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#2E4599',
    marginBottom: 10,
  },
  atividadeItem: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#444',
    marginBottom: 6,
  },

  logo: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2E4599',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  profileIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});
