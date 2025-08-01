# Firebase Authentication Setup Guide

## Prerequisites
- Firebase project created
- React Native development environment set up

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Optionally enable other providers (Google, Facebook, etc.)

## Step 2: Add Android App to Firebase

1. In Firebase Console, go to Project Settings (gear icon)
2. Click "Add app" → Android
3. Use package name: `com.isltranslatorapp`
4. Download the `google-services.json` file
5. Replace the placeholder file in `android/app/google-services.json`

## Step 3: Update Firebase Configuration

1. Open `src/config/firebase.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 4: Backend Configuration

1. In Firebase Console, go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"
   ```

## Step 5: Test the Setup

1. Run the app: `npx react-native run-android`
2. Try signing up with a new account
3. Try signing in with existing credentials
4. Check that authentication tokens are being sent to the backend

## Troubleshooting

### Common Issues:

1. **"google-services.json not found"**
   - Make sure the file is in `android/app/google-services.json`
   - Clean and rebuild: `cd android && ./gradlew clean`

2. **"Firebase not initialized"**
   - Check that the config in `src/config/firebase.js` is correct
   - Ensure the package name matches your Firebase app

3. **"Authentication failed"**
   - Verify Email/Password provider is enabled in Firebase Console
   - Check that the service account key is properly configured

4. **"Network error"**
   - Ensure the backend is running on the correct IP
   - Check that the Firebase project is in the same region as your backend

## Security Notes

- Never commit `google-services.json` or service account keys to version control
- Use environment variables for sensitive configuration
- Consider implementing additional security measures for production

## Next Steps

After Firebase is set up:
1. Test the complete authentication flow
2. Implement additional sign-in methods if needed
3. Add user profile management features
4. Consider implementing password reset functionality 