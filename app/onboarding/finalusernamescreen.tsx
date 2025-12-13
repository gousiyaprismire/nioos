import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function FinalUsernameScreen() {
  const suggestions = ["@abcd", "@XYZ", "@lmno", "@robert", "@abc"];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.headerText}>UserName</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="search" size={16} color="#888" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </View>

        <Text style={styles.suggested}>Suggested User Names</Text>

        <View style={styles.tags}>
          {suggestions.map(item => (
            <View key={item} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomNote}>
          <Ionicons name="information-circle" size={14} color="#777" />
          <Text style={styles.noteText}>
            Profile Name, User Name and avatar must adhere to
            community Guidelines
          </Text>
        </View>
      </View>

      {/* SIGNUP BUTTON */}
      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={["#00eaff", "#ff00ff"]}
          style={styles.signupButton}
        >
          <Text style={styles.signupText}>Signup</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 16,
    flex: 1,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 18,
  },

  input: {
    color: "#fff",
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
  },

  suggested: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  tag: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    color: "#ccc",
    fontSize: 12,
  },

  bottomNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: "auto",
  },

  noteText: {
    color: "#777",
    fontSize: 11,
    marginLeft: 6,
    lineHeight: 16,
  },

  signupButton: {
    marginVertical: 25,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  signupText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
