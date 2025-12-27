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


export default function AccountAndSecurity() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Accounts and Security</Text>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ---------- OPTIONS ---------- */}
        <View style={styles.list}>
          <Option
            title="Account Information"
            onPress={() =>
                router.push("/accountsandsecurity/accountinformation")
            }
            />

          <Option 
          title="Security Center"
          onPress = {() => 
            router.push("/accountsandsecurity/securitycenter")
          }
          />

          <Option
            title="Privacy Lock"
            onPress={() =>
                router.push("/accountsandsecurity/privacylock")
            }
            />

          <Option 
            title="Danger Zone"
            onPress={() => 
                router.push("/accountsandsecurity/dangerzone")
            }
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

/* ---------- OPTION ROW ---------- */
const Option = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.optionText}>{title}</Text>
    <Ionicons name="chevron-forward" size={16} color="#777" />
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

  /* Options */
  list: {
    marginTop: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f0f0f",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  optionText: {
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
    backgroundColor: "#121212", // ✅ SOLID BACKGROUND (NO GRADIENT)
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  saveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
