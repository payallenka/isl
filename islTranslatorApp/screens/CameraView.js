import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraView({ onCapture, onCancel }) {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices && devices.front ? devices.front : null;
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState('');
  const [takingPhoto, setTakingPhoto] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();
      console.log('Camera permission status on mount:', status);
      if (status !== 'authorized') {
        const reqStatus = await Camera.requestCameraPermission();
        console.log('Camera permission status after request:', reqStatus);
        if (reqStatus === 'authorized') {
          setHasPermission(true);
        } else {
          setHasPermission(false);
          setPermissionError('Camera permission denied.');
        }
      } else {
        setHasPermission(true);
      }
      // Log devices and device for debugging
      console.log('devices:', devices);
      console.log('device:', device);
    })();
  }, [devices, device]);

  const takePhoto = async () => {
    if (!cameraRef.current || !device) {
      Alert.alert('Error', 'Camera not ready.');
      return;
    }
    setTakingPhoto(true);
    try {
      const photo = await cameraRef.current.takePhoto({ quality: 85 });
      onCapture(photo);
    } catch (e) {
      Alert.alert('Error', 'Failed to capture photo.');
    } finally {
      setTakingPhoto(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>
          {permissionError || 'Camera permission not granted.'}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const reqStatus = await Camera.requestCameraPermission();
            if (reqStatus === 'authorized') setHasPermission(true);
            else setPermissionError('Camera permission denied.');
          }}
        >
          <Text style={styles.buttonText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (!devices || !devices.front) {
    return <ActivityIndicator size="large" color="#2563eb" style={{ flex: 1 }} />;
  }
  if (!device) {
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>No front camera found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={takePhoto} disabled={takingPhoto}>
          <Text style={styles.buttonText}>{takingPhoto ? 'Capturing...' : 'Capture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#e5e7eb' }]} onPress={onCancel} disabled={takingPhoto}>
          <Text style={[styles.buttonText, { color: '#374151' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    aspectRatio: 3/4,
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
