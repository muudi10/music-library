const mysql = require('mysql2/promise');

const path = require('path');
const args = process.argv.slice(2)[0];
const envFile = args === 'test' ? '../.env.test' : '../.env';
require('dotenv').config({
  path: path.join(__dirname, envFile),
});

const { DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpConnection = async () => {
  try {
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    await db.query(`USE ${DB_NAME}`);
    await db.query(`CREATE TABLE IF NOT EXISTS Artist (
      id INT PRIMARY KEY auto_increment,
      name VARCHAR(25),
      genre VARCHAR(25)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS Album(
      id INT PRIMARY KEY auto_increment,
            name VARCHAR(25),
            year INT,
            Artistid INT,
            FOREIGN KEY (Artistid) REFERENCES Artist(id)

    )`)
    db.close()

    

  } catch (error) {
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log('Environment Variables are:', {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(error);
  }
};
setUpConnection();
