// REMOVE AUTO HEADER
export const unstable_settings = {
  headerShown: false,
};

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useProfile } from "./ProfileContext";

export default function StoryControls() {
  const { profile, setProfile } = useProfile();

  /* LOAD FROM CONTEXT */
  const [storyAccess, setStoryAccess] = useState(
    profile.storySettings.allowStoryAccess
  );
  const [replyAccess, setReplyAccess] = useState(
    profile.storySettings.allowStoryReplies
  );
  const [allowSharing, setAllowSharing] = useState(
    profile.storySettings.allowSharing
  );
  const [saveStories, setSaveStories] = useState(
    profile.storySettings.saveStoriesAutomatically
  );

  const hideCount = profile.storySettings.hideStoryFrom.length;

  const Radio = ({ label, value, selected, onPress }: any) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress}>
      <View style={styles.radioOuter}>
        {selected === value && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  /* SAVE ALL SETTINGS */
  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      storySettings: {
        ...prev.storySettings,
        allowStoryAccess: storyAccess,
        allowStoryReplies: replyAccess,
        allowSharing,
        saveStoriesAutomatically: saveStories,
      },
    }));
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STORY CONTROLS */}
        <Text style={styles.sectionTitle}>Story Controls</Text>

        {/* ACCESS */}
        <Text style={styles.subTitle}>Allow Story Access</Text>
        <Text style={styles.desc}>
          Decide who gets access to your stories.
        </Text>

        <Radio label="Everyone" value="Everyone" selected={storyAccess} onPress={() => setStoryAccess("Everyone")} />
        <Radio label="Followers Only" value="Followers" selected={storyAccess} onPress={() => setStoryAccess("Followers")} />
        <Radio label="People I Follow" value="PeopleIFollow" selected={storyAccess} onPress={() => setStoryAccess("PeopleIFollow")} />
        <Radio label="No One" value="NoOne" selected={storyAccess} onPress={() => setStoryAccess("NoOne")} />

        {/* HIDE STORY FROM */}
        <Text style={styles.subTitle}>Hide Story From</Text>

        <TouchableOpacity
          style={styles.hideBox}
          onPress={() => router.push("/hide-story-from")}
        >
          <Text style={styles.hideText}>
            {hideCount > 0
              ? `Hidden from ${hideCount} people`
              : "Choose people"}
          </Text>
        </TouchableOpacity>

        {/* REPLIES */}
        <Text style={styles.subTitle}>Allow Story Replies</Text>
        <Text style={styles.desc}>
          Choose who can reply to your story.
        </Text>

        <Radio label="Everyone" value="Everyone" selected={replyAccess} onPress={() => setReplyAccess("Everyone")} />
        <Radio label="Followers Only" value="Followers" selected={replyAccess} onPress={() => setReplyAccess("Followers")} />
        <Radio label="People I Follow" value="PeopleIFollow" selected={replyAccess} onPress={() => setReplyAccess("PeopleIFollow")} />
        <Radio label="No One" value="NoOne" selected={replyAccess} onPress={() => setReplyAccess("NoOne")} />

        {/* TOGGLES */}
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Allow Sharing</Text>
            <Text style={styles.toggleDesc}>
              Others can share your story.
            </Text>
          </View>
          <Switch
            value={allowSharing}
            onValueChange={setAllowSharing}
            thumbColor="#fff"
            trackColor={{ true: "#00ffff", false: "#333" }}
          />
        </View>

        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>
              Save Stories Automatically
            </Text>
            <Text style={styles.toggleDesc}>
              Archive your stories.
            </Text>
          </View>
          <Switch
            value={saveStories}
            onValueChange={setSaveStories}
            thumbColor="#fff"
            trackColor={{ true: "#00ffff", false: "#333" }}
          />
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <LinearGradient colors={["#00ffff", "#ff00ff"]} style={styles.saveBtn}>
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

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 40,
  },

  subTitle: {
    color: "#ccc",
    marginTop: 18,
    fontSize: 16,
  },

  desc: {
    color: "#666",
    fontSize: 14,
    marginBottom: 8,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#8a2be2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8a2be2",
  },

  radioText: {
    color: "#ccc",
    fontSize: 13,
  },

  hideBox: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  hideText: {
    color: "#888",
    fontSize: 12,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  toggleTitle: {
    color: "#ccc",
    fontSize: 14,
  },

  toggleDesc: {
    color: "#666",
    fontSize: 11,
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 16,
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
