import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TwoFactorAuthentication() {
  const [enabled, setEnabled] = useState(true);

  /* POPUP STATES */
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  /* EMAIL */
  const [email, setEmail] = useState("xyz@gmail.com");
  const [emailError, setEmailError] = useState("");

  /* OTP */
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  /* SUCCESS */
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [otpError, setOtpError] = useState("");

  /* MOBILE */
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [mobile, setMobile] = useState("+91 ");
  const [mobileError, setMobileError] = useState("");

  



  /* TIMER */
  useEffect(() => {
    if (!showOtpPopup || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtpPopup, timeLeft]);

  /* SEND CODE */
  const handleSendCode = () => {
    // Demo error condition
    if (email === "xyz@gmail.com") {
      setEmailError("Email already verified!");
      return;
    }

    setEmailError("");
    setShowEmailPopup(false);
    setShowOtpPopup(true);
    setTimeLeft(30);
    setOtp(["", "", "", "", "", ""]);
  };

  /* OTP CHANGE */
  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

/* VERIFY OTP */
const handleVerifyOtp = () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length < 6) {
    setOtpError("Please enter complete 6-digit code");
    return;
  }

  // demo success condition
  setOtpError("");
  setShowOtpPopup(false);
  setShowSuccessPopup(true);
};

/* RESEND OTP */
const handleResendOtp = () => {
  setTimeLeft(30);
  setOtp(["", "", "", "", "", ""]);
  setOtpError("");

  // focus first box again
  setTimeout(() => {
    inputs.current[0]?.focus();
  }, 100);
};



  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (showOtpPopup) {
                setShowOtpPopup(false);
                setShowEmailPopup(true);
              } else {
                router.back();
              }
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Security Center</Text>

          <Ionicons name="help-circle-outline" size={18} color="#fff" />
        </View>

        {/* MAIN CONTENT (UNCHANGED) */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.glassCard}>
            <View style={styles.switchRow}>
              <Text style={styles.title}>
                Two-Factor Authentication (2FA)
              </Text>

              <Switch
                value={enabled}
                onValueChange={setEnabled}
                trackColor={{ false: "#333", true: "#00B0FF" }}
                thumbColor="#fff"
              />
            </View>

            <Text style={styles.desc}>
              2FA (Two-Factor Authentication) adds one extra step of security to
              your password to confirm it’s really you.
            </Text>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Instead of:</Text>
              <Text style={styles.infoValue}>
                Password + Logged in 🔓
              </Text>

              <View style={{ height: 8 }} />

              <Text style={styles.infoLabel}>It becomes:</Text>
              <Text style={styles.infoValue}>
                Password + Verification Code + Logged in 🔐
              </Text>
            </View>

            <Text style={styles.knowMore}>Know more</Text>
          </View>

          {/* EMAIL VERIFICATION */}
          <View style={styles.glassOption}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => {
                setShowEmailPopup(true);
                setEmailError("");
              }}
            >
              <Text style={styles.optionText}>
                Enable Email Verification
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          </View>

          {/* MOBILE VERIFICATION */}
          <View style={styles.glassOption}>
            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                    setShowMobilePopup(true);
                    setMobileError("");
                }}
                >
              <Text style={styles.optionText}>
                Enable Mobile Verification
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* EMAIL POPUP */}
        <Modal transparent visible={showEmailPopup} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>
                Verify Email Address
              </Text>

              <Text style={styles.popupDesc}>
                A 6-digit code will be sent to your email every time you log in
                from a new device.
              </Text>

              <View style={styles.inputBlock}>
                <TextInput
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setEmailError("");
                  }}
                  style={[
                    styles.input,
                    emailError && styles.inputError,
                  ]}
                  placeholder="Enter email address"
                  placeholderTextColor="#777"
                />

                {emailError !== "" && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendCode}
              >
                <Text style={styles.sendText}>
                  Send Verification Code
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowEmailPopup(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* MOBILE POPUP */}
        <Modal transparent visible={showMobilePopup} animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.popup}>
            <Text style={styles.popupTitle}>Verify Mobile Number</Text>

            <Text style={styles.popupDesc}>
                A 6-digit code will be sent to your mobile number every time you log in
                from a new device.
            </Text>

            <TextInput
                value={mobile}
                onChangeText={(t) => {
                    // allow only digits
                    const cleaned = t.replace(/[^0-9]/g, "");

                    // limit to 10 digits
                    if (cleaned.length <= 10) {
                    setMobile(cleaned);
                    setMobileError("");
                    }
                }}
                style={[
                    styles.input,
                    mobileError && styles.inputError,
                ]}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#777"
                keyboardType="number-pad"
                maxLength={10}
                />


            <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => {
                if (mobile.length < 10) {
                    setMobileError("Enter valid mobile number");
                    return;
                }

                setShowMobilePopup(false);
                setShowOtpPopup(true);
                setTimeLeft(30);
                setOtp(["", "", "", "", "", ""]);
                }}
            >
                <Text style={styles.sendText}>Send Verification Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowMobilePopup(false)}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>


        {/* OTP POPUP (FIXED REF ISSUE HERE) */}
        <Modal transparent visible={showOtpPopup} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.otpPopup}>
              <Text style={styles.otpTitle}>Check Your Inbox</Text>

              <Text style={styles.otpDesc}>
                We’ve sent a 6-digit code to{"\n"}
                <Text style={styles.emailText}>{email}</Text>
              </Text>

              <View style={styles.otpRow}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => {
                      inputs.current[i] = ref;
                    }}
                    style={styles.otpBox}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(t) => handleOtpChange(t, i)}
                  />
                ))}
              </View>

              {otpError !== "" && (
                <Text style={styles.errorText}>{otpError}</Text>
                )}


              {timeLeft > 0 ? (
                <View style={styles.timerRow}>
                    <Text style={styles.timerText}>
                    Enter the code sent to your email.
                    </Text>
                    <Text style={styles.timer}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </Text>
                </View>
                ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
                )}


             <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOtp}>
                <Text style={styles.verifyText}>Verify & Update</Text>
            </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  setShowOtpPopup(false);
                  setShowEmailPopup(true);
                }}
              >
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* SUCCESS POPUP */}
        <Modal transparent visible={showSuccessPopup} animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.popup}>
            <Ionicons
                name="checkmark-circle"
                size={54}
                color="#00E676"
                style={{ alignSelf: "center", marginBottom: 12 }}
            />

            <Text style={[styles.popupTitle, { textAlign: "center" }]}>
                Verification Successful
            </Text>

            <Text style={[styles.popupDesc, { textAlign: "center" }]}>
                Your email has been successfully verified and 2FA is now enabled.
            </Text>

            <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => setShowSuccessPopup(false)}
            >
                <Text style={styles.sendText}>Done</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 14,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  glassCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginTop: 12,
  },
  resendText: {
  color: "#00B0FF",
  fontSize: 13,
  textAlign: "center",
  marginBottom: 22,
  fontWeight: "600",
},


  switchRow: { flexDirection: "row", justifyContent: "space-between" },
  title: { color: "#fff", fontSize: 15, fontWeight: "600", flex: 1 },
  desc: { color: "#b0b0b0", fontSize: 12, marginTop: 10 },
  infoBlock: { marginTop: 14 },
  infoLabel: { color: "#9a9a9a", fontSize: 12 },
  infoValue: { color: "#fff", fontSize: 13 },
  knowMore: { color: "#00B0FF", fontSize: 13, marginTop: 14 },

  glassOption: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginTop: 14,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  optionText: { color: "#fff", fontSize: 14 },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: "90%",
    backgroundColor: "#0f0f0f",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  popupTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  popupDesc: { color: "#9a9a9a", fontSize: 12, marginVertical: 12 },

  inputBlock: { marginBottom: 20 },
  input: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffb300",
    paddingHorizontal: 14,
    color: "#fff",
  },
  inputError: { borderColor: "#ff4d4f" },
  errorText: { color: "#ff4d4f", fontSize: 12, marginTop: 6 },

  sendBtn: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
    marginBottom: 14,
  },
  sendText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  cancelBtn: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: { color: "#9a9a9a", fontSize: 14 },

  otpPopup: {
    width: "90%",
    backgroundColor: "#0f0f0f",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  otpTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  otpDesc: { color: "#9a9a9a", marginVertical: 12 },
  emailText: { color: "#fff", fontWeight: "600" },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  otpBox: {
    width: 44,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#000",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },

  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  timerText: { color: "#9a9a9a", fontSize: 12 },
  timer: { color: "#fff", fontSize: 12 },

  verifyBtn: {
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
    marginBottom: 14,
  },

  verifyText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  backText: { color: "#9a9a9a", textAlign: "center" },
});
