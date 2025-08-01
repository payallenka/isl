# ISL Translator App — Android Setup Guide

This guide will help you set up your environment to run and develop the ISL Translator React Native app on Android (using a real device) with **Firebase Authentication**.

---

## 🔐 Firebase Authentication Setup (REQUIRED)

**Before proceeding, you must set up Firebase Authentication:**

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Authentication** → **Sign-in method** → **Email/Password**

### 2. Configure Android App
1. In Firebase Console, go to **Project Settings** → **Your apps**
2. Add **Android app** with package name: `com.isltranslatorapp`
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### 3. Environment Variables
Create `.env` file in the project root:
```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

---

## 1. Prerequisites

- **Node.js** and **npm** installed
- **Java JDK** (version 11 or newer recommended)
- **A real Android phone** with USB debugging enabled
- **USB cable** to connect your phone
- **Firebase project** (see setup above)

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

## 6. Authentication Features

The app includes the following authentication features:

### ✅ **User Registration**
- Email and password signup
- Display name for personalization
- Input validation and error handling

### ✅ **User Login**
- Secure email/password authentication
- Password visibility toggle
- Comprehensive error messages

### ✅ **Session Management**
- Automatic token refresh
- Persistent login state
- Secure logout functionality

### ✅ **UI/UX Features**
- Modern, responsive design
- Keyboard-aware layout
- Loading states and feedback
- Input validation with real-time feedback

---

## 7. App Screens

### **Login Screen**
- Email/password authentication
- Toggle between sign-in and sign-up
- Password visibility toggle
- Error message display
- Loading indicators

### **Home Screen**
- Personalized welcome message
- Navigation to translation features
- Sign out functionality
- User-friendly interface

### **Translation Screens**
- Live camera feed for sign language
- Spoken language input
- Real-time translation
- Transaction history

---

## 8. Troubleshooting

### Authentication Issues
- **"Firebase not initialized"**: Check `google-services.json` is in `android/app/`
- **"Invalid credentials"**: Verify Firebase project settings and API keys
- **"Network error"**: Check internet connection and Firebase project status

### General Issues
- If you see errors about the SDK path, double-check your `android/local.properties`.
- If your device does not show up with `adb devices`, check your USB cable, drivers, and that USB debugging is enabled.
- If you get "adb: not found", ensure the SDK's `platform-tools` are installed and in your PATH.
- For Metro/React Native errors, restart Metro with `npx react-native start --reset-cache`.

---

## 9. Useful Commands

- **List connected devices:**  
  ```bash
  adb devices
  ```
- **Wireless ADB (optional):**
  ```bash
  adb tcpip 5555
  adb connect <device-ip-address>:5555
  ```
- **Clear Metro cache:**
  ```bash
  npx react-native start --reset-cache
  ```

---

## 10. Security Notes

- Never commit `google-services.json` or `.env` files
- These files are already in `.gitignore` for protection
- Keep your Firebase API keys secure
- The app uses secure token-based authentication

---

## 11. Notes

- You do **not** need to keep Android Studio running after installing the SDK.
- Metro must be running for live JS updates.
- For production builds or emulator use, see the React Native docs.
- The app currently supports **Android only**.
- Firebase Authentication is required for all features.

---