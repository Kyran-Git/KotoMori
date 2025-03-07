import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image as RNImage,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useMangaSource } from '../../hooks/useMangaSource';
import { ReadingDirection } from './types';
import ReaderControls from './ReaderControls';

interface ReaderViewProps {
  chapterId: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onChapterFinished?: () => void;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  hasPrevChapter?: boolean;
  hasNextChapter?: boolean;
}

export default function ReaderView({
  chapterId,
  initialPage = 0,
  onPageChange,
  onChapterFinished,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter = false,
  hasNextChapter = false,
}: ReaderViewProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [readingDirection, setReadingDirection] = useState<ReadingDirection>('rtl');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const { getChapterPages } = useMangaSource();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    loadChapterPages();
  }, [chapterId]);

  const loadChapterPages = async () => {
    setLoading(true);
    try {
      const pageUrls = await getChapterPages(chapterId);
      setPages(pageUrls);
      
      // Preload next few images
      pageUrls.slice(0, 3).forEach(url => {
        FastImage.preload([{ uri: url }]);
      });
    } catch (error) {
      console.error('Failed to load chapter pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
    onPageChange?.(index);

    // Preload next few images
    const nextPages = pages.slice(index + 1, index + 4);
    if (nextPages.length > 0) {
      FastImage.preload(nextPages.map(url => ({ uri: url })));
    }

    if (index === pages.length - 1) {
      onChapterFinished?.();
    }
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  const renderPage = ({ item: pageUrl, index }: { item: string; index: number }) => (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <View style={[styles.pageContainer, { width: windowWidth, height: windowHeight }]}>
        <FastImage
          source={{ uri: pageUrl }}
          style={styles.page}
          resizeMode={readingDirection === 'vertical' ? 'contain' : 'contain'}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(_, index) => index.toString()}
        horizontal={readingDirection !== 'vertical'}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        inverted={readingDirection === 'rtl'}
        onMomentumScrollEnd={(e) => {
          const offset = readingDirection === 'vertical'
            ? e.nativeEvent.contentOffset.y
            : e.nativeEvent.contentOffset.x;
          const index = Math.round(
            offset / (readingDirection === 'vertical' ? windowHeight : windowWidth)
          );
          handlePageChange(readingDirection === 'rtl' ? pages.length - 1 - index : index);
        }}
        initialScrollIndex={readingDirection === 'rtl' ? pages.length - 1 - initialPage : initialPage}
        getItemLayout={(_, index) => ({
          length: readingDirection === 'vertical' ? windowHeight : windowWidth,
          offset: (readingDirection === 'vertical' ? windowHeight : windowWidth) * index,
          index,
        })}
      />
      {showControls && (
        <ReaderControls
          currentPage={currentPage + 1}
          totalPages={pages.length}
          readingDirection={readingDirection}
          onDirectionChange={setReadingDirection}
          onPrevChapter={onPrevChapter}
          onNextChapter={onNextChapter}
          hasPrevChapter={hasPrevChapter}
          hasNextChapter={hasNextChapter}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width: '100%',
    height: '100%',
  },
}); 