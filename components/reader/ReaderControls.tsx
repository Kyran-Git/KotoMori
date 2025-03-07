import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReadingDirection } from './types';

interface ReaderControlsProps {
  currentPage: number;
  totalPages: number;
  readingDirection: ReadingDirection;
  onDirectionChange: (direction: ReadingDirection) => void;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  hasPrevChapter?: boolean;
  hasNextChapter?: boolean;
}

export default function ReaderControls({
  currentPage,
  totalPages,
  readingDirection,
  onDirectionChange,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter = false,
  hasNextChapter = false,
}: ReaderControlsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.chapterControls}>
          <TouchableOpacity
            style={[styles.chapterButton, !hasPrevChapter && styles.disabledButton]}
            onPress={onPrevChapter}
            disabled={!hasPrevChapter}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            {currentPage} / {totalPages}
          </Text>
          <TouchableOpacity
            style={[styles.chapterButton, !hasNextChapter && styles.disabledButton]}
            onPress={onNextChapter}
            disabled={!hasNextChapter}
          >
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.directionControls}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              readingDirection === 'ltr' && styles.activeButton,
            ]}
            onPress={() => onDirectionChange('ltr')}
          >
            <Ionicons
              name="arrow-forward"
              size={24}
              color={readingDirection === 'ltr' ? '#007AFF' : '#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.directionButton,
              readingDirection === 'rtl' && styles.activeButton,
            ]}
            onPress={() => onDirectionChange('rtl')}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={readingDirection === 'rtl' ? '#007AFF' : '#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.directionButton,
              readingDirection === 'vertical' && styles.activeButton,
            ]}
            onPress={() => onDirectionChange('vertical')}
          >
            <Ionicons
              name="arrow-down"
              size={24}
              color={readingDirection === 'vertical' ? '#007AFF' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 8,
  },
  chapterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chapterButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pageInfo: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 8,
  },
  directionControls: {
    flexDirection: 'row',
    gap: 8,
  },
  directionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 