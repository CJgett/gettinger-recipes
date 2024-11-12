// Store the token bucket outside the function to persist between requests
const globalTokenBucket = new Map();

function createRateLimit() {
  function checkLimit(ip, limit = 5, timeWindow = 60 * 1000) {
    try {
      const now = Date.now();
      const bucket = globalTokenBucket.get(ip) || {
        tokens: limit,
        last: now
      };

      const timePassed = now - bucket.last;
      const tokensToRestore = Math.floor(timePassed / timeWindow) * limit;
      bucket.tokens = Math.min(limit, bucket.tokens + tokensToRestore);
      bucket.last = now;

      if (bucket.tokens > 0) {
        bucket.tokens--;
        globalTokenBucket.set(ip, bucket);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  function check(ip) {
    const limit = { requests: 5, window: 60 * 1000 };
    return checkLimit(ip, limit.requests, limit.window);
  }

  function reset() {
    globalTokenBucket.clear();
  }

  return { 
    check,
    reset
  };
}

export default createRateLimit; 