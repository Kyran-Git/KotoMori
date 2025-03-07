import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Library',
          headerLargeTitle: true,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Your manga library will appear here</Text>
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
    fontSize: 16,
    color: '#666',
  },
}); 