import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useProfile } from '../../context/ProfileContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export default function OFFTimer() {
  const { image, name } = useProfile();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (intervalRef.current) return; // evita múltiplos timers
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        const updated = prev + 1;
        sendNotification(formatTime(updated));
        return updated;
      });
    }, 1000);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const sendNotification = async (formattedTime: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tempo OFF em andamento ⏳',
        body: `Você está OFF há ${formattedTime}`,
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="#2E4599" />
        <Text style={styles.title}>OFFTimer</Text>
        <View style={styles.profile}>
          <Text style={styles.profileName}>{name || 'Usuário'}</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={32} color="#2E4599" />
          )}
        </View>
      </View>

      {/* Conteúdo */}
      <Text style={styles.subtitle}>Defina um Tempo OFF</Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={startTimer}>
        <Text style={styles.buttonText}>Definir</Text>
      </TouchableOpacity>

      {/* TabBar fixa */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="pricetag-outline" size={24} color="#fff" />
          <Text style={styles.tabText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="timer" size={24} color="#fff" />
          <Text style={styles.tabText}>OFFTimer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permissão para notificações foi negada.');
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2E4599' },
  profile: { flexDirection: 'row', alignItems: 'center' },
  profileName: { marginRight: 8, color: '#2E4599', fontWeight: 'bold' },
  profileImage: { width: 35, height: 35, borderRadius: 17.5 },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginVertical: 30,
    fontWeight: 'bold',
  },

  timerBox: {
    backgroundColor: '#2E4599',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#FABC14',
    alignSelf: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: { color: '#2E4599', fontWeight: 'bold', fontSize: 16 },

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
  tabItem: { alignItems: 'center' },
  tabText: { color: '#fff', fontSize: 10, marginTop: 2 },
});
