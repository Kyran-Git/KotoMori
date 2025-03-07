import { MangaSource } from './base';
import { MangaDexSource } from './mangadex';

class SourceManager {
  private sources: Map<string, MangaSource>;

  constructor() {
    this.sources = new Map();
    this.registerDefaultSources();
  }

  private registerDefaultSources() {
    const mangadex = new MangaDexSource();
    this.sources.set(mangadex.id, mangadex);
  }

  getSource(id: string): MangaSource | undefined {
    return this.sources.get(id);
  }

  getAllSources(): MangaSource[] {
    return Array.from(this.sources.values());
  }

  registerSource(source: MangaSource) {
    this.sources.set(source.id, source);
  }
}

// Export a singleton instance
export const sourceManager = new SourceManager(); 