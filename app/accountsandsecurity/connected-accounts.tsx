import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ConnectedAccounts() {
  const [linkedAccounts, setLinkedAccounts] = useState([
    { name: "Google", email: "xyz@gmail.com" },
    { name: "Apple", email: "apple@icloud.com" },
  ]);

  const [showUnlinkPopup, setShowUnlinkPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{
    name: string;
    email: string;
  } | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Accounts and Security</Text>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Connected Accounts</Text>

          {/* ---------- LINKED ACCOUNTS ---------- */}
          <Text style={styles.sectionTitle}>Linked Accounts</Text>

          {linkedAccounts.map((item) => (
            <LinkedItem
              key={item.name}
              name={item.name}
              email={item.email}
              onUnlink={() => {
                setSelectedAccount(item);
                setShowUnlinkPopup(true);
              }}
            />
          ))}

          {/* ---------- LINK NEW ---------- */}
          <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
            Link a New Account
          </Text>

          <LinkItem
            name="Linked Devices"
            onPress={() => router.push("/accountsandsecurity/linked-devices")}
           />


          <LinkItem name="Google" />
          <LinkItem name="Apple" />
          <LinkItem name="Facebook" />
          <LinkItem name="Instagram" />

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {/* ---------- UNLINK CONFIRM POPUP ---------- */}
      <Modal visible={showUnlinkPopup} transparent animationType="fade">
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.dimBackground} />

          <View style={styles.popupOverlay}>
            <View style={styles.popupCard}>
              <Text style={styles.popupTitle}>
                Unlink {selectedAccount?.name} Account?
              </Text>

              <Text style={styles.popupDesc}>
                Unlinking {selectedAccount?.name} will remove it as a login.
                {"\n\n"}
                You’ll still be able to login using your email or phone number.
              </Text>

              <View style={styles.popupActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowUnlinkPopup(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.unlinkBtn}
                  onPress={() => {
                    setLinkedAccounts((prev) =>
                      prev.filter(
                        (acc) => acc.name !== selectedAccount?.name
                      )
                    );
                    setShowUnlinkPopup(false);
                    setSelectedAccount(null);
                  }}
                >
                  <Text style={styles.unlinkText}>Unlink</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
}

/* ---------- LINKED ITEM ---------- */
const LinkedItem = ({
  name,
  email,
  onUnlink,
}: {
  name: string;
  email: string;
  onUnlink: () => void;
}) => (
  <View style={styles.row}>
    <View>
      <Text style={styles.rowTitle}>{name}</Text>
      <Text style={styles.rowSub}>{email}</Text>
    </View>

    <TouchableOpacity onPress={onUnlink}>
      <Text style={styles.unlinkInline}>Unlink</Text>
    </TouchableOpacity>
  </View>
);

/* ---------- LINK ITEM ---------- */
const LinkItem = ({
  name,
  onPress,
}: {
  name: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.linkRow} onPress={onPress}>
    <Text style={styles.rowTitle}>{name}</Text>
    <Ionicons name="chevron-forward" size={16} color="#777" />
  </TouchableOpacity>
);


/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  pageTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 12,
  },

  sectionTitle: {
    color: "#9a9a9a",
    fontSize: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },

  rowTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },

  rowSub: {
    color: "#777",
    fontSize: 11,
    marginTop: 2,
  },

  unlinkInline: {
    color: "#9a9a9a",
    fontSize: 12,
  },

  /* ---------- POPUP ---------- */
  dimBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  popupCard: {
    width: "85%",
    backgroundColor: "#1c1c1e", // EXACT dark iOS look
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#3636a7ff",
  },

  popupTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },

  popupDesc: {
    color: "#bfbfbf",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 18,
    textAlign: "center",
  },

  popupActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3636a7ff",
  },

  cancelText: {
    color: "#8e8e93",
    fontSize: 13,
  },

  unlinkBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3636a7ff",
  },

  unlinkText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
