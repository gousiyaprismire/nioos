import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import FinalUsernameScreen from "./finalusernamescreen";

export default function UsernameScreen() {
  const [username, setUsername] = useState("");
  const [agree, setAgree] = useState(false);
  const [goNext, setGoNext] = useState(false);

  const suggestions = ["@abcd", "@XYZ", "@lmno", "@robert", "@abc"];

  // 👉 SHOW FINAL SCREEN
  if (goNext) {
    return <FinalUsernameScreen />;
  }

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
        {/* INPUT */}
        <View style={styles.inputBox}>
          <Ionicons name="search" size={16} color="#888" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
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

        <Text style={styles.rulesTitle}>Characters That are allowed</Text>
        <Text style={styles.rules}>Lowercase letters: a-z</Text>
        <Text style={styles.rules}>Uppercase letters: A-Z</Text>
        <Text style={styles.rules}>Numbers: 0-9</Text>
        <Text style={styles.rules}>Underscore: _</Text>

        <Text style={styles.note}>
          Profile name, User Name and avatar must adhere to community Guidelines
        </Text>

        {/* CHECKBOX */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgree(!agree)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && (
              <Ionicons name="checkmark" size={12} color="#000" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            I agree to community guidelines
          </Text>
        </TouchableOpacity>
      </View>

      {/* SIGNUP BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setGoNext(true)}
      >
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

  checkboxRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 15,
},

checkbox: {
  width: 16,
  height: 16,
  borderRadius: 3,
  borderWidth: 1,
  borderColor: "#00eaff",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 8,
},

checkboxChecked: {
  backgroundColor: "#00eaff",
},

checkboxText: {
  color: "#777",
  fontSize: 11,
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
    marginBottom: 18,
    height: 45,
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
    marginBottom: 16,
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

  rulesTitle: {
    color: "#4aa3ff",
    fontSize: 12,
    marginBottom: 6,
  },

  rules: {
    color: "#777",
    fontSize: 11,
  },

  note: {
    color: "#555",
    fontSize: 10,
    marginTop: 15,
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
