

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

export default function AccountType() {
  const [currentType, setCurrentType] = useState<
    "Personal" | "Public" | "Business"
  >("Personal");

  const [pendingType, setPendingType] = useState<
    "Public" | "Business" | null
  >(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = (type: "Public" | "Business") => {
    setPendingType(type);
    setShowConfirm(true);
  };

  const confirmSwitch = () => {
    if (pendingType) {
      setCurrentType(pendingType);
    }
    setShowConfirm(false);
    setPendingType(null);
  };

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
          <Text style={styles.pageTitle}>Account Type</Text>

          {/* ---------- PERSONAL ---------- */}
          <AccountCard
            title="Personal Account"
            active={currentType === "Personal"}
            onPress={() => setCurrentType("Personal")}
            description="For everyday users who want a simple, private, or casual experience."
            features={[
              "Basic profile tools",
              "Standard insights",
              "Followers & following system",
              "Suitable for regular posting",
            ]}
          />

          {/* ---------- PUBLIC ---------- */}
          <AccountCard
            title="Public Account"
            active={currentType === "Public"}
            onPress={() => openConfirm("Public")}
            description="For influencers, artists, storytellers, and content creators."
            features={[
              "Advanced insights (reach, engagement, growth)",
              "Creator dashboard",
              "Voice & bio post analytics",
              "Collaboration tools",
              "Category selection",
            ]}
          />

          {/* ---------- BUSINESS ---------- */}
          <AccountCard
            title="Business Account"
            active={currentType === "Business"}
            onPress={() => openConfirm("Business")}
            description="For brands, services, and freelancers."
            features={[
              "Business analytics",
              "Promotions & ads tools",
              "Contact buttons (Call / Email)",
              "Multiple managers",
              "Product catalog (optional)",
            ]}
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {/* ---------- CONFIRM POPUP ---------- */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.dimBackground} />

          <View style={styles.popupOverlay}>
            <View style={styles.popupCard}>
              <Text style={styles.popupTitle}>
                Switch to {pendingType} Account?
              </Text>

              <Text style={styles.popupDesc}>
                Your tools and insights may change based on the account type you
                select.
              </Text>

              <View style={styles.popupActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => {
                    setShowConfirm(false);
                    setPendingType(null);
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.switchBtn}
                  onPress={confirmSwitch}
                >
                  <Text style={styles.switchText}>Switch</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- ACCOUNT CARD ---------- */
const AccountCard = ({
  title,
  description,
  features,
  active,
  onPress,
}: {
  title: string;
  description: string;
  features: string[];
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.card, active && styles.activeCard]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{description}</Text>

    <Text style={styles.featuresTitle}>Features:</Text>

    {features.map((item, index) => (
      <View key={index} style={styles.featureRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.featureText}>{item}</Text>
      </View>
    ))}
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
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 17,
  },

  card: {
    backgroundColor: "#0f0f0f",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },

  activeCard: {
    borderColor: "#202091ff",
    backgroundColor: "#111827",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  cardDesc: {
    color: "#9a9a9a",
    fontSize: 14,
    marginBottom: 10,
  },

  featuresTitle: {
    color: "#bfbfbf",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  featureRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  bullet: { color: "#bfbfbf", marginRight: 6 },

  featureText: {
    color: "#bfbfbf",
    fontSize: 14,
    flex: 1,
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
    backgroundColor: "#1c1c1e",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#202091ff",
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
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  popupActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
  },

  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },

  cancelText: {
    color: "#8e8e93",
    fontSize: 13,
  },

  switchBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2c2c2e",
  },

  switchText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
