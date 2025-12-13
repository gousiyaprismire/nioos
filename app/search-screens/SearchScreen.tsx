import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";


export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
         <Image
          source={require("../../assets/images/person.png")}
          style={styles.avatarRing}
        />

        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logoImage}
        />

        <Ionicons name="sparkles" size={18} color="#FFD369" />
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {["All", "Live", "Trending", "For you"].map(tab => (
          <View key={tab} style={styles.tabBox}>
            <Text style={styles.tabText}>{tab}</Text>
          </View>
        ))}

        <View style={styles.locationBox}>
          <Text style={styles.locationText}>Location-Based</Text>
          <Ionicons name="location" size={14} color="#FFD369" />
        </View>
      </View>

      {/* CENTER CARD */}
      <View style={styles.centerWrap}>
        <LinearGradient
          colors={["#3a0057", "#120016", "#000"]}
          style={styles.card}
        >
          {/* USER */}
          <View style={styles.userRow}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.username}>
                Sruthi Revuru{" "}
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color="#4ade80"
                />
              </Text>
              <Text style={styles.time}>2hr left</Text>
              <Text style={styles.song}>
                🎧 Song: No sign to stop · song · albums · artists
              </Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.desc}>
            🚀 Neon Neurons Pro is wild. Here’s a full website
            concept I built using this model.
          </Text>

          {/* IMAGE */}
          <Image
            source={require("../../assets/images/search1.png")}
            style={styles.image}
          />

          {/* STATS BOXES (EXACT STYLE) */}
          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Ionicons name="heart" size={18} color="#ff4d6d" />
              <Text style={styles.statValue}>13M</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#7f5af0" />
              <Text style={styles.statValue}>2456</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="eye" size={18} color="#38bdf8" />
              <Text style={styles.statValue}>20.5k</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="repeat" size={18} color="#22c55e" />
              <Text style={styles.statValue}>500</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="heart-outline" size={18} color="#aaa" />
              <Text style={styles.statValue}>Likes</Text>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#7f5af0" />
        <Ionicons name="mic" size={22} color="#aaa" />
        <Ionicons name="add-circle" size={42} color="#7f5af0" />
        
        <TouchableOpacity onPress={() => router.push("/search-screens/SearchOverlay")}>
            <Ionicons name="search" size={22} color="#aaa" />
        </TouchableOpacity>

        <Ionicons name="chatbubble" size={22} color="#aaa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
 avatarRing: {
  width: 36,
  height: 36,
  borderRadius: 18,
  borderWidth: 2,
  borderColor: "#7f5af0",
  alignItems: "center",
  justifyContent: "center",
},

avatarImage: {
  width: 28,
  height: 28,
  borderRadius: 14,
  resizeMode: "cover",
},

  logoImage: {
    width: 90,
    height: 28,
    resizeMode: "contain",
  },

  /* TABS */
  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  tabBox: {
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  tabText: {
    color: "#ddd",
    fontSize: 11,
    fontWeight: "500",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3b2a5a",
  },
  locationText: {
    color: "#FFD369",
    fontSize: 11,
    fontWeight: "500",
  },

  /* CARD */
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 20,
    padding: 14,
  },

  userRow: { flexDirection: "row", gap: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7f5af0",
  },
  username: { color: "#fff", fontWeight: "600", fontSize: 14 },
  time: { color: "#aaa", fontSize: 11 },
  song: { color: "#777", fontSize: 11 },

  desc: {
    color: "#ddd",
    marginVertical: 10,
    fontSize: 13,
    lineHeight: 18,
  },

  image: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    marginBottom: 14,
  },

  /* STATS */
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statBox: {
    width: 62,
    height: 62,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
  },

  /* ACTIONS */
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveBtn: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  saveText: { color: "#aaa", fontSize: 13 },

  uploadBtn: {
    backgroundColor: "#7f5af0",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  uploadText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#111",
  },
});
