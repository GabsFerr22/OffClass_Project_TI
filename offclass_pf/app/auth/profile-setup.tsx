import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useProfile } from '../../context/ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileSetup() {
  const {
    image,
    setImage,
    school,
    setSchool,
    name,
    setName,
    setPhone,
    setAge,
    setGoalDays,
    setGoalHours,
  } = useProfile();

  const [selectedSchool, setSelectedSchool] = useState(school);
  const [customSchool, setCustomSchool] = useState('');
  const [inputName, setInputName] = useState(name);
  const [phone, setPhoneInput] = useState('');
  const [age, setAgeInput] = useState('');
  const [goalDays, setGoalDaysInput] = useState('');
  const [goalHours, setGoalHoursInput] = useState('');
  const avatarAnim = useRef(new Animated.Value(0)).current;

  const schools = [
    'Escola Técnica Estadual Pokemon da Silva',
    'Colégio Federal Professora Ivana T.',
    'Instituto de Ciência e Magia do Interior',
    'Faculdade de Engenharia de Software de Kanto',
    'Universidade de Psicologia de Pallet',
    'Instituto Federal de Alola',
    'Outra (Personalizado)',
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 11);
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
    return cleaned;
  };

  const handleSubmit = () => {
    if (!selectedSchool || !inputName.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    setSchool(selectedSchool === 'Outra (Personalizado)' ? customSchool : selectedSchool);
    setName(inputName.trim());
    setPhone(formatPhone(phone));
    setAge(Number(age));
    setGoalDays(Number(goalDays));
    setGoalHours(Number(goalHours));
    router.push('/(tabs)/profile');
  };

  useEffect(() => {
    Animated.spring(avatarAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient
          colors={['#2E4599', '#6C88D9']}
          style={styles.header}
        >
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
            <Animated.View style={{ transform: [{ scale: avatarAnim }] }}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>+</Text>
                </View>
              )}
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.card}>
          <TextInput
            placeholder="Digite seu nome"
            value={inputName}
            onChangeText={setInputName}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedSchool} onValueChange={(val) => setSelectedSchool(val)}>
              <Picker.Item label="Selecione sua escola/faculdade" value="" />
              {schools.map((school, i) => (
                <Picker.Item key={i} label={school} value={school} />
              ))}
            </Picker>
          </View>

          {selectedSchool === 'Outra (Personalizado)' && (
            <TextInput
              placeholder="Digite sua escola personalizada"
              value={customSchool}
              onChangeText={setCustomSchool}
              style={styles.input}
              placeholderTextColor="#888"
            />
          )}

          <TextInput
            placeholder="Telefone"
            value={formatPhone(phone)}
            onChangeText={(text) => setPhoneInput(text.replace(/\D/g, ''))}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#888"
            maxLength={15}
          />

          <TextInput
            placeholder="Idade"
            value={age}
            onChangeText={(text) => setAgeInput(text.replace(/\D/g, ''))}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#888"
          />

          <View style={styles.goalRow}>
            <TextInput
              placeholder="Meta OFF (dias)"
              value={goalDays}
              onChangeText={(text) => setGoalDaysInput(text.replace(/\D/g, ''))}
              keyboardType="numeric"
              style={[styles.input, styles.goalInput]}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Horas"
              value={goalHours}
              onChangeText={(text) => setGoalHoursInput(text.replace(/\D/g, ''))}
              keyboardType="numeric"
              style={[styles.input, styles.goalInput]}
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar e Continuar!</Text>
          </TouchableOpacity>
        </View>

        <Image source={require('../../assets/logo1.png')} style={styles.logoFooter} resizeMode="contain" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  avatarWrapper: {
    marginTop: 8,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: '#2E4599',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2E4599',
    borderRadius: 20,
    padding: 6,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    marginTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2E4599',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#2E4599',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  goalInput: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#2E4599',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoFooter: {
    width: 160,
    height: 80,
    marginTop: 20,
  },
});
