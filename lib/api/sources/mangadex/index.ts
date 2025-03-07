import { MangaSource } from '../base';
import { Manga, Chapter, SourceManga } from '../../../types/manga';
import { MangaDexResponse, MangaDexManga, MangaDexChapter, MangaDexChapterPages } from './types';

const API_BASE = 'https://api.mangadex.org';

export class MangaDexSource implements MangaSource {
  id = 'mangadex';
  name = 'MangaDex';
  icon = 'https://mangadex.org/favicon.ico';
  lang = 'en';
  supportsLatest = true;
  isNsfw = false;

  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async search(query: string, page = 1): Promise<SourceManga[]> {
    const limit = 20;
    const offset = (page - 1) * limit;
    
    const response = await this.fetchApi<MangaDexResponse<MangaDexManga[]>>('/manga', {
      method: 'GET',
      body: JSON.stringify({
        limit,
        offset,
        title: query,
        availableTranslatedLanguage: ['en'],
        contentRating: ['safe', 'suggestive'],
        order: { relevance: 'desc' },
      }),
    });

    return response.data.map(manga => ({
      id: manga.id,
      title: Object.values(manga.attributes.title)[0],
      coverUrl: this.getCoverUrl(manga),
      url: `https://mangadex.org/title/${manga.id}`,
    }));
  }

  async getPopular(page = 1): Promise<SourceManga[]> {
    const limit = 20;
    const offset = (page - 1) * limit;
    
    const response = await this.fetchApi<MangaDexResponse<MangaDexManga[]>>('/manga', {
      method: 'GET',
      body: JSON.stringify({
        limit,
        offset,
        order: { followedCount: 'desc' },
        availableTranslatedLanguage: ['en'],
        contentRating: ['safe', 'suggestive'],
      }),
    });

    return response.data.map(manga => ({
      id: manga.id,
      title: Object.values(manga.attributes.title)[0],
      coverUrl: this.getCoverUrl(manga),
      url: `https://mangadex.org/title/${manga.id}`,
    }));
  }

  async getLatest(page = 1): Promise<SourceManga[]> {
    const limit = 20;
    const offset = (page - 1) * limit;
    
    const response = await this.fetchApi<MangaDexResponse<MangaDexManga[]>>('/manga', {
      method: 'GET',
      body: JSON.stringify({
        limit,
        offset,
        order: { createdAt: 'desc' },
        availableTranslatedLanguage: ['en'],
        contentRating: ['safe', 'suggestive'],
      }),
    });

    return response.data.map(manga => ({
      id: manga.id,
      title: Object.values(manga.attributes.title)[0],
      coverUrl: this.getCoverUrl(manga),
      url: `https://mangadex.org/title/${manga.id}`,
    }));
  }

  async getMangaDetails(id: string): Promise<Manga> {
    const response = await this.fetchApi<MangaDexResponse<MangaDexManga>>(`/manga/${id}`);
    const manga = response.data;

    return {
      id: manga.id,
      title: Object.values(manga.attributes.title)[0],
      alternativeTitles: manga.attributes.altTitles.map(title => Object.values(title)[0]),
      description: Object.values(manga.attributes.description)[0] || '',
      authors: [], // Need to fetch from relationships
      status: this.convertStatus(manga.attributes.status),
      tags: manga.attributes.tags.map(tag => Object.values(tag.attributes.name)[0]),
      coverUrl: this.getCoverUrl(manga),
      chapters: [], // Fetched separately
      source: this.id,
      lastUpdated: Date.now(),
      inLibrary: false,
    };
  }

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const response = await this.fetchApi<MangaDexResponse<MangaDexChapter[]>>(`/manga/${mangaId}/feed`, {
      method: 'GET',
      body: JSON.stringify({
        translatedLanguage: ['en'],
        order: { chapter: 'desc' },
      }),
    });

    return response.data.map(chapter => ({
      id: chapter.id,
      mangaId,
      title: chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`,
      chapterNumber: parseFloat(chapter.attributes.chapter || '0'),
      volumeNumber: chapter.attributes.volume ? parseInt(chapter.attributes.volume) : undefined,
      sourceUrl: `https://mangadex.org/chapter/${chapter.id}`,
      dateUploaded: new Date(chapter.attributes.publishAt).getTime(),
      scanlationGroup: '', // Need to fetch from relationships
      read: false,
      downloaded: false,
      pageCount: chapter.attributes.pages,
      lastPageRead: 0,
    }));
  }

  async getChapterPages(chapterId: string): Promise<string[]> {
    const response = await this.fetchApi<MangaDexChapterPages>(`/at-home/server/${chapterId}`);
    const { baseUrl, chapter } = response;

    return chapter.data.map((page, index) => 
      `${baseUrl}/data/${chapter.hash}/${page}`
    );
  }

  private getCoverUrl(manga: MangaDexManga): string {
    const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
    if (!coverRelationship) return '';
    return `https://uploads.mangadex.org/covers/${manga.id}/${coverRelationship.attributes?.fileName}`;
  }

  private convertStatus(status: string): 'ongoing' | 'completed' | 'cancelled' | 'unknown' {
    switch (status) {
      case 'ongoing': return 'ongoing';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return 'unknown';
    }
  }
} 