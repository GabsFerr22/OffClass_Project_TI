// app/(splash)/splash.tsx
import { useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace("./onboarding");
      }, 1500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/logo1.png")}
        style={[styles.logo, { opacity }]}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/logo2.png")}
        style={styles.footer}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  logo: { width: 220, height: 80 },
  footer: { position: "absolute", bottom: 20, width: 80, height: 40 },
});
