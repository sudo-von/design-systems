import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const configuration = {
  bucket: {
    capacity: 5,
  },
  refill: {
    refreshRate: 1 * 5000,
    tokens: 1,
  },
};

export const bucket = {
  tokens: configuration.bucket.capacity,
  lastRefresh: Date.now(),
};

const refreshTokens = async () => {
  const release = await mutex.acquire();

  try {
    const currentRefresh = Date.now();
    const timeElapsed = currentRefresh - bucket.lastRefresh;

    if (timeElapsed >= configuration.refill.refreshRate && bucket.tokens < configuration.bucket.capacity) {
      bucket.tokens = Math.min(bucket.tokens + configuration.refill.tokens, configuration.bucket.capacity);
      bucket.lastRefresh = currentRefresh;
      console.log(`[algorithm][INFO] Tokens refreshed at ${new Date().toISOString()}. Tokens available: ${bucket.tokens}`);
    }
  } finally {
    release();
  }

  setTimeout(refreshTokens, configuration.refill.refreshRate);
};

refreshTokens();