const allowedCors = [
  'https://movies-explorer.89er.nomoredomains.sbs',
  'http://movies-explorer.89er.nomoredomains.sbs',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    console.log('OPTIONS request received');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers['access-control-request-headers'];
    if (requestHeaders) {
      res.header('Access-Control-Allow-Headers', requestHeaders);
    }
    return res.status(200).end();
  }

  return next();
};
