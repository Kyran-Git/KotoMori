import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function DownloadsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Downloads',
          headerLargeTitle: true,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Your downloaded chapters will appear here</Text>
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