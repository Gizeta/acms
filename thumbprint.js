const crypto = require('crypto');

function canonicalize(jwk) {
  switch (jwk.kty) {
    case "RSA":
      return {
        e: jwk.e,
        kty: jwk.kty,
        n: jwk.n,
      };
    case "EC":
      return {
        crv: jwk.crv,
        kty: jwk.kty,
        x: jwk.x,
        y: jwk.y
      };
    case "oct":
      return {
        k: jwk.k,
        kty: jwk.kty,
      };
    default:
      throw new Error('invalid jwk object');
  }
}

function calc(json) {
  return crypto.createHash('sha256')
    .update(json)
    .digest()
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
  const jwk = canonicalize(JSON.parse(data));
  console.log(calc(JSON.stringify(jwk, Object.keys(jwk).sort())));
});
