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
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

/* MOCK DATA */
const USERS = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
  name: "Vinpaul",
  username: "@vinpaul",
}));

export default function FollowersScreen() {
  const [following, setFollowing] = useState<string[]>(["0", "1"]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  /* FOLLOW */
  const handleFollow = (id: string) => {
    setFollowing(prev => [...prev, id]);
  };

  /* UNFOLLOW */
  const handleUnfollow = () => {
    if (!selectedUser) return;
    setFollowing(prev => prev.filter(x => x !== selectedUser));
    setSelectedUser(null);
  };

  const renderItem = ({ item }: any) => {
    const isFollowing = following.includes(item.id);

    return (
      <View style={styles.row}>
        {/* PROFILE CIRCLE */}
        <LinearGradient
          colors={["#ff00ff", "#00ffff"]}
          style={styles.avatar}
        />

        {/* NAME */}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>

        {/* BUTTON */}
        {isFollowing ? (
          <TouchableOpacity
            style={styles.followingBtn}
            onPress={() => setSelectedUser(item.id)}
          >
            <Text style={styles.followingText}>Following</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => handleFollow(item.id)}
          >
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.headerTitle}>Followers</Text>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
      </View>

      {/* LIST */}
      <FlatList
        data={USERS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#777" />
        <TextInput
          placeholder="Search Followers"
          placeholderTextColor="#666"
          style={styles.searchInput}
        />
      </View>

      {/* UNFOLLOW MODAL */}
      <Modal transparent visible={!!selectedUser} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Unfollow Vinpaul?</Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setSelectedUser(null)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalUnfollow}
                onPress={handleUnfollow}
              >
                <Text style={styles.modalUnfollowText}>Unfollow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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

  followBtn: {
    borderWidth: 1,
    borderColor: "#00ffff",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
  },

  followText: {
    color: "#00ffff",
    fontSize: 12,
    fontWeight: "600",
  },

  followingBtn: {
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
  },

  followingText: {
    color: "#ccc",
    fontSize: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  searchInput: {
    color: "#fff",
    marginLeft: 8,
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#111",
    borderRadius: 16,
    width: "80%",
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },

  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalCancel: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
  },

  modalCancelText: {
    color: "#fff",
  },

  modalUnfollow: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: "center",
  },

  modalUnfollowText: {
    color: "#fff",
    fontWeight: "600",
  },
});
