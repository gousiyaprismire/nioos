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
  Switch,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useProfile } from "./ProfileContext";

/* ---------- TYPES ---------- */
type AccessType = "Everyone" | "Followers" | "PeopleIFollow" | "NoOne";

export default function TaggingControls() {
  const { profile, setProfile } = useProfile();

  /* LOAD FROM CONTEXT */
  const [whoCanTag, setWhoCanTag] = useState<AccessType>(
    profile.taggingSettings.whoCanTag
  );
  const [whoCanMention, setWhoCanMention] = useState<AccessType>(
    profile.taggingSettings.whoCanMention
  );
  const [reviewTags, setReviewTags] = useState<boolean>(
    profile.taggingSettings.reviewTags
  );

  /* RADIO COMPONENT */
  const Radio = ({
    label,
    value,
    selected,
    onPress,
  }: {
    label: string;
    value: AccessType;
    selected: AccessType;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress}>
      <View style={styles.radioOuter}>
        {selected === value && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  /* SAVE SETTINGS */
  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      taggingSettings: {
        whoCanTag,
        whoCanMention,
        reviewTags,
      },
    }));

    // ✅ Redirect back to Settings screen
    router.replace("/settings");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TAGGING CONTROLS */}
        <Text style={styles.sectionTitle}>Tagging Controls</Text>
        <Text style={styles.desc}>
          Control who is allowed to tag you in posts.
        </Text>

        <Radio
          label="Everyone"
          value="Everyone"
          selected={whoCanTag}
          onPress={() => setWhoCanTag("Everyone")}
        />
        <Radio
          label="Followers Only"
          value="Followers"
          selected={whoCanTag}
          onPress={() => setWhoCanTag("Followers")}
        />
        <Radio
          label="People I Follow"
          value="PeopleIFollow"
          selected={whoCanTag}
          onPress={() => setWhoCanTag("PeopleIFollow")}
        />
        <Radio
          label="No One"
          value="NoOne"
          selected={whoCanTag}
          onPress={() => setWhoCanTag("NoOne")}
        />

        {/* MENTIONS */}
        <Text style={styles.sectionTitle}>Who Can Mention Me</Text>
        <Text style={styles.desc}>
          Choose who can mention your username in posts or comments.
        </Text>

        <Radio
          label="Everyone"
          value="Everyone"
          selected={whoCanMention}
          onPress={() => setWhoCanMention("Everyone")}
        />
        <Radio
          label="Followers Only"
          value="Followers"
          selected={whoCanMention}
          onPress={() => setWhoCanMention("Followers")}
        />
        <Radio
          label="People I Follow"
          value="PeopleIFollow"
          selected={whoCanMention}
          onPress={() => setWhoCanMention("PeopleIFollow")}
        />
        <Radio
          label="No One"
          value="NoOne"
          selected={whoCanMention}
          onPress={() => setWhoCanMention("NoOne")}
        />

        {/* TAG REVIEW */}
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Tag Review</Text>
            <Text style={styles.toggleDesc}>
              Review tags before they appear on your profile.
            </Text>
          </View>
          <Switch
            value={reviewTags}
            onValueChange={setReviewTags}
            thumbColor="#fff"
            trackColor={{ true: "#00ffff", false: "#333" }}
          />
        </View>

        <Text style={styles.pendingText}>Pending Tags</Text>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.replace("/settings")}
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

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
  },

  desc: {
    color: "#666",
    fontSize: 13,
    marginBottom: 10,
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
    fontSize: 14,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  toggleTitle: {
    color: "#ccc",
    fontSize: 15,
  },

  toggleDesc: {
    color: "#666",
    fontSize: 11,
    marginTop: 2,
  },

  pendingText: {
    color: "#666",
    fontSize: 13,
    marginTop: 16,
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
