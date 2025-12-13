import React, { createContext, useContext, useState } from "react";

/* ---------- STORY SETTINGS TYPE ---------- */
export type StorySettings = {
  hideStoryFrom: string[]; // user IDs
  allowStoryAccess: "Everyone" | "Followers" | "PeopleIFollow" | "NoOne";
  allowStoryReplies: "Everyone" | "Followers" | "PeopleIFollow" | "NoOne";
  allowSharing: boolean;
  saveStoriesAutomatically: boolean;
};

/* ---------- TAGGING SETTINGS TYPE ---------- */
export type TaggingSettings = {
  whoCanTag: "Everyone" | "Followers" | "PeopleIFollow" | "NoOne";
  whoCanMention: "Everyone" | "Followers" | "PeopleIFollow" | "NoOne";
  reviewTags: boolean;
};

/* ---------- PROFILE TYPE ---------- */
export type ProfileData = {
  username: string;
  name: string;
  bio: string;
  pronouns: string;
  gender: string;
  category: string;
  photo: string | null;
  links: string[];

  // ✅ STORY SETTINGS
  storySettings: StorySettings;

  // ✅ TAGGING SETTINGS
  taggingSettings: TaggingSettings;
};

/* ---------- CONTEXT TYPE ---------- */
type ProfileContextType = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

/* ---------- PROVIDER ---------- */
export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    username: "vinpaul",
    name: "LUNA. TECHIE",
    bio:
      "Pioneer in AI-Driven Music & digital\nart. Building the Future of soundscapes",
    pronouns: "she/her",
    gender: "Female",
    category: "Creator",
    photo: null,
    links: [],

    /* ✅ STORY SETTINGS DEFAULTS */
    storySettings: {
      hideStoryFrom: [],
      allowStoryAccess: "Everyone",
      allowStoryReplies: "Everyone",
      allowSharing: true,
      saveStoriesAutomatically: true,
    },

    /* ✅ TAGGING SETTINGS DEFAULTS */
    taggingSettings: {
      whoCanTag: "Everyone",
      whoCanMention: "Everyone",
      reviewTags: true,
    },
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

/* ---------- HOOK ---------- */
export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return ctx;
};
