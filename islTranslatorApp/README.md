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

## 5. Start Backend and ML Service

Before using the app, make sure both your backend and ML service are running.

### Start the Backend

From your backend directory, run:
```bash
# Example for Django
python manage.py runserver
```
Or use the command appropriate for your backend.

### Start the ML Service

From your ML service directory, run:
```bash
# Example for FastAPI
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
Or use the command appropriate for your ML service.

**Make sure both services are running and accessible from your phone (same Wi-Fi network or correct IP/port).**

---

## 6. Start Metro

Metro is the JavaScript bundler for React Native. You **must** have Metro running for your app to load JS code.

From your project root, run:
```bash
npx react-native start
```

---

## 7. Build and Run the App

With Metro running, open a new terminal window in your project root and run:

```bash
npx react-native run-android
```

This will build and install the app on your connected Android device.

---

## 8. Troubleshooting

- If you see "unable to load script" errors, make sure Metro is running.
- If your device does not show up with `adb devices`, check your USB cable, drivers, and that USB debugging is enabled.
- If you get SDK errors, double-check your `android/local.properties` path.
- If you get "adb: not found", ensure the SDK's `platform-tools` are installed and in your PATH.

---

## 9. Useful Commands

- **List connected devices:**  
  ```bash
  adb devices
  ```
- **Wireless ADB (optional):**
  ```bash
  adb tcpip 5555
  adb connect
