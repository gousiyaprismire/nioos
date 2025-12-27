import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RecognizedDevices() {
  /* ---------- STATE ---------- */
  const [showRemovePopup, setShowRemovePopup] = useState(false);
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

  /* ---------- REMOVE HANDLER ---------- */
  const handleRemoveDevice = () => {
    if (selectedType === "other") {
      setOtherDevices([]);
    }

    if (selectedType === "unknown") {
      setUnknownDevices([]);
    }

    setShowRemovePopup(false);
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

          <Text style={styles.headerTitle}>Recognized Devices</Text>

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

          {otherDevices.length === 0 ? (
            <Text style={styles.empty}>No other devices</Text>
          ) : (
            otherDevices.map((device) => (
              <View key={device.id} style={styles.card}>
                <Text style={styles.text}>• Device Name: {device.name}</Text>
                <Text style={styles.text}>• Location: {device.location}</Text>
                <Text style={styles.text}>
                  • Last Active: {device.lastActive}
                </Text>
                <Text style={styles.text}>
                  • Login Type: {device.loginType}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedType("other");
                    setShowRemovePopup(true);
                  }}
                >
                  <Text style={styles.remove}>Remove Device</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {/* UNKNOWN DEVICES */}
          <Text style={styles.sectionTitle}>
            Unknown or Suspicious Devices
          </Text>

          {unknownDevices.length === 0 ? (
            <Text style={styles.empty}>No unknown devices</Text>
          ) : (
            unknownDevices.map((device) => (
              <View key={device.id} style={styles.card}>
                <Text style={styles.text}>• Unknown: {device.name}</Text>
                <Text style={styles.text}>
                  • Location: {device.location}
                </Text>
                <Text style={styles.text}>
                  • Last Active: {device.lastActive}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedType("unknown");
                    setShowRemovePopup(true);
                  }}
                >
                  <Text style={styles.remove}>Remove Device</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

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

        {/* REMOVE DEVICE POPUP */}
        <Modal transparent visible={showRemovePopup} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Remove Device</Text>

              <Text style={styles.popupText}>
                Removing this device will require verification the next time you
                log in from it.
              </Text>

              <View style={styles.popupActions}>
                <TouchableOpacity
                  onPress={() => setShowRemovePopup(false)}
                >
                  <Text style={styles.popupCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRemoveDevice}>
                  <Text style={styles.popupRemoveText}>Remove Device</Text>
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#9a9a9a",
    fontSize: 12,
    marginTop: 18,
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

  empty: {
    color: "#555",
    fontSize: 11,
    marginBottom: 10,
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

  popupTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },

  popupText: {
    color: "#9a9a9a",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
  },

  popupActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
  },

  popupCancelText: {
    color: "#9a9a9a",
    fontSize: 13,
  },

  popupRemoveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
