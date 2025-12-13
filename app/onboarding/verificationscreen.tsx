import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  headerShown: false,
};

export default function VerificationScreen() {
  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* CARD */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={["#0f0f0f", "#2b003d", "#001f2e"]}
          style={styles.card}
        >
          {/* CHECK ICON */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={40} color="#0f0" />
          </View>

          <Text style={styles.title}>Verification Successful</Text>
          <Text style={styles.subtitle}>
            Your account has been verified successfully
          </Text>
        </LinearGradient>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  cardWrapper: {
    width: "85%",
    borderRadius: 20,
    shadowColor: "#8f00ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },

  card: {
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#00ff99",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
});
