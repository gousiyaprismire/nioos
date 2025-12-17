import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";

export default function NotificationScreen() {
  const [enabled, setEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
    
      {/* HEADER */}
        <View style={styles.header}>
        <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notification & Sound</Text>

        <TouchableOpacity>
            <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
        </View>


      {/* TITLE */}
      <Text style={styles.sectionTitle}>Notification & Sound Settings</Text>

      {/* APP NOTIFICATION */}
      <View style={styles.row}>
        <Text style={styles.rowText}>App Notification</Text>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          thumbColor="#fff"
          trackColor={{ false: "#444", true: "#00E5FF" }}
        />
      </View>

      {/* OPTIONS */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/notificationscreens/liveAlerts")}
        >
        <Text style={styles.optionText}>Live Alerts</Text>
        <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>


      <TouchableOpacity
        style={styles.option}
        onPress={() =>
            router.push("/notificationscreens/messageCallNotifications")
        }
        >
        <Text style={styles.optionText}>Message & Call Notifications</Text>
        <Ionicons name="chevron-forward" size={18} color="#888" />
        </TouchableOpacity>


      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.footerText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#00E5FF", "#7C4DFF", "#FF2DAA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveBtn}
        >
          <TouchableOpacity>
            <Text style={styles.footerText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

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
    paddingVertical: 12,
    paddingTop: 55,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 16,
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
    color: "#fff",
    fontSize: 14,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  optionText: {
    color: "#ddd",
    fontSize: 14,
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
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  saveBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  footerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
