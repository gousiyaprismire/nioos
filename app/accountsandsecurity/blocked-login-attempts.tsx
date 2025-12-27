import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BlockedLoginAttempts() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Blocked Login Attempts</Text>

          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* INFO TEXT */}
          <Text style={styles.info}>
            We block logins that look suspicious — wrong password attempts,
            unknown devices, unusual locations, or risky behavior.
          </Text>

          {/* CURRENT DEVICE */}
          <Text style={styles.sectionTitle}>Current Device</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.deviceTitle}>• Mobile:</Text>
              <Text style={styles.active}>Active</Text>
            </View>

            <Text style={styles.text}>
              • Model: iPhone 15 Pro / Device Name
            </Text>
            <Text style={styles.text}>
              • Location: Your current city (approx.)
            </Text>
            <Text style={styles.text}>• Last Active: Now</Text>
          </View>

          {/* OTHER DEVICES */}
          <Text style={styles.sectionTitle}>Other Devices</Text>

          <View style={styles.card}>
            <Text style={styles.text}>
              • Device Name: MacBook Air / iPad / Chrome Browser
            </Text>
            <Text style={styles.text}>• Location: Mumbai, India</Text>
            <Text style={styles.text}>• Last Active: 2 hours ago</Text>
            <Text style={styles.text}>• Login Type: App / Web</Text>

            <TouchableOpacity>
              <Text style={styles.remove}>Remove Device</Text>
            </TouchableOpacity>
          </View>

          {/* UNKNOWN DEVICES */}
          <Text style={styles.sectionTitle}>
            Unknown or Suspicious Devices
          </Text>

          <View style={styles.card}>
            <Text style={styles.text}>
              • Unknown: iPhone 15 Pro / Device Name
            </Text>
            <Text style={styles.text}>
              • Location: Your current city (approx.)
            </Text>
            <Text style={styles.text}>• Last Active: Now</Text>

            <TouchableOpacity>
              <Text style={styles.remove}>Remove Device</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
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
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  info: {
    color: "#9a9a9a",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 18,
    lineHeight: 18,
  },

  sectionTitle: {
    color: "#9a9a9a",
    fontSize: 12,
    marginBottom: 6,
  },

  card: {
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  deviceTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  active: {
    color: "#00E676",
    fontSize: 11,
  },

  text: {
    color: "#9a9a9a",
    fontSize: 11,
    marginTop: 4,
  },

  remove: {
    color: "#0095F6",
    fontSize: 12,
    marginTop: 8,
  },

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
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 13,
  },

  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
