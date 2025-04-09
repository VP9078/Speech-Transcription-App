import React, { createContext, useContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { Alert } from "react-native";
import { submitAudioFile } from "./api";

const RecordingContext = createContext();

const recordingOptions = {
  android: {
    extension: ".wav",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export function RecordingProvider({ children }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const recordingRef = useRef(null);

  // Start session: request permissions and start recording.
  const startSession = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow microphone access.");
        return false;
      }

      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          recordingOptions
        );
        recordingRef.current = recording;
        setIsRecording(true);
        console.log("Recording started...");
      } catch (error) {
        console.error("Failed to start recording:", error);
        Alert.alert("Error", "Failed to start recording.");
      }

      return true;
    } catch (error) {
      console.error("Failed to start session:", error);
      Alert.alert("Error", "Failed to start recording.");
      return false;
    }
  };

  // End session: stop recording and process the audio file.
  const endSession = async () => {
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        setIsRecording(false);
        console.log("Recording stopped. File saved at:", uri);

        // Send the recorded audio to the backend.
        await submitAudioFile(uri);

        return true;
      } catch (error) {
        console.error("Error stopping recording:", error);
        Alert.alert("Error", "Failed to stop recording.");
        return false;
      }
    }
  };

  // Toggle mute functionality.
  // This function attempts to pause or resume recording to simulate muting.
  const toggleMute = async () => {
    if (!isRecording || !recordingRef.current) {
      // If not recording, simply toggle the mute state.
      setIsMuted((prev) => !prev);
      return;
    }

    if (!isMuted) {
      try {
        // Pause recording to "mute" the mic.
        await recordingRef.current.pauseAsync();
        setIsMuted(true);
        console.log("Microphone muted");
      } catch (error) {
        console.error("Failed to mute microphone:", error);
      }
    } else {
      try {
        // Resume recording to "unmute" the mic.
        await recordingRef.current.startAsync();
        setIsMuted(false);
        console.log("Microphone unmuted");
      } catch (error) {
        console.error("Failed to unmute microphone:", error);
      }
    }
  };

  return (
    <RecordingContext.Provider
      value={{
        startSession,
        endSession,
        toggleMute,
        recordingRef,
        isRecording,
        isMuted,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
}

export function useRecordingContext() {
  return useContext(RecordingContext);
}
