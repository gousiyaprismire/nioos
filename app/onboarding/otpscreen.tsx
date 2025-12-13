import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VerificationScreen from "./verificationscreen";

export default function OtpScreen() {
  const [showVerification, setShowVerification] = useState(false);

  // 👉 Show verification success screen
  if (showVerification) {
    return <VerificationScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OTP Verification</Text>

      <Text style={styles.desc}>
        Enter the code to update your Mobile No.
      </Text>

      {/* OTP BOXES */}
      <View style={styles.otpRow}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.otpBox} />
        ))}
      </View>

      <Text style={styles.error}>Incorrect OTP</Text>

      {/* ✅ VERIFY OTP BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowVerification(true)}
      >
        <LinearGradient
          colors={["#00eaff", "#ff00ff"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  header: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
  },

  desc: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 15,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  otpBox: {
    width: 42,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff4444",
  },

  error: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 20,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
