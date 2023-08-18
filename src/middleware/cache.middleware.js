class CacheMiddleware {
  constructor({ redisUtil }) {
    this.redisUtil = redisUtil;
    this.checkCache = this.checkCache.bind(this);
  }

  async checkCache(req, res, next) {
    const cachedResponse = await this.redisUtil.get(req.originalUrl);

    if (!cachedResponse) {
      console.log(`Cache miss for request ${req.originalUrl}`);
      return next();
    }

    console.log(`Cache hit for request ${req.originalUrl}`);
    return res.status(200).json(JSON.parse(cachedResponse));
  }
}

module.exports = CacheMiddleware;
