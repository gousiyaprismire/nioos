import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import UsernameScreen from './usernamescreen';

const interestsList = [
  "Sports",
  "Business",
  "Arts and Design",
  "Music",
  "Science",
  "Technology",
  "Health",
  "Education",
];

export default function InterestScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [goNext, setGoNext] = useState(false);

  // 👉 SHOW USERNAME SCREEN
  if (goNext) {
    return <UsernameScreen />;
  }

  const toggleInterest = (item: string) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.headerText}>Your Interests</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {interestsList.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.row}
              onPress={() => toggleInterest(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.rowText}>{item}</Text>

              <View
                style={[
                  styles.checkbox,
                  selected.includes(item) && styles.checkedBox,
                ]}
              >
                {selected.includes(item) && (
                  <Ionicons name="checkmark" size={14} color="#000" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setGoNext(true)}
      >
        <LinearGradient
          colors={["#00eaff", "#ff00ff"]}
          style={styles.nextButton}
        >
          <Text style={styles.nextText}>Next</Text>
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
    paddingVertical: 15,
    paddingHorizontal: 14,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  rowText: {
    color: "#bfbfbf",
    fontSize: 13,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#00eaff",
    alignItems: "center",
    justifyContent: "center",
  },

  checkedBox: {
    backgroundColor: "#00eaff",
  },

  nextButton: {
    marginVertical: 25,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
