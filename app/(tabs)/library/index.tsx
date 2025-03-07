import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Library',
          headerLargeTitle: true,
          headerRight: () => (
            <Ionicons
              name="grid"
              size={24}
              color="#007AFF"
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <View style={styles.content}>
        <Ionicons name="library" size={64} color="#ccc" />
        <Text style={styles.text}>Your library is empty</Text>
        <Text style={styles.subText}>
          Browse for manga and add them to your library
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  subText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
}); 