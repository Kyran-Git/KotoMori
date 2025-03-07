import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

function SettingItem({ icon, title, onPress }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#007AFF" style={styles.icon} />
      <Text style={styles.settingTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'More',
          headerLargeTitle: true,
        }}
      />
      <ScrollView>
        <View style={styles.section}>
          <SettingItem
            icon="color-palette"
            title="Appearance"
            onPress={() => {}}
          />
          <SettingItem
            icon="book"
            title="Reading Settings"
            onPress={() => {}}
          />
          <SettingItem
            icon="server"
            title="Sources"
            onPress={() => {}}
          />
          <SettingItem
            icon="download"
            title="Download Settings"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <SettingItem
            icon="information-circle"
            title="About"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
  },
}); 