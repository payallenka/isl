import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString();
}

export default function TransactionsScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://192.168.0.165:8000/api/transactions/');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          setError('No transactions found.');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const renderTransaction = ({ item }) => (
    <View style={styles.card}>
      {Object.entries(item).map(([key, value]) => (
        <View key={key} style={{ flexDirection: 'row', marginBottom: 2 }}>
          <Text style={{ fontWeight: 'bold', color: '#2563eb', minWidth: 90 }}>{key}:</Text>
          <Text style={{ color: '#222', flex: 1, flexWrap: 'wrap' }}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>History</Text>
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => String(item.id)}
          renderItem={renderTransaction}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    fontSize: 22,
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
  card: {
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
