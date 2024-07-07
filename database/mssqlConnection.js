const sql = require("mssql");

const config = require("../config");

const connectionSettings = {
  user: config.DB_USER || "",
  password: config.DB_PWD || "",
  database: config.DB_NAME || "",
  server: config.SERVER || "",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
  timezone: "utc",
};

const mssqlConnection = async () => {
  try {
    // console.log(connectionSettings);    
    const pool = await sql.connect(connectionSettings);
    // const result = await pool.request().query("SELECT 1");
    // console.log(result);    
    return pool;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mssqlConnection