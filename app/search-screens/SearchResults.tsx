import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchResults() {
  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#777" />
          <TextInput
            placeholder="Search for creators, places, videos"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HASHTAGS */}
        <Text style={styles.sectionTitle}>Hashtags</Text>
        <View style={styles.chips}>
  {["beach", "travel", "meach", "black", "calm"].map(tag => (
    <TouchableOpacity
      key={tag}
      style={styles.chip}
      onPress={() =>
        router.push({
          pathname: "/search-screens/HashtagResults",
          params: { tag },
        })
      }
    >
      <Text style={styles.chipText}>#{tag}</Text>
    </TouchableOpacity>
  ))}
</View>


        {/* TRENDING */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending For You</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        <View style={styles.categoryRow}>
          <View style={styles.categoryActive}>
            <Text style={styles.categoryTextActive}>Travel</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Nature</Text>
          </View>
        </View>

        {/* IMAGE GRID */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardLabel}>Explore Videos</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardLabel}>Explore Videos</Text>
          </View>
        </View>

        {/* POSTS / REELS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardLabel}>Reels</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }}
              style={styles.cardImage}
            />
            <Text style={styles.cardLabel}>Posts</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM GLOW */}
      <View style={styles.bottomGlow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  /* SEARCH */
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: "#222",
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },

  /* SECTIONS */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#aaa",
    fontSize: 13,
  },
  seeAll: {
    color: "#7f5af0",
    fontSize: 13,
  },

  /* CHIPS */
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
  },

  /* CATEGORIES */
  categoryRow: {
    flexDirection: "row",
    gap: 10,
  },
  categoryActive: {
    backgroundColor: "#1a0f2e",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#7f5af0",
  },
  categoryTextActive: {
    color: "#7f5af0",
    fontSize: 12,
  },
  category: {
    backgroundColor: "#0f0f0f",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  categoryText: {
    color: "#aaa",
    fontSize: 12,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  card: {
    flex: 1,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 14,
  },
  cardLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 6,
  },

  /* BOTTOM GLOW */
  bottomGlow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#000",
    shadowColor: "#7f5af0",
    shadowOpacity: 0.6,
    shadowRadius: 40,
  },
});
