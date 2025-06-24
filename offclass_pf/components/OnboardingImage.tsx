import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function OnboardingImage({ imageUrl, text, isLast, onPress }: any) {
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.container}
      imageStyle={{ opacity: 0.8 }}
    >
      <View style={styles.textBox}>
        <Text style={styles.text}>{text}</Text>
        {isLast && (
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { width, height, justifyContent: "flex-end" },
  textBox: { backgroundColor: "#fff", padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  text: { fontSize: 18, fontWeight: "500", color: "#333" },
  button: { marginTop: 16, backgroundColor: "#2e4599", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
