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
const INITIAL_FOLLOWING = Array.from({ length: 6 }).map((_, i) => ({
  id: i.toString(),
  name: "Vinpaul",
  username: "@vinpaul",
  following: true,
}));

export default function FollowingScreen() {
  const [users, setUsers] = useState(INITIAL_FOLLOWING);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const openUnfollow = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmUnfollow = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id
          ? { ...u, following: false }
          : u
      )
    );
    setShowModal(false);
  };

  const followBack = (id: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, following: true } : u
      )
    );
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      {/* AVATAR */}
      <LinearGradient
        colors={["#ff00ff", "#00ffff"]}
        style={styles.avatar}
      />

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>

      {/* ACTION */}
      {item.following ? (
        <TouchableOpacity
          style={styles.followingBtn}
          onPress={() => openUnfollow(item)}
        >
          <Text style={styles.followingText}>Following</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.followBtn}
          onPress={() => followBack(item.id)}
        >
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.headerTitle}>Following</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#777" />
        <TextInput
          placeholder="Search Following"
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

      {/* UNFOLLOW MODAL */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Unfollow {selectedUser?.name}?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmUnfollow}>
                <Text style={styles.unfollowText}>Unfollow</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

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

  followingBtn: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  followingText: {
    color: "#fff",
    fontSize: 12,
  },

  followBtn: {
    backgroundColor: "#00ffff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  followText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelText: {
    color: "#aaa",
    fontSize: 13,
  },

  unfollowText: {
    color: "#ff4d4d",
    fontSize: 13,
    fontWeight: "600",
  },
});
