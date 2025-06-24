import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useProfile } from '../context/ProfileContext';
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';

export function DrawerNavigation(props: any) {
  const navigation = useNavigation();
  const { name, image } = useProfile();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar} />
        )}
        <Text style={styles.name}>{name || 'Usuário'}</Text>
      </View>

      <DrawerItem
        label="Meu Perfil"
        icon={({ color, size }) => <Feather name="user" color={color} size={size} />}
        onPress={() => navigation.navigate('tabs/profile' as never)}
      />
      <DrawerItem
        label="Histórico"
        icon={({ color, size }) => <MaterialIcons name="history" color={color} size={size} />}
        onPress={() => navigation.navigate('tabs/historico' as never)}
      />
      <DrawerItem
        label="Contato"
        icon={({ color, size }) => <FontAwesome5 name="phone-alt" color={color} size={size} />}
        onPress={() => alert('Contato: suporte@realconnection.com')}
      />
      <DrawerItem
        label="Sobre nós"
        icon={({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} />}
        onPress={() => alert('App Real Connection v1.1.0\nProjeto educacional para equilíbrio digital.')}
      />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => <AntDesign name="logout" color={color} size={size} />}
        onPress={() => alert('Você saiu! (Funcionalidade de logout ainda não implementada)')}
      />

      <View style={styles.footer}>
        <Text style={styles.version}>Versão 1.1.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    padding: 16,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: 'gray',
  },
});
