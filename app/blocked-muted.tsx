// ✅ MUST BE FIRST LINE — NO IMPORTS ABOVE THIS
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

export default function BlockedMutedScreen() {
  return (
    <View style={styles.container}>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Blocked/Muted Accounts</Text>

        <SettingItem
          title="Muted Accounts"
          desc="You won’t see posts or stories from muted accounts."
          action="View Muted Accounts"
        />

        <SettingItem
          title="Restricted Accounts"
          desc="Limit interactions without fully blocking them."
          action="View Restricted Accounts"
        />

        <SettingItem
          title="Blocked List"
          desc="People you block can’t view your profile or interact with you."
          action="View Blocked List"
          last
        />
      </View>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient colors={["#00ffff", "#ff00ff"]} style={styles.saveBtn}>
          <TouchableOpacity>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

/* ITEM */
const SettingItem = ({
  title,
  desc,
  action,
  last,
}: {
  title: string;
  desc: string;
  action: string;
  last?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.row, last && { borderBottomWidth: 0 }]}
  >
    <Text style={styles.rowTitle}>{title}</Text>
    <Text style={styles.rowDesc}>{desc}</Text>
    <Text style={styles.rowAction}>{action}  ›</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
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

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
  },

  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  rowTitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 4,
  },

  rowDesc: {
    color: "#666",
    fontSize: 12,
  },

  rowAction: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 6,
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
  },
});
