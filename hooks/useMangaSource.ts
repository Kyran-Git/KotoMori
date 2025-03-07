import { useState } from 'react';
import { sourceManager } from '../lib/api/sources/manager';
import { SourceManga, Manga, Chapter } from '../lib/types/manga';

export function useMangaSource(sourceId: string = 'mangadex') {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const source = sourceManager.getSource(sourceId);

  const searchManga = async (query: string, page = 1) => {
    if (!source) {
      setError('Source not found');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await source.search(query, page);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPopularManga = async (page = 1) => {
    if (!source) {
      setError('Source not found');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await source.getPopular(page);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestManga = async (page = 1) => {
    if (!source) {
      setError('Source not found');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await source.getLatest(page);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getMangaDetails = async (id: string) => {
    if (!source) {
      setError('Source not found');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const manga = await source.getMangaDetails(id);
      return manga;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getChapters = async (mangaId: string) => {
    if (!source) {
      setError('Source not found');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const chapters = await source.getChapters(mangaId);
      return chapters;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getChapterPages = async (chapterId: string) => {
    if (!source) {
      setError('Source not found');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const pages = await source.getChapterPages(chapterId);
      return pages;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    searchManga,
    getPopularManga,
    getLatestManga,
    getMangaDetails,
    getChapters,
    getChapterPages,
  };
} 