import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PrivacyLock() {
  const [appLock, setAppLock] = useState(true);
  const [timeout, setTimeoutValue] = useState("5min");

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
        <Text style={styles.pageTitle}>Privacy Lock</Text>

        {/* ---------- APP LOCK ---------- */}
        <View style={styles.block}>
          <View style={styles.row}>
            <Text style={styles.blockTitle}>App Lock</Text>
            <Switch
              value={appLock}
              onValueChange={setAppLock}
              trackColor={{ false: "#333", true: "#0095F6" }}
              thumbColor="#fff"
            />
          </View>
          <Text style={styles.blockDesc}>
            Replace Face ID / Fingerprint / PIN to open the app.
          </Text>
        </View>

        {/* ---------- SESSION TIMEOUT ---------- */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Session Timeout</Text>
          <Text style={styles.blockDesc}>
            Auto-lock the app after inactivity.
          </Text>

          <RadioItem
            label="30 sec"
            selected={timeout === "30sec"}
            onPress={() => setTimeoutValue("30sec")}
          />
          <RadioItem
            label="1 min"
            selected={timeout === "1min"}
            onPress={() => setTimeoutValue("1min")}
          />
          <RadioItem
            label="5 min"
            selected={timeout === "5min"}
            onPress={() => setTimeoutValue("5min")}
          />
          <RadioItem
            label="Off"
            selected={timeout === "off"}
            onPress={() => setTimeoutValue("off")}
          />
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

/* ---------- RADIO ITEM ---------- */
const RadioItem = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);

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
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blockTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  blockDesc: {
    color: "#9a9a9a",
    fontSize: 11,
    marginTop: 6,
    maxWidth: "90%",
  },

  /* Radio */
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioOuterActive: {
    borderColor: "#8A2BE2",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8A2BE2",
  },
  radioText: {
    color: "#fff",
    fontSize: 13,
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
