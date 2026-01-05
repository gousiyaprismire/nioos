import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,   // ✅ ADD THIS
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Modal, Animated, Dimensions, ScrollView } from "react-native";
import { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";


export default function VideoCallScreen() {

    const [showInvite, setShowInvite] = useState(false);
    const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
    ).current;

    const openInvite = () => {
    setShowInvite(true);
    Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    }).start();
    };

    const closeInvite = () => {
    Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 300,
        useNativeDriver: true,
    }).start(() => setShowInvite(false));
    };
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const people = [
    { id: 1, name: "Gousiya Kammusa", username: "Gousiya" },
    { id: 2, name: "Vinod Kumar", username: "Vinod" },
    { id: 3, name: "Bharath Reddy", username: "Bharath" },
    { id: 4, name: "Lavanya", username: "Lavanya" },
    { id: 5, name: "Rahul", username: "Rahul" },
    ];

    const filteredPeople = people.filter(
    (p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.username.toLowerCase().includes(searchText.toLowerCase())
    );
    const [videoOn, setVideoOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [speakerOn, setSpeakerOn] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([
    "Hello everyone 👋",
    "Can you hear me clearly?",
    "Video is a bit laggy on my side",
    "Give me one minute, joining properly",
    "Okay 👍 let’s start",
    ]);
    const [moreOpen, setMoreOpen] = useState(false);
    const [participantsOpen, setParticipantsOpen] = useState(false);
    const [frontCamera, setFrontCamera] = useState(true);
    const [fullScreen, setFullScreen] = useState(false);


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* TOP HEADER */}
        <View style={styles.header}>
        <TouchableOpacity>
            <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Video Call</Text>

        <TouchableOpacity>
            <Ionicons name="settings-outline" size={18} color="#fff" />
        </TouchableOpacity>
        </View>


        {/* NAME BOX */}
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>Vinod And Bharath</Text>

          <View style={styles.nameIcons}>
            <Ionicons name="videocam-outline" size={16} color="#fff" />
            <Ionicons name="call-outline" size={16} color="#fff" />
          </View>
        </View>

        {/* VIDEO BOX */}
        <View style={styles.videoContainer}>
            {videoOn ? (
                <View style={styles.videoOn}>
                <Ionicons name="videocam" size={40} color="#00f0ff" />
                <Text style={styles.videoText}>Video Connected</Text>
                </View>
            ) : (
                <View style={styles.videoOff}>
                <Ionicons name="videocam-off" size={40} color="#444" />
                <Text style={styles.videoText}>Camera Off</Text>
                </View>
            )}

          <Text style={styles.timer}>00:13:35</Text>

          {/* MINI PREVIEW */}
          <View style={styles.previewBox} />

          {/* VIDEO ACTION ICONS */}
          <View style={styles.videoActions}>
            <Feather name="refresh-ccw" size={16} color="#999" />
            <Feather name="maximize" size={16} color="#999" />
          </View>
        </View>

        {/* BOTTOM CONTROL BAR */}
        <View style={styles.controlBar}>

          <TouchableOpacity
            style={[
                styles.controlBtn,
                micOn && { backgroundColor: "#1f2d2d" },
            ]}
            onPress={() => setMicOn(!micOn)}
            >
            <Ionicons
                name={micOn ? "mic-outline" : "mic-off-outline"}
                size={20}
                color={micOn ? "#00f0ff" : "#fff"}
            />
            </TouchableOpacity>

         <TouchableOpacity
            style={[
                styles.controlBtn,
                videoOn && { backgroundColor: "#1f2d2d" },
            ]}
            onPress={() => setVideoOn(!videoOn)}
            >
            <Ionicons
                name={videoOn ? "videocam-outline" : "videocam-off-outline"}
                size={20}
                color={videoOn ? "#00f0ff" : "#fff"}
            />
            </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={openInvite}>
            <Ionicons name="call-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
                styles.controlBtn,
                speakerOn && { backgroundColor: "#1f2d2d" },
            ]}
            onPress={() => setSpeakerOn(!speakerOn)}
            >
            <Ionicons
                name={speakerOn ? "volume-high-outline" : "volume-mute-outline"}
                size={20}
                color={speakerOn ? "#00f0ff" : "#fff"}
            />
            </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setChatOpen(true)}
            >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setMoreOpen(true)}
            >
            <MaterialIcons name="more-horiz" size={20} color="#fff" />
          </TouchableOpacity>

        </View>

        {/* END CALL */}
        <View style={styles.endCallWrapper}>
        <TouchableOpacity style={styles.endCallBtn}>
            <Text style={styles.endCallText}>End Call</Text>
        </TouchableOpacity>
        </View>

      </View>

      {/* invite */}
      <Modal transparent visible={showInvite} animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={closeInvite} />

        <Animated.View style={[styles.inviteSheet, { transform: [{ translateY: slideAnim }] }]}>
    
      <View style={styles.inviteHeader}>
      <TouchableOpacity onPress={closeInvite}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.inviteTitle}>Invite People</Text>

      <TouchableOpacity onPress={() => setSearchOpen(!searchOpen)}>
        <Ionicons name="search-outline" size={20} color="#fff" />
        </TouchableOpacity>
        </View>

        {searchOpen && (
        <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color="#888" />
            <TextInput
            placeholder="Search people"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            />
        </View>
        )}

        {/* LIST */}
        <ScrollView>
        {filteredPeople.map((item) => (
        <View key={item.id} style={styles.userRow}>
            <LinearGradient
                colors={["#00f0ff", "#7f5cff", "#ff2da0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarGradient}
                >
                <View style={styles.avatarInner} />
            </LinearGradient>


            <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userSub}>{item.username}</Text>

            </View>

            <TouchableOpacity style={styles.callBtnSmall}>
                <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
            </View>
        ))}
        </ScrollView>
      </Animated.View>
    </Modal>
 
        {/* chat  */}
        <Modal visible={chatOpen} transparent animationType="slide">
        <View style={styles.chatOverlay}>
            <View style={styles.chatContainer}>

            {/* CHAT HEADER */}
            <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>Chat</Text>
                <TouchableOpacity onPress={() => setChatOpen(false)}>
                <Ionicons name="close" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* CHAT MESSAGES */}
            <ScrollView style={{ flex: 1 }}>
                {messages.map((msg, index) => (
                <View key={index} style={styles.chatBubble}>
                    <Text style={styles.chatText}>{msg}</Text>
                </View>
                ))}
            </ScrollView>

            {/* INPUT */}
            <View style={styles.chatInputRow}>
                <TextInput
                placeholder="Type a message..."
                placeholderTextColor="#777"
                value={message}
                onChangeText={setMessage}
                style={styles.chatInput}
                />
                <TouchableOpacity
                onPress={() => {
                    if (message.trim()) {
                    setMessages([...messages, message]);
                    setMessage("");
                    }
                }}
                >
                <Ionicons name="send" size={22} color="#00f0ff" />
                </TouchableOpacity>
            </View>

            </View>
        </View>
        </Modal>

        {/* PARTICIPANTS */}
        <Modal visible={participantsOpen} transparent animationType="slide">
        <View style={styles.chatOverlay}>
            <View style={styles.participantsContainer}>

            {/* HEADER */}
            <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>
                Participants ({people.length})
                </Text>
                <TouchableOpacity onPress={() => setParticipantsOpen(false)}>
                <Ionicons name="close" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* LIST */}
            <ScrollView>
                {people.map((item) => (
                <View key={item.id} style={styles.userRow}>
                    <LinearGradient
                    colors={["#00f0ff", "#7f5cff", "#ff2da0"]}
                    style={styles.avatarGradient}
                    >
                    <View style={styles.avatarInner} />
                    </LinearGradient>

                    <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userSub}>{item.username}</Text>
                    </View>

                    <Ionicons
                    name="mic-outline"
                    size={18}
                    color="#00f0ff"
                    />
                </View>
                ))}
            </ScrollView>

            </View>
        </View>
        </Modal>


        {/* Options */}
        <Modal transparent visible={moreOpen} animationType="fade">
        <TouchableOpacity
            style={styles.overlay}
            onPress={() => setMoreOpen(false)}
        />

        <View style={styles.moreMenu}>

            <TouchableOpacity
                style={styles.moreItem}
                onPress={() => {
                    setMoreOpen(false);
                    setParticipantsOpen(true);
                }}
                >
                <Ionicons name="people-outline" size={20} color="#fff" />
                <Text style={styles.moreText}>Participants</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.moreItem}>
            <Ionicons name="share-outline" size={20} color="#fff" />
            <Text style={styles.moreText}>Share Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.moreItem}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
            <Text style={styles.moreText}>Call Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.moreItem, { borderBottomWidth: 0 }]}
            onPress={() => setMoreOpen(false)}
            >
            <Ionicons name="close-outline" size={20} color="#ff4d4d" />
            <Text style={[styles.moreText, { color: "#ff4d4d" }]}>
                Close
            </Text>
            </TouchableOpacity>
        </View>
        </Modal>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },

header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 12,
  paddingTop:40,
},

headerTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "600",
},


  /* NAME BOX */
  nameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#363a3bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    textAlign:"center",
    paddingLeft:105,
  },
  videoOn: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 14,
  backgroundColor: "#060606",
},

videoOff: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 14,
  backgroundColor: "#000",
},

videoText: {
  color: "#777",
  marginTop: 8,
  fontSize: 13,
},
moreMenu: {
  position: "absolute",
  bottom: 120,
  right: 20,
  backgroundColor: "#111",
  borderRadius: 12,
  width: 200,
  paddingVertical: 6,
  borderWidth: 1,
  borderColor: "#222",
},

moreItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#222",
},

moreText: {
  color: "#fff",
  fontSize: 14,
  marginLeft: 12,
},

  nameText: {
    color: "#fff",
    fontSize: 16,
  },
  nameIcons: {
    flexDirection: "row",
    gap: 12,
  },

  /* VIDEO */
  videoContainer: {
    flex: 1,
    backgroundColor: "#050505",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#355457ff",
    padding: 10,
    marginVertical: 8,
  },
  timer: {
    alignSelf: "center",
    color: "#aaa",
    fontSize: 12,
    marginBottom: 6,
  },
  previewBox: {
    width: 70,
    height: 90,
    backgroundColor: "#111",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#355457ff",
    position: "absolute",
    bottom: 14,
    left: 14,
  },
  videoActions: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    gap: 14,
  },
  participantsContainer: {
  height: "60%",
  backgroundColor: "#000",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 14,
},


  /* CONTROL BAR */
  controlBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0d0d0d",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#363a3bff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 12,
  },
  controlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },

  /* END CALL */
endCallWrapper: {
  alignItems: "center",
  marginBottom: 18,
},

endCallBtn: {
  backgroundColor: "#ff1e1e",
  paddingHorizontal: 40,
  paddingVertical: 10,
  borderRadius: 20,
},

chatOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

chatContainer: {
  height: "55%",
  backgroundColor: "#000",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 14,
},

chatHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

chatTitle: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},

chatBubble: {
  backgroundColor: "#1a1a1a",
  padding: 10,
  borderRadius: 10,
  marginVertical: 6,
  alignSelf: "flex-start",
},

chatText: {
  color: "#fff",
  fontSize: 14,
},

chatInputRow: {
  flexDirection: "row",
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: "#222",
  paddingTop: 8,
},

chatInput: {
  flex: 1,
  color: "#fff",
  fontSize: 14,
  paddingVertical: 6,
},

endCallText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 14,
},
overlay: {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.6)",
},

inviteSheet: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "70%",
  backgroundColor: "#000",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 14,
},

inviteHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
},

inviteTitle: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
},

userRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#222",
},

avatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#333",
  marginRight: 12,
},

userName: {
  color: "#fff",
  fontSize: 14,
},

userSub: {
  color: "#888",
  fontSize: 12,
},

callBtnSmall: {
  backgroundColor: "#111",
  paddingHorizontal: 16,
  paddingVertical: 6,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#333",
},

callBtnText: {
  color: "#fff",
  fontSize: 12,
},
avatarGradient: {
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

avatarInner: {
  width: 36,          // 👈 VERY close to outer
  height: 36,
  borderRadius: 18,
  backgroundColor: "#000",
},

searchBox: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#111",
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#222",
},

searchInput: {
  flex: 1,
  color: "#fff",
  marginLeft: 8,
  fontSize: 14,
},

});
