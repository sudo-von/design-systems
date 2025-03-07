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

setInterval(() => {
  const currentRefresh = Date.now();
  const timeElapsed = currentRefresh - bucket.lastRefresh;

  if (timeElapsed >= configuration.refill.refreshRate && bucket.tokens < configuration.bucket.capacity) {
    bucket.tokens = Math.min(bucket.tokens + configuration.refill.tokens, configuration.bucket.capacity);
    bucket.lastRefresh = currentRefresh;
    console.log(`[algorithm][INFO] Tokens refreshed at ${new Date().toISOString()}. Tokens available: ${bucket.tokens}`);
  }
}, configuration.refill.refreshRate);