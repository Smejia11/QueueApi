import NodeCache from 'node-cache';

import config from '../config';

const {
  cacheTTL: { Default },
} = config;

// todo: make a funtion or endpoint to reset all caches in all models

// this service create a instance of cache (this cache instance should be set in each model)
/*
TTL: time in seconds for expire the cache instance

example:
  const ttl = 60 * 60 * 1; // cache for 1 Hour
  const cache = new CacheService(ttl);
*/

export class CacheService {
  static cache: NodeCache;
  constructor(ttlSeconds = Default) {
    CacheService.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  // get the value stored in cache, if not exist, search in DB and save in cache,then return the value
  get(key: NodeCache.Key) {
    const value = CacheService.cache.get(key);
    if (value) {
      return value;
    }
    return null;
  }

  set(key: string, value: string | number): boolean;
  set(key: string, value: object): boolean;
  set(key: string, value: string | number | object): boolean {
    return CacheService.cache.set(key, value);
  }

  // delete a value in cache
  del(keys: NodeCache.Key | NodeCache.Key[]) {
    CacheService.cache.del(keys);
  }
  // delete all
  flush() {
    CacheService.cache.flushAll();
  }
}
