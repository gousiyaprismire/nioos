// REMOVE AUTO HEADER
export const unstable_settings = {
  headerShown: false,
};

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function MessageControls() {
  const [whoCanMessage, setWhoCanMessage] = useState<
    "everyone" | "followers" | "following" | "none"
  >("everyone");

  const [filterSpam, setFilterSpam] = useState(true);
  const [allowVoice, setAllowVoice] = useState(true);


  
  return (
    <View style={styles.container}>
     

      {/* CARD */}
      <View style={styles.card}>
        {/* WHO CAN MESSAGE */}
        <Text style={styles.sectionTitle}>Message Controls</Text>
        <Text style={styles.subTitle}>Who Can Message Me</Text>

        <RadioItem
          label="Everyone"
          selected={whoCanMessage === "everyone"}
          onPress={() => setWhoCanMessage("everyone")}
        />

        <RadioItem
          label="Followers Only"
          selected={whoCanMessage === "followers"}
          onPress={() => setWhoCanMessage("followers")}
        />

        <RadioItem
          label="People I Follow"
          selected={whoCanMessage === "following"}
          onPress={() => setWhoCanMessage("following")}
        />

        <RadioItem
          label="No One"
          selected={whoCanMessage === "none"}
          onPress={() => setWhoCanMessage("none")}
        />

        {/* MESSAGE REQUESTS */}
        <Text style={[styles.subTitle, { marginTop: 20 }]}>
          Message Requests
        </Text>

        <ToggleItem
          label="Filter Spam & Unsafe Messages"
          value={filterSpam}
          onChange={setFilterSpam}
        />

        <ToggleItem
          label="Allow Voice Messages"
          value={allowVoice}
          onChange={setAllowVoice}
        />
      </View>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#00ffff", "#ff00ff"]}
          style={styles.saveBtn}
        >
          <TouchableOpacity>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

/* RADIO ITEM */
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

/* TOGGLE ITEM */
const ToggleItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleText}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#333", true: "#00ffff" }}
      thumbColor="#fff"
    />
  </View>
);

/* STYLES */
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
    paddingVertical: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 20,
  },

  subTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioOuterActive: {
    borderColor: "#00ffff",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00ffff",
  },

  radioText: {
    color: "#ccc",
    fontSize: 15,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  toggleText: {
    color: "#ccc",
    fontSize: 15,
    width: "75%",
  },

  bottomRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    marginBottom: 20,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
  },

  saveBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontWeight: "700",
  },
});
