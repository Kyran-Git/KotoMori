import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { useMangaSource } from '../../../hooks/useMangaSource';
import MangaCard from '../../../components/manga/MangaCard';
import { SourceManga } from '../../../lib/types/manga';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [manga, setManga] = useState<SourceManga[]>([]);
  const { isLoading, error, searchManga, getPopularManga } = useMangaSource();

  useEffect(() => {
    loadPopularManga();
  }, []);

  const loadPopularManga = async () => {
    const results = await getPopularManga();
    setManga(results);
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const results = await searchManga(text);
      setManga(results);
    } else if (text.length === 0) {
      loadPopularManga();
    }
  };

  const renderItem = ({ item }: { item: SourceManga }) => (
    <MangaCard
      id={item.id}
      title={item.title}
      coverUrl={item.coverUrl}
    />
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Browse',
          headerLargeTitle: true,
        }}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search manga..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={manga}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
}); 