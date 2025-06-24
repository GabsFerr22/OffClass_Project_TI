import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Screen1() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/onboarding2.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Transforme tempo offline em vitórias..</Text>
        <Text style={styles.description}>Conquiste metas reais, não só likes e rankings.</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/splash/onboarding/screen3')}
      >
        <ArrowRight color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.55,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E4599',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2E4599',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
});
