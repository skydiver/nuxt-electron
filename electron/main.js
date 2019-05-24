const isDev = process.env.NODE_ENV === 'DEV';

if (isDev) {
  const development = require('./development');
  development.loader();
} else {
  const production = require('./production');
  production.loader();
}
