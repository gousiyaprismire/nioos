import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* MOCK SEARCH SUGGESTIONS */
const SEARCH_DATA = [
  "Telusu Kadu Movie Reels",
  "Telusu Kadu Movie Songs",
  "Telusu Kadu Movie Scenes",
  "Telusu Kadu Movie Dialogues",
  "Telusu Kadu Trailer",
  "Telusu Kadu Review",
];

/* DEFAULT EXPLORE POSTS */
const DEFAULT_POSTS = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

const STORAGE_KEY = "RECENT_SEARCHES";

export default function SearchOverlay() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  /* LOAD RECENT SEARCHES */
  useEffect(() => {
    loadRecent();
  }, []);

  const loadRecent = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setRecent(JSON.parse(data));
  };

  /* SAVE SEARCH */
  const saveSearch = async (text: string) => {
    const updated = [text, ...recent.filter(i => i !== text)].slice(0, 6);
    setRecent(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /* REMOVE ONE SEARCH */
  const removeSearch = async (text: string) => {
    const updated = recent.filter(i => i !== text);
    setRecent(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /* CLEAR ALL */
  const clearAll = async () => {
    setRecent([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const filteredResults = SEARCH_DATA.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

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
            value={query}
            onChangeText={setQuery}
            placeholder="Search for creators, places, videos"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* DEFAULT EXPLORE */}
        {query === "" && recent.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Trending For You</Text>

            <View style={styles.grid}>
              {DEFAULT_POSTS.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.gridItem}
                  onPress={() =>
                    router.push({
                      pathname: "/search-screens/SearchResults",
                      params: { query: "Travel" },
                    })
                  }
                >
                  <Image source={{ uri: img }} style={styles.exploreImage} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* RECENT SEARCHES */}
        {query === "" && recent.length > 0 && (
          <>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearAll}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            </View>

            {recent.map(item => (
              <View key={item} style={styles.recentItem}>
                <View style={styles.recentLeft}>
                  <Ionicons name="time-outline" size={18} color="#aaa" />
                  <Text style={styles.recentText}>{item}</Text>
                </View>

                <TouchableOpacity onPress={() => removeSearch(item)}>
                  <Ionicons name="close" size={18} color="#777" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* LIVE SEARCH RESULTS */}
        {query.length > 0 &&
          filteredResults.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.resultItem}
              onPress={() => {
                saveSearch(item);
                router.push({
                  pathname: "/search-screens/SearchResults",
                  params: { query: item },
                });
              }}
            >
              <Ionicons name="search" size={16} color="#777" />
              <Text style={styles.resultText}>{item}</Text>
            </TouchableOpacity>
          ))}

        <View style={{ height: 120 }} />
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
    fontSize: 14,
    marginLeft: 6,
  },

  sectionTitle: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 10,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
  },
  exploreImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
  },

  /* RECENT */
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  clearText: {
    color: "#7f5af0",
    fontSize: 13,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  recentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  recentText: {
    color: "#fff",
    fontSize: 14,
  },

  /* RESULTS */
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  resultText: {
    color: "#ccc",
    fontSize: 14,
  },

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
