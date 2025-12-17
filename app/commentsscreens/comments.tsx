import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Share } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";



/* ---------- MENTION USERS (ADDED) ---------- */
const MENTION_USERS = [
  "Gousiya",
  "Lavanya",
  "VinPaul",
  "Samantha",
  "John",
  "Rahul",
  "Ananya",
];

/* ---------- EMOJIES & STICKERS (ADDED) ---------- */
const EMOJIES = [
  // 😀 Smileys & Faces
  "😀","😃","😄","😁","😆","😅","😂","🤣","🥹","😊",
  "🙂","😉","😌","😍","🥰","😘","😗","😙","😚","🤗",
  "🤩","😎","🥳","😏","😒","😞","😔","😢","😭","😤",
  "😡","🤬","😱","😨","😰","😓","😴","🤤","🤯","😵",
  "🙄","😬","🤔","😐","😑","😶","😮","😲","😳","🥴",

  // ❤️ Hearts & Love
  "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎",
  "💕","💞","💓","💗","💖","💘","💝","💟","❣️",

  // 👍 Gestures & Hands
  "👍","👎","👌","✌️","🤞","🤟","🤘","👏","🙌","🫶",
  "🤲","🙏","👊","✊","🤛","🤜","🫰","✋","🤚","🖐️",

  // 🔥 Reactions & Social
  "🔥","💯","💥","✨","⚡","🎯","🚀","🎉","🎊","🥇",
  "🏆","📈","📉","💎","💣","🧠","👀","🫡",

  // 😂 Fun & Expressions
  "😹","🙃","😜","😝","🤪","🤡","👻","💀","☠️","👽",
  "🤖","🎃","😺","😸","😻","😼","😽","🙀","😿","😾",

  // 🌈 Stickers / Objects
  "🌈","☀️","🌙","⭐","🌟","⚡","🔥","❄️","☕","🍕",
  "🍔","🍟","🍩","🎂","🍿","🥂","🍻","🎁","🎈","🎀",

  // 🎵 Creative / Extra
  "🎵","🎶","🎧","📸","🎬","🎮","🎨","🖌️","📌","📍",
];


/* ---------- TYPES ---------- */
type Reply = {
  id: number;
  name: string;
  time: string;
  text: string;
  liked: boolean;
  likes: number;
};

type Comment = {
  id: number;
  name: string;
  time: string;
  text: string;
  liked: boolean;
  likes: number;
  replies: Reply[];
  userAction?: "reported" | "muted" | "restricted" | "blocked"; // ⭐ ADD
  pinned?: boolean; // ⭐ ADD
  audioUri?: string;  
};
React.useEffect(() => {
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
  });
}, []);


/* ---------- ACTION ---------- */
type ActionProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
};

const Action: React.FC<ActionProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.iconItem} onPress={onPress}>
    {icon}
    <Text style={styles.iconText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- AVATAR ---------- */
const GradientAvatar = ({ size = 36 }: { size?: number }) => (
  <LinearGradient
    colors={["#00E5FF", "#7C4DFF", "#FF2DAA"]}
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      padding: 2,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: "100%",
        height: "100%",
        borderRadius: size,
        backgroundColor: "#0b0b0b",
      }}
    />
  </LinearGradient>
);

export default function CommentsScreen() {
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{
    commentId: number;
    username: string;
      } | null>(null);
      const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
      const [activeFilter, setActiveFilter] = useState<
      "top" | "newest" | "favourite" | "pinned"
    >("top");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);


  

  /* ---------- MENTION STATE ---------- */
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [showAttachSheet, setShowAttachSheet] = useState(false);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "VINPAUL",
      time: "1w",
      text: "This is interesting post I like the futuristic vibe.",
      liked: false,
      likes: 12,
      replies: [
        {
          id: 11,
          name: "VINPAUL",
          time: "1w",
          text: "This is interesting post I like the futuristic vibe.",
          liked: false,
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Gousiya",
      time: "1w",
      text: "Another comment with same user.",
      liked: false,
      likes: 8,
      replies: [
        {
          id: 21,
          name: "VINPAUL",
          time: "1w",
          text: "Reply here.",
          liked: false,
          likes: 1,
        },
      ],
    },
    {
      id: 3,
      name: "Lavanya",
      time: "1w",
      text: "Yet another comment.",
      liked: false,
      likes: 6,
      replies: [
        {
          id: 31,
          name: "VINPAUL",
          time: "1w",
          text: "Another reply.",
          liked: false,
          likes: 2,
        },
      ],
    },
    {
      id: 4,
      name: "Samantha",
      time: "5d",
      text: "Amazing work 👏 really loved the design.",
      liked: false,
      likes: 20,
      replies: [
        {
          id: 41,
          name: "John",
          time: "2d",
          text: "Yes! The UI looks super clean.",
          liked: false,
          likes: 4,
        },
      ],
    },
  ]);

  /* ---------- SEND ---------- */
  const handleSend = () => {
    if (!commentText.trim()) return;

    if (replyTo) {
      setComments(prev =>
        prev.map(comment =>
          comment.id === replyTo.commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    name: "You",
                    time: "now",
                    text: commentText,
                    liked: false,
                    likes: 0,
                  },
                ],
              }
            : comment
        )
      );
    } else {
      setComments(prev => [
        {
          id: Date.now(),
          name: "You",
          time: "now",
          text: commentText,
          liked: false,
          likes: 0,
          replies: [],
        },
        ...prev,
      ]);
    }

    setCommentText("");
    setReplyTo(null);
    setShowMentions(false);
    setShowEmojis(false);
  };
/* ---------- Action Row ---------- */
  const ActionRow = ({
  icon,
  label,
  danger,
  onPress,
}: {
  icon: any;
  label: string;
  danger?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.actionRow} onPress={onPress}>
    <Ionicons
      name={icon}
      size={18}
      color={danger ? "#ff4d6d" : "#ccc"}
    />
    <Text
      style={[
        styles.actionRowText,
        danger && { color: "#ff4d6d" },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

  /* ---------- LIKE COMMENT ---------- */
  const toggleCommentLike = (id: number) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked
                ? comment.likes - 1
                : comment.likes + 1,
            }
          : comment
      )
    );
  };

  /* ---------- LIKE REPLY ---------- */
  const toggleReplyLike = (commentId: number, replyId: number) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked
                        ? reply.likes - 1
                        : reply.likes + 1,
                    }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  const filteredMentions = MENTION_USERS.filter(user =>
    user.toLowerCase().startsWith(mentionQuery.toLowerCase())
  );
 const saveUserAction = async (
  username: string,
  action: "reported" | "muted" | "restricted" | "blocked"
) => {
  try {
    const key = "USER_ACTIONS";
    const stored = await AsyncStorage.getItem(key);
    const data = stored ? JSON.parse(stored) : {};

    const current = data[username]?.[action] ?? false;

    data[username] = {
      reported: false,
      muted: false,
      restricted: false,
      blocked: false,
      ...data[username],
      [action]: !current, // ⭐ TOGGLE
    };

    await AsyncStorage.setItem(key, JSON.stringify(data));

    setComments(prev =>
      prev.map(comment =>
        comment.name === username
          ? {
              ...comment,
              userAction: !current ? action : undefined,
            }
          : comment
      )
    );

          setSelectedComment(null);
        } catch (e) {
          console.log("Save action error", e);
        }
      };


        /* ---------- SHARE COMMENT ---------- */
        const shareComment = async (comment: Comment) => {
          try {
            await Share.share({
              message: `${comment.name}: ${comment.text}`,
            });
          } catch (e) {
            console.log("Share comment error", e);
          }
        };
        /* ---------- PIN COMMENT ---------- */
          const pinComment = (id: number) => {
          setComments(prev => {
            const isAlreadyPinned = prev.find(c => c.id === id)?.pinned;

            const updated = prev.map(c => ({
              ...c,
              pinned: isAlreadyPinned ? false : c.id === id,
            }));

            return updated.sort((a, b) =>
              a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1
            );
          });

          setSelectedComment(null);
        };
        const getFilteredComments = () => {
          let list = [...comments];

          switch (activeFilter) {
            case "top":
              return list.sort((a, b) => b.likes - a.likes);

            case "newest":
              return list.sort((a, b) => b.id - a.id);

            case "favourite":
              return list.filter(c => c.liked);

            case "pinned":
              return list.sort((a, b) =>
                a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1
              );

            default:
              return list;
          }
        };
      const startRecording = async () => {
        try {
          const permission = await Audio.requestPermissionsAsync();
          if (!permission.granted) return;

          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          const { recording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );

          setRecording(recording);
          setIsRecording(true);
        } catch (err) {
          console.log("Start recording error", err);
        }
      };

      const stopRecording = async () => {
        try {
          if (!recording) return;

          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();

          setRecording(null);
          setIsRecording(false);

          if (uri) {
            setComments(prev => [
              {
                id: Date.now(),
                name: "You",
                time: "now",
                text: "Voice message",
                liked: false,
                likes: 0,
                replies: [],
                audioUri: uri, // ✅ IMPORTANT
              },
              ...prev,
            ]);
          }
        } catch (err) {
          console.log("Stop recording error", err);
        }
      };
      const playAudio = async (comment: Comment) => {
        try {
          // Stop previous sound
          if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
          }

          if (!comment.audioUri) return;

          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: comment.audioUri },
            { shouldPlay: true }
          );

          setSound(newSound);
          setPlayingId(comment.id);

          newSound.setOnPlaybackStatusUpdate(status => {
            if (!status.isLoaded) return;
            if (status.didJustFinish) {
              setPlayingId(null);
              newSound.unloadAsync();
            }
          });
        } catch (e) {
          console.log("Play audio error", e);
        }
      };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <GradientAvatar size={40} />
            <View style={styles.nameRow}>
              <Text style={styles.username}>Gousiya</Text>
              <Image
                source={require("../../assets/images/Logo.png")}
                style={styles.nameIcon}
              />
            </View>
          </View>
        
          {/* POST IMAGE */}
          <Image
            source={{ uri: "https://picsum.photos/500/300" }}
            style={styles.postImage}
          />

          {/* COMMENT FILTER BAR */}
          <View style={styles.filterBar}>
            {[
              { key: "top", label: "Top Comments" },
              { key: "newest", label: "Newest" },
              { key: "favourite", label: "Favourite" },
              { key: "pinned", label: "Pinned" },
            ].map(item => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.filterChip,
                  activeFilter === item.key && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(item.key as any)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === item.key && styles.filterTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


          {/* COMMENTS */}
          {getFilteredComments().map(comment => (

            <View key={comment.id} style={styles.commentBox}>
              <TouchableOpacity
                onPress={() =>
                  setOpenCommentId(
                    openCommentId === comment.id ? null : comment.id
                  )
                }
                onLongPress={() => setSelectedComment(comment)}
                delayLongPress={300}
              >
                <View style={styles.row}>
                  <GradientAvatar size={30} />
                  <View style={styles.content}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={styles.name}>
                        {comment.name}{" "}
                        <Text style={styles.time}>{comment.time}</Text>
                      </Text>

                      {comment.pinned && (
                      <MaterialIcons
                        name="push-pin"
                        size={14}
                        color="#25D366" // WhatsApp green
                        style={{ marginLeft: 6, transform: [{ rotate: "20deg" }] }}
                      />
                    )}

                      {/* ⭐ ACTION ICON */}
                      {comment.userAction === "reported" && (
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color="#ff4d6d"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                      {comment.userAction === "muted" && (
                        <Ionicons
                          name="volume-mute"
                          size={14}
                          color="#999"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                      {comment.userAction === "restricted" && (
                        <Ionicons
                          name="remove-circle"
                          size={14}
                          color="#f5a623"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                      {comment.userAction === "blocked" && (
                        <Ionicons
                          name="close-circle"
                          size={14}
                          color="#ff4d6d"
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>

                    {comment.audioUri ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 6,
                  }}
                  onPress={() => playAudio(comment)}
                >
                  <Ionicons
                    name={playingId === comment.id ? "pause" : "play"}
                    size={20}
                    color="#25D366"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.text, { color: "#25D366" }]}>
                    Voice message
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text}>{comment.text}</Text>
              )}

                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.iconRow}>
                <Action
                  icon={
                    <Feather
                      name="heart"
                      size={14}
                      color={comment.liked ? "#ff4d6d" : "#aaa"}
                    />
                  }
                  label={`${comment.likes} Like`}
                  onPress={() => toggleCommentLike(comment.id)}
                />
                <Action
                  icon={<Feather name="corner-up-right" size={14} color="#aaa" />}
                  label="Reply"
                  onPress={() =>
                    setReplyTo({
                      commentId: comment.id,
                      username: comment.name,
                    })
                  }
                />
                <Action
                    icon={<Feather name="share" size={14} color="#aaa" />}
                    label="Share"
                    onPress={() => shareComment(comment)}
                  />
              </View>

              {/* ⭐ VIEW ALL / HIDE REPLIES */}
              {comment.replies.length > 0 && (
                <TouchableOpacity
                  onPress={() =>
                    setOpenCommentId(
                      openCommentId === comment.id ? null : comment.id
                    )
                  }
                  style={styles.viewRepliesBtn}
                >
                  <Text style={styles.viewRepliesText}>
                    {openCommentId === comment.id
                      ? "Hide replies"
                      : `View all replies (${comment.replies.length})`}
                  </Text>
                </TouchableOpacity>
              )}

              {openCommentId === comment.id &&
                comment.replies.map(reply => (
                  <View key={reply.id} style={styles.replyBox}>
                    <View style={styles.row}>
                      <GradientAvatar size={26} />
                      <View style={styles.content}>
                        <Text style={styles.replyName}>
                          {reply.name}{" "}
                          <Text style={styles.time}>{reply.time}</Text>
                        </Text>
                        <Text style={styles.replyText}>{reply.text}</Text>

                        <View style={styles.iconRow}>
                          <Action
                            icon={
                              <Feather
                                name="heart"
                                size={13}
                                color={
                                  reply.liked ? "#ff4d6d" : "#aaa"
                                }
                              />
                            }
                            label={`${reply.likes} Like`}
                            onPress={() =>
                              toggleReplyLike(comment.id, reply.id)
                            }
                          />
                          <Action
                            icon={
                              <Feather
                                name="corner-up-right"
                                size={13}
                                color="#aaa"
                              />
                            }
                            label="Reply"
                            onPress={() =>
                              setReplyTo({
                                commentId: comment.id,
                                username: reply.name,
                              })
                            }
                          />
                          <Action
                            icon={<Feather name="share" size={14} color="#aaa" />}
                            label="Share"
                            onPress={() => shareComment(comment)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          ))}
        </ScrollView>

        {/* MENTION LIST */}
        {showMentions && filteredMentions.length > 0 && (
          <View style={styles.mentionBox}>
            {filteredMentions.map(user => (
              <TouchableOpacity
                key={user}
                style={styles.mentionItem}
                onPress={() => {
                  const words = commentText.split(" ");
                  words[words.length - 1] = `@${user}`;
                  setCommentText(words.join(" ") + " ");
                  setShowMentions(false);
                }}
              >
                <Text style={styles.mentionText}>@{user}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* EMOJI PICKER */}

{showEmojis && (
  <View style={styles.emojiBox}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.emojiGrid}>
        {EMOJIES.map(emoji => (
          <TouchableOpacity
            key={emoji}
            style={styles.emojiItem}
            onPress={() => {
              setCommentText(prev => prev + emoji);
            }}
          >
            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
)}
     {/* BOTTOM BAR */}
        <View style={styles.bottomBarWrapper}>
          {replyTo && (
            <Text style={styles.replyingText}>
              Replying to @{replyTo.username}
            </Text>
          )}

          <View style={styles.bottomBar}>
            <TouchableOpacity
  onPress={isRecording ? stopRecording : startRecording}
  activeOpacity={0.8}
>
  <LinearGradient
    colors={
      isRecording
        ? ["#ff4d6d", "#ff1e56"]
        : ["#00E5FF", "#7C4DFF", "#FF2DAA"]
    }
    style={styles.micOuter}
  >
    <View style={styles.micInner}>
      <Ionicons
        name={isRecording ? "stop" : "mic-outline"}
        size={18}
        color="#fff"
      />
    </View>
  </LinearGradient>
</TouchableOpacity>


            <View style={styles.inputPill}>
              <TextInput
                value={commentText}
                onChangeText={text => {
                  setCommentText(text);
                  const last = text.split(" ").pop() || "";
                  if (last.startsWith("@")) {
                    setMentionQuery(last.slice(1));
                    setShowMentions(true);
                  } else {
                    setShowMentions(false);
                  }
                }}
                placeholder={
                  replyTo
                    ? `Reply to @${replyTo.username}`
                    : "Write a comment..."
                }
                placeholderTextColor="#777"
                style={styles.inputText}
                multiline
              />

              <View style={styles.iconGroup}>
                <Ionicons name="at-outline" size={18} color="#aaa" />

                <TouchableOpacity
                    onPress={() => {
                    setShowEmojis(prev => !prev);
                    setShowMentions(false);
                    }}
                >
                <Ionicons name="happy-outline" size={18} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowAttachSheet(true)}>
  <Ionicons name="attach-outline" size={18} color="#aaa" />
</TouchableOpacity>

                <TouchableOpacity
  onPress={handleSend}
  disabled={isRecording}
>
  <Ionicons
    name="send"
    size={18}
    color={isRecording ? "#444" : "#7C4DFF"}
  />
</TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
        {/* ATTACH DOCUMENT SCREEN */}
{showAttachSheet && (
  <View style={styles.attachOverlay}>
    {/* Click outside to close */}
    <TouchableOpacity
      style={StyleSheet.absoluteFill}
      onPress={() => setShowAttachSheet(false)}
    />

    <View style={styles.attachSheet}>
      {/* TOP BAR */}
      <View style={styles.attachHeader}>
        <LinearGradient
          colors={["#00E5FF", "#7C4DFF", "#FF2DAA"]}
          style={styles.attachMicOuter}
        >
          <View style={styles.attachMicInner}>
            <Ionicons name="mic-outline" size={18} color="#fff" />
          </View>
        </LinearGradient>

        <Text style={styles.attachPlaceholder}>
          Write your comment……
        </Text>
        <TouchableOpacity onPress={() => setShowAttachSheet(false)}>
            <Ionicons name="close" size={20} color="#aaa" />
          </TouchableOpacity>

        <View style={styles.attachPostBtn}>
          <Text style={styles.attachPostText}>Post</Text>
          <Ionicons name="chevron-forward" size={14} color="#fff" />
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.attachDivider} />

      {/* CENTER CONTENT */}
      <View style={styles.attachCenter}>
        <View style={styles.attachPlusCircle}>
          <Ionicons name="add" size={36} color="#555" />
        </View>
        <Text style={styles.attachCenterText}>
          Add your document{"\n"}Here
        </Text>
      </View>
    </View>
  </View>
)}

 {selectedComment && (
  <View style={styles.commentActionRoot}>

    {/* 🔹 BLUR */}
    <BlurView
      intensity={40}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />

    {/* 🔹 OUTSIDE TAP CLOSE */}
    <TouchableOpacity
      style={StyleSheet.absoluteFill}
      activeOpacity={1}
      onPress={() => setSelectedComment(null)}
    />
    <ActionRow
  icon="close-outline"
  label="Close"
  onPress={() => setSelectedComment(null)}
/>


    {/* 🔹 CENTER POPUP */}
    <View style={styles.commentActionOverlay}>
      <View style={styles.commentActionCard}>
        <TouchableOpacity
  style={styles.popupCloseBtn}
  onPress={() => setSelectedComment(null)}
>
  <Ionicons name="close" size={20} color="#aaa" />
</TouchableOpacity>

        {/* HEADER */}
        <View style={styles.commentActionHeader}>
          <GradientAvatar size={28} />
          <View style={{ flex: 1 }}>
            <Text style={styles.actionUsername}>
              {selectedComment.name}
              <Text style={styles.actionTime}>  {selectedComment.time}</Text>
            </Text>
            <Text
              style={styles.actionTextPreview}
              numberOfLines={2}
            >
              {selectedComment.text}
            </Text>
          </View>
        </View>

        {/* OPTIONS (UNCHANGED) */}

        <TouchableOpacity
            style={styles.actionRow}
            onPress={() => pinComment(selectedComment.id)}
          >
            <MaterialIcons
              name="push-pin"
              size={18}
              color="#25D366"
              style={{ marginRight: 10, transform: [{ rotate: "20deg" }] }}
            />
            <Text style={styles.actionRowText}>
              {selectedComment.pinned ? "Unpin comment" : "Pin comment"}
            </Text>
          </TouchableOpacity>


        <ActionRow
            icon="alert-circle-outline"
            label={
              selectedComment.userAction === "reported"
                ? "Undo report"
                : "Report comment"
            }
            danger
            onPress={() =>
              saveUserAction(selectedComment.name, "reported")
            }
          />

        <ActionRow
          icon="volume-mute-outline"
          label={
            selectedComment.userAction === "muted"
              ? "Unmute user"
              : "Mute user"
          }
          onPress={() =>
            saveUserAction(selectedComment.name, "muted")
          }
        />


        <ActionRow
            icon="remove-circle-outline"
            label={
              selectedComment.userAction === "restricted"
                ? "Unrestrict account"
                : "Restrict account"
            }
            onPress={() =>
              saveUserAction(selectedComment.name, "restricted")
            }
          />


        <ActionRow
          icon="close-circle-outline"
          label={
            selectedComment.userAction === "blocked"
              ? "Unblock user"
              : "Block user"
          }
          danger
          onPress={() =>
            saveUserAction(selectedComment.name, "blocked")
          }
        />

      </View>
    </View>

  </View>
)}


      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: "#0b0b0b" 
    },

  header: { 
    flexDirection: "row",
    alignItems: "center", 
    paddingTop: 50, 
    paddingHorizontal: 16, 
    paddingBottom: 20, 
  },

  nameRow: {
     flexDirection: "row", 
     alignItems: "center" 
    },

  nameIcon: {
     width: 14, 
     height: 14, 
     marginLeft: 6 
    },

  username: {
     color: "#fff", 
     fontSize: 15, 
     fontWeight: "600" 
    },

  postImage: {
     width: "90%", 
     height: 180, 
     alignSelf: "center", 
     borderRadius: 14 
    },

  commentBox: {
     backgroundColor: "#121212", 
     marginHorizontal: 12, 
     borderRadius: 14,
    padding: 12, 
    marginTop: 10, 
    marginLeft: 35 
  },

  replyBox: {
     marginTop: 10, 
     marginLeft: 36, 
     backgroundColor: "#0e0e0e", 
     borderRadius: 12, 
     padding: 10 
    },

  row: {
     flexDirection: "row" 
    },

  content: { 
    flex: 1 
  },

  name: { 
    color: "#fff",
    fontSize: 13, 
    fontWeight: "600" 
  },

  replyName: {
     color: "#fff", 
     fontSize: 12, 
     fontWeight: "600" 
    },

  time: {
     color: "#777", 
     fontSize: 11 
    },

  text: {
     color: "#ddd", 
     fontSize: 13, 
     marginVertical: 6 
    },

  replyText: {
     color: "#ccc", 
     fontSize: 12, 
     marginVertical: 4 
    },

  iconRow: {
     flexDirection: "row", 
     marginTop: 6 , 
     paddingLeft: 40,
    },

  iconItem: {
     marginRight: 16 
    },

  iconText: {
     color: "#aaa", 
     fontSize: 12, 
     marginLeft: 4 
    },

  viewRepliesBtn: {
     marginTop: 6, 
     marginLeft: 40 
    },

  viewRepliesText: {
     color: "#7C4DFF", 
     fontSize: 12, 
     fontWeight: "500" 
    },

  bottomBarWrapper: {
     paddingHorizontal: 12, 
     paddingBottom: 10 
    },

  bottomBar: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  micOuter: {
     width: 36, 
     height: 36, 
     borderRadius: 18, 
     padding: 2, 
     marginRight: 8 
    },

  micInner: {
     flex: 1, 
     borderRadius: 999, 
     backgroundColor: "#0b0b0b", 
     alignItems: "center", 
     justifyContent: "center" 
    },

  inputPill: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#121212", 
    borderRadius: 24, 
    paddingHorizontal: 12 
  },

  inputText: { 
    flex: 1, 
    color: "#fff" 
  },

  iconGroup: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12 
  },

  replyingText: {
     color: "#7C4DFF", 
     fontSize: 11, 
     marginLeft: 16 
    },

  mentionBox: {
     backgroundColor: "#121212", 
     borderRadius: 12, 
     marginHorizontal: 12, 
     marginBottom: 6 
    },

  mentionItem: { 
    padding: 10 
  },

  mentionText: { 
    color: "#7C4DFF", 
    fontSize: 14 
  },
  
  emojiBox: {
  position: "absolute",
  left: 0,
  right: 0,

  // ⬇️ push it BELOW bottom bar
  bottom: -1,

  height: "50%", // half screen
  backgroundColor: "#121212",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingTop: 10,
  borderTopWidth: 1,
  borderColor: "#1f1f1f",
},
commentActionRoot: {
  ...StyleSheet.absoluteFillObject,
  zIndex: 9999,
  elevation: 9999,
},
popupCloseBtn: {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10,
},

emojiItem: {
  width: "20%",
  alignItems: "center",
  paddingVertical: 10,
},

filterBar: {
  flexDirection: "row",
  paddingHorizontal: 12,
  marginTop: 12,
  marginBottom: 6,
},

filterChip: {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: "#1a1a1a",
  marginRight: 8,
},

filterChipActive: {
  backgroundColor: "#2b2b2b",
  borderWidth: 1,
  borderColor: "#7C4DFF",
},

filterText: {
  color: "#aaa",
  fontSize: 12,
},

filterTextActive: {
  color: "#fff",
  fontWeight: "600",
},


emojiText: {
  fontSize: 22,
},
emojiGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: 12,
},
attachOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

attachSheet: {
  height: "55%",
  backgroundColor: "#0b0b0b",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 16,
},

attachHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

attachMicOuter: {
  width: 36,
  height: 36,
  borderRadius: 18,
  padding: 2,
},

attachMicInner: {
  flex: 1,
  borderRadius: 999,
  backgroundColor: "#0b0b0b",
  alignItems: "center",
  justifyContent: "center",
},

attachPlaceholder: {
  flex: 1,
  color: "#777",
  marginLeft: 10,
  fontSize: 13,
},

attachPostBtn: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#1e1e1e",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 14,
},

attachPostText: {
  color: "#fff",
  fontSize: 13,
  marginRight: 2,
},

attachDivider: {
  height: 1,
  backgroundColor: "#1f1f1f",
  marginVertical: 16,
},

attachCenter: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},

attachPlusCircle: {
  width: 70,
  height: 70,
  borderRadius: 35,
  borderWidth: 1,
  borderColor: "#333",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 14,
},

attachCenterText: {
  color: "#555",
  textAlign: "center",
  fontSize: 14,
  lineHeight: 20,
},

commentActionOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center",
  alignItems: "center",
},

commentActionCard: {
  width: "85%",
  backgroundColor: "#0f0f0f",
  borderRadius: 18,
  padding: 14,
  borderWidth: 1,
  borderColor: "#7C4DFF",
},

commentActionHeader: {
  flexDirection: "row",
  marginBottom: 12,
},

actionUsername: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "600",
},

actionTime: {
  color: "#777",
  fontSize: 11,
},

actionTextPreview: {
  color: "#aaa",
  fontSize: 12,
  marginTop: 2,
},

actionRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 10,
  borderTopWidth: 0.5,
  borderColor: "#222",
},

actionRowText: {
  color: "#ccc",
  fontSize: 14,
  marginLeft: 10,
},


});
