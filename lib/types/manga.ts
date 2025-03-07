export interface Manga {
  id: string;
  title: string;
  alternativeTitles: string[];
  description: string;
  authors: string[];
  status: 'ongoing' | 'completed' | 'cancelled' | 'unknown';
  tags: string[];
  coverUrl: string;
  chapters: Chapter[];
  source: string;
  lastUpdated: number;
  lastRead?: number;
  inLibrary: boolean;
}

export interface Chapter {
  id: string;
  mangaId: string;
  title: string;
  chapterNumber: number;
  volumeNumber?: number;
  sourceUrl: string;
  dateUploaded: number;
  scanlationGroup?: string;
  read: boolean;
  downloaded: boolean;
  pageCount: number;
  lastPageRead: number;
}

export interface Source {
  id: string;
  name: string;
  icon: string;
  lang: string;
  supportsLatest: boolean;
  isNsfw: boolean;
}

export interface SourceManga {
  id: string;
  title: string;
  coverUrl: string;
  url: string;
} 