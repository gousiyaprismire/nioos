import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

export default function AccountInformation() {
  const [successMessage, setSuccessMessage] = useState("");
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const otpRefs = React.useRef<Array<TextInput | null>>([]);
  const [currentEmail] = useState("xyz@gmail.com");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mobile Update
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  // MOBILE FLOW
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [showMobileOtp, setShowMobileOtp] = useState(false);

  const [newMobile, setNewMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [currentMobile] = useState("+91xxxxxxxxxx");

    // SHARED OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(30);

  // USERNAME UPDATE
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const [currentUsername] = useState("xyz");
  const [newUsername, setNewUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // PASSWORD UPDATE
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState<{
    field: "current" | "new" | "confirm" | null;
    message: string;
    }>({ field: null, message: "" });





React.useEffect(() => {
  if (!showEmailOtp && !showMobileOtp) return;

  setOtpTimer(30);

  const interval = setInterval(() => {
    setOtpTimer(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [showEmailOtp, showMobileOtp]);


    const handleOtpChange = (text: string, index: number) => {
      if (!/^\d?$/.test(text)) return; // only numbers

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // move to next box
        if (text && index < 5) {
          otpRefs.current[index + 1]?.focus();
        }

  // move back on delete
      if (!text && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    };

    const handleResendOtp = () => {
      setOtp(["", "", "", "", "", ""]); // clear OTP boxes
      setOtpTimer(30);                 // restart timer
      otpRefs.current[0]?.focus();     // focus first box
    };

    const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

const isValidUsername = (name: string) => {
  const regex = /^[a-z0-9_.]{3,20}$/;
  return regex.test(name);
};

const SUGGESTED_USERNAMES = [
  "abcde",
  "xyz_23",
  "jimo",
  "probert",
];


  return (
    
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Accounts and Security</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* ---------- CONTENT ---------- */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Account Information</Text>

          <Block
            title="Email Address"
            desc="Manage your login email."
            value="xyz@gmail.com"
            action="Update"
            onPress={() => setShowEmailPopup(true)}
          />

            <Block
              title="Phone Number"
              desc="Used for login and recovery."
              value="+91xxxxxxxxxx"
              action="Update"
              onPress={() => setShowMobilePopup(true)}
            />


          <Block
              title="Username"
              desc="Changing your username may affect how people find your profile."
              value="xyz"
              action="Update"
              onPress={() => setShowUsernamePopup(true)}
            />


          <Block
              title="Password"
              desc="Keep your account secure by updating it regularly."
              action="Change Password"
              onPress={() => setShowPasswordPopup(true)}
            />


          <Block
            title="Connected Accounts"
            desc="Link or remove third-party accounts."
            showArrow
            onPress={() => router.push("/accountsandsecurity/connected-accounts")}
          />


          <Block
            title="Account Type"
            desc="Switch between Personal / Creator / Business."
            value="Personal"
            showArrow
            onPress={() => router.push("/accountsandsecurity/account-type")}
          />


          <View style={{ height: 140 }} />
        </ScrollView>

        {/* ---------- FOOTER (HIDE WHEN POPUP OPEN) ---------- */}
        {!showEmailPopup && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ---------- EMAIL UPDATE POPUP ---------- */}
      <Modal visible={showEmailPopup} transparent animationType="fade">
  <View style={StyleSheet.absoluteFill}>
    {/* BLUR LAYER */}
    <BlurView
      intensity={45}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />

    {/* DARK GLASS OVERLAY (THIS IS THE KEY) */}
    <View style={styles.fullGlassOverlay}
    pointerEvents="none" />

    {/* POPUP */}
    <View style={styles.popupOverlay}>
      <View style={styles.popupCard}>
  {!showOtpStep ? (
    <>
      {/* -------- STEP 1 : EMAIL -------- */}
      <Text style={styles.popupTitle}>Update Email Address</Text>

      <Text style={styles.popupLabel}>Current Email</Text>
      <View style={styles.popupReadonly}>
        <Text style={styles.popupReadonlyText}>xyz@gmail.com</Text>
      </View>

      <Text style={styles.popupLabel}>New Email</Text>
      <TextInput
        placeholder="Enter new email"
        placeholderTextColor="#777"
        style={styles.popupInput}
        value={newEmail}
        onChangeText={(text) => {
          setNewEmail(text);
          setEmailError(""); 
          if (text.trim() !== "") {
            setEmailError(""); // clear error while typing
          }
        }}
      />
      {emailError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.popupPrimaryBtn,
          !newEmail.trim() && { opacity: 0.5 }, // disabled look
        ]}
         onPress={() => {
    // 1️⃣ REQUIRED
    if (!newEmail.trim()) {
      setEmailError("Email is required");
      return;
    }

    // 2️⃣ FORMAT
    if (!isValidEmail(newEmail)) {
      setEmailError("Invalid email format");
      return;
    }

    // 3️⃣ SAME / ALREADY EXISTS
    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
      setEmailError("That email is already linked to another account");
      return;
    }

    // ✅ VALID & NEW EMAIL
    setEmailError("");
    setShowOtpStep(true);
  }}
      >
        <Text style={styles.popupPrimaryText}>
          Send Verification Code
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.popupCancelBtn}
        onPress={() => {
          setShowEmailPopup(false);
          setShowOtpStep(false);
          
        }}
      >
        <Text style={styles.popupCancelText}>Cancel</Text>
      </TouchableOpacity>
    </>
  ) : (
    <>
     
      {/* ---------- STEP 2 : OTP ---------- */}
        <Text style={styles.popupTitle}>Check Your Inbox</Text>

        <Text style={styles.popupSubText}>
          We sent a 6-digit code to
        </Text>

        <Text style={styles.popupEmailText}>
          newemail@example.com
        </Text>

        {/* OTP BOXES */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              otpRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpInput}
            placeholder="•"
            placeholderTextColor="#444"
          />
        ))}
      </View>



  {/* ✅ TIMER GOES HERE (RIGHT BELOW OTP BOXES) */}
        {otpTimer > 0 ? (
        <View style={styles.timerRow}>
          <Text style={styles.timerText}>
            00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.resendRow}
          onPress={handleResendOtp}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}


        <Text style={styles.popupHint}>
          Enter the code to update your email
        </Text>

          <TouchableOpacity
            style={styles.popupPrimaryBtn}
            onPress={() => {
          // ✅ SUCCESS

          setShowOtpStep(false);
          setShowEmailPopup(false);
          setOtp(["", "", "", "", "", ""]);
          setNewEmail("");
          setEmailError("");

          // ✅ SHOW SUCCESS MESSAGE
          setSuccessMessage("Email updated successfully");
          setShowSuccess(true);

          // ⏱ AUTO HIDE
          setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage("");
          }, 2000);
        }}
          >
            <Text style={styles.popupPrimaryText}>
              Verify & Update
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.popupCancelBtn}
            onPress={() => setShowOtpStep(false)}
          >
            <Text style={styles.popupCancelText}>Back</Text>
          </TouchableOpacity>
            </>
          )}
          </View>
              </View>
            </View>
          </Modal>
          {showSuccess && (
          <View style={styles.successOverlay}>
            <View style={styles.successCenterCard}>
              <Ionicons name="checkmark-circle" size={34} color="#4CAF50" />
             <Text style={styles.successCenterText}>
              {successMessage}
            </Text>

            </View>
          </View>
        )}





        {/* ---------- MOBILE UPDATE POPUP ---------- */}
        <Modal visible={showMobilePopup} transparent animationType="fade">
          <View style={StyleSheet.absoluteFill}>
            {/* BLUR LAYER */}
            <BlurView
              intensity={45}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />

            {/* DARK GLASS OVERLAY */}
            <View style={styles.fullGlassOverlay} />

            {/* POPUP */}
            <View style={styles.popupOverlay}>
              <View style={styles.popupCard}>
                <Text style={styles.popupTitle}>Update Mobile No</Text>

                <Text style={styles.popupLabel}>Current Mobile</Text>
                <View style={styles.popupReadonly}>
                  <Text style={styles.popupReadonlyText}>
                    {currentMobile}
                  </Text>
                </View>

                <Text style={styles.popupLabel}>New Mobile No.</Text>
                <TextInput
                  placeholder="Enter new mobile no."
                  placeholderTextColor="#777"
                  keyboardType="number-pad"
                  style={styles.popupInput}
                  value={newMobile}
                  onChangeText={(text) => {
                    setNewMobile(text);
                    setMobileError("");
                  }}
                />

                {mobileError ? (
                  <Text style={styles.errorText}>{mobileError}</Text>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.popupPrimaryBtn,
                    !newMobile.trim() && { opacity: 0.5 },
                  ]}
                  onPress={() => {
                    if (!newMobile.trim()) {
                      setMobileError("Mobile number is required");
                      return;
                    }
                    if (newMobile.length < 10) {
                      setMobileError("Enter a valid mobile number");
                      return;
                    }

                    // ✅ later → open OTP screen
                    setShowMobilePopup(false);
                  }}
                >
                  <Text style={styles.popupPrimaryText}>
                    Send OTP
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.popupCancelBtn}
                  onPress={() => {
                    setShowMobilePopup(false);
                    setNewMobile("");
                    setMobileError("");
                  }}
                >
                  <Text style={styles.popupCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


{/* ---------- USERNAME UPDATE POPUP ---------- */}
<Modal visible={showUsernamePopup} transparent animationType="fade">
  <View style={StyleSheet.absoluteFill}>
    <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
    <View style={styles.fullGlassOverlay} />

    <View style={styles.popupOverlay}>
      <View style={styles.popupCard}>

        <Text style={styles.popupTitle}>Update User Name</Text>

        {/* CURRENT USERNAME */}
        <Text style={styles.popupLabel}>Current Username</Text>
        <View style={styles.popupReadonly}>
          <Text style={styles.popupReadonlyText}>{currentUsername}</Text>
        </View>

        {/* NEW USERNAME */}
        <Text style={styles.popupLabel}>New Username</Text>
        <TextInput
          placeholder="New Username"
          placeholderTextColor="#777"
          style={styles.popupInput}
          value={newUsername}
          onChangeText={(text) => {
            setNewUsername(text.toLowerCase());
            setUsernameError("");

            if (text && !isValidUsername(text)) {
              setUsernameError("Characters that are allowed");
            }

            if (text === "abcde") {
              setUsernameError("This username is already taken.");
            }
          }}
        />

        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}

        {/* SUGGESTIONS */}
        <Text style={styles.suggestionTitle}>Suggested User Names</Text>
        <View style={styles.suggestionRow}>
          {SUGGESTED_USERNAMES.map((name) => (
            <TouchableOpacity
              key={name}
              style={styles.suggestionChip}
              onPress={() => {
                setNewUsername(name);
                setUsernameError("");
              }}
            >
              <Text style={styles.suggestionText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RULES */}
        <Text style={styles.rulesText}>
          Characters that are allowed{"\n"}
          Lowercase letters a-z{"\n"}
          UpperCase letters A-Z{"\n"}
          Numbers 0-9{"\n"}
          Underscore _
        </Text>

       {/* SAVE USERNAME */}
      <TouchableOpacity
        style={[
          styles.popupPrimaryBtn,
          (!newUsername ||
            usernameError ||
            newUsername === currentUsername) && { opacity: 0.5 },
        ]}
        disabled={
          !newUsername ||
          !!usernameError ||
          newUsername === currentUsername
        }
        onPress={() => {
          // ✅ FINAL VALIDATION
          if (!isValidUsername(newUsername)) {
            setUsernameError("Characters that are allowed");
            return;
          }

          if (newUsername === "abcde") {
            setUsernameError("This username is already taken.");
            return;
          }

    // ✅ SUCCESS (simulate save)
        console.log("Username saved:", newUsername);

          setShowUsernamePopup(false);
          setNewUsername("");
          setUsernameError("");

          // (Optional) show success toast
          setSuccessMessage("Username updated successfully");
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage("");
          }, 2000);
        }}
      >
        <Text style={styles.popupPrimaryText}>Save Username</Text>
      </TouchableOpacity>


        {/* CANCEL */}
        <TouchableOpacity
          style={styles.popupCancelBtn}
          onPress={() => {
            setShowUsernamePopup(false);
            setNewUsername("");
            setUsernameError("");
          }}
        >
          <Text style={styles.popupCancelText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
</Modal>



          {/* ---------- UPDATE PASSWORD POPUP ---------- */}
      <Modal visible={showPasswordPopup} transparent animationType="fade">
        <View style={StyleSheet.absoluteFill}>
    {/* BLUR BACKGROUND */}
    <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
    <View style={styles.fullGlassOverlay} />

    <View style={styles.popupOverlay}>
      <View style={styles.popupCard}>
        {/* POPUP HEADER */}
        <View style={styles.passwordHeader}>
          <TouchableOpacity onPress={() => setShowPasswordPopup(false)}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.popupTitle}>Update Password</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* CURRENT PASSWORD */}
        <Text style={styles.popupLabel}>Current Password</Text>

        <View style={styles.passwordInputRow}>
          <TextInput
            secureTextEntry={!showCurrentPwd}
            placeholder="Current Password"
            placeholderTextColor="#777"
            style={styles.passwordInput}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <TouchableOpacity onPress={() => setShowCurrentPwd(!showCurrentPwd)}>
            <Ionicons
              name={showCurrentPwd ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9a9a9a"
            />
          </TouchableOpacity>
        </View>

        {passwordFieldError.field === "current" && (
            <Text style={styles.errorText}>{passwordFieldError.message}</Text>
        )}



        {/* NEW PASSWORD */}
        <Text style={styles.popupLabel}>New Password</Text>

        <View style={styles.passwordInputRow}>
          <TextInput
            secureTextEntry={!showNewPwd}
            placeholder="New Password"
            placeholderTextColor="#777"
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity onPress={() => setShowNewPwd(!showNewPwd)}>
            <Ionicons
              name={showNewPwd ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9a9a9a"
            />
          </TouchableOpacity>
        </View>

        {passwordFieldError.field === "new" && (
          <Text style={styles.errorText}>{passwordFieldError.message}</Text>
        )}



        {/* CONFIRM PASSWORD */}
        <Text style={styles.popupLabel}>Confirm Password</Text>

        <View style={styles.passwordInputRow}>
          <TextInput
            secureTextEntry={!showConfirmPwd}
            placeholder="Confirm Password"
            placeholderTextColor="#777"
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity onPress={() => setShowConfirmPwd(!showConfirmPwd)}>
            <Ionicons
              name={showConfirmPwd ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9a9a9a"
            />
          </TouchableOpacity>
        </View>

          {passwordFieldError.field === "confirm" && (
            <Text style={styles.errorText}>{passwordFieldError.message}</Text>
          )}


        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* PASSWORD RULES */}
        <Text style={styles.passwordRules}>
        <Text style={styles.passwordRulesTitle}>
          Password Requirements{"\n"}
        </Text>
        • At least 8 characters{"\n"}
        • One uppercase letter{"\n"}
        • One number{"\n"}
        • One special character (!@#$%)
      </Text>


        {/* UPDATE BUTTON */}
        <TouchableOpacity
          style={styles.popupPrimaryBtn}
          onPress={() => {
          // reset
          setPasswordError("");
          setPasswordFieldError({ field: null, message: "" });

          // 6️⃣ Current password empty
          if (!currentPassword) {
            setPasswordFieldError({
              field: "current",
              message: "Current password is required.",
            });
            return;
          }

          // simulate wrong current password
          if (currentPassword !== "Test@123") {
            setPasswordFieldError({
              field: "current",
              message: "Current password is incorrect.",
            });
            return;
          }

          // new password empty
          if (!newPassword) {
            setPasswordFieldError({
              field: "new",
              message: "New password is required.",
            });
            return;
          }

          // 4️⃣ same as current
          if (newPassword === currentPassword) {
            setPasswordFieldError({
              field: "new",
              message: "New password cannot be the same as current password.",
            });
            return;
          }

          // requirements
          const strongPassword =
            newPassword.length >= 8 &&
            /[A-Z]/.test(newPassword) &&
            /\d/.test(newPassword) &&
            /[!@#$%^&*]/.test(newPassword);

          if (!strongPassword) {
            setPasswordFieldError({
              field: "new",
              message: "New password does not meet the requirements.",
            });
            return;
          }

          // 5️⃣ confirm empty
          if (!confirmPassword) {
            setPasswordFieldError({
              field: "confirm",
              message: "Please confirm your new password.",
            });
            return;
          }

          // mismatch
          if (newPassword !== confirmPassword) {
            setPasswordFieldError({
              field: "confirm",
              message: "Passwords do not match.",
            });
            return;
          }

          // ✅ SUCCESS
          setShowPasswordPopup(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");

          setSuccessMessage("Password updated successfully");
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        }}

        >
          <Text style={styles.popupPrimaryText}>Update Password</Text>
        </TouchableOpacity>

        {/* CANCEL */}
        <TouchableOpacity
          style={styles.popupCancelBtn}
          onPress={() => setShowPasswordPopup(false)}
        >
          <Text style={styles.popupCancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>



            </SafeAreaView>
          );
        }

/* ---------- BLOCK ---------- */
const Block = ({
  title,
  desc,
  value,
  action,
  showArrow,
  onPress,
}: {
  title: string;
  desc: string;
  value?: string;
  action?: string;
  showArrow?: boolean;
  onPress?: () => void;
}) => {
  const isWholeClickable = !!onPress && !action;

  const Wrapper = isWholeClickable ? TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.block}
      onPress={isWholeClickable ? onPress : undefined}
      activeOpacity={0.7}
    >
      <Text style={styles.blockTitle}>{title}</Text>
      <Text style={styles.blockDesc}>{desc}</Text>

      {value && <Text style={styles.valueText}>{value}</Text>}

      {(action || showArrow) && (
        <TouchableOpacity
          style={styles.actionRow}
          onPress={action ? onPress : undefined}
          activeOpacity={0.7}
        >
          {action && <Text style={styles.actionText}>{action}</Text>}
          {showArrow && (
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#777"
              style={{ marginLeft: 4 }}
            />
          )}
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 16 },

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
    marginVertical: 12,
  },
errorText: {
  color: "#ff6b6b",
  fontSize: 14,
  marginTop: -8,
  marginBottom: 10,
},

  block: { marginBottom: 22 },
  blockTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  blockDesc: { color: "#9a9a9a", fontSize: 14, marginTop: 4 },
  valueText: { color: "#bfbfbf", fontSize: 14, marginTop: 6 },

  actionRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  actionText: { color: "#0095F6", fontSize: 14, fontWeight: "500" },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 12,
  },

  suggestionTitle: {
  color: "#9a9a9a",
  fontSize: 14,
  marginBottom: 8,
},

suggestionRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 14,
},

suggestionChip: {
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 8,
  backgroundColor: "#111",
  borderWidth: 1,
  borderColor: "#2a2a2a",
},

suggestionText: {
  color: "#bfbfbf",
  fontSize: 14,
},

rulesText: {
  color: "#6f6f6f",
  fontSize: 13,
  lineHeight: 16,
  marginBottom: 14,
},

  
  fullGlassOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.65)", // 👈 hides footer fully
},

  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },

popupSubText: {
  color: "#9a9a9a",
  fontSize: 14,
  marginBottom: 4,
},

popupEmailText: {
  color: "#E5E5E5",
  fontSize: 14,
  marginBottom: 16,
},

otpRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 14,
},

timerRow: {
  alignItems: "flex-end",
  marginBottom: 10,
},

passwordInputRow: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#111",
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#2a2a2a",
},

passwordInput: {
  flex: 1,
  height: 44,
  color: "#fff",
  fontSize: 14,
},


otpInput: {
  width: 42,
  height: 46,
  borderRadius: 8,
  backgroundColor: "#111",
  borderWidth: 1,
  borderColor: "#2a2a2a",
  color: "#fff",
  textAlign: "center",
  fontSize: 18,
  fontWeight: "600",
},

timerText: {
  color: "#8c8c8c",
  fontSize: 11,
},

passwordRulesTitle: {
  color: "#0095F6", // Instagram / iOS blue
  fontSize: 14,
  fontWeight: "500",
  marginBottom: 50,
  paddingBottom: 30,
},

otpBox: {
  width: 42,
  height: 46,
  borderRadius: 8,
  backgroundColor: "#111",
  borderWidth: 1,
  borderColor: "#2a2a2a",
},

successToast: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(20, 60, 30, 0.95)",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 14,
  marginBottom: 10,
},

successCenterCard: {
  backgroundColor: "rgba(25,25,25,0.95)",
  borderRadius: 16,
  paddingVertical: 20,
  paddingHorizontal: 26,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
},

successCenterText: {
  color: "#4CAF50",
  fontSize: 13,
  fontWeight: "600",
  marginTop: 8,
},

popupHint: {
  color: "#8c8c8c",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 14,
},
successOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.45)", // soft dim background
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
},


  cancelText: { color: "#fff", fontSize: 13 },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  saveText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 popupCard: {
  width: "88%",
  backgroundColor: "rgba(25,25,25,0.9)",

  // ✅ SHARP BORDER
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",

  // ✅ INNER HIGHLIGHT (GLASS EDGE)
  shadowColor: "#fff",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.15,
  shadowRadius: 6,

  // ✅ ANDROID SHADOW
  elevation: 12,

  padding: 18,
},

  popupTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 16,
  },

  resendRow: {
  alignItems: "flex-end",
  marginBottom: 10,
},

resendText: {
  color: "#0095F6",
  fontSize: 12,
  fontWeight: "500",
},

  popupLabel: { color: "#fff", fontSize: 11, marginBottom: 6 },
  popupReadonly: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
  },
  popupReadonlyText: { color: "#666", fontSize: 14 },
  popupInput: {
    backgroundColor: "#111",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    fontSize: 14,
    marginBottom: 16,
  },
  popupPrimaryBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  popupPrimaryText: { color: "#fff", fontSize: 15, },
  popupCancelBtn: { marginTop: 20, alignItems: "center", marginBottom: 20, },
  popupCancelText: { color: "#9a9a9a", fontSize: 12 },
  
  passwordHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
},

passwordRules: {
  color: "#8c8c8c",
  fontSize: 14,
  lineHeight: 16,
  marginBottom: 16,
},

});
