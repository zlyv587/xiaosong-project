const config = {
  development: {
    dbConfig: {
      url: 'mongodb://cms:cms@127.0.0.1:27017/',
      name: 'cms_test'
    }
  },
  production: {
    dbConfig: {
      url: 'mongodb://cms:cms@127.0.0.1:27017/',
      name: 'cms'
    }
  }
}


const env = process.env.NODE_ENV;


module.exports = {
  env: 'production',
  appRoot: process.cwd(),
  port: 3030,
  keys: ['cms'],
  PRIVATE_KEY: 'cms',
  ...config[env]
}