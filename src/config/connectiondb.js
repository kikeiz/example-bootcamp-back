const { Client } = require('pg');

function startConnection(){
  const connectionData = {
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.NAMEDB,
    password: process.env.PASSWORDDB,
    port: 5432,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  const myClient = new Client(connectionData);
  myClient.connect()
  return myClient;
}

module.exports = startConnection;