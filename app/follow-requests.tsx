// REMOVE AUTO HEADER (VERY IMPORTANT)
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

/* MOCK DATA */
const INITIAL_REQUESTS = Array.from({ length: 5 }).map((_, i) => ({
  id: i.toString(),
  name: "Vinpaul",
  username: "@vinpaul",
}));

export default function FollowRequests() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const acceptRequest = (id: string) => {
    setAccepted(prev => [...prev, id]);
  };

  const removeRequest = (id: string) => {
    setRequests(prev => prev.filter(item => item.id !== id));
  };

  const filtered = requests.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    const isAccepted = accepted.includes(item.id);

    return (
      <View style={styles.row}>
        {/* PROFILE RING */}
        <LinearGradient
          colors={["#ff00ff", "#00ffff"]}
          style={styles.avatar}
        />

        {/* USER INFO */}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>

        {/* ACCEPT / REMOVE */}
        {!isAccepted ? (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => acceptRequest(item.id)}
          >
            <Text style={styles.actionText}>Accept</Text>
            <Ionicons name="close" size={12} color="#777" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => removeRequest(item.id)}
          >
            <Text style={styles.actionText}>Remove</Text>
            <Ionicons name="close" size={12} color="#777" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* SINGLE HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Follow Requests</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* SEARCH BAR (TOP, NO MIC) */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#777" />
        <TextInput
          placeholder="Search Followers"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
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

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
  },

  /* ROW */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },

  name: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  username: {
    color: "#777",
    fontSize: 12,
  },

  /* BUTTON */
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#111",
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
  },
});
