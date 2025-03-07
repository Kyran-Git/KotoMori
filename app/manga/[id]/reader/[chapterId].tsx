import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ReaderView from '../../../../components/reader/ReaderView';
import { useMangaSource } from '../../../../hooks/useMangaSource';
import { Chapter } from '../../../../lib/types/manga';

export default function ChapterReaderScreen() {
  const { id: mangaId, chapterId } = useLocalSearchParams<{ id: string; chapterId: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
  const router = useRouter();
  const { getChapters } = useMangaSource();

  useEffect(() => {
    if (mangaId) {
      loadChapters();
    }
  }, [mangaId]);

  useEffect(() => {
    if (chapters.length > 0 && chapterId) {
      const index = chapters.findIndex(chapter => chapter.id === chapterId);
      setCurrentChapterIndex(index);
    }
  }, [chapters, chapterId]);

  const loadChapters = async () => {
    try {
      const mangaChapters = await getChapters(mangaId);
      // Sort chapters by number in ascending order
      const sortedChapters = [...mangaChapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
      setChapters(sortedChapters);
    } catch (error) {
      console.error('Failed to load chapters:', error);
    }
  };

  const navigateToChapter = (index: number) => {
    if (index >= 0 && index < chapters.length) {
      const chapter = chapters[index];
      // Using a simpler path format
      router.replace(`/manga/${mangaId}/reader/${chapter.id}` as any);
    }
  };

  const handlePrevChapter = () => {
    navigateToChapter(currentChapterIndex - 1);
  };

  const handleNextChapter = () => {
    navigateToChapter(currentChapterIndex + 1);
  };

  if (!chapterId || !mangaId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ReaderView
        chapterId={chapterId}
        onChapterFinished={handleNextChapter}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        hasPrevChapter={currentChapterIndex > 0}
        hasNextChapter={currentChapterIndex < chapters.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
}); 