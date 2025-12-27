import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DangerZone() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Accounts and Security</Text>

          <View style={{ width: 22 }} />
        </View>

        {/* ---------- TITLE ---------- */}
        <Text style={styles.pageTitle}>Danger Zone</Text>

        {/* ---------- DEACTIVATE ---------- */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Deactivate Account</Text>
          <Text style={styles.blockDesc}>
            Temporarily disable your profile.
          </Text>

          <TouchableOpacity>
            <Text style={styles.dangerLink}>Deactivate</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- DELETE ---------- */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Delete Account</Text>
          <Text style={styles.blockDesc}>
            Permanently remove your profile and data.
          </Text>

          <TouchableOpacity>
            <Text style={styles.dangerLink}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- FOOTER ---------- */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  pageTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 12,
  },

  /* Blocks */
  block: {
    marginBottom: 24,
  },
  blockTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  blockDesc: {
    color: "#9a9a9a",
    fontSize: 11,
    marginTop: 4,
    marginBottom: 8,
  },

  dangerLink: {
    color: "#ED4956", // Instagram red
    fontSize: 13,
    fontWeight: "600",
  },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  cancelText: {
    color: "#fff",
    fontSize: 13,
  },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  saveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
