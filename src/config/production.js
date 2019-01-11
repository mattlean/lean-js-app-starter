// @flow

if(process.env.NODE_ENV === 'production') {
  if(!process.env.PORT) throw new Error('PORT must be explicitly defined when running in production mode')
  if(!process.env.DB_URI) throw new Error('DB_URI must be explicitly defined when running in production mode')
}

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CLIENT: process.env.CLIENT
}
