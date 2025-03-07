import { Manga, Chapter, SourceManga } from '../../types/manga';

export interface MangaSource {
  id: string;
  name: string;
  icon: string;
  lang: string;
  supportsLatest: boolean;
  isNsfw: boolean;

  // Search and browse methods
  search(query: string, page?: number): Promise<SourceManga[]>;
  getPopular(page?: number): Promise<SourceManga[]>;
  getLatest(page?: number): Promise<SourceManga[]>;

  // Manga methods
  getMangaDetails(id: string): Promise<Manga>;
  getChapters(mangaId: string): Promise<Chapter[]>;
  
  // Chapter methods
  getChapterPages(chapterId: string): Promise<string[]>;
} 