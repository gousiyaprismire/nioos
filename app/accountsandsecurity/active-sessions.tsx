import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ActiveSessions() {
  const [autoRemove, setAutoRemove] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "other" | "unknown" | null
  >(null);

  const [otherDevices, setOtherDevices] = useState([
    {
      id: 1,
      name: "MacBook Air / iPad / Chrome Browser",
      location: "Mumbai, India",
      lastActive: "2 hours ago",
      loginType: "App / Web",
    },
  ]);

  const [unknownDevices, setUnknownDevices] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro / Device Name",
      location: "Your current city (approx.)",
      lastActive: "Now",
    },
  ]);

  const handleRemove = () => {
    if (selectedType === "other") setOtherDevices([]);
    if (selectedType === "unknown") setUnknownDevices([]);
    setShowPopup(false);
    setSelectedType(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Active Sessions</Text>

          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* CURRENT DEVICE */}
          <Text style={styles.sectionTitle}>Current Device</Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.deviceTitle}>• Mobile:</Text>
              <Text style={styles.active}>Active</Text>
            </View>
            <Text style={styles.text}>• Model: iPhone 15 Pro / Device Name</Text>
            <Text style={styles.text}>
              • Location: Your current city (approx.)
            </Text>
            <Text style={styles.text}>• Last Active: Now</Text>
          </View>

          {/* OTHER DEVICES */}
          <Text style={styles.sectionTitle}>Other Devices</Text>

          {otherDevices.map((d) => (
            <View key={d.id} style={styles.card}>
              <Text style={styles.text}>• Device Name: {d.name}</Text>
              <Text style={styles.text}>• Location: {d.location}</Text>
              <Text style={styles.text}>• Last Active: {d.lastActive}</Text>
              <Text style={styles.text}>• Login Type: {d.loginType}</Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedType("other");
                  setShowPopup(true);
                }}
              >
                <Text style={styles.remove}>Remove Device</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* UNKNOWN DEVICES */}
          <Text style={styles.sectionTitle}>
            Unknown or Suspicious Devices
          </Text>

          {unknownDevices.map((d) => (
            <View key={d.id} style={styles.card}>
              <Text style={styles.text}>• Unknown: {d.name}</Text>
              <Text style={styles.text}>• Location: {d.location}</Text>
              <Text style={styles.text}>• Last Active: {d.lastActive}</Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedType("unknown");
                  setShowPopup(true);
                }}
              >
                <Text style={styles.remove}>Remove Device</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* AUTO REMOVE */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              Automatically Remove Old Devices
            </Text>

            <Switch
              value={autoRemove}
              onValueChange={setAutoRemove}
              trackColor={{ false: "#333", true: "#0095F6" }}
              thumbColor="#fff"
            />
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

        {/* REMOVE POPUP */}
        <Modal transparent visible={showPopup} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Remove Device</Text>

              <Text style={styles.popupText}>
                Removing this device will require verification the next time you
                log in from it.
              </Text>

              <View style={styles.popupActions}>
                <TouchableOpacity onPress={() => setShowPopup(false)}>
                  <Text style={styles.popupCancel}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRemove}>
                  <Text style={styles.popupRemove}>Remove Device</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  sectionTitle: {
    color: "#9a9a9a",
    fontSize: 14,
    marginTop: 18,
    marginBottom: 6,
  },

  card: { marginBottom: 14 },

  row: { flexDirection: "row", justifyContent: "space-between" },

  deviceTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  active: { color: "#00E676", fontSize: 13 },

  text: { color: "#9a9a9a", fontSize: 13, marginTop: 4 },

  remove: { color: "#0095F6", fontSize: 14, marginTop: 8 },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  switchText: { color: "#fff", fontSize: 15 },

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
  },
  cancelText: { color: "#fff", fontSize: 14 },

  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: "85%",
    backgroundColor: "#0e0e0e",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  popupTitle: { color: "#fff", fontSize: 17, fontWeight: "600" },

  popupText: {
    color: "#9a9a9a",
    fontSize: 14,
    marginVertical: 14,
    lineHeight: 18,
  },

  popupActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
  },

  popupCancel: { color: "#9a9a9a", fontSize: 15 },
  popupRemove: { color: "#fff", fontSize: 14, fontWeight: "600" },
});
