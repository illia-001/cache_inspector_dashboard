import type { CacheItem } from '../types/CacheItem';

export function readLocaleStorage(): CacheItem[] {
  const items: CacheItem[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key !== null) {
      const value = localStorage.getItem(key);
      const createdAt = localStorage.getItem(`${key}_created`);
      items.push({
        key,
        value,
        createdAt: createdAt ? Number(createdAt) : undefined,
      });
    }
  }

  return items;
}
