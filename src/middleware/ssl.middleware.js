class SslMiddleware {
  constructor() {}

  validateSSL(req, res, next) {
    if (!req.client.authorized) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    return next();
  }
}

module.exports = SslMiddleware;
