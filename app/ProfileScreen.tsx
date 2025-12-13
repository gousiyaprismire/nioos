import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useProfile } from "./ProfileContext";

export default function ProfileScreen() {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState<"reels" | "posts" | "drafts">(
    "reels"
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* LEFT PROFILE ICON */}
        <TouchableOpacity onPress={() => router.push("/edit-profile")}>
          {profile.photo ? (
            <Image source={{ uri: profile.photo }} style={styles.headerAvatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          )}
        </TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.headerTitle}>Profile</Text>

        {/* RIGHT SETTINGS */}
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PROFILE CIRCLE */}
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={["#ff00ff", "#00ffff"]}
          style={styles.ring}
        >
          {profile.photo ? (
            <Image source={{ uri: profile.photo }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarInner} />
          )}
        </LinearGradient>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push("/edit-profile")}
        >
          <Ionicons name="pencil" size={14} color="#000" />
        </TouchableOpacity>
      </View>

      {/* PROFILE INFO */}
      <Text style={styles.username}>
        {profile.name?.trim() || "LUNA. TECHIE"}
      </Text>

      <Text style={styles.bio}>
        {profile.bio?.trim() ||
          "Pioneer in AI-Driven Music & digital\nart. Building the Future of soundscapes"}
      </Text>

      <Text style={styles.pronouns}>
        {profile.pronouns?.trim() || "she/her"}
      </Text>

      {/* ONLINE */}
      <View style={styles.onlineRow}>
        <View style={styles.dot} />
        <Text style={styles.onlineText}>Online</Text>
        <Ionicons name="share-social-outline" size={16} color="#fff" />
      </View>

      {/* STATS */}
      <View style={styles.statsBox}>
        <TouchableOpacity
            onPress={() => router.push("/followers")}
            style={{ alignItems: "center" }}
            >
            <Text style={styles.statValue}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>


        <TouchableOpacity
            onPress={() => router.push("/following")}
            style={{ alignItems: "center" }}
            >
            <Text style={styles.statValue}>280</Text>
            <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => router.push("/follow-requests")}
            style={{ alignItems: "center" }}
            >
            <Text style={styles.statValue}>280</Text>
            <Text style={styles.statLabel}>Follow Requests</Text>
            </TouchableOpacity>
            
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {["reels", "posts", "drafts"].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
            <Text
              style={
                activeTab === tab ? styles.activeTab : styles.inactiveTab
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TAB CONTENT */}
      <View style={styles.tabContent}>
        {activeTab === "reels" && (
          <AddBox icon="videocam" title="Add your first Reel" btn="Create Reel" />
        )}

        {activeTab === "posts" && (
          <AddBox icon="image" title="Add your first Post" btn="Create Post" />
        )}

        {activeTab === "drafts" && (
          <AddBox
            icon="document-text"
            title="No drafts yet"
            btn="Create Draft"
          />
        )}
      </View>
    </View>
  );
}

/* COMPONENTS */
const Stat = ({ value, label }: any) => (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AddBox = ({ icon, title, btn }: any) => (
  <View style={styles.addBox}>
    <Ionicons name={icon} size={42} color="#555" />
    <Text style={styles.addTitle}>{title}</Text>
    <TouchableOpacity style={styles.addBtn}>
      <Text style={styles.addBtnText}>{btn}</Text>
    </TouchableOpacity>
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

  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  avatarWrapper: {
    width: 140,
    height: 140,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },

  ring: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInner: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#111",
  },

  avatarImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },

  editBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 14,
  },

  bio: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  pronouns: {
    color: "#777",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00ff6a",
  },

  onlineText: {
    color: "#00ff6a",
    fontSize: 12,
  },

  statsBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
  },

  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  statLabel: {
    color: "#777",
    fontSize: 11,
    marginTop: 4,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    marginTop: 30,
  },

  activeTab: {
    color: "#fff",
    fontWeight: "600",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingBottom: 6,
  },

  inactiveTab: {
    color: "#666",
  },

  tabContent: {
    marginTop: 40,
    alignItems: "center",
  },

  addBox: {
    alignItems: "center",
    backgroundColor: "#111",
    padding: 30,
    borderRadius: 16,
    width: "90%",
  },

  addTitle: {
    color: "#aaa",
    marginTop: 12,
    fontSize: 14,
  },

  addBtn: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  addBtnText: {
    color: "#000",
    fontWeight: "600",
  },
});
