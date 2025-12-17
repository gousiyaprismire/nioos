export const unstable_settings = {
  headerShown: false,
};

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RadioOption = ({
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

export default function MessageCallNotifications() {
  const [messageType, setMessageType] = useState("Everyone");
  const [callType, setCallType] = useState("Everyone");
  const [reactionNotif, setReactionNotif] = useState(true);
  const [dnd, setDnd] = useState(true);


  const handleSave = async () => {
  try {
    await AsyncStorage.setItem(
      "message_call_notifications",
      JSON.stringify({
        messageType,
        callType,
        reactionNotif,
        dnd,
      })
    );

    // ✅ Redirect to Notification screen
    router.replace("/notificationscreens/notification");
  } catch (e) {
    console.log("Save failed", e);
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

      {/* MESSAGE */}
      <Text style={styles.sectionTitle}>Message Notifications</Text>
      {["Everyone", "Followers Only", "People I Follow", "No One"].map(
        (item) => (
          <RadioOption
            key={item}
            label={item}
            selected={messageType === item}
            onPress={() => setMessageType(item)}
          />
        )
      )}

      {/* CALL */}
      <Text style={styles.sectionTitle}>Call Notifications</Text>
      {["Everyone", "Followers Only", "People I Follow", "No One"].map(
        (item) => (
          <RadioOption
            key={item}
            label={item}
            selected={callType === item}
            onPress={() => setCallType(item)}
          />
        )
      )}

      {/* TOGGLES */}
      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>Reaction Notifications</Text>
        <TouchableOpacity onPress={() => setReactionNotif(!reactionNotif)}>
          <View
            style={[
              styles.toggle,
              reactionNotif && styles.toggleActive,
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>Do not Disturb</Text>
        <TouchableOpacity onPress={() => setDnd(!dnd)}>
          <View style={[styles.toggle, dnd && styles.toggleActive]} />
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
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
    fontSize: 14,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 10,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#777",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: "#00E5FF",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00E5FF",
  },

  radioText: {
    color: "#ddd",
    fontSize: 13,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  toggleText: {
    color: "#fff",
    fontSize: 14,
  },

  toggle: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#444",
  },

  toggleActive: {
    backgroundColor: "#00E5FF",
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
