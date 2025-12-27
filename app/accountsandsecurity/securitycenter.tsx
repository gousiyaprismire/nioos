import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SecurityCenter() {
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [mobile, setMobile] = useState("+91");


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Accounts and Security</Text>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ---------- CONTENT ---------- */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Security Center</Text>

          {/* ---------- 2FA ---------- */}
          <ActionBlock
            title="Two-Factor Authentication (2FA)"
            desc="Add an extra verification step to protect your account."
            action="Setup Now"
            onPress={() =>
              router.push("/accountsandsecurity/two-factor-authentication")
            }
          />

          {/* ---------- LOGIN ALERTS ---------- */}
          <View style={styles.block}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.blockTitle}>Login Alerts</Text>
                <Text style={styles.blockDesc}>
                  Get notified when someone logs into your account.
                </Text>
              </View>

              <Switch
                value={loginAlerts}
                onValueChange={setLoginAlerts}
                trackColor={{ false: "#333", true: "#0095F6" }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* ---------- OTHER OPTIONS ---------- */}
          <ActionBlock
            title="Recognized Devices"
            desc="Devices you’ve logged in with previously."
            action="View Devices"
            onPress={() => router.push("/accountsandsecurity/recognized-devices")}
          />


          <ActionBlock
            title="Active Sessions"
            desc="Check and log out from other sessions."
            action="Manage Sessions"
            onPress={() =>
              router.push("/accountsandsecurity/active-sessions")
            }
          />

          <ActionBlock
            title="Blocked Login Attempts"
            desc="Suspicious login attempts that were prevented."
            action="View Attempts"
            onPress={() =>
              router.push("/accountsandsecurity/blocked-login-attempts")
            }
          />

          <ActionBlock
            title="Recovery Options"
            desc="Make sure you never lose access."
            action="Set Recovery Email / Phone"
          />

          <View style={{ height: 120 }} />
        </ScrollView>

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

/* ---------- ACTION BLOCK (TEXT BELOW) ---------- */
const ActionBlock = ({
  title,
  desc,
  action,
  onPress,
}: {
  title: string;
  desc: string;
  action: string;
  onPress?: () => void;
}) => (
  <View style={styles.block}>
    <Text style={styles.blockTitle}>{title}</Text>
    <Text style={styles.blockDesc}>{desc}</Text>

    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <Text style={styles.actionText}>{action}</Text>
      <Ionicons name="chevron-forward" size={14} color="#777" />
    </TouchableOpacity>
  </View>
);


/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 16 },

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
    marginBottom: 22,
  },
  blockTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  blockDesc: {
    color: "#9a9a9a",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
    maxWidth: "95%",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  actionText: {
    color: "#0095F6",
    fontSize: 13,
    fontWeight: "500",
    marginRight: 4,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
