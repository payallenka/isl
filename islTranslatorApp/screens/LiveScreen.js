import React, { useEffect, useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Image, Linking } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { NativeModules } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import TransactionsScreen from './TransactionsScreen';
import { useAuth } from '../src/contexts/AuthContext';

const SEQ_LEN = 20; 
const KEYPOINTS_PER_FRAME = 1662; 
const BACKEND_URL = 'http://192.168.0.165:8000/api/predict/';

export default function LiveScreen({ navigation }) {
  const [permission, setPermission] = useState();
  const [showCamera, setShowCamera] = useState(true); 
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const { getAuthToken } = useAuth();
  
  const allDevices = [
    ...(Array.isArray(devices.back) ? devices.back : devices.back ? [devices.back] : []),
    ...(Array.isArray(devices.front) ? devices.front : devices.front ? [devices.front] : []),
    ...Object.values(devices).flat().filter(d => typeof d === 'object'),
  ];
  const device = allDevices.find(d => d.position === 'front') || null;

  useEffect(() => {
    console.log('Available camera devices:', devices);
    console.log('Selected device:', device);
  }, [devices, device]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    })();
  }, []);

  const renderPermissionState = () => {
    switch (permission) {
      case 'authorized':
      case 'granted':
        return null;
      case 'not-determined':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Requesting camera permission...</Text>
          </View>
        );
      case 'denied':
      case 'blocked':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera permission denied or blocked.</Text>
            <Button title="Open Settings" onPress={() => Linking.openSettings()} />
          </View>
        );
      case 'restricted':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera access is restricted by parental controls or system policy.</Text>
          </View>
        );
      case 'limited':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera access is limited.</Text>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Unknown camera permission state: {String(permission)}</Text>
          </View>
        );
    }
  };

  function showAlertAsync(title, message) {
    return new Promise((resolve) => {
      Alert.alert(title, message, [
        { text: 'OK', onPress: resolve }
      ], { cancelable: false });
    });
  }

  const handleCapture = async (photoObj) => {
    setShowCamera(false);
    setPhoto(photoObj);
    setResult(null);
    setError('');
    setLoading(true);
    try {
      const keypointsMatrix = Array.from({ length: SEQ_LEN }, () =>
        Array.from({ length: KEYPOINTS_PER_FRAME }, () => Math.random())
      );
      
      const authToken = await getAuthToken();
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      let res, data;
      try {
        res = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ keypoints: keypointsMatrix }),
          signal: controller.signal
        });
        clearTimeout(timeout);
        data = await res.json();
      } catch (err) {
        clearTimeout(timeout);
        Alert.alert('Network Timeout/Error', err.message);
        throw err;
      }
      if (!res.ok) {
        setError(data.error || 'Prediction failed');
        Alert.alert('Prediction Error', data.error || 'Prediction failed');
      } else {
        setResult(data);
      }
    } catch (e) {
      setError(e.message);
      console.log('Network or fetch error:', e);
      Alert.alert('Network or fetch error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && (permission === 'authorized' || permission === 'granted')) {
      setLoading(true);
      setResult(null);
      try {
        const photo = await cameraRef.current.takePhoto({ qualityPrioritization: 'speed' });
        handleCapture(photo);
      } catch (e) {
        setError('Capture failed');
        setLoading(false);
        Alert.alert('Capture Error', e.message);
      }
    } else {
      Alert.alert('Camera Not Ready', `cameraRef: ${!!cameraRef.current}, permission: ${permission}`);
    }
  };

  const fetchLastTransaction = async () => {
    try {
      const authToken = await getAuthToken();
      const headers = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      const res = await fetch('http://192.168.0.165:8000/api/transactions/', {
        headers: headers
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setLastTransaction(data[0]);
      } else {
        setLastTransaction({ error: 'No transactions found.' });
      }
    } catch (e) {
      setLastTransaction({ error: e.message });
    }
  };

  if (permission == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Checking camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No front camera found.</Text>
      </View>
    );
  }

  console.log('VisionCamera NativeModules:', NativeModules.VisionCameraModule);

  return (
    <View style={{ flex: 1 }}>
      {renderPermissionState() || (
        <>
          <View style={{ flex: 1 }}>
            <Camera
              ref={cameraRef}
              style={{ flex: 1 }}
              device={device}
              isActive={true}
              photo={true}
            />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
              <Svg height="100%" width="100%">
                <Line x1="33%" y1="0" x2="33%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6" />
                <Line x1="66%" y1="0" x2="66%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6" />
                <Line x1="0" y1="33%" x2="100%" y2="33%" stroke="white" strokeWidth="2" strokeDasharray="6" />
                <Line x1="0" y1="66%" x2="100%" y2="66%" stroke="white" strokeWidth="2" strokeDasharray="6" />
              </Svg>
            </View>
          </View>
          <View style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
            <Button title="Capture" onPress={takePicture} />
            <Button title="Show Transactions" onPress={() => navigation.navigate('Transactions')} style={{ marginTop: 10 }} />
            {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
            {error ? (
              <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
            ) : null}
            {result && (
              <View style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: 8,
                padding: 12,
                marginTop: 10,
                alignItems: 'center',
              }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                  {result.gesture}
                </Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginVertical: 8,
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    width: '100%',
    maxWidth: 320,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultText: {
    fontFamily: 'monospace',
  },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  result: { padding: 16, backgroundColor: '#eee', margin: 8, borderRadius: 8 },
});
