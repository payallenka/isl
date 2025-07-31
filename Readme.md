# ISL Translator Project

A full-stack application for real-time Indian Sign Language (ISL) translation using keypoints and deep learning. This repo contains:
- **backend_service**: Django REST API for user, transaction, and API endpoints
- **ml_service**: FastAPI microservice for gesture prediction using keypoints and a trained model
- **islTranslatorApp**: React Native mobile app for live sign/spoken language translation

---

## 1. Prerequisites
- Python 3.8+
- Node.js & npm
- Android Studio (for Android) or Xcode (for iOS)
- Java (for Android builds)
- [MediaPipe](https://google.github.io/mediapipe/) (for keypoint extraction)

---

## 2. Backend Service (Django)

**Setup:**
- Open a terminal and navigate to the backend directory:
```sh
cd backend_service
```
- Create a virtual environment and activate it:
```sh
python -m venv env
source env/bin/activate
```
- Install requirements:
```sh
pip install -r requirements.txt
```

**Run the server (from backend_service directory):**
```sh
python manage.py runserver 0.0.0.0:8000
```
- The API will be available at `http://0.0.0.0:8000/`
- Main endpoints: `/api/predict/`, `/api/transactions/`, etc.

---

## 3. ML Service (FastAPI + TensorFlow)

**Setup:**
- Place `isl_sign_language_model.h5` and `isl_label_map.pkl` in the `ml_service` directory (not inside the inner `ml_service/ml_service`).
- Open a terminal and navigate to the ml_service directory:
```sh
cd ml_service
```
- Create a virtual environment and activate it:
```sh
python -m venv env
source env/bin/activate
```
- Install requirements:
```sh
pip install -r requirements.txt
```

**Run the ML service (from ml_service directory):**
```sh
uvicorn ml_service.main:app --host 0.0.0.0 --port 8001
```
- The ML API will be available at `http://0.0.0.0:8001/`
- Test with `/health` and `/predict` endpoints.

---

## 4. React Native App (islTranslatorApp)

**Note:** This app is currently supported for **Android only**.

**Setup:**
- Open a terminal and navigate to the app directory:
```sh
cd islTranslatorApp
```
- Install dependencies:
```sh
npm install
```

**Start Metro bundler (from islTranslatorApp directory):**
```sh
npx react-native start
```

**Run on Android (from islTranslatorApp directory):**
- **Connect your Android device via USB** (enable Developer Mode and USB Debugging)
- Or connect via WiFi using adb:
  1. Connect your phone and PC to the same WiFi network.
  2. Connect your phone via USB and run:
     ```sh
     adb devices
     adb tcpip 5555
     adb connect <PHONE_IP>:5555
     adb devices
     ```
  3. You should see your device listed.
- Then run:
```sh
npx react-native run-android
```

**Troubleshooting device connection:**
- Use `adb devices` to check if your device is detected.
- If not, check USB cable, drivers, or WiFi connection.

---

## 5. Testing the Full Pipeline
- Start the Django backend, ML service, and React Native app as described above (each from its own directory).
- Use the app to capture sign language (camera) or type spoken language.
- The app will communicate with the backend and ML service for predictions and transaction history.

---

## 6. Troubleshooting
- **Model or label map not loaded:** Ensure `.h5` and `.pkl` files are in the correct directory and you run uvicorn from the right folder.
- **Always same prediction:** Make sure you are sending real keypoints, not random data.
- **Broken pipe errors:** Usually harmless, but check for network issues if predictions fail.
- **Metro/React Native errors:** Restart Metro with `npx react-native start --reset-cache`.

---
