export const unstable_settings = {
    headerShown: false,
}
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
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LiveAlerts() {
  const [liveAlerts, setLiveAlerts] = useState(true);
  const [liveStreams, setLiveStreams] = useState(true);
  const [liveQA, setLiveQA] = useState(true);
  const [primaryAlerts, setPrimaryAlerts] = useState(true);

const handleSave = async () => {
  try {
    const settings = {
      liveAlerts,
      liveStreams,
      primaryAlerts,
      liveQA,
    };

    await AsyncStorage.setItem(
      "live_alert_settings",
      JSON.stringify(settings)
    );

    router.back(); // ⬅ redirect to notification screen
  } catch (error) {
    console.error("Failed to save settings", error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notification & Sound</Text>

        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SECTION TITLE */}
      <Text style={styles.sectionTitle}>Live Alerts</Text>

      {/* TOGGLES */}
      <View style={styles.row}>
        <Text style={styles.rowText}>Live Alerts</Text>
        <Switch
          value={liveAlerts}
          onValueChange={setLiveAlerts}
          trackColor={{ false: "#444", true: "#00E5FF" }}
          thumbColor="#fff"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Live Streams</Text>
        <Switch
          value={liveStreams}
          onValueChange={setLiveStreams}
          trackColor={{ false: "#444", true: "#00E5FF" }}
          thumbColor="#fff"
        />
      </View>
      <View style={styles.row}>
  <View style={{ flex: 1 }}>
    <Text style={styles.rowText}>Primary Alerts</Text>
    <Text style={styles.subText}>
      Priority alerts for live broadcasts
    </Text>
  </View>

  <Switch
    value={primaryAlerts}
    onValueChange={setPrimaryAlerts}
    trackColor={{ false: "#444", true: "#00E5FF" }}
    thumbColor="#fff"
  />
</View>


      <View style={styles.row}>
        <View>
          <Text style={styles.rowText}>Live Q & A</Text>
          <Text style={styles.subText}>Primary Alerts</Text>
          <Text style={styles.subText}>
            Priority alerts for live broadcasts
          </Text>
        </View>
        <Switch
          value={liveQA}
          onValueChange={setLiveQA}
          trackColor={{ false: "#444", true: "#00E5FF" }}
          thumbColor="#fff"
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.footerText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient
  colors={["#00E5FF", "#7C4DFF", "#FF2DAA"]}
  style={styles.saveBtn}
>
  <TouchableOpacity onPress={handleSave}>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  rowText: {
    color: "#fff",
    fontSize: 14,
  },

  subText: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
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
