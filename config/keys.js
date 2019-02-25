const  config =require('config')
module.exports={
  DB_URL_LOCAL:'mongodb://localhost:27017/smartHome',
  DB_URL_CLOUD:`mongodb://moatasem:${config.get('dbPassword')}@ds061938.mlab.com:61938/moatasem`,
  PORT:process.env.PORT || 3001,
  SecretOr: config.get("jwtKey"),
  time :4000000,
  pass:config.get('password')

}