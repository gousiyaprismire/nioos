import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/* ---------------- DATA ---------------- */
const initialNotifications = [
  {
    id: "1",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "And 5 others liked",
    showHeart: true,
    subtitle: "your post",
  },
  {
    id: "4",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "Mentioned you in a story",
  },
  {
    id: "5",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "7",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "And 5 others liked",
    showHeart: true,
    subtitle: "your post",
  },
  {
    id: "8",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "Mentioned you in a story",
  },
  {
    id: "9",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "10",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "New Follow suggestion",
    isFollowing: true,
  },
  {
    id: "11",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "And 5 others liked",
    showHeart: true,
    subtitle: "your post",
  },
  {
    id: "12",
    name: "Sruthi Revuri",
    time: "2hr",
    title: "Mentioned you in a story",
  },
];

/* ---------------- EXACT NEON CIRCLE ---------------- */
const Avatar = () => (
  <LinearGradient
    colors={["#00E5FF", "#8A2BE2", "#FF2DAA"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.circleOuter}
  >
    <View style={styles.circleInner} />
  </LinearGradient>
);

/* ---------------- FOLLOW BUTTON ---------------- */
const FollowButton = ({
  isFollowing,
  onPress,
}: {
  isFollowing: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={isFollowing ? styles.followingBtn : styles.followBtn}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={isFollowing ? styles.followingText : styles.followText}>
      {isFollowing ? "Following" : "Follow"}
    </Text>
  </TouchableOpacity>
);

/* ---------------- SCREEN ---------------- */
export default function InstaNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleFollow = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id && item.isFollowing !== undefined
          ? { ...item, isFollowing: !item.isFollowing }
          : item
      )
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Avatar />

      <View style={styles.textWrap}>
        <Text style={styles.lineOne}>
          <Text style={styles.name}>{item.name} </Text>
          <Text style={styles.gray}>{item.time} left</Text>
        </Text>

        <Text style={styles.lineTwo}>
          {item.title}
          {item.showHeart && <Text style={styles.heart}> ❤️</Text>}
          {item.subtitle && <Text style={styles.gray}> {item.subtitle}</Text>}
        </Text>
      </View>

      {item.isFollowing !== undefined ? (
        <FollowButton
          isFollowing={item.isFollowing}
          onPress={() => toggleFollow(item.id)}
        />
      ) : (
        <View style={styles.emptyBox} />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.header}>Notification</Text>
        <Text style={styles.section}>Today</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    paddingHorizontal: 16,
  },

  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 10,
    paddingTop: 40,
  },
  section: {
    color: "#A0A0A0",
    fontSize: 13,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  /* Neon circle */
  circleOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  circleInner: {
    width: 41,
    height: 41,
    borderRadius: 20.5,
    backgroundColor: "#0B0B0B",
  },

  textWrap: {
    flex: 1,
  },
  lineOne: {
    fontSize: 12,
    color: "#B5B5B5",
  },
  lineTwo: {
    fontSize: 13,
    color: "#EAEAEA",
    marginTop: 2,
  },
  name: {
    fontWeight: "600",
    color: "#fff",
  },
  gray: {
    color: "#8C8C8C",
  },

  /* ❤️ Heart */
  heart: {
    color: "#ED4956", // Instagram red
    fontSize: 13,
  },

  /* Buttons */
  followBtn: {
    backgroundColor: "#0095F6",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 6,
  },
  followText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  followingBtn: {
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followingText: {
    color: "#EAEAEA",
    fontSize: 12,
    fontWeight: "500",
  },

  emptyBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
});
