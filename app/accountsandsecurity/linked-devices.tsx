import React, { useEffect, useState } from "react";
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
import { CameraView, useCameraPermissions } from "expo-camera";

export default function LinkedDevices() {
  const [showScanQR, setShowScanQR] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // 🔴 LOGOUT STATES (ADDED)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [logoutTarget, setLogoutTarget] = useState<
    "device" | "everywhere" | null
  >(null);

  /* CAMERA PERMISSION */
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Settings</Text>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Linked Devices</Text>

          {/* CURRENT DEVICE */}
          <Text style={styles.sectionTitle}>Current Device</Text>
          <DeviceCard
            title="Mobile: iPhone 15 Pro (Your Device)"
            details={[
              "Location: Your current city",
              "Last Active: Now",
            ]}
            action="Logout"
            onAction={() => {
              setLogoutTarget("device");
              setShowLogoutPopup(true);
            }}
          />

          {/* OTHER DEVICES */}
          <Text style={styles.sectionTitle}>Other Devices</Text>
          <DeviceCard
            title="MacBook Air / Chrome Browser"
            details={[
              "Location: Mumbai, India",
              "Last Active: 2 hours ago",
              "Login Type: App / Web",
            ]}
            action="Logout"
            onAction={() => {
              setLogoutTarget("device");
              setShowLogoutPopup(true);
            }}
          />

          {/* UNKNOWN DEVICES */}
          <Text style={styles.sectionTitle}>
            Unknown or Suspicious Devices
          </Text>
          <DeviceCard
            title="Mobile: iPhone 13 Pro (Unknown)"
            details={[
              "Location: Your current city (approx.)",
              "Last Active: Now",
            ]}
            action="Secure Account by 2FA"
          />

          {/* ADD DEVICE */}
          <Text style={styles.sectionTitle}>Add New Device</Text>
          <Text style={styles.infoText}>
            Login on another device using QR code.
          </Text>

          <TouchableOpacity
            style={styles.qrBtn}
            onPress={() => {
              setScanned(false);
              setShowScanQR(true);
            }}
          >
            <Text style={styles.qrText}>Scan QR Code</Text>
          </TouchableOpacity>

          {/* 🔴 LOG OUT EVERYWHERE */}
          <TouchableOpacity
            style={styles.logoutEverywhereRow}
            onPress={() => {
              setLogoutTarget("everywhere");
              setShowLogoutPopup(true);
            }}
          >
            <Text style={styles.logoutEverywhereText}>
              Log out everywhere
            </Text>
          </TouchableOpacity>

          <View style={{ height: 140 }} />
        </ScrollView>
      </View>

      {/* ---------- QR SCAN POPUP ---------- */}
      <Modal visible={showScanQR} transparent animationType="fade">
        <View style={styles.scanOverlay}>
          <View style={styles.scanCard}>
            <Text style={styles.scanTitle}>Scan QR</Text>

            {permission?.granted ? (
              <View style={styles.cameraBox}>
                <CameraView
                  style={StyleSheet.absoluteFill}
                  barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                  onBarcodeScanned={({ data }) => {
                    if (!scanned) {
                      setScanned(true);
                      console.log("QR Scanned:", data);
                      setShowScanQR(false);
                    }
                  }}
                />
                <View style={styles.qrFrame} />
              </View>
            ) : (
              <Text style={styles.permissionText}>
                Camera permission required
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeScanBtn}
              onPress={() => setShowScanQR(false)}
            >
              <Text style={styles.closeScanText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ---------- LOGOUT CONFIRM POPUP (ADDED) ---------- */}
      <Modal visible={showLogoutPopup} transparent animationType="fade">
        <View style={styles.logoutOverlay}>
          <View style={styles.logoutCard}>
            <Text style={styles.logoutTitle}>
              Are you sure you want to log out?
            </Text>

            <Text style={styles.logoutDesc}>
              {logoutTarget === "everywhere"
                ? "This will sign you out from all devices."
                : "This will sign you out from this device."}
            </Text>

            <View style={styles.logoutActions}>
              <TouchableOpacity
                style={styles.logoutCancelBtn}
                onPress={() => {
                  setShowLogoutPopup(false);
                  setLogoutTarget(null);
                }}
              >
                <Text style={styles.logoutCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutConfirmBtn}
                onPress={() => {
                  console.log("Logout confirmed:", logoutTarget);
                  setShowLogoutPopup(false);
                  setLogoutTarget(null);
                }}
              >
                <Text style={styles.logoutConfirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* DEVICE CARD */
const DeviceCard = ({
  title,
  details,
  action,
  onAction,
}: {
  title: string;
  details: string[];
  action: string;
  onAction?: () => void;
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {details.map((d, i) => (
      <Text key={i} style={styles.cardText}>• {d}</Text>
    ))}
    <TouchableOpacity onPress={onAction}>
      <Text style={styles.cardAction}>{action}</Text>
    </TouchableOpacity>
  </View>
);

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  pageTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 14,
  },

  sectionTitle: {
    color: "#9a9a9a",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    marginBottom: 12,
  },

  cardTitle: { color: "#fff", fontSize: 13, fontWeight: "600" },
  cardText: { color: "#bfbfbf", fontSize: 11, marginTop: 4 },
  cardAction: {
    color: "#4da3ff",
    fontSize: 12,
    marginTop: 8,
  },

  infoText: { color: "#777", fontSize: 11, marginBottom: 10 },

  qrBtn: {
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  qrText: { color: "#fff", fontSize: 13 },

  logoutEverywhereRow: { marginTop: 16 },
  logoutEverywhereText: {
    color: "#ff4d4f",
    fontSize: 13,
    fontWeight: "500",
  },

  /* SCAN POPUP */
  scanOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanCard: {
    width: "85%",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  scanTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  cameraBox: {
    width: 240,
    height: 240,
    borderRadius: 12,
    overflow: "hidden",
  },
  qrFrame: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#fff",
    width: "70%",
    height: "70%",
    alignSelf: "center",
    top: "15%",
  },
  permissionText: { color: "#fff", marginVertical: 20 },
  closeScanBtn: { marginTop: 16 },
  closeScanText: { color: "#9a9a9a", fontSize: 13 },

  /* LOGOUT POPUP */
  logoutOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutCard: {
    width: "85%",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  logoutTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  logoutDesc: {
    color: "#9a9a9a",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 18,
  },
  logoutActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutCancelBtn: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutConfirmBtn: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutCancelText: { color: "#9a9a9a", fontSize: 13 },
  logoutConfirmText: {
    color: "#ff4d4f",
    fontSize: 13,
    fontWeight: "600",
  },
});
