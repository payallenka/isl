# ISL Translator Project

A full-stack application for real-time Indian Sign Language (ISL) translation using keypoints and deep learning with **Firebase Authentication**. This repo contains:
- **backend_service**: Django REST API for user, transaction, and API endpoints
- **ml_service**: FastAPI microservice for gesture prediction using keypoints and a trained model
- **islTranslatorApp**: React Native mobile app for live sign/spoken language translation

---

## 🔐 Firebase Authentication Setup

**IMPORTANT**: Before running the application, you must set up Firebase Authentication.

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable **Authentication** → **Sign-in method** → **Email/Password**

### 2. Configure React Native App
1. In Firebase Console, go to **Project Settings** → **Your apps**
2. Add **Android app** with your package name: `com.isltranslatorapp`
3. Download `google-services.json` and place it in:
   ```
   islTranslatorApp/android/app/google-services.json
   ```

### 3. Configure Django Backend
1. In Firebase Console, go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file and save as `firebase-service-account.json` in:
   ```
   backend_service/firebase-service-account.json
   ```

### 4. Environment Variables
Create `.env` files in the following locations:

**React Native App** (`islTranslatorApp/.env`):
```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

**Django Backend** (`backend_service/.env`):
```env
FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json
SECRET_KEY=your_django_secret_key
DEBUG=True
```

---

## 1. Prerequisites
- Python 3.8+
- Node.js & npm
- Android Studio (for Android) or Xcode (for iOS)
- Java (for Android builds)
- [MediaPipe](https://google.github.io/mediapipe/) (for keypoint extraction)
- **Firebase project** (see setup above)

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
source env/bin/activate  # On Windows: env\Scripts\activate
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
source env/bin/activate  # On Windows: env\Scripts\activate
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
1. **Start all services** as described above (each from its own directory)
2. **Open the React Native app** on your device
3. **Sign up/Sign in** using Firebase Authentication
4. **Use the app** to capture sign language (camera) or type spoken language
5. **Check transaction history** in the app

---

## 6. Authentication Features
- ✅ **Email/Password Authentication** via Firebase
- ✅ **User Registration** with display name
- ✅ **Secure Login** with error handling
- ✅ **Token-based Authentication** with Django backend
- ✅ **User Session Management**
- ✅ **Password Visibility Toggle**
- ✅ **Input Validation** and error messages

---

## 7. Troubleshooting

### Authentication Issues
- **"Firebase not initialized"**: Check `google-services.json` is in correct location
- **"Invalid credentials"**: Verify Firebase project settings and API keys
- **"Network error"**: Check internet connection and Firebase project status

### General Issues
- **Model or label map not loaded:** Ensure `.h5` and `.pkl` files are in the correct directory
- **Always same prediction:** Make sure you are sending real keypoints, not random data
- **Broken pipe errors:** Usually harmless, but check for network issues if predictions fail
- **Metro/React Native errors:** Restart Metro with `npx react-native start --reset-cache`

---

## 8. Security Notes
- Never commit `google-services.json`, `firebase-service-account.json`, or `.env` files
- These files are already in `.gitignore` for protection
- Keep your Firebase API keys secure and rotate them if compromised

---

## 9. Project Structure
```
isl/
├── backend_service/          # Django REST API
│   ├── backend_service/      # Django project settings
│   ├── mlapi/               # Django app with models/views
│   ├── firebase-service-account.json  # Firebase credentials (not in git)
│   └── .env                 # Environment variables (not in git)
├── ml_service/              # FastAPI ML service
│   ├── ml_service/          # FastAPI app
│   ├── isl_sign_language_model.h5  # ML model (not in git)
│   └── isl_label_map.pkl    # Label mapping (not in git)
└── islTranslatorApp/        # React Native app
    ├── android/app/google-services.json  # Firebase config (not in git)
    ├── src/contexts/AuthContext.js  # Authentication context
    ├── screens/             # App screens
    └── .env                 # Environment variables (not in git)
```
