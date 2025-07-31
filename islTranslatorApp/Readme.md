# ISL Translator App — Android Setup Guide

This guide will help you set up your environment to run and develop the ISL Translator React Native app on Android (using a real device).

---

## 1. Prerequisites

- **Node.js** and **npm** installed
- **Java JDK** (version 11 or newer recommended)
- **A real Android phone** with USB debugging enabled
- **USB cable** to connect your phone

---

## 2. Install Android Studio & Android SDK

1. **Download Android Studio**  
   [https://developer.android.com/studio](https://developer.android.com/studio)

2. **Extract and Install**  
   ```bash
   tar -xzf android-studio-2025.1.1.14-linux.tar.gz
   cd android-studio/bin
   ./studio.sh
   ```
   Follow the setup wizard and install the Android SDK and platform tools.

3. **Find your Android SDK path**  
   - In Android Studio:  
     `Preferences (or Settings) → Appearance & Behavior → System Settings → Android SDK`
   - Note the SDK path at the top (e.g., `/home/payallenka/Android/Sdk`).

---

## 3. Set up the SDK path for React Native

1. **Navigate to your React Native project directory:**
   ```bash
   cd ~/Desktop/slt/islTranslatorApp
   ```

2. **Set the SDK path in `android/local.properties`:**
   ```bash
   echo "sdk.dir=/home/payallenka/Android/Sdk" > android/local.properties
   ```
   Replace the path if your SDK is in a different location.

---

## 4. Connect Your Android Device

1. **Enable Developer Options and USB Debugging** on your phone:
   - Go to Settings → About phone → Tap "Build number" 7 times to enable Developer Options.
   - Go to Developer Options → Enable "USB debugging".

2. **Connect your phone via USB.**

3. **Verify connection:**
   ```bash
   adb devices
   ```
   Your device should appear in the list.

---

## 5. Build and Run the App

1. **Install dependencies (if not already):**
   ```bash
   npm install
   ```

2. **Start Metro bundler (in one terminal):**
   ```bash
   npx react-native start
   ```

3. **Build and install the app on your device (in another terminal):**
   ```bash
   npx react-native run-android
   ```

---

## 6. Troubleshooting

- If you see errors about the SDK path, double-check your `android/local.properties`.
- If your device does not show up with `adb devices`, check your USB cable, drivers, and that USB debugging is enabled.
- If you get "adb: not found", ensure the SDK's `platform-tools` are installed and in your PATH.

---

## 7. Useful Commands

- **List connected devices:**  
  ```bash
  adb devices
  ```
- **Wireless ADB (optional):**
  ```bash
  adb tcpip 5555
  adb connect <device-ip-address>:5555
  ```

---

## 8. Notes

- You do **not** need to keep Android Studio running after installing the SDK.
- Metro must be running for live JS updates.
- For production builds or emulator use, see the React Native docs.

---