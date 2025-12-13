import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useProfile } from "./ProfileContext";

export default function EditProfile() {
  const { profile, setProfile } = useProfile();

  /* PROFILE STATES */
  const [username, setUsername] = useState(profile.username);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [pronouns, setPronouns] = useState(profile.pronouns);
  const [gender, setGender] = useState(profile.gender);
  const [category, setCategory] = useState(profile.category);
  const [photo, setPhoto] = useState<string | null>(profile.photo);

  /* LINKS STATE */
  const [links, setLinks] = useState<string[]>(profile.links || []);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [newLink, setNewLink] = useState("");

  const [showPhotoModal, setShowPhotoModal] = useState(false);

  /* IMAGE PICKERS */
  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.canceled) {
      setPhoto(res.assets[0].uri);
      setShowPhotoModal(false);
    }
  };

  const pickFromGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.canceled) {
      setPhoto(res.assets[0].uri);
      setShowPhotoModal(false);
    }
  };

  /* SAVE PROFILE */
  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      username: username.trim() || prev.username,
      name: name.trim() || prev.name,
      bio: bio.trim() || prev.bio,
      pronouns: pronouns.trim() || prev.pronouns,
      gender: gender.trim() || prev.gender,
      category,
      photo,
      links, // ✅ SAVE LINKS
    }));
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#000" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* PROFILE PHOTO */}
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => setShowPhotoModal(true)}
        >
          <LinearGradient colors={["#ff00ff", "#00ffff"]} style={styles.ring}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.addPhotoText}>Add Photo</Text>
            )}
          </LinearGradient>

          <View style={styles.editIcon}>
            <Ionicons name="pencil" size={14} color="#000" />
          </View>
        </TouchableOpacity>

        {/* INPUTS */}
        <TextInput
          style={styles.input}
          value={username}
          placeholder="@ vinpaul"
          placeholderTextColor="#666"
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          placeholderTextColor="#666"
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          value={bio}
          placeholder="✨ Bio"
          placeholderTextColor="#666"
          multiline
          onChangeText={setBio}
        />

        <TextInput
          style={styles.input}
          value={pronouns}
          placeholder="Pronouns"
          placeholderTextColor="#666"
          onChangeText={setPronouns}
        />

        <TextInput
          style={styles.input}
          value={gender}
          placeholder="Female"
          placeholderTextColor="#666"
          onChangeText={setGender}
        />

        {/* CATEGORY */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryRow}>
          {["Custom", "Creator", "Developer"].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryChip,
                category === item && styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ADD LINK */}
        <TouchableOpacity onPress={() => setShowLinkModal(true)}>
          <Text style={styles.linkText}>Add Link  +</Text>
        </TouchableOpacity>

        {links.map((link, i) => (
          <Text key={i} style={styles.subText}>
            {link}
          </Text>
        ))}

        {/* BUTTONS */}
        <View style={styles.btnRow}>
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
      </ScrollView>

      {/* PHOTO MODAL */}
      <Modal transparent visible={showPhotoModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={openCamera}>
              <Text style={styles.modalText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickFromGallery}>
              <Text style={styles.modalText}>Upload From Gallery</Text>
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                  setShowPhotoModal(false);
                }}
              >
                <Text style={styles.deleteText}>Delete Profile Picture</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setShowPhotoModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ADD LINK MODAL */}
      <Modal transparent visible={showLinkModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Link</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter URL"
              placeholderTextColor="#666"
              value={newLink}
              onChangeText={setNewLink}
            />

            <View style={styles.linkBtnRow}>
              <TouchableOpacity
                onPress={() => {
                  setShowLinkModal(false);
                  setNewLink("");
                }}
              >
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (!newLink.trim()) return;
                  setLinks(prev => [...prev, newLink.trim()]);
                  setNewLink("");
                  setShowLinkModal(false);
                }}
              >
                <Text style={styles.modalAdd}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  avatarWrapper: {
    alignSelf: "center",
    marginVertical: 20,
    position: "relative",
  },

  ring: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImage: { width: 118, height: 118, borderRadius: 59 },

  addPhotoText: { color: "#bbb" },

  editIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 12,
  },

  sectionTitle: { color: "#aaa", marginBottom: 8 },

  categoryRow: { flexDirection: "row", gap: 10, marginBottom: 12 },

  categoryChip: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  categoryActive: { borderColor: "#ff00ff" },

  categoryText: { color: "#777" },

  categoryTextActive: { color: "#fff" },

  linkText: { color: "#aaa", marginTop: 8 },

  subText: { color: "#555", fontSize: 12 },

  btnRow: { flexDirection: "row", gap: 12, marginTop: 24 },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: { color: "#fff" },

  saveBtn: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
  },

  saveText: { color: "#000", fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#111",
    width: "80%",
    borderRadius: 14,
    padding: 16,
  },

  modalText: { color: "#ccc", paddingVertical: 10 },

  deleteText: { color: "#ff4d4d", paddingVertical: 10 },

  modalCancel: { color: "#aaa", paddingTop: 10 },

  modalTitle: { color: "#fff", fontSize: 16, marginBottom: 12 },

  modalInput: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    marginBottom: 20,
  },

  linkBtnRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },

  modalAdd: { color: "#00ffff", fontWeight: "600" },
});
