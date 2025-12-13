// ✅ THIS REMOVES THE AUTO "settings" HEADER
export const unstable_settings = {
  headerShown: false,
};

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>

      {/* PRIVACY SETTINGS CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Privacy Settings</Text>

        <SettingItem
  title="Message Controls"
  onPress={() => router.push("/message-controls")}
/>

        <SettingItem
  title="Blocked/Muted Accounts"
  onPress={() => router.push("/blocked-muted")}
/>

           <SettingItem
  title="Story Controls"
  onPress={() => router.push("/story-controls")}
/>
           <SettingItem
  title="Tagging Controls"
  onPress={() => router.push("/tagging-controls")}
/>
      </View>

     
    </View>
  );
}

/* SINGLE SETTING ROW */
const SettingItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.rowText}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#777" />
  </TouchableOpacity>
);


/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  rowText: {
    color: "#ccc",
    fontSize: 14,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    marginBottom: 20,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
    fontSize: 14,
  },

  saveBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },
});
