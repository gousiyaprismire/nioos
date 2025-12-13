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
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useProfile } from "./ProfileContext";

/* MOCK DATA */
const USERS = Array.from({ length: 7 }).map((_, i) => ({
  id: i.toString(),
  name: "Vinpaul",
  username: "@vinpaul",
}));

export default function HideStoryFrom() {
  const { profile, setProfile } = useProfile();

  // ✅ LOAD FROM CONTEXT (IMPORTANT)
  const [selected, setSelected] = useState<string[]>(
    profile.storySettings.hideStoryFrom
  );
  const [search, setSearch] = useState("");

  const toggleUser = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ SAVE TO CONTEXT (THIS WAS MISSING)
  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      storySettings: {
        ...prev.storySettings,
        hideStoryFrom: selected,
      },
    }));
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Hide Story From</Text>
        <Text style={styles.count}>
          ({selected.length}) Selected
        </Text>
      </View>

      <Text style={styles.subText}>
        Select people who shouldn’t see your story.
      </Text>

      {/* SELECTED CHIPS */}
      <View style={styles.chipsRow}>
        {selected.map(id => (
          <View key={id} style={styles.chip}>
            <Text style={styles.chipText}>@user{id}</Text>
            <Ionicons name="close" size={12} color="#999" />
          </View>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isChecked = selected.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.userRow}
              onPress={() => toggleUser(item.id)}
            >
              <LinearGradient
                colors={["#ff00ff", "#00ffff"]}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userHandle}>{item.username}</Text>
              </View>

              <View
                style={[
                  styles.checkbox,
                  isChecked && styles.checkboxActive,
                ]}
              >
                {isChecked && (
                  <Ionicons name="checkmark" size={14} color="#000" />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#666" />
        <TextInput
          placeholder="Search for Follower, Following"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#00ffff", "#ff00ff"]}
          style={styles.saveBtn}
        >
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  count: {
    color: "#aaa",
    fontSize: 12,
  },

  subText: {
    color: "#666",
    fontSize: 12,
    marginVertical: 8,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#111",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  chipText: {
    color: "#ccc",
    fontSize: 12,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },

  userName: {
    color: "#fff",
    fontSize: 14,
  },

  userHandle: {
    color: "#666",
    fontSize: 12,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxActive: {
    backgroundColor: "#00ffff",
    borderColor: "#00ffff",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 12,
  },

  searchInput: {
    color: "#fff",
    marginLeft: 8,
    flex: 1,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
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
